# 🏪 MiniShop

Đồ án website quản lý cửa hàng tạp hóa mini

## 📋 Mô tả dự án

MiniShop là một ứng dụng web fullstack được xây dựng để quản lý cửa hàng tạp hóa mini:

- **Frontend**: Next.js với TypeScript, Tailwind CSS + SCSS
- **Backend**: NestJS với TypeScript, Swagger UI
- **Features**: Server-Side Rendering, SEO-optimized

## 📁 Cấu trúc dự án

```
minishop/
├── fe/                    # Frontend - Next.js TypeScript
│   ├── src/app/          # App Router pages
│   ├── src/styles/       # SCSS variables & mixins
│   ├── src/utils/        # Constants & utilities
│   └── next.config.ts    # Next.js configuration
└── be/                    # Backend - NestJS
    ├── src/modules/      # User, Admin, Common modules
    └── src/main.ts       # Entry point với Swagger
```

## 🛠️ Yêu cầu hệ thống

- **Node.js**: >= 16.x
- **npm**: >= 8.x hoặc **yarn**: >= 1.22.x

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd minishop
```

### 2. Cài đặt và chạy Backend

| **npm**              | **yarn**          |
| -------------------- | ----------------- |
| `cd be`              | `cd be`           |
| `npm install`        | `yarn install`    |
| `npm run start:dev`  | `yarn start:dev`  |
| `npm run build`      | `yarn build`      |
| `npm run start:prod` | `yarn start:prod` |

**Backend chạy trên:** `http://localhost:4301`  
**Swagger API:** `http://localhost:4301/api`

### 3. Cài đặt và chạy Frontend

| **npm**         | **yarn**       |
| --------------- | -------------- |
| `cd fe`         | `cd fe`        |
| `npm install`   | `yarn install` |
| `npm run dev`   | `yarn dev`     |
| `npm run build` | `yarn build`   |
| `npm start`     | `yarn start`   |

**Frontend chạy trên:** `http://localhost:4300`

## 🔧 Scripts chính

### Frontend

| **npm**         | **yarn**     | **Mô tả**                        |
| --------------- | ------------ | -------------------------------- |
| `npm run dev`   | `yarn dev`   | Development server với Turbopack |
| `npm run build` | `yarn build` | Build cho production             |
| `npm start`     | `yarn start` | Chạy production server           |
| `npm run lint`  | `yarn lint`  | Lint code với ESLint             |

### Backend

| **npm**             | **yarn**         | **Mô tả**                  |
| ------------------- | ---------------- | -------------------------- |
| `npm run start:dev` | `yarn start:dev` | Development với hot reload |
| `npm run start`     | `yarn start`     | Production mode            |
| `npm run build`     | `yarn build`     | Build TypeScript           |
| `npm run lint`      | `yarn lint`      | Lint code                  |

## 📱 Truy cập ứng dụng

- **Frontend**: http://localhost:4300 (Giao diện người dùng)
- **Backend API**: http://localhost:4301 (API endpoints)
- **Swagger Documentation**: http://localhost:4301/api

## 🛣️ Routes

- `/` → Trang chủ user
- `/admin` → Admin dashboard
- API endpoints: `/user/home`, `/admin/dashboard`, `/common/share`

## 📝 Ghi chú

- **Ports**: Frontend (4300), Backend (4301)
- **Package Manager**: Có thể dùng npm hoặc yarn (không trộn lẫn)
- **Development**: Yarn thường nhanh hơn và cache tốt hơn
# eventHub
