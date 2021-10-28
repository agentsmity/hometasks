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
import { TimeMeasurement } from 'src/utils/perf.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post()
  @TimeMeasurement
  create(@Body() permissionDto: PermissionDto) {
    return this.permissionService.create(permissionDto);
  }

  @Get()
  @TimeMeasurement
  findAll() {
    return this.permissionService.findAll();
  }

  @Patch(':id')
  @TimeMeasurement
  update(@Param('id') id: number, @Body() permissionDto: PermissionDto) {
    return this.permissionService.update(id, permissionDto);
  }

  @Delete(':id')
  @TimeMeasurement
  remove(@Param('id') id: number) {
    return this.permissionService.remove(id);
  }
}
