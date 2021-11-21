import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/configuration';

describe('Application', () => {
  let configService: ConfigService;
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: false,
          load: [config],
        }),
      ],
      providers: [],
      controllers: [AppController],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    controller = moduleRef.get<AppController>(AppController);
  });

  describe('Config Services', () => {
    it('Service should be load', async () => {
      expect(configService).toBeDefined();
    });
  });

  describe('Call getHello()', () => {
    it('should Enter the Chicken!', async () => {
      expect(await controller.getHello()).toBe('Enter the Chicken!');
    });
  });
});
