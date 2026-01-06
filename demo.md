📌 1. Tổng quan dự án EventHub (Updated)

EventHub là nền tảng quản lý & bán vé sự kiện trực tuyến, hỗ trợ:

Vé có ghế và không có ghế

Nhiều vai trò: User – Organizer – Admin

Quy trình bán vé chuẩn production (lock ghế, timeout, thanh toán)

🎯 Mục tiêu:

Dự án portfolio backend NestJS chuẩn thực tế

Thể hiện tư duy system design + business logic

Dễ mở rộng Phase 2–3 (Redis, WebSocket, scale)

👥 2. Actors & quyền hạn
👤 User (người mua vé)

Đăng ký / đăng nhập

Xem sự kiện

Chọn vé (có hoặc không ghế)

Thanh toán

Xem vé đã mua (QR / seat info)

🎤 Organizer

Tạo & quản lý sự kiện

Cấu hình loại vé

Cấu hình sơ đồ ghế (nếu có)

Xem thống kê bán vé

🛡 Admin

Quản lý user / organizer

Duyệt sự kiện

Giám sát hệ thống

🎟️ 3. Tư duy vé & ghế (CORE UPDATE)
Phân loại sự kiện

Event không ghế: concert đứng, festival

Event có ghế: rạp, nhà hát, hội nghị

Nguyên tắc vàng

Click ghế ≠ Lock ghế

Lock chỉ xảy ra khi checkout

Lock là backend transaction

Lock có timeout

🧠 4. Business Flow chuẩn
🔁 Flow mua vé CÓ ghế
Xem sơ đồ ghế
→ Click chọn ghế (FE only)
→ Bấm Checkout
→ Backend LOCK ghế (RESERVED + 10 phút)
→ Thanh toán
→ Success → SOLD + sinh Ticket
→ Fail/Timeout → trả ghế AVAILABLE

🔁 Flow vé KHÔNG ghế
Chọn TicketType
→ Checkout
→ Thanh toán
→ Sinh Ticket (seat_id = NULL)

🧱 5. Kiến trúc hệ thống (Phase 1)
Frontend
|
Backend (NestJS)
├─ Auth
├─ User
├─ Event
├─ TicketType
├─ Seat
├─ Order
├─ Ticket
└─ Payment (mock)

Monorepo / Modular

REST API

Swagger docs

DB transaction để lock

🗄️ 6. DATABASE – ERD CHÍNH THỨC (Updated)
👤 User
id
email
password
role (USER | ORGANIZER | ADMIN)

🎉 Event
id
title
venue
start_time
end_time
has_seat (boolean)
organizer_id
status (DRAFT | PUBLISHED | CLOSED)

🎟 TicketType (LOẠI VÉ – logic bán)
id
event_id
name (VIP, Standard)
price
zone (map với Seat.zone)
quantity (cho event không ghế)

👉 KHÔNG chứa ghế

🪑 Seat (GHẾ THỰC)
id
event_id
zone
row_label
seat_number
status (AVAILABLE | RESERVED | SOLD)
expire_at (nullable)

👉 Ghế tồn tại trước khi bán
👉 Lock bằng status + expire_at

🧾 Order
id
user_id
total_amount
status (PENDING | PAID | FAILED)
created_at

📦 OrderItem
id
order_id
ticket_type_id
ticket_id
price

🎫 Ticket (VÉ CỤ THỂ)
id
order_id
ticket_type_id
seat_id (nullable)
qr_code
status (VALID | USED | CANCELLED)

👉 Vé:

Có ghế → seat_id ≠ null

Không ghế → seat_id = null

💳 Payment (Phase 2 full)
id
order_id
provider
status
payload

🔐 7. Lock ghế – kỹ thuật áp dụng
Khi nào lock?

Khi user bấm Checkout

Không lock khi click ghế

Cách lock (Phase 1)

DB transaction

SELECT ... FOR UPDATE

Update status = RESERVED

Set expire_at = now + 10 phút

Timeout

Cron job / scheduled task:

UPDATE seat
SET status = 'AVAILABLE', expire_at = NULL
WHERE status = 'RESERVED'
AND expire_at < now();

🚀 8. Phase Roadmap
Phase 1 – Core (hiện tại)

Auth

Event / TicketType / Seat

Lock ghế bằng DB

Mock payment

REST API

Phase 2 – Nâng cao

Redis lock + TTL

Payment gateway thật

QR check-in

Pagination, search

Phase 3 – Scale & Real-time

WebSocket seat update

Background jobs

Monitoring, audit log

💼 9. Giá trị Portfolio (rất quan trọng)

“I built an event ticketing system supporting both seated and non-seated events.
Seat locking is handled at backend level with transactions and timeout to prevent double booking.”

✅ 10. Checklist “chuẩn dự án”

✔️ Click ≠ Lock
✔️ Seat tách khỏi TicketType
✔️ Ticket có seat_id nullable
✔️ Lock có timeout
✔️ DB không over-engineering
✔️ Dễ scale Phase 2–3

erDiagram
USER ||--o{ ORDER : places
EVENT ||--o{ TICKET_TYPE : defines
EVENT ||--o{ SEAT : has
ORDER ||--o{ ORDER_ITEM : contains
ORDER ||--o{ TICKET : issues
TICKET_TYPE ||--o{ TICKET : mints
SEAT ||--o{ TICKET : assigned_to

USER {
uuid id PK
string email "unique"
string password_hash
string role "USER|ORGANIZER|ADMIN"
datetime created_at
datetime updated_at
}

EVENT {
uuid id PK
uuid organizer_id FK
string title
string venue
datetime start_time
datetime end_time
boolean has_seat
string status "DRAFT|PUBLISHED|CLOSED"
datetime created_at
datetime updated_at
}

TICKET_TYPE {
uuid id PK
uuid event_id FK
string name "VIP|Standard|..."
decimal price
string zone "map to Seat.zone (optional)"
int quantity "for non-seated events"
datetime created_at
datetime updated_at
}

SEAT {
uuid id PK
uuid event_id FK
string zone
string row_label
string seat_number
string status "AVAILABLE|RESERVED|SOLD"
datetime expire_at "nullable"
datetime created_at
datetime updated_at
}

ORDER {
uuid id PK
uuid user_id FK
decimal total_amount
string status "PENDING|PAID|FAILED|CANCELLED"
datetime created_at
datetime updated_at
}

ORDER_ITEM {
uuid id PK
uuid order_id FK
uuid ticket_type_id FK
uuid ticket_id FK "nullable until minted"
decimal price
datetime created_at
}

TICKET {
uuid id PK
uuid order_id FK
uuid ticket_type_id FK
uuid seat_id FK "nullable (non-seated)"
string qr_code "unique"
string status "VALID|USED|CANCELLED"
datetime created_at
datetime updated_at
}
