import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from '@/entities/user.entity';
import { CreateUserDTO } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDTO } from '@/modules/user/dto/update-user.dto';

// GET /users
export const GET_ALL_USERS_OPERATION = ApiOperation({
  summary: 'Lấy danh sách tất cả người dùng',
  description: 'API này trả về danh sách tất cả người dùng trong hệ thống.',
});

export const GET_ALL_USERS_RESPONSE = ApiResponse({
  status: 200,
  description: 'Lấy danh sách người dùng thành công',
  type: [User],
  schema: {
    example: [
      {
        id: 1,
        email: 'nguyenvanA@example.com',
        username: 'nguyenvanA',
        password: 'hashed_password',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        phone: '0123456789',
        role: 'USER',
      },
      {
        id: 2,
        email: 'admin@example.com',
        username: 'admin',
        password: 'hashed_password',
        address: '456 Đường Nguyễn Huệ, Quận 3, TP.HCM',
        phone: '0987654321',
        role: 'ADMIN',
      },
    ],
  },
});

// GET /users/:id
export const GET_USER_BY_ID_OPERATION = ApiOperation({
  summary: 'Lấy thông tin người dùng theo ID',
  description: 'API này trả về thông tin chi tiết của một người dùng cụ thể.',
});

export const GET_USER_BY_ID_PARAM = ApiParam({
  name: 'id',
  description: 'ID duy nhất của người dùng',
  example: 1,
  type: 'number',
});

export const GET_USER_BY_ID_RESPONSE = ApiResponse({
  status: 200,
  description: 'Lấy thông tin người dùng thành công',
  type: User,
  schema: {
    example: {
      id: 1,
      email: 'nguyenvanA@example.com',
      username: 'nguyenvanA',
      password: 'hashed_password',
      address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      phone: '0123456789',
      role: 'USER',
    },
  },
});

export const GET_USER_BY_ID_404_RESPONSE = ApiResponse({
  status: 404,
  description: 'Không tìm thấy người dùng',
  schema: {
    example: {
      statusCode: 404,
      message: 'User with ID 999 not found',
      error: 'Not Found',
    },
  },
});

// POST /users
export const CREATE_USER_OPERATION = ApiOperation({
  summary: 'Tạo người dùng mới',
  description: 'API này tạo một người dùng mới trong hệ thống.',
});

export const CREATE_USER_BODY = ApiBody({
  type: CreateUserDTO,
  description: 'Thông tin người dùng cần tạo',
  examples: {
    user: {
      summary: 'Tạo người dùng thường',
      description: 'Tạo tài khoản người dùng với vai trò USER',
      value: {
        email: 'tranthiB@example.com',
        username: 'tranthiB',
        password: 'password123',
        address: '789 Đường Võ Văn Tần, Quận 3, TP.HCM',
        phone: '0123456789',
        role: 'USER',
      },
    },
    admin: {
      summary: 'Tạo người dùng admin',
      description: 'Tạo tài khoản quản trị viên với vai trò ADMIN',
      value: {
        email: 'admin@example.com',
        username: 'admin',
        password: 'admin123',
        address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        phone: '0987654321',
        role: 'ADMIN',
      },
    },
    userWithoutRole: {
      summary: 'Tạo người dùng không chỉ định vai trò',
      description: 'Vai trò mặc định sẽ là USER',
      value: {
        email: 'levanC@example.com',
        username: 'levanC',
        password: 'password123',
        address: '321 Đường Trần Hưng Đạo, Quận 5, TP.HCM',
        phone: '0123456789',
      },
    },
  },
});

export const CREATE_USER_RESPONSE = ApiResponse({
  status: 201,
  description: 'Tạo người dùng thành công',
  type: User,
  schema: {
    example: {
      id: 3,
      email: 'tranthiB@example.com',
      username: 'tranthiB',
      password: 'hashed_password',
      address: '789 Đường Võ Văn Tần, Quận 3, TP.HCM',
      phone: '0123456789',
      role: 'USER',
    },
  },
});

export const CREATE_USER_400_RESPONSE = ApiResponse({
  status: 400,
  description: 'Dữ liệu không hợp lệ',
  schema: {
    example: {
      statusCode: 400,
      message: [
        'email must be an email',
        'username should not be empty',
        'password should not be empty',
        'address should not be empty',
        'phone should not be empty',
      ],
      error: 'Bad Request',
    },
  },
});

// PUT /users/:id
export const UPDATE_USER_OPERATION = ApiOperation({
  summary: 'Cập nhật thông tin người dùng',
  description: 'API này cập nhật thông tin của một người dùng hiện có.',
});

export const UPDATE_USER_PARAM = ApiParam({
  name: 'id',
  description: 'ID của người dùng cần cập nhật',
  example: 1,
  type: 'number',
});

export const UPDATE_USER_BODY = ApiBody({
  type: UpdateUserDTO,
  description: 'Thông tin cần cập nhật (các trường không bắt buộc)',
  examples: {
    updateEmail: {
      summary: 'Cập nhật email',
      description: 'Chỉ cập nhật địa chỉ email',
      value: {
        email: 'newemail@example.com',
      },
    },
    updateAddress: {
      summary: 'Cập nhật địa chỉ',
      description: 'Chỉ cập nhật địa chỉ mới',
      value: {
        address: '456 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
      },
    },
    updatePhone: {
      summary: 'Cập nhật số điện thoại',
      description: 'Chỉ cập nhật số điện thoại mới',
      value: {
        phone: '0987654321',
      },
    },
    updateRole: {
      summary: 'Cập nhật vai trò',
      description: 'Nâng cấp vai trò từ USER lên ADMIN',
      value: {
        role: 'ADMIN',
      },
    },
    updateMultiple: {
      summary: 'Cập nhật nhiều trường',
      description: 'Cập nhật đồng thời email, địa chỉ và vai trò',
      value: {
        email: 'newemail@example.com',
        address: '789 Đường Lý Tự Trọng, Quận 1, TP.HCM',
        phone: '0123456789',
        role: 'ADMIN',
      },
    },
    updatePassword: {
      summary: 'Cập nhật mật khẩu',
      description: 'Thay đổi mật khẩu người dùng',
      value: {
        password: 'newpassword123',
      },
    },
  },
});

export const UPDATE_USER_RESPONSE = ApiResponse({
  status: 200,
  description: 'Cập nhật người dùng thành công',
  type: User,
  schema: {
    example: {
      id: 1,
      email: 'newemail@example.com',
      username: 'nguyenvanA',
      password: 'hashed_password',
      address: '789 Đường Lý Tự Trọng, Quận 1, TP.HCM',
      phone: '0123456789',
      role: 'ADMIN',
    },
  },
});

export const UPDATE_USER_404_RESPONSE = ApiResponse({
  status: 404,
  description: 'Không tìm thấy người dùng',
  schema: {
    example: {
      statusCode: 404,
      message: 'User with ID 999 not found',
      error: 'Not Found',
    },
  },
});

// DELETE /users/:id
export const DELETE_USER_OPERATION = ApiOperation({
  summary: 'Xóa người dùng',
  description: 'API này xóa hoàn toàn một người dùng khỏi hệ thống.',
});

export const DELETE_USER_PARAM = ApiParam({
  name: 'id',
  description: 'ID của người dùng cần xóa',
  example: 1,
  type: 'number',
});

export const DELETE_USER_RESPONSE = ApiResponse({
  status: 204,
  description: 'Xóa người dùng thành công',
});

export const DELETE_USER_404_RESPONSE = ApiResponse({
  status: 404,
  description: 'Không tìm thấy người dùng',
  schema: {
    example: {
      statusCode: 404,
      message: 'User with ID 999 not found',
      error: 'Not Found',
    },
  },
});
