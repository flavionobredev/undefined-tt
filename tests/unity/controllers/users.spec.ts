jest.mock('@/infra/db');
import { getMockReq, getMockRes } from '@jest-mock/express';
import * as UserController from '@/controllers/users';
import { MongoDB } from '@/infra/db';
import { User } from '@/models/users';

describe('UsersController: getAll', () => {
  const users: User[] = [];
  beforeAll(() => {
    MongoDB.getModel = jest.fn().mockImplementation(() => {
      return {
        find: jest.fn().mockImplementation(() => users),
      };
    });
  });

  it('should return a list of users', async () => {
    const sut = UserController.getAll;
    const req = getMockReq();
    const { res } = getMockRes();

    const result = await sut(req, res);
    expect(MongoDB.getModel).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ data: [] });
  });

  it('should return a list of users without password', async () => {
    const user = {
      _id: '1',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
      email: 'teste@undefined.com',
      name: 'Teste',
    };
    const expected = {
      ...user,
    };
    Reflect.deleteProperty(expected, 'password');
    users.push(user);

    const sut = UserController.getAll;
    const req = getMockReq();
    const { res } = getMockRes();
    await sut(req, res);
    expect(res.json).toBeCalledWith({ data: [expected] });
  });

  afterAll(() => {
    jest.resetAllMocks();
    users.length = 0;
  });
});
