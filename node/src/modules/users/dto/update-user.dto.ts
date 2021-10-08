import {
  IsBoolean,
  MinLength,
  Min,
  Max,
  MaxLength,
  IsAlphanumeric,
  IsOptional,
} from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @MinLength(6)
  login?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  @IsAlphanumeric()
  password?: string;

  @IsOptional()
  @Max(130)
  @Min(18)
  age?: number;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
