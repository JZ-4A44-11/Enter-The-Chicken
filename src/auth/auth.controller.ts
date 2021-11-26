import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './interfaces/createUser.dto';
import { LoginDto } from './interfaces/login.dto';
import { UserToken } from './interfaces/userToken';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  public async sigin(@Body() credential: CreateUserDto): Promise<UserToken> {
    const { email, password } = await this.authService.createUser(credential);
    return await this.authService.getUserToken({ email, password });
  }

  @Post('/login')
  public async login(@Body() credential: LoginDto): Promise<UserToken> {
    return await this.authService.getUserToken(credential);
  }
}
