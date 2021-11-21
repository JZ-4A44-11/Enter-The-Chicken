import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

type UserSession = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: UserSession): Promise<User> {
    const user = await this.userRep.findOne({ where: { email, password } });
    console.log(password);
    if (!password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  public async getUserToken({ email, password }: UserSession): Promise<string> {
    const { id } = await this.validateUser({ email, password });
    const payload = { id, email, password };
    return this.jwtService.sign(payload);
  }
}
