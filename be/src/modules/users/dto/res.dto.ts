import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

export class UserAuthResponseDto {
  @IsNotEmpty()
  @IsString()
  passwordHash: string;
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
