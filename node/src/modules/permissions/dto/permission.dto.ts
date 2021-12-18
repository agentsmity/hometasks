import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class PermissionDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String })
  name!: string;
}
