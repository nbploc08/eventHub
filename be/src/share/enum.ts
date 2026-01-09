// User role
export enum UserRole {}

// Transaction type
export enum TransactionType {}

// Order status
export enum OrderStatus {}
// Payment status
export enum PaymentStatus {}

export enum Permission {
  // User
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_CREATE = 'user:create',
  // User role
  // Event
  EVENT_CREATE = 'event:create',
  EVENT_READ = 'event:read',
  EVENT_UPDATE = 'event:update',
  EVENT_PUBLISH = 'event:publish',
  EVENT_DELETE = 'event:delete',

  // Ticket
  TICKET_CREATE = 'ticket:create',
  TICKET_UPDATE = 'ticket:update',

  // Order
  ORDER_READ = 'order:read',
  ORDER_REFUND = 'order:refund',

  // Check-in
  CHECKIN_SCAN = 'checkin:scan',

  // Admin
  USER_BAN = 'user:ban',
}

//  map role to permissions
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: Object.values(Permission),
  ORGANIZER: [
    Permission.EVENT_CREATE,
    Permission.EVENT_READ,
    Permission.EVENT_UPDATE,
    Permission.EVENT_PUBLISH,
    Permission.TICKET_CREATE,
    Permission.TICKET_UPDATE,
    Permission.ORDER_READ,
    Permission.CHECKIN_SCAN,
    Permission.USER_READ,
    Permission.USER_UPDATE,
  ],
  USER: [Permission.USER_READ, Permission.USER_UPDATE],
};
