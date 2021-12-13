import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { getModelToken } from '@nestjs/sequelize';
import UserListLimit from './dto/user-list-limit.dto';

const mockUserService = {
  users: [
    {
      id: 1,
      login: 'first',
      password: 'pass1',
      age: 30,
      isDeleted: false,
    },
    {
      id: 2,
      login: 'sec',
      password: 'pass2',
      age: 40,
      isDeleted: false,
    },
  ],

  findAll: function (query: UserListLimit) {
    const clones = this.users.map((el) => Object.assign({}, el));
    return clones.splice(0, query.limit);
  },

  findOne: function (params: any) {
    return this.users.find((el) => el.id == params.where.id);
  },
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, login: 'first', password: 'pass1', age: 30, isDeleted: false },
      ];
      const query = { limit: 1 };
      expect(await controller.findAll(query)).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return an user by id', async () => {
      const user = {
        id: 2,
        login: 'sec',
        password: 'pass2',
        age: 40,
        isDeleted: false,
      };
      const id = 2;
      expect(await controller.findOne(id)).toEqual(user);
    });
  });
});
