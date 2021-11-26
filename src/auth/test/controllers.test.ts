import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  const mockUserService = {
    createUser: jest.fn(() => {
      return {
        access_token: 'jwt_token',
      };
    }),
    getUserToken: jest.fn(() => {
      return {
        access_token: 'jwt_token',
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockUserService)
      .compile();

    controller = moduleRef.get<AuthController>(AuthController);
  });

  describe('Users', () => {
    const credential = { email: 'jest@test.local', password: 'test' };

    test('should sigin', async () => {
      expect(await controller.sigin(credential)).toEqual({
        access_token: expect.any(String),
      });
    });

    test('should login', async () => {
      expect(await controller.login(credential)).toEqual({
        access_token: expect.any(String),
      });
    });
  });
});
