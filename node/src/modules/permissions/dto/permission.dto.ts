import { IsNotEmpty, MinLength } from 'class-validator';

export default class PermissionDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;
}
