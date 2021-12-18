import {
  IsNotEmpty,
  MinLength,
  Max,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class SuggestDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String, minLength: 3 })
  part!: string;

  @IsOptional()
  @IsNumber()
  @Max(50)
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, default: 10 })
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, default: 0 })
  offset?: number;
}
