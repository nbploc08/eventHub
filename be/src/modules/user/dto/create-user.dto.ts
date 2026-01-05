import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '@/share/enum';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;
}
