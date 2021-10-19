import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from 'src/modules/users/users.service';
import SuggestDto from 'src/dto/suggest.dto';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async suggest(@Query() query: SuggestDto) {
    return await this.userService.suggest(
      query.part,
      query.limit,
      query.offset,
    );
  }
}
