import {
  IsNotEmpty,
  MinLength,
  Min,
  Max,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ type: String })
  login!: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @IsAlphanumeric()
  @ApiProperty({ type: String })
  password!: string;

  @IsNotEmpty()
  @Max(130)
  @Min(18)
  @ApiProperty({ type: Number, minimum: 18, maximum: 130 })
  age!: number;
}
