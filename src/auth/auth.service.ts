import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './interfaces/login.dto';
import { CreateUserDto } from './interfaces/createUser.dto';
import { UserToken } from './interfaces/userToken';
import { Account } from '../accounts/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async createUser(credential: CreateUserDto): Promise<User> {
    const user = await this.userRep.create(credential);
    try {
      await this.userRep.save(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'This Email is not available',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return user;
  }

  private async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.userRep.findOne({ where: { email, password } });
    if (!password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  public async getUserToken({ email, password }: LoginDto): Promise<UserToken> {
    const { id } = await this.validateUser({ email, password });
    const payload = { id, email, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getAccounts({ email, password }: LoginDto): Promise<Account[]> {
    const user = await this.userRep.findOne({
      where: { email, password },
      select: ['accounts'],
    });
    return user.accounts;
  }
}
