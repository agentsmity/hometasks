import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByLoginPass(username, pass);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.login,
        sub: user.id,
      }),
    };
  }
}
