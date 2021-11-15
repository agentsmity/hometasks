import { Controller, Get, Post, Body } from '@nestjs/common';

import { UsersPermissionsService } from 'src/common/services/users.permissions';
import CreateUserPermissionDto from 'src/common/dto/user.permission.dto';
import { TimeMeasurement } from 'src/utils/perf.decorator';

@Controller('users/permissions')
export class UsersPermissionsController {
  constructor(
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {}

  @Post()
  @TimeMeasurement
  create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    return this.usersPermissionsService.addUserPermission(
      createUserPermissionDto,
    );
  }

  @Get()
  @TimeMeasurement
  findAll() {
    return this.usersPermissionsService.findAll();
  }
}
