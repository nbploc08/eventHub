import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class loginResponseDto {
  @IsString()
  id: string;
  @IsEmail()
  email: string;
  @IsEnum(UserRole)
  role: UserRole;
  @IsString()
  access_token: string;
}
