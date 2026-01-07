import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MESSAGE_KEYS } from '@/share/messages';
import { UserResponseDto } from './dto/res.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hashSync(password, 10);
  }

  async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    return user ? true : false;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    if (await this.userExists(createUserDto.email)) {
      throw new BadRequestException(MESSAGE_KEYS.COMMON.ALREADY_EXISTS);
    }
    const passwordHash = await this.hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash: passwordHash,
        role: createUserDto.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user as UserResponseDto;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users as UserResponseDto[];
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user as UserResponseDto;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!existingUser) {
      throw new BadRequestException(MESSAGE_KEYS.COMMON.NOT_FOUND);
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        role: updateUserDto.role,
        isActive: updateUserDto.isActive,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return user as UserResponseDto;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
  }
}
