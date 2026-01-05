# Mini Shop - Database Design

## 📋 Tổng quan hệ thống

**Mini Shop** là hệ thống quản lý cửa hàng mini với các chức năng chính:

- 🛍️ **Quản lý sản phẩm** - Danh mục, sản phẩm, hình ảnh
- 🏷️ **Hệ thống tags** - Phân loại và tìm kiếm
- 💬 **Bình luận đánh giá** - Hỗ trợ subcomment
- 👥 **Quản lý người dùng** - Khách hàng và nhân viên
- 🏢 **Quản lý nhà cung cấp** - Thông tin và đánh giá
- 📦 **Quản lý nhập hàng** - Đơn hàng và chi tiết
- 📊 **Quản lý kho hàng** - Tồn kho và giao dịch
- 💰 **Quản lý bán hàng** - Đơn hàng và doanh thu

## 🎯 Phân tích yêu cầu

### 1. Trang chủ

- Hiển thị danh sách thể loại hàng hóa
- Sản phẩm với thông tin cơ bản

### 2. Danh sách sản phẩm

- Tags để phân loại và tìm kiếm

### 3. Chi tiết sản phẩm

- Comment và subcomment 2 cấp

### 4. Quản lý nhà cung cấp

- Thông tin liên hệ và đánh giá
- Lịch sử giao dịch

### 5. Quản lý nhập hàng

- Đơn hàng nhập từ nhà cung cấp
- Chi tiết sản phẩm và giá nhập

### 6. Quản lý kho hàng

- Tồn kho hiện tại
- Lịch sử nhập/xuất

### 7. Quản lý bán hàng

- Đơn hàng bán cho khách hàng
- Chi tiết sản phẩm và giá bán

## 🗄️ Cấu trúc Database

### 📂 Nhóm 1: Quản lý sản phẩm

#### 1. Categories (Thể loại)

```
┌─────────────────┐
│   CATEGORIES    │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ image_url       │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 2. Products (Sản phẩm)

```
┌─────────────────┐
│    PRODUCTS     │
├─────────────────┤
│ id (PK)         │
│ category_id(FK) │
│ name            │
│ code            │
│ description     │
│ original_price  │
│ sale_price      │
│ purchase_count  │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 3. Product_Images (Hình ảnh)

```
┌─────────────────┐
│ PRODUCT_IMAGES  │
├─────────────────┤
│ id (PK)         │
│ product_id(FK)  │
│ image_url       │
│ is_primary      │
│ sort_order      │
│ created_at      │
└─────────────────┘
```

#### 4. Tags (Thẻ)

```
┌─────────────────┐
│      TAGS       │
├─────────────────┤
│ id (PK)         │
│ name (UNIQUE)   │
│ type            │
│ usage_count     │
│ is_active       │
│ created_at      │
└─────────────────┘
```

#### 5. Product_Tags (Liên kết)

```
┌─────────────────┐
│  PRODUCT_TAGS   │
├─────────────────┤
│ id (PK)         │
│ product_id(FK)  │
│ tag_id (FK)     │
│ created_at      │
└─────────────────┘
```

### 🏢 Nhóm 2: Quản lý nhà cung cấp

#### 6. Suppliers (Nhà cung cấp)

```
┌─────────────────┐
│   SUPPLIERS     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ code            │
│ address         │
│ phone           │
│ email           │
│ tax_code        │
│ contact_person  │
│ rating          │
│ payment_terms   │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 7. Product_Suppliers (Liên kết)

```
┌─────────────────┐
│PRODUCT_SUPPLIERS│
├─────────────────┤
│ id (PK)         │
│ product_id(FK)  │
│ supplier_id(FK) │
│ purchase_price  │
│ lead_time       │
│ is_preferred    │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

### 👥 Nhóm 3: Quản lý người dùng

#### 8. Users (Người dùng)

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ username        │
│ password        │
│ full_name       │
│ address         │
│ phone           │
│ role            │
│ avatar_url      │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 9. Staff (Nhân viên)

```
┌─────────────────┐
│     STAFF       │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ employee_code   │
│ department      │
│ position        │
│ hire_date       │
│ salary          │
│ manager_id (FK) │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

### 📦 Nhóm 4: Quản lý nhập hàng

#### 10. Purchase_Orders (Đơn nhập)

```
┌─────────────────┐
│PURCHASE_ORDERS  │
├─────────────────┤
│ id (PK)         │
│ order_code      │
│ supplier_id(FK) │
│ staff_id (FK)   │
│ order_date      │
│ expected_delivery│
│ total_amount    │
│ status          │
│ notes           │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 11. Purchase_Order_Items (Chi tiết nhập)

```
┌─────────────────┐
│PURCHASE_ITEMS   │
├─────────────────┤
│ id (PK)         │
│ purchase_order_id│
│ product_id (FK) │
│ quantity        │
│ unit_price      │
│ total_price     │
│ received_qty    │
│ created_at      │
└─────────────────┘
```

### 📊 Nhóm 5: Quản lý kho hàng

#### 12. Inventory (Tồn kho)

```
┌─────────────────┐
│   INVENTORY     │
├─────────────────┤
│ id (PK)         │
│ product_id (FK) │
│ current_qty     │
│ min_qty         │
│ max_qty         │
│ location        │
│ last_updated    │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 13. Inventory_Transactions (Giao dịch kho)

```
┌─────────────────┐
│INV_TRANSACTIONS │
├─────────────────┤
│ id (PK)         │
│ product_id (FK) │
│ transaction_type│
│ quantity        │
│ reference_type  │
│ reference_id    │
│ staff_id (FK)   │
│ notes           │
│ created_at      │
└─────────────────┘
```

### 💰 Nhóm 6: Quản lý bán hàng

#### 14. Sales_Orders (Đơn bán)

```
┌─────────────────┐
│  SALES_ORDERS   │
├─────────────────┤
│ id (PK)         │
│ order_code      │
│ customer_id(FK) │
│ staff_id (FK)   │
│ order_date      │
│ delivery_address│
│ total_amount    │
│ discount_amount │
│ final_amount    │
│ status          │
│ payment_status  │
│ notes           │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 15. Sales_Order_Items (Chi tiết bán)

```
┌─────────────────┐
│  SALES_ITEMS    │
├─────────────────┤
│ id (PK)         │
│ sales_order_id  │
│ product_id (FK) │
│ quantity        │
│ unit_price      │
│ discount_percent│
│ total_price     │
│ created_at      │
└─────────────────┘
```

### 💬 Nhóm 7: Hệ thống bình luận

#### 16. Comments (Bình luận)

```
┌─────────────────┐
│   COMMENTS      │
├─────────────────┤
│ id (PK)         │
│ product_id (FK) │
│ user_id (FK)    │
│ parent_id (FK)  │
│ content         │
│ rating          │
│ is_approved     │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### 17. Guest_Comments (Bình luận khách)

```
┌─────────────────┐
│GUEST_COMMENTS   │
├─────────────────┤
│ id (PK)         │
│ comment_id (FK) │
│ guest_name      │
│ guest_email     │
│ guest_phone     │
│ guest_address   │
└─────────────────┘
```

## 🔗 Mối quan hệ chính

Categories (1) ──→ (N) Products
Products (1) ──→ (N) Product_Images
Products (N) ←──→ (N) Tags (via Product_Tags)
Products (N) ←──→ (N) Suppliers (via Product_Suppliers)
Products (1) ──→ (1) Inventory
Products (1) ──→ (N) Inventory_Transactions
Products (1) ──→ (N) Comments
Users (1) ──→ (1) Staff
Users (1) ──→ (N) Comments
Users (1) ──→ (N) Sales_Orders
Staff (1) ──→ (N) Purchase_Orders
Staff (1) ──→ (N) Sales_Orders
Staff (1) ──→ (N) Inventory_Transactions
Suppliers (1) ──→ (N) Purchase_Orders
Purchase_Orders (1) ──→ (N) Purchase_Order_Items
Sales_Orders (1) ──→ (N) Sales_Order_Items
Comments (1) ──→ (N) Comments (self-ref)
Comments (1) ──→ (1) Guest_Comments
