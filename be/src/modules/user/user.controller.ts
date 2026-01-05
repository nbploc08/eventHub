import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDTO } from '@/modules/user/dto/update-user.dto';
import { UserService } from '@/modules/user/user.service';
import { MESSAGE_KEYS } from '@/share/messages';
import { successResponse, listResponse } from '@/share/response';
import {
  GET_ALL_USERS_OPERATION,
  GET_ALL_USERS_RESPONSE,
  GET_USER_BY_ID_OPERATION,
  GET_USER_BY_ID_PARAM,
  GET_USER_BY_ID_RESPONSE,
  GET_USER_BY_ID_404_RESPONSE,
  CREATE_USER_OPERATION,
  CREATE_USER_BODY,
  CREATE_USER_RESPONSE,
  CREATE_USER_400_RESPONSE,
  UPDATE_USER_OPERATION,
  UPDATE_USER_PARAM,
  UPDATE_USER_BODY,
  UPDATE_USER_RESPONSE,
  UPDATE_USER_404_RESPONSE,
  DELETE_USER_OPERATION,
  DELETE_USER_PARAM,
  DELETE_USER_RESPONSE,
  DELETE_USER_404_RESPONSE,
} from '@/modules/user/swagger/user.swagger';

@ApiTags('Quản lý người dùng')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @GET_ALL_USERS_OPERATION
  @GET_ALL_USERS_RESPONSE
  async findAll() {
    const users = await this.userService.findAll();
    return listResponse(
      users,
      users.length,
      1,
      users.length,
      MESSAGE_KEYS.USER.LIST_FOUND,
    );
  }

  @Get(':id')
  @GET_USER_BY_ID_OPERATION
  @GET_USER_BY_ID_PARAM
  @GET_USER_BY_ID_RESPONSE
  @GET_USER_BY_ID_404_RESPONSE
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(MESSAGE_KEYS.USER.NOT_FOUND);
    }
    return successResponse(user, MESSAGE_KEYS.USER.FOUND, { id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CREATE_USER_OPERATION
  @CREATE_USER_BODY
  @CREATE_USER_RESPONSE
  @CREATE_USER_400_RESPONSE
  async create(@Body() createUserDto: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDto);
    return successResponse(user, MESSAGE_KEYS.USER.CREATED);
  }

  @Put(':id')
  @UPDATE_USER_OPERATION
  @UPDATE_USER_PARAM
  @UPDATE_USER_BODY
  @UPDATE_USER_RESPONSE
  @UPDATE_USER_404_RESPONSE
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return successResponse(user, MESSAGE_KEYS.USER.UPDATED, { id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DELETE_USER_OPERATION
  @DELETE_USER_PARAM
  @DELETE_USER_RESPONSE
  @DELETE_USER_404_RESPONSE
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return successResponse(null, MESSAGE_KEYS.USER.DELETED, { id });
  }
}
