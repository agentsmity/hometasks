import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Request,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserListLimit from './dto/user-list-limit.dto';
import { TimeMeasurement } from '../../utils/perf.decorator';
import { User } from './models/user.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 202, description: 'Success.', type: User })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List of users' })
  @ApiResponse({ status: 202, description: 'List of users.', type: [User] })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: UserListLimit): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({ name: 'id', format: 'string', example: '1' })
  @ApiResponse({ status: 202, description: 'User.', type: User })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit user' })
  @ApiParam({ name: 'id', format: 'string', example: '1' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 202, description: 'Edited user.', type: User })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiParam({ name: 'id', format: 'string', example: '1' })
  @ApiResponse({ status: 202, description: 'Deleted user.', type: User })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number): Promise<User> {
    return this.userService.update(id, { isDeleted: true });
  }
}
