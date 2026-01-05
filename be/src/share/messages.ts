// Message keys for consistent error and success messages
export const MESSAGE_KEYS = {
  // User related messages
  USER: {
    // Success messages
    CREATED: 'USER.CREATED',
    UPDATED: 'USER.UPDATED',
    DELETED: 'USER.DELETED',
    FOUND: 'USER.FOUND',
    LIST_FOUND: 'USER.LIST_FOUND',

    // Error messages
    NOT_FOUND: 'USER.NOT_FOUND',
    ALREADY_EXISTS: 'USER.ALREADY_EXISTS',
    INVALID_DATA: 'USER.INVALID_DATA',
    DELETE_FAILED: 'USER.DELETE_FAILED',
    UPDATE_FAILED: 'USER.UPDATE_FAILED',
  },

  // Common messages
  COMMON: {
    // Success messages
    SUCCESS: 'COMMON.SUCCESS',
    OPERATION_COMPLETED: 'COMMON.OPERATION_COMPLETED',

    // Error messages
    INTERNAL_ERROR: 'COMMON.INTERNAL_ERROR',
    VALIDATION_ERROR: 'COMMON.VALIDATION_ERROR',
    UNAUTHORIZED: 'COMMON.UNAUTHORIZED',
    FORBIDDEN: 'COMMON.FORBIDDEN',
    BAD_REQUEST: 'COMMON.BAD_REQUEST',
  },

  // Validation messages
  VALIDATION: {
    REQUIRED: 'VALIDATION.REQUIRED',
    INVALID_EMAIL: 'VALIDATION.INVALID_EMAIL',
    INVALID_PHONE: 'VALIDATION.INVALID_PHONE',
    INVALID_ROLE: 'VALIDATION.INVALID_ROLE',
    MIN_LENGTH: 'VALIDATION.MIN_LENGTH',
    MAX_LENGTH: 'VALIDATION.MAX_LENGTH',
  },
} as const;

// Message templates with placeholders
export const MESSAGE_TEMPLATES = {
  [MESSAGE_KEYS.USER.CREATED]: 'User created successfully',
  [MESSAGE_KEYS.USER.UPDATED]: 'User updated successfully',
  [MESSAGE_KEYS.USER.DELETED]: 'User deleted successfully',
  [MESSAGE_KEYS.USER.FOUND]: 'User found successfully',
  [MESSAGE_KEYS.USER.LIST_FOUND]: 'Users list retrieved successfully',
  [MESSAGE_KEYS.USER.NOT_FOUND]: 'User with ID {id} not found',
  [MESSAGE_KEYS.USER.ALREADY_EXISTS]: 'User with email {email} already exists',
  [MESSAGE_KEYS.USER.INVALID_DATA]: 'Invalid user data provided',
  [MESSAGE_KEYS.USER.DELETE_FAILED]: 'Failed to delete user',
  [MESSAGE_KEYS.USER.UPDATE_FAILED]: 'Failed to update user',

  [MESSAGE_KEYS.COMMON.SUCCESS]: 'Operation completed successfully',
  [MESSAGE_KEYS.COMMON.OPERATION_COMPLETED]: 'Operation completed',
  [MESSAGE_KEYS.COMMON.INTERNAL_ERROR]: 'Internal server error',
  [MESSAGE_KEYS.COMMON.VALIDATION_ERROR]: 'Validation error',
  [MESSAGE_KEYS.COMMON.UNAUTHORIZED]: 'Unauthorized access',
  [MESSAGE_KEYS.COMMON.FORBIDDEN]: 'Access forbidden',
  [MESSAGE_KEYS.COMMON.BAD_REQUEST]: 'Bad request',

  [MESSAGE_KEYS.VALIDATION.REQUIRED]: '{field} is required',
  [MESSAGE_KEYS.VALIDATION.INVALID_EMAIL]: 'Invalid email format',
  [MESSAGE_KEYS.VALIDATION.INVALID_PHONE]: 'Invalid phone number format',
  [MESSAGE_KEYS.VALIDATION.INVALID_ROLE]: 'Invalid role value',
  [MESSAGE_KEYS.VALIDATION.MIN_LENGTH]:
    '{field} must be at least {min} characters',
  [MESSAGE_KEYS.VALIDATION.MAX_LENGTH]:
    '{field} must not exceed {max} characters',
};

// Helper function to format messages with placeholders
export function formatMessage(
  key: string,
  params?: Record<string, any>,
): string {
  let message = MESSAGE_TEMPLATES[key as keyof typeof MESSAGE_TEMPLATES] || key;

  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      message = message.replace(`{${param}}`, String(value));
    });
  }

  return message;
}
