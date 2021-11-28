import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UserListLimit from './dto/user-list-limit.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.age = createUserDto.age;

    return user.save();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return user.update(updateUserDto);
  }

  findAll(params: UserListLimit): Promise<User[]> {
    return this.userModel.findAll({
      limit: params.limit,
      offset: params.offset,
    });
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  findByLoginPass(login: string, password: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        login: login,
        password: password,
      },
    });
  }

  suggest(part: string, limit = 10, offset = 0): Promise<User[]> {
    return this.userModel.findAll({
      limit: limit,
      offset: offset,
      where: {
        login: {
          [Op.like]: `${part}%`,
        },
      },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
