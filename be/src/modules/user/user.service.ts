import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreateUserDTO } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDTO } from '@/modules/user/dto/update-user.dto';
import { UserRole } from '@/share/enum';
import { User } from '@/entities/user.entity';
import { MESSAGE_KEYS } from '@/share/messages';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users as User[];
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user as User | null;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const userData = {
      ...createUserDto,
      role: createUserDto.role || UserRole.USER,
    };
    const user = await this.prisma.user.create({ data: userData });
    return user as User;
  }

  async update(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
    // Check if user exists first
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(MESSAGE_KEYS.USER.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user as User;
  }

  async remove(id: number): Promise<void> {
    // Check if user exists first
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(MESSAGE_KEYS.USER.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
