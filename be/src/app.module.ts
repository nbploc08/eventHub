import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { CommonModule } from '@/modules/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AdminModule,
    CommonModule,
    PrismaModule,
  ],
})
export class AppModule {}
