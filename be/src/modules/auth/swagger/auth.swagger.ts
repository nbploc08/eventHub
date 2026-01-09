import {
  ApiBody,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { loginResponseDto } from '../dto/res.dto';

// Tag
export const AUTH_TAG = ApiTags('auth');

// POST /auth/login
export const LOGIN_OPERATION = ApiOperation({
  summary: 'Đăng nhập',
  description:
    'Đăng nhập với email và password, trả về access token và set cookie refreshToken.',
});

export const LOGIN_BODY = ApiBody({
  description: 'Thông tin đăng nhập',
  schema: {
    example: {
      email: 'user@example.com',
      password: 'password123',
    },
  },
});

export const LOGIN_RESPONSE = ApiOkResponse({
  description: 'Đăng nhập thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'user-id',
        email: 'user@example.com',
        role: 'USER',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const LOGIN_400_RESPONSE = ApiBadRequestResponse({
  description: 'Sai thông tin đăng nhập hoặc user không tồn tại',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});

// POST /auth/refresh
export const REFRESH_OPERATION = ApiOperation({
  summary: 'Lấy access token mới bằng refresh token',
  description:
    'Dùng cookie refreshToken để lấy access token mới, đồng thời rotate refresh token.',
});

export const REFRESH_RESPONSE = ApiOkResponse({
  description: 'Refresh token thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'user-id',
        email: 'user@example.com',
        role: 'USER',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const REFRESH_400_RESPONSE = ApiBadRequestResponse({
  description: 'Refresh token không hợp lệ/thiếu',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});

// POST /auth/logout
export const LOGOUT_OPERATION = ApiOperation({
  summary: 'Đăng xuất',
  description: 'Thu hồi refresh token theo device và xóa cookie refreshToken.',
});

export const LOGOUT_RESPONSE = ApiOkResponse({
  description: 'Đăng xuất thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        message: 'Logged out successfully',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const LOGOUT_400_RESPONSE = ApiBadRequestResponse({
  description: 'Refresh token không hợp lệ/thiếu',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});

// POST /auth/register
export const REGISTER_OPERATION = ApiOperation({
  summary: 'Đăng ký tài khoản',
  description: 'Tạo user mới và gửi mã xác thực email (OTP).',
});

export const REGISTER_BODY = ApiBody({
  description: 'Thông tin đăng ký',
  schema: {
    example: {
      email: 'new@example.com',
      password: 'password123',
    },
  },
});

export const REGISTER_RESPONSE = ApiOkResponse({
  description: 'Gửi mã xác thực thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        message: 'Verification code sent to email',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const REGISTER_400_RESPONSE = ApiBadRequestResponse({
  description: 'Dữ liệu không hợp lệ hoặc email đã tồn tại',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});

// POST /auth/verify
export const VERIFY_OPERATION = ApiOperation({
  summary: 'Xác thực tài khoản',
  description: 'Kiểm tra mã OTP gửi email và kích hoạt tài khoản.',
});

export const VERIFY_BODY = ApiBody({
  description: 'Email và mã OTP',
  schema: {
    example: {
      email: 'new@example.com',
      code: '123456',
    },
  },
});

export const VERIFY_RESPONSE = ApiOkResponse({
  description: 'Xác thực thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        message: 'Account verified successfully',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const VERIFY_400_RESPONSE = ApiBadRequestResponse({
  description: 'Mã không hợp lệ/hết hạn hoặc email không tồn tại',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});

// POST /auth/resend-code
export const RESEND_OPERATION = ApiOperation({
  summary: 'Gửi lại mã xác thực',
  description: 'Gửi lại OTP cho email chưa kích hoạt.',
});

export const RESEND_BODY = ApiBody({
  description: 'Email cần nhận lại mã',
  schema: {
    example: {
      email: 'new@example.com',
    },
  },
});

export const RESEND_RESPONSE = ApiOkResponse({
  description: 'Gửi lại mã thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        message: 'Verification code resent',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const RESEND_400_RESPONSE = ApiBadRequestResponse({
  description: 'Email không hợp lệ hoặc tài khoản đã kích hoạt',
  schema: {
    example: {
      statusCode: 400,
      message: 'INVALID_DATA',
      error: 'Bad Request',
    },
  },
});
