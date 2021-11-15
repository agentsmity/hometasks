import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from 'src/modules/users/users.service';
import SuggestDto from 'src/common/dto/suggest.dto';
import { TimeMeasurement } from 'src/utils/perf.decorator';

@Controller('suggest')
export class SuggestController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @TimeMeasurement
  suggest(@Query() query: SuggestDto) {
    return this.userService.suggest(query.part, query.limit, query.offset);
  }
}
