import {
  IsNotEmpty,
  MinLength,
  Min,
  Max,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6)
  login!: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @IsAlphanumeric()
  password!: string;

  @IsNotEmpty()
  @Max(130)
  @Min(18)
  age!: number;
}
