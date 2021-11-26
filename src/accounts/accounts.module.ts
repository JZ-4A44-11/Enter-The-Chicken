import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, User]),
    MulterModule.register({ dest: 'upload' }),
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
