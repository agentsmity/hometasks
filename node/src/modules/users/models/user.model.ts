import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true })
  @ApiProperty({ description: 'User password.' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'User login.' })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'User password.' })
  password: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  @ApiProperty({ example: 18, description: 'The age of the user', minimum: 18, maximum: 130 })
  age: number;

  @Column({ defaultValue: false })
  @ApiProperty({ description: 'User status.' })
  isDeleted: boolean;
}
