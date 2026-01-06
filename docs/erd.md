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
