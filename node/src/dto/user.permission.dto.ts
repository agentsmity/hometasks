import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateUserPermissionDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  permission_id!: number;
}
