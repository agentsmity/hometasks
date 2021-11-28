import {
  IsBoolean,
  MinLength,
  Min,
  Max,
  MaxLength,
  IsAlphanumeric,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export default class UpdateUserDto {
  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ type: String })
  login?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  @IsAlphanumeric()
  @ApiPropertyOptional({ type: String })
  password?: string;

  @IsOptional()
  @Max(130)
  @Min(18)
  @ApiPropertyOptional({ type: Number, minimum: 18, maximum: 130 })
  age?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  isDeleted?: boolean;
}
