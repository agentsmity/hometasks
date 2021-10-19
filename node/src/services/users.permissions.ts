import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersPermissions } from 'src/models/users.permissions';
import CreateUserPermissionDto from 'src/dto/user.permission.dto';

@Injectable()
export class UsersPermissionsService {
  constructor(
    @InjectModel(UsersPermissions)
    private readonly model: typeof UsersPermissions,
  ) {}

  addUserPermission(
    createUserPermissionDto: CreateUserPermissionDto,
  ): Promise<UsersPermissions> {
    const userPermission = new UsersPermissions();
    userPermission.user_id = createUserPermissionDto.user_id;
    userPermission.permission_id = createUserPermissionDto.permission_id;

    return userPermission.save();
  }

  findAll(): Promise<UsersPermissions[]> {
    return this.model.findAll();
  }
}
