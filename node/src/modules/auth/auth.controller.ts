import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import LoginDto from './dto/login.dto';
import TokenDto from './dto/token.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login action' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 202, description: 'Success.', type: TokenDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
