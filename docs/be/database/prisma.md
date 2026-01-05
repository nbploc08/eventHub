# Tài liệu Prisma Database

## 🏗️ Cấu hình

### Database

- **Provider**: MySQL
- **Schema**: `be/src/prisma/schema.prisma`
- **Migrations**: `be/src/prisma/migrations/`

### Environment

Tạo file `.env` trong thư mục `be/`:

```env
DATABASE_URL="mysql://root:123456@localhost:3306/minishop_db"
```

## 🎯 Các lệnh cơ bản

| Chức năng         | NPM                   | Yarn               |
| ----------------- | --------------------- | ------------------ |
| **Tạo Client**    | `npm run db:generate` | `yarn db:generate` |
| **Tạo Migration** | `npm run db:migrate`  | `yarn db:migrate`  |
| **Deploy**        | `npm run db:deploy`   | `yarn db:deploy`   |
| **Reset DB**      | `npm run db:reset`    | `yarn db:reset`    |
| **Studio GUI**    | `npm run db:studio`   | `yarn db:studio`   |
| **Seed Data**     | `npm run db:seed`     | `yarn db:seed`     |

## 🔄 Quy trình sử dụng

### Setup lần đầu:

```bash
1. yarn db:generate    # Tạo client
2. yarn db:deploy      # Apply migrations
3. yarn db:seed        # Tạo dữ liệu test
```

### Thay đổi schema:

```bash
1. Sửa schema.prisma
2. yarn db:migrate --name "ten_migration"
```

### Dữ liệu test:

```bash
yarn db:seed        # Seed chính thức (admin, master data)
yarn db:seed:all    # Seed tất cả test data
yarn db:seed:users  # Chỉ seed Users
```

## 🚨 Lưu ý

- `yarn db:reset` **XÓA TOÀN BỘ** data (chỉ dùng dev)
- `yarn db:seed` tạo dữ liệu chính thức (admin, master data)
- `yarn db:seed:all` tạo toàn bộ test data cho development
- Studio mở tại http://localhost:5555
