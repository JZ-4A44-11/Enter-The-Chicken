import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return {
      access_token: await this.authService.getUserToken({
        email: req.body.email,
        password: req.body.password,
      }),
    };
  }
}
