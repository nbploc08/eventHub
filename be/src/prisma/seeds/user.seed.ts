import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

/**
 * Seed dữ liệu cho bảng Users (theo schema.prisma)
 */
export async function seedUsers(prisma?: PrismaClient): Promise<void> {
  const client: PrismaClient = prisma || new PrismaClient();

  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.user.deleteMany();
    console.log('🗑️ Đã xóa users cũ');
  }

  // Mẫu user (chỉ các field tồn tại trong schema: email, passwordHash, role, isActive)
  const users = [
    {
      email: 'admin@eventhub.com',
      password: 'admin123',
      role: UserRole.ADMIN,
      isActive: true,
    },
    {
      email: 'organizer@eventhub.com',
      password: 'organizer123',
      role: UserRole.ORGANIZER,
      isActive: true,
    },
    {
      email: 'user211@eventhub.com',
      password: 'user12345',
      role: UserRole.ORGANIZER,
      isActive: true,
    },
    {
      email: 'user1@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user2@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'inactive@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: false,
    },
    {
      email: 'user3@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user4@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user5@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user6@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user7@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user8@eventhub.com',
      password: 'user12345',
      role: UserRole.USER,
      isActive: true,
    },
  ];

  for (const userData of users) {
    const passwordHash = bcrypt.hashSync(userData.password, 10);
    await client.user.upsert({
      where: { email: userData.email },
      update: {
        passwordHash,
        role: userData.role,
        isActive: userData.isActive,
      },
      create: {
        email: userData.email,
        passwordHash,
        role: userData.role,
        isActive: userData.isActive,
      },
    });
  }

  console.log(`📝 Tạo ${users.length} users`);
}

/**
 * Seed dữ liệu users để test riêng biệt
 * Chạy: yarn db:seed:users
 */
export async function seedUsersOnly(prisma: PrismaClient) {
  console.log('👤 Seed Users...');
  await seedUsers(prisma);
  console.log('✅ Hoàn thành!');
}
