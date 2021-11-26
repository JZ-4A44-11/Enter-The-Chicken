import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.entity';
import { User } from '../../auth/user.entity';

const uuid4 = '3f5fc2fd-628e-4def-9400-3abe26001b19';

describe('Accounts Testing', () => {
  let service: AccountsService;

  const mockAccountRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: uuid4,
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: uuid4, ...user })),
    findOne: jest.fn().mockImplementation(() => ({
      username: 'Jest',
      bio: 'Jest bio',
      profilePic: 'me.webp',
    })),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Account),
          useValue: mockAccountRepository,
        },
        AccountsService,
      ],
    }).compile();

    service = moduleRef.get<AccountsService>(AccountsService);
  });

  describe('Accounts Services', () => {
    test('should get Account profile', async () => {
      expect(await service.getProfile('jest')).toEqual({
        username: expect.any(String),
        bio: expect.any(String),
        profilePic: expect.any(String),
      });
    });
  });
});
