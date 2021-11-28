import {
    IsNotEmpty,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
export default class LoginDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ type: String, minLength: 3 })
    username!: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ type: String, minLength: 3 })
    password!: string;
}
  