import { Test, TestingModule } from '@nestjs/testing';
import { Account } from '../account.entity';
import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Accounts Controller', () => {
  let controller: AccountsController;

  const mockAccountRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      id: '',
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: '', ...user })),
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
          provide: getRepositoryToken(Account),
          useValue: mockAccountRepository,
        },
        AccountsService,
      ],
      controllers: [AccountsController],
    }).compile();

    controller = moduleRef.get<AccountsController>(AccountsController);
  });

  describe('Controller', () => {
    test('should be define', async () => {
      expect(await controller).toBeDefined();
    });
  });
});
