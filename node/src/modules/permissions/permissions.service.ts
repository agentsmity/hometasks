import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './models/permission.model';
import PermissionDto from './dto/permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission,
  ) {}

  create(permissionDto: PermissionDto): Promise<Permission> {
    const permission = new Permission();
    permission.name = permissionDto.name;

    return permission.save();
  }

  async update(id: number, permissionDto: PermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);

    return permission.update(permissionDto);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionModel.findAll();
  }

  findOne(id: number): Promise<Permission> {
    return this.permissionModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await permission.destroy();
  }
}
