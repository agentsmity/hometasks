import {
  Column,
  Model,
  Table,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ description: 'Permission id.' })
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({ description: 'Permission name.' })
  name: string;
}
