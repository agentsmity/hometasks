import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  age: number;

  @Column({ defaultValue: false })
  isDeleted: boolean;
}
