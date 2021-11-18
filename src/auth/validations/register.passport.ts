import { Injectable } from '@nestjs/common';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class RegisterPassport implements AuthOptionsFactory {
  createAuthOptions(): IAuthModuleOptions<unknown> {
    return { property: 'jwt' };
  }
}
