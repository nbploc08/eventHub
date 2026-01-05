/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { seedUsers } from '@/prisma/seeds/user.seed';
import { seedProducts } from './seeds/product.seed';
import { seedCategories } from './seeds/category.seed';
import { seedComments } from './seeds/comment.seed';
import { seedInventoryTransactions } from './seeds/inventory-transaction.seed';
import { seedPurchaseOrders } from './seeds/purchase-order.seed';
import { seedSalesOrders } from './seeds/sales-order.seed';
import { seedStaff } from './seeds/staff.seed';
import { seedSuppliers } from './seeds/supplier.seed';
import { seedTags } from './seeds/tag.seed';

const prisma = new PrismaClient();

/**
 * Seed chính cho toàn bộ hệ thống
 * Chạy lệnh: yarn db:seed
 */
async function main() {
  console.log('🌱 Bắt đầu seed...');

  try {
    // Seed Users
    await seedUsers(prisma);
    console.log('✅ Users seeded');

    // Seed Categories
    await seedCategories(prisma);
    console.log('✅ Categories seeded');

    // Seed Products
    await seedProducts(prisma);
    console.log('✅ Products seeded');

    // Seed Staff
    await seedStaff(prisma);
    console.log('✅ Staff seeded');

    // Seed Tags
    await seedTags(prisma);
    console.log('✅ Tags seeded');

    // Seed Comments
    await seedComments(prisma);
    console.log('✅ Comments seeded');

    // Seed Suppliers
    await seedSuppliers(prisma);
    console.log('✅ Suppliers seeded');

    // Seed Purchase Orders
    await seedPurchaseOrders(prisma);
    console.log('✅ Purchase Orders seeded');

    // Seed Sales Orders
    await seedSalesOrders(prisma);
    console.log('✅ Sales Orders seeded');

    // Seed Inventory Transactions
    await seedInventoryTransactions(prisma);
    console.log('✅ Inventory Transactions seeded');


    console.log('🎉 Seed hoàn thành!');
  } catch (error) {
    console.error('❌ Lỗi:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
