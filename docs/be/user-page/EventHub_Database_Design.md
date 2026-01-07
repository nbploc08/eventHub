# EventHub – Database Design

## 📋 Tổng quan hệ thống

**EventHub** là hệ thống **quản lý & bán vé sự kiện trực tuyến**, hỗ trợ cả sự kiện **có ghế** và **không có ghế**, với các chức năng chính:

- 🎉 Quản lý sự kiện
- 🎟️ Hệ thống vé (có ghế / không ghế)
- 🪑 Quản lý ghế (seat map, lock ghế, timeout)
- 🧾 Quản lý đơn hàng
- 💳 Thanh toán
- 👥 Quản lý người dùng
- 📊 Thống kê & báo cáo

---

## 🎯 Phân tích yêu cầu

### 1. Trang chủ
- Hiển thị danh sách sự kiện
- Thông tin cơ bản: tên, thời gian, địa điểm

### 2. Danh sách sự kiện
- Lọc theo thời gian, địa điểm
- Phân loại sự kiện có ghế / không ghế

### 3. Chi tiết sự kiện
- Thông tin sự kiện
- Danh sách loại vé
- Sơ đồ ghế (nếu có)

### 4. Chọn vé & ghế
- Click ghế (UI only)
- Lock ghế khi checkout
- Timeout nếu không thanh toán

### 5. Thanh toán
- Tạo đơn hàng
- Thanh toán thành công / thất bại
- Sinh vé + QR code

---

## 🗄️ Cấu trúc Database

## 👥 Nhóm 1: Quản lý người dùng

### USERS
```
id (PK)
email (UNIQUE)
password_hash
role (USER | ORGANIZER | ADMIN)
is_active
created_at
updated_at
```

---

## 🎉 Nhóm 2: Quản lý sự kiện

### EVENTS
```
id (PK)
organizer_id (FK)
title
description
venue
start_time
end_time
has_seat
status (DRAFT | PUBLISHED | CLOSED)
created_at
updated_at
```

---

## 🎟️ Nhóm 3: Quản lý vé

### TICKET_TYPES
```
id (PK)
event_id (FK)
name
price
zone
quantity
created_at
updated_at
```

### TICKETS
```
id (PK)
order_id (FK)
ticket_type_id (FK)
seat_id (FK, nullable)
qr_code
status (VALID | USED | CANCELLED)
created_at
updated_at
```

---

## 🪑 Nhóm 4: Quản lý ghế

### SEATS
```
id (PK)
event_id (FK)
zone
row_label
seat_number
status (AVAILABLE | RESERVED | SOLD)
expire_at
created_at
updated_at
```

---

## 🧾 Nhóm 5: Quản lý đơn hàng

### ORDERS
```
id (PK)
user_id (FK)
total_amount
status (PENDING | PAID | FAILED | CANCELLED)
created_at
updated_at
```

### ORDER_ITEMS
```
id (PK)
order_id (FK)
ticket_type_id (FK)
ticket_id (FK, nullable)
price
created_at
```

---

## 💳 Nhóm 6: Thanh toán

### PAYMENTS
```
id (PK)
order_id (FK)
provider
status
payload
created_at
```

---

## 🔗 Mối quan hệ chính

- Users (1) → (N) Orders
- Events (1) → (N) Ticket_Types
- Events (1) → (N) Seats
- Orders (1) → (N) Order_Items
- Orders (1) → (N) Tickets
- Ticket_Types (1) → (N) Tickets
- Seats (1) → (0..1) Tickets
- Orders (1) → (1) Payments

---

## 🔐 Quy tắc nghiệp vụ

- Click ghế **KHÔNG lock**
- Lock ghế khi **checkout**
- Lock có timeout (`expire_at`)
- Thanh toán fail → trả ghế
- Vé chỉ sinh sau khi thanh toán thành công

---

## ✅ Kết luận

Database được thiết kế phù hợp cho dự án **EventHub**, đảm bảo:
- Tránh double booking
- Hỗ trợ vé có ghế / không ghế
- Dễ mở rộng cho các phase tiếp theo
