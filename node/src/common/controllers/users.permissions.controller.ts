import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersPermissionsService } from 'src/common/services/users.permissions';
import CreateUserPermissionDto from 'src/common/dto/user.permission.dto';
import { TimeMeasurement } from 'src/utils/perf.decorator';
import { UsersPermissions } from 'src/common/models/users.permissions';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users/permissions')
export class UsersPermissionsController {
  constructor(
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {}

  @UseGuards(JwtStrategy)
  @Post()
  @ApiOperation({ summary: 'Add permission to user.' })
  @ApiBody({ type: CreateUserPermissionDto})
  @ApiResponse({ status: 202, description: 'Success.', type: UsersPermissions })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @TimeMeasurement
  create(@Body() createUserPermissionDto: CreateUserPermissionDto): Promise<UsersPermissions> {
    return this.usersPermissionsService.addUserPermission(
      createUserPermissionDto,
    );
  }

  @UseGuards(JwtStrategy)
  @Get()
  @TimeMeasurement
  @ApiOperation({ summary: 'List of permissions.' })
  @ApiResponse({ status: 202, description: 'List of users.', type: [UsersPermissions] })
  findAll() {
    return this.usersPermissionsService.findAll();
  }
}
