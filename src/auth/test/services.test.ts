import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../interfaces/createUser.dto';
import { User } from '../user.entity';
import { JwtStrategy } from '../validations/jwt.strategy';

const uuid4 = '3f5fc2fd-628e-4def-9400-3abe26001b19';

describe('Auth Services', () => {
  let service: AuthService;
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: uuid4,
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: uuid4, ...user })),
    findOne: jest.fn().mockImplementation((dto) => ({
      ...dto,
      accounts: ['jest_1', 'jest_2'],
    })),
  };

  const mockJwtStategy = {};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        JwtStrategy,
        AuthService,
      ],
    })
      .overrideProvider(JwtStrategy)
      .useValue(mockJwtStategy)
      .compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  describe('Users Services', () => {
    const user: CreateUserDto = { email: 'jest@test.net', password: 'pass' };

    test('user should be create', async () => {
      expect(await service.createUser(user)).toEqual({
        id: expect.any(String),
        ...user,
      });
    });

    test('should be a User Token', async () => {
      expect(await service.getUserToken(user)).toEqual({
        access_token: expect.any(String),
      });
    });

    test('should get a user Accounts field', async () => {
      expect(await service.getAccounts(user)).toHaveLength(2);
    });
  });
});
