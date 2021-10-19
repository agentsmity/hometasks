import {
  IsNotEmpty,
  MinLength,
  Max,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export default class SuggestDto {
  @IsNotEmpty()
  @MinLength(3)
  part!: string;

  @IsOptional()
  @IsNumber()
  @Max(50)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;
}
