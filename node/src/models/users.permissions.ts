import { Column, Model, Table, DataType } from 'sequelize-typescript';
// import { User } from 'src/modules/users/models/user.model';
// import { Permission } from 'src/modules/permissions/models/permission.model';

@Table
export class UsersPermissions extends Model<UsersPermissions> {
  @Column({ primaryKey: true })
  id: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  permission_id: number;
}

// User.belongsToMany(Permission, {through: UsersPermissions});
// Permission.belongsToMany(User, {through: UsersPermissions});
