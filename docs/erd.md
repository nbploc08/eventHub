erDiagram
USER ||--o{ ORDER : places
EVENT ||--o{ TICKET_TYPE : defines
EVENT ||--o{ SEAT : has
ORDER ||--o{ ORDER_ITEM : contains
ORDER ||--o{ TICKET : issues
TICKET_TYPE ||--o{ TICKET : mints
SEAT ||--o| TICKET : assigned

    USER {
        id string
        email string
        password_hash string
        role string
        created_at string
        updated_at string
    }

    EVENT {
        id string
        organizer_id string
        title string
        venue string
        start_time string
        end_time string
        has_seat boolean
        status string
        created_at string
        updated_at string
    }

    TICKET_TYPE {
        id string
        event_id string
        name string
        price number
        zone string
        quantity number
        created_at string
        updated_at string
    }

    SEAT {
        id string
        event_id string
        zone string
        row_label string
        seat_number string
        status string
        expire_at string
        created_at string
        updated_at string
    }

    ORDER {
        id string
        user_id string
        total_amount number
        status string
        created_at string
        updated_at string
    }

    ORDER_ITEM {
        id string
        order_id string
        ticket_type_id string
        ticket_id string
        price number
        created_at string
    }

    TICKET {
        id string
        order_id string
        ticket_type_id string
        seat_id string
        qr_code string
        status string
        created_at string
        updated_at string
    }
