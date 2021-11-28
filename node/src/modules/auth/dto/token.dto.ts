import { ApiProperty } from '@nestjs/swagger';

export default class TokenDto {
    @ApiProperty({ type: String })
    access_token!: string;
}
  