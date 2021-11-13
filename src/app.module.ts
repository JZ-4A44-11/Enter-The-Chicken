import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/configuration';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: false, load: [config] }), AuthModule, AccountsModule],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
