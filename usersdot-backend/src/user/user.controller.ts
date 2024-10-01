import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save')
  async createUser(@Body() userData: any) {
    return this.userService.insertUser(userData);
  }

  @Get()
  async getAllUsers(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('search') search: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const pageSizeNumber = parseInt(pageSize) || 10;
    return this.userService.getAllUsers(pageNumber, pageSizeNumber, search);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('update')
  async updateUser(@Body() userData: any) {
    return this.userService.updateUserById(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
