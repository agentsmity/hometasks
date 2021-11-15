import { Controller, Get, Post, Body } from '@nestjs/common';

import { UsersPermissionsService } from 'src/services/users.permissions';
import CreateUserPermissionDto from 'src/dto/user.permission.dto';

@Controller('users/permissions')
export class UsersPermissionsController {
  constructor(
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {}

  @Post()
  async create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    return await this.usersPermissionsService.addUserPermission(
      createUserPermissionDto,
    );
  }

  @Get()
  async findAll() {
    return await this.usersPermissionsService.findAll();
  }
}
