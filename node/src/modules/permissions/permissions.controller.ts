import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import PermissionDto from './dto/permission.dto';
import { TimeMeasurement } from '../../utils/perf.decorator';
import { Permission } from './models/permission.model';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @UseGuards(JwtStrategy)
  @Post()
  @ApiOperation({ summary: 'Create permission' })
  @ApiBody({ type: PermissionDto })
  @ApiResponse({ status: 202, description: 'Success.', type: Permission })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @TimeMeasurement
  create(@Body() permissionDto: PermissionDto): Promise<Permission> {
    return this.permissionService.create(permissionDto);
  }

  @UseGuards(JwtStrategy)
  @Get()
  @ApiOperation({ summary: 'List of permissions.' })
  @ApiResponse({
    status: 202,
    description: 'List of permissions.',
    type: [Permission],
  })
  @TimeMeasurement
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @UseGuards(JwtStrategy)
  @Patch(':id')
  @ApiOperation({ summary: 'Edit permission' })
  @ApiParam({ name: 'id', format: 'string', example: '1' })
  @ApiBody({ type: PermissionDto })
  @ApiResponse({
    status: 202,
    description: 'Edited user.',
    type: PermissionDto,
  })
  @TimeMeasurement
  update(@Param('id') id: number, @Body() permissionDto: PermissionDto) {
    return this.permissionService.update(id, permissionDto);
  }

  @UseGuards(JwtStrategy)
  @Delete(':id')
  @ApiOperation({ summary: 'Drop permission' })
  @ApiParam({ name: 'id', format: 'string', example: '1' })
  @TimeMeasurement
  remove(@Param('id') id: number) {
    return this.permissionService.remove(id);
  }
}
