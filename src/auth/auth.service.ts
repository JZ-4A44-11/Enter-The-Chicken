import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

type UserSession = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRep.findOne({ where: { email, password } });

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
    // throw new InternalServerErrorException('User not found');
  }

  public getUserToken({ username, password }: UserSession): {
    access_token: string;
  } {
    return {
      access_token: this.jwtService.sign({ username, password }),
    };
  }
}
