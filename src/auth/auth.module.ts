import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
