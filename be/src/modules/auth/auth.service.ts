import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MESSAGE_KEYS } from '@/share/messages';
import { UAParser } from 'ua-parser-js';
import { UserRole } from '@prisma/client';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { MailsService } from '../mails/mails.service';
import { UserResponseDto } from '../users/dto/res.dto';
import { loginResponseDto } from './dto/res.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailsService,
  ) {}

  private async getDeviceData(req: any): Promise<any> {
    const ip =
      req.headers['x-forwarded-for']?.toString().split(',')[0] || req.ip;
    const userAgent = req.headers['user-agent'];

    // libi UAParser
    const parser = new UAParser(userAgent);
    const ua = parser.getResult();

    const deviceName = `${ua.browser.name} on ${ua.os.name}`;

    const dataDevice = {
      ip,
      deviceName,
      userAgent,
    };
    return dataDevice;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      (await this.usersService.comparePassword(password, user.passwordHash))
    ) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }
  private async issueTokens(
    user: any,
    response: any,
    dataDevice: any,
    refreshTokenOld?: string,
  ): Promise<loginResponseDto> {
    const payload = { email: user.email, sub: user.id, role: user.role };

    // rotate refresh token: always mint new and overwrite DB
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    await this.usersService.updateRefreshToken(
      user.id,
      refreshToken,
      dataDevice,
      refreshTokenOld,
    );

    // clear any existing cookie then set new one (7 days)
    response.clearCookie('refreshToken');
    await response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in ms
    });

    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: accessToken,
    } as loginResponseDto;
  }

  async login(
    user: UserResponseDto,
    response: any,
    req: any,
  ): Promise<loginResponseDto> {
    const dataDevice = await this.getDeviceData(req);
    return this.issueTokens(user, response, dataDevice);
  }
  //
  async refresh(
    refreshTokenOld: string,
    response: any,
    req: any,
  ): Promise<loginResponseDto> {
    try {
      const decoded = this.jwtService.verify(refreshTokenOld, {
        secret: process.env.JWT_SECRET,
      });
      const dataDevice = await this.getDeviceData(req);
      const user = await this.usersService.findByRefreshToken(
        decoded.sub,
        refreshTokenOld,
        dataDevice,
      );
      if (!user) {
        response.clearCookie('refreshToken');
        throw new BadRequestException(MESSAGE_KEYS.COMMON.INVALID_DATA);
      }

      // rotate refresh token on refresh
      return await this.issueTokens(
        user,
        response,
        dataDevice,
        refreshTokenOld,
      );
    } catch (error) {
      response.clearCookie('refreshToken');
      throw new BadRequestException(MESSAGE_KEYS.COMMON.INVALID_DATA);
    }
  }

  async logout(
    refreshTokenOld: string,
    response: any,
    req: any,
  ): Promise<{ message: string }> {
    if (!refreshTokenOld) {
      throw new BadRequestException(MESSAGE_KEYS.COMMON.INVALID_DATA);
    }
    const dataDevice = await this.getDeviceData(req);
    const decoded = this.jwtService.verify(refreshTokenOld, {
      secret: process.env.JWT_SECRET,
    });

    const validateDevice = await this.usersService.findByRefreshToken(
      decoded.sub,
      refreshTokenOld,
      dataDevice,
    );
    if (!validateDevice) {
      throw new BadRequestException(MESSAGE_KEYS.COMMON.INVALID_DATA);
    }
    response.clearCookie('refreshToken');

    await this.usersService.removeRefreshToken(
      decoded.sub,
      refreshTokenOld,
      dataDevice,
    );
    return { message: 'Logged out successfully' };
  }
  async createCode(user: any): Promise<number> {
    const code = Math.floor(100000 + Math.random() * 900000); // 6 digits

    const codeHash = createHash('sha256').update(code.toString()).digest('hex');

    // xoá OTP cũ (nếu resend)
    await this.prisma.emailOtp.deleteMany({
      where: { userId: user.id },
    });

    await this.prisma.emailOtp.create({
      data: {
        userId: user.id,
        codeHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 phút
      },
    });
    return code;
  }
  async register(body: {
    email: string;
    password: string;
  }): Promise<{ message: string }> {
    const dataUser = {
      email: body.email,
      password: body.password,
      role: UserRole.USER,
      isActive: false,
    };

    const user = await this.usersService.create(dataUser);

    const code = await this.createCode(user);

    await this.mailService.sendVerifyCode(user.email, code.toString());
    return { message: 'Verification code sent to email' };
  }

  async verifyAccount(dto: {
    email: string;
    code: string;
  }): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new BadRequestException(MESSAGE_KEYS.COMMON.INVALID_DATA);

    const otp = await this.prisma.emailOtp.findFirst({
      where: { userId: user.id },
    });

    if (!otp) throw new BadRequestException('Code not found');

    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('Code expired');
    }
    if (otp.attempts >= 5) {
      await this.prisma.emailOtp.delete({ where: { id: otp.id } });
      throw new BadRequestException('Too many attempts');
    }

    const codeHash = createHash('sha256').update(dto.code).digest('hex');

    if (codeHash !== otp.codeHash) {
      await this.prisma.emailOtp.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      });

      throw new BadRequestException('Invalid code');
    }

    // verify success
    await this.prisma.user.update({
      where: { id: user.id },
      data: { isActive: true },
    });

    // xoá OTP
    await this.prisma.emailOtp.delete({
      where: { id: otp.id },
    });

    return { message: 'Account verified successfully' };
  }

  async resendCode(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.isActive) {
      throw new BadRequestException();
    }

    const code = await this.createCode(user);

    await this.mailService.sendVerifyCode(user.email, code.toString());

    return { message: 'Verification code resent' };
  }
}
