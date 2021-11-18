import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './validations/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from '../config/jwt.config';
import { RegisterPassport } from './validations/register.passport';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: RegisterPassport,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
  ],
  providers: [ConfigService, AuthService, JwtStrategy],
  exports: [JwtModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
