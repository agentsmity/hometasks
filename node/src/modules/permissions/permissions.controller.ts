import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import PermissionDto from './dto/permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post()
  async create(@Body() permissionDto: PermissionDto) {
    return await this.permissionService.create(permissionDto);
  }

  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() permissionDto: PermissionDto) {
    return await this.permissionService.update(id, permissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.permissionService.remove(id);
  }
}
