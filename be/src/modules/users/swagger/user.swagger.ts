import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/res.dto';

// Tag
export const USERS_TAG = ApiTags('users');

// GET /users
export const GET_ALL_USERS_OPERATION = ApiOperation({
  summary: 'Lấy danh sách người dùng',
});

export const GET_ALL_USERS_RESPONSE = ApiOkResponse({
  description: 'Danh sách người dùng',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: [
        {
          id: 'a1b2',
          email: 'user1@example.com',
          role: 'USER',
          isActive: true,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

// GET /users/:id
export const GET_USER_BY_ID_OPERATION = ApiOperation({
  summary: 'Lấy thông tin người dùng theo ID',
});

export const GET_USER_BY_ID_PARAM = ApiParam({
  name: 'id',
  description: 'ID người dùng',
  example: 'a1b2',
});

export const GET_USER_BY_ID_RESPONSE = ApiOkResponse({
  description: 'Thông tin người dùng',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'a1b2',
        email: 'user1@example.com',
        role: 'USER',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      },
      timestamp: '2024-01-02T00:00:00.000Z',
    },
  },
});

// POST /users
export const CREATE_USER_OPERATION = ApiOperation({
  summary: 'Tạo người dùng mới',
});

export const CREATE_USER_BODY = ApiBody({
  type: CreateUserDto,
  description: 'Dữ liệu tạo user',
  examples: {
    default: {
      summary: 'User thường',
      value: {
        email: 'new@example.com',
        password: 'password123',
        role: 'USER',
        isActive: true,
      },
    },
  },
});

export const CREATE_USER_RESPONSE = ApiCreatedResponse({
  description: 'Tạo người dùng thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'a1b2',
        email: 'new@example.com',
        role: 'USER',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  },
});

export const CREATE_USER_400_RESPONSE = ApiBadRequestResponse({
  description: 'Email đã tồn tại hoặc dữ liệu không hợp lệ',
  schema: {
    example: {
      statusCode: 400,
      message: 'ALREADY_EXISTS',
      error: 'Bad Request',
    },
  },
});

// PATCH /users/:id
export const UPDATE_USER_OPERATION = ApiOperation({
  summary: 'Cập nhật người dùng',
});

export const UPDATE_USER_PARAM = ApiParam({
  name: 'id',
  description: 'ID người dùng',
  example: 'a1b2',
});

export const UPDATE_USER_BODY = ApiBody({
  type: UpdateUserDto,
  description: 'Các trường có thể cập nhật',
  examples: {
    updateEmailRole: {
      summary: 'Cập nhật email và role',
      value: { email: 'updated@example.com', role: 'ADMIN' },
    },
    deactivate: {
      summary: 'Khoá tài khoản',
      value: { isActive: false },
    },
  },
});

export const UPDATE_USER_RESPONSE = ApiOkResponse({
  description: 'Cập nhật thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'a1b2',
        email: 'updated@example.com',
        role: 'ADMIN',
        isActive: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z',
      },
      timestamp: '2024-02-01T00:00:00.000Z',
    },
  },
});

export const UPDATE_USER_400_RESPONSE = ApiBadRequestResponse({
  description: 'Không tìm thấy user hoặc dữ liệu sai',
  schema: {
    example: {
      statusCode: 400,
      message: 'NOT_FOUND',
      error: 'Bad Request',
    },
  },
});

// DELETE /users/:id
export const DELETE_USER_OPERATION = ApiOperation({
  summary: 'Xóa người dùng',
});

export const DELETE_USER_PARAM = ApiParam({
  name: 'id',
  description: 'ID người dùng',
  example: 'a1b2',
});

export const DELETE_USER_RESPONSE = ApiOkResponse({
  description: 'Xóa người dùng thành công',
  schema: {
    example: {
      success: true,
      messageKey: 'COMMON.SUCCESS',
      message: 'Thao tác hoàn thành thành công',
      data: {
        id: 'a1b2',
        email: 'user@example.com',
        role: 'USER',
        isActive: false,
      },
      timestamp: '2024-02-01T00:00:00.000Z',
    },
  },
});

export const DELETE_USER_400_RESPONSE = ApiBadRequestResponse({
  description: 'Không tìm thấy user',
  schema: {
    example: {
      statusCode: 400,
      message: 'NOT_FOUND',
      error: 'Bad Request',
    },
  },
});
