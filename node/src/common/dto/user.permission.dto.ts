import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserPermissionDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  user_id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  permission_id!: number;
}
