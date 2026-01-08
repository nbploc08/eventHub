import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  USERS_TAG,
  CREATE_USER_OPERATION,
  CREATE_USER_BODY,
  CREATE_USER_RESPONSE,
  CREATE_USER_400_RESPONSE,
  GET_ALL_USERS_OPERATION,
  GET_ALL_USERS_RESPONSE,
  GET_USER_BY_ID_OPERATION,
  GET_USER_BY_ID_PARAM,
  GET_USER_BY_ID_RESPONSE,
  UPDATE_USER_OPERATION,
  UPDATE_USER_PARAM,
  UPDATE_USER_BODY,
  UPDATE_USER_RESPONSE,
  UPDATE_USER_400_RESPONSE,
  DELETE_USER_OPERATION,
  DELETE_USER_PARAM,
  DELETE_USER_RESPONSE,
  DELETE_USER_400_RESPONSE,
} from './swagger/user.swagger';

@Controller('users')
@USERS_TAG
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @CREATE_USER_OPERATION
  @CREATE_USER_BODY
  @CREATE_USER_RESPONSE
  @CREATE_USER_400_RESPONSE
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @GET_ALL_USERS_OPERATION
  @GET_ALL_USERS_RESPONSE
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @GET_USER_BY_ID_OPERATION
  @GET_USER_BY_ID_PARAM
  @GET_USER_BY_ID_RESPONSE
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UPDATE_USER_OPERATION
  @UPDATE_USER_PARAM
  @UPDATE_USER_BODY
  @UPDATE_USER_RESPONSE
  @UPDATE_USER_400_RESPONSE
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @DELETE_USER_OPERATION
  @DELETE_USER_PARAM
  @DELETE_USER_RESPONSE
  @DELETE_USER_400_RESPONSE
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
