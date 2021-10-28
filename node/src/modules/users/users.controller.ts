import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserListLimit from './dto/user-list-limit.dto';
import { TimeMeasurement } from 'src/utils/perf.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @TimeMeasurement
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @TimeMeasurement
  findAll(@Query() query: UserListLimit) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @TimeMeasurement
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @TimeMeasurement
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @TimeMeasurement
  remove(@Param('id') id: number) {
    return this.userService.update(id, { isDeleted: true });
  }
}
