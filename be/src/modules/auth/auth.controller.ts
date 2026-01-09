import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local/local-auth.guard';
import { Cookies, Public } from '@/share/decorators/decorator';
import { successResponse } from '@/share/response';
import {
  AUTH_TAG,
  LOGIN_OPERATION,
  LOGIN_BODY,
  LOGIN_RESPONSE,
  LOGIN_400_RESPONSE,
  REFRESH_OPERATION,
  REFRESH_RESPONSE,
  REFRESH_400_RESPONSE,
  LOGOUT_OPERATION,
  LOGOUT_RESPONSE,
  LOGOUT_400_RESPONSE,
  REGISTER_OPERATION,
  REGISTER_BODY,
  REGISTER_RESPONSE,
  REGISTER_400_RESPONSE,
  VERIFY_OPERATION,
  VERIFY_BODY,
  VERIFY_RESPONSE,
  VERIFY_400_RESPONSE,
  RESEND_OPERATION,
  RESEND_BODY,
  RESEND_RESPONSE,
  RESEND_400_RESPONSE,
} from './swagger/auth.swagger';

@Controller('auth')
@AUTH_TAG
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @LOGIN_OPERATION
  @LOGIN_BODY
  @LOGIN_RESPONSE
  @LOGIN_400_RESPONSE
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response, req);
  }

  @Post('logout')
  @LOGOUT_OPERATION
  @LOGOUT_RESPONSE
  @LOGOUT_400_RESPONSE
  async logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
    @Request() req,
  ) {
    return this.authService.logout(refreshToken, response, req);
  }
  @Public()
  @Post('refresh')
  @REFRESH_OPERATION
  @REFRESH_RESPONSE
  @REFRESH_400_RESPONSE
  async refresh(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
    @Request() req,
  ) {
    return this.authService.refresh(refreshToken, response, req);
  }

  @Public()
  @Post('register')
  @REGISTER_OPERATION
  @REGISTER_BODY
  @REGISTER_RESPONSE
  @REGISTER_400_RESPONSE
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body);
  }
  @Public()
  @Post('verify')
  @VERIFY_OPERATION
  @VERIFY_BODY
  @VERIFY_RESPONSE
  @VERIFY_400_RESPONSE
  async verifyAccount(@Body() dto: { email: string; code: string }) {
    return this.authService.verifyAccount(dto);
  }

  @Public()
  @Post('resend-code')
  @RESEND_OPERATION
  @RESEND_BODY
  @RESEND_RESPONSE
  @RESEND_400_RESPONSE
  async resend(@Body('email') email: string) {
    return this.authService.resendCode(email);
  }
}
