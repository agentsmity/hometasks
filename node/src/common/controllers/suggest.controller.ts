import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from 'src/modules/users/users.service';
import SuggestDto from 'src/common/dto/suggest.dto';
import { TimeMeasurement } from 'src/utils/perf.decorator';
import { User } from 'src/modules/users/models/user.model';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@ApiBearerAuth()
@ApiTags('users')
@Controller('suggest')
export class SuggestController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtStrategy)
  @Get()
  @ApiOperation({ summary: 'List of users by part of name' })
  @ApiQuery({ name: 'part', required: true })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  @ApiResponse({ status: 202, description: 'List of users.', type: [User] })
  @TimeMeasurement
  suggest(@Query() query: SuggestDto) {
    return this.userService.suggest(query.part, query.limit, query.offset);
  }
}
