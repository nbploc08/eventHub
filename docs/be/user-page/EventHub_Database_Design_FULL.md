# 🎟️ EventHub – Database & Business Design

## 📋 Tổng quan hệ thống

**EventHub** là hệ thống **quản lý & bán vé sự kiện trực tuyến**, được thiết kế theo tiêu chuẩn **backend production**, hỗ trợ cả:

-   🎉 Sự kiện **có ghế** (theater, cinema, conference)
-   🎶 Sự kiện **không có ghế** (concert đứng, festival)

Hệ thống tập trung xử lý các nghiệp vụ phức tạp như **lock ghế, timeout, thanh toán, chống double booking**, phù hợp cho dự án **NestJS portfolio**.

### Chức năng chính

-   🎉 Quản lý sự kiện
-   🎟️ Hệ thống vé (có ghế / không ghế)
-   🪑 Quản lý ghế (seat map, lock, timeout)
-   🧾 Quản lý đơn hàng
-   💳 Thanh toán (mock / real gateway)
-   👥 Quản lý người dùng & phân quyền
-   📊 Thống kê & báo cáo

---

## 🎯 Phân tích yêu cầu nghiệp vụ

### 1. Trang chủ

-   Hiển thị danh sách sự kiện đã publish
-   Thông tin cơ bản:
    -   Tên sự kiện
    -   Thời gian
    -   Địa điểm
-   Phân loại:
    -   Có ghế
    -   Không có ghế

---

### 2. Danh sách sự kiện

-   Lọc theo:
    -   Thời gian
    -   Địa điểm
    -   Trạng thái
-   Phân biệt rõ:
    -   Event có ghế
    -   Event không ghế

---

### 3. Chi tiết sự kiện

-   Thông tin chi tiết sự kiện
-   Danh sách **Ticket Type**
-   Hiển thị **Seat Map** nếu event có ghế
-   Hiển thị số vé còn lại nếu event không ghế

---

### 4. Chọn vé & ghế

-   Click ghế **chỉ là UI**
-   Backend **KHÔNG lock ghế khi click**
-   Lock ghế **chỉ khi checkout**
-   Lock ghế có timeout
-   Chống double booking

---

### 5. Thanh toán

-   Tạo đơn hàng (Order)
-   Xử lý thanh toán:
    -   Thành công
    -   Thất bại
    -   Timeout
-   Sinh vé + QR code **chỉ khi payment success**

---

## 🧠 Khái niệm cốt lõi (để code đúng)

### Event

-   Thực thể gốc, có thể:
    -   `hasSeat = true` → bán theo ghế (Seat-based)
    -   `hasSeat = false` → bán theo số lượng (Quantity-based)

### TicketType (LOẠI VÉ – logic bán)

-   Đại diện pricing & rule (VIP/Standard/Balcony…)
-   **Không chứa ghế**
-   Mapping với Seat thông qua `zone`
-   `quantity` chỉ dùng cho event **không có ghế**

### Seat (GHẾ THỰC)

-   Ghế vật lý tồn tại **trước khi bán**
-   Thuộc về Event
-   Trạng thái: `AVAILABLE | RESERVED | SOLD`
-   Lock bằng `status = RESERVED` + `expire_at` (timeout)

### Ticket (VÉ THẬT)

-   Quyền vào sự kiện
-   Chỉ sinh sau payment success
-   `seat_id` nullable (event không ghế)

### Order & OrderItem

-   Order = một lần checkout (tổng tiền, trạng thái)
-   OrderItem = dòng “ý định mua” (ticket type + price snapshot)
-   Ticket sinh ra sau payment và được link vào OrderItem

---

## 🗄️ Cấu trúc Database

> Naming ở dưới theo kiểu SQL table. Khi dùng Prisma có thể map table name bằng `@@map()`.

---

## 👥 Nhóm 1: Quản lý người dùng

### USERS

```
id (PK, uuid)
email (UNIQUE)
password_hash
role (USER | ORGANIZER | ADMIN)
is_active
created_at
updated_at
```

**Ghi chú**

-   Một user có thể mua nhiều order
-   Organizer là user có role = ORGANIZER và có quyền tạo event

---

## 🎉 Nhóm 2: Quản lý sự kiện

### EVENTS

```
id (PK, uuid)
organizer_id (FK -> users.id)
title
description (nullable)
venue
start_time
end_time
has_seat (boolean)
status (DRAFT | PUBLISHED | CLOSED)
created_at
updated_at
```

**Ghi chú**

-   `has_seat` quyết định flow mua vé và cách tính tồn kho

---

## 🎟️ Nhóm 3: Quản lý vé

### TICKET_TYPES

```
id (PK, uuid)
event_id (FK -> events.id)
name
price
zone (nullable)       # dùng cho event có ghế (map với seats.zone)
quantity (nullable)   # dùng cho event không ghế
created_at
updated_at
```

**Ghi chú**

-   Không lưu `sold` trong TicketType (sold là derived data)
-   Với event có ghế: inventory = số seat AVAILABLE theo zone
-   Với event không ghế: remaining = quantity - count(valid tickets)

---

### TICKETS

```
id (PK, uuid)
order_id (FK -> orders.id)
ticket_type_id (FK -> ticket_types.id)
seat_id (FK -> seats.id, nullable)
qr_code (UNIQUE)
status (VALID | USED | CANCELLED)
created_at
updated_at
```

**Ghi chú**

-   Ticket chỉ sinh ra sau payment success
-   `seat_id` nullable để hỗ trợ event không ghế

---

## 🪑 Nhóm 4: Quản lý ghế

### SEATS

```
id (PK, uuid)
event_id (FK -> events.id)
zone
row_label
seat_number
status (AVAILABLE | RESERVED | SOLD)
expire_at (nullable)
created_at
updated_at
```

**Unique constraint đề xuất**

-   `unique(event_id, zone, row_label, seat_number)` để tránh trùng ghế

---

## 🧾 Nhóm 5: Quản lý đơn hàng

### ORDERS

```
id (PK, uuid)
user_id (FK -> users.id)
total_amount
status (PENDING | PAID | FAILED | CANCELLED)
created_at
updated_at
```

**Ghi chú**

-   Order không chứa ghế
-   Ticket thuộc về Order để query nhanh ownership & check-in

---

### ORDER_ITEMS

```
id (PK, uuid)
order_id (FK -> orders.id)
ticket_type_id (FK -> ticket_types.id)
ticket_id (FK -> tickets.id, nullable)
price
created_at
```

**Ghi chú**

-   OrderItem tồn tại trước Ticket
-   1 OrderItem ↔ 1 Ticket (sau khi mint)

---

## 💳 Nhóm 6: Thanh toán

### PAYMENTS

```
id (PK, uuid)
order_id (FK -> orders.id, UNIQUE)  # 1 order - 1 payment
provider
status (PENDING | SUCCESS | FAILED)
payload (JSON)
created_at
```

---

## 🔗 Mối quan hệ chính

-   Users (1) → (N) Orders
-   Users (1) → (N) Events (Organizer)
-   Events (1) → (N) Ticket_Types
-   Events (1) → (N) Seats
-   Orders (1) → (N) Order_Items
-   Orders (1) → (N) Tickets
-   Ticket_Types (1) → (N) Tickets
-   Ticket_Types (1) → (N) Order_Items
-   Seats (1) → (0..1) Tickets
-   Orders (1) → (1) Payments
-   Order_Items (1) → (0..1) Tickets (trước payment là null)

---

## 🔐 Quy tắc nghiệp vụ cốt lõi

### Quy tắc về ghế

-   Click ghế **KHÔNG lock**
-   Lock ghế **chỉ khi checkout**
-   Lock = transaction + `SELECT ... FOR UPDATE`
-   Lock có timeout (`expire_at`)

### Quy tắc về thanh toán

-   Payment success → cập nhật Order = PAID → mint Ticket → Seat = SOLD
-   Payment failed → Order = FAILED → trả ghế AVAILABLE
-   Timeout → cron job trả ghế AVAILABLE và cancel order (tuỳ chính sách)

### Quy tắc về Ticket

-   Ticket chỉ sinh sau payment success
-   QR code unique
-   Ticket có thể bị CANCELLED (refund), USED (check-in)

---

## 🔄 Business Flow chuẩn

### A) Flow mua vé CÓ ghế

1. User xem seat map
2. Click ghế (FE only)
3. Bấm checkout
4. Backend lock ghế: `RESERVED + expire_at`
5. User payment
6. Payment success:
    - Seat → SOLD
    - Mint Ticket (seat_id != null)
7. Payment fail/timeout:
    - Release Seat → AVAILABLE

### B) Flow mua vé KHÔNG ghế

1. User chọn TicketType
2. Checkout (validate remaining)
3. Payment
4. Payment success:
    - Mint Ticket (seat_id = null)

---

## 📊 Cách tính “còn vé” (inventory)

### Event KHÔNG ghế

-   `sold = count(Ticket where ticket_type_id = ? and status = VALID)`
-   `remaining = TicketType.quantity - sold`

### Event CÓ ghế

-   `remaining = count(Seat where event_id = ? and zone = ? and status = AVAILABLE)`

---

## 🚀 Roadmap mở rộng

### Phase 2 (nâng cao)

-   Redis lock + TTL (giảm contention DB)
-   Payment gateway thật
-   QR check-in module

### Phase 3 (scale)

-   WebSocket cập nhật ghế realtime
-   Background jobs queue
-   Monitoring, audit log

---

## ✅ Kết luận

Thiết kế database & business logic của **EventHub** đảm bảo:

-   ✅ Chống double booking
-   ✅ Tách bạch đúng:
    -   TicketType (logic bán)
    -   Seat (thực thể vật lý)
    -   Ticket (vé thật)
-   ✅ Thể hiện tư duy production backend
-   ✅ Dễ mở rộng Phase 2–3
