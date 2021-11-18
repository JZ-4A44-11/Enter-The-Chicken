import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import Account from './account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private userRep: Repository<User>,
    @InjectRepository(Account) private accountsRep: Repository<Account>,
  ) {}

  public async getProfile(username: string): Promise<Account[]> {
    const user = await this.userRep.findOne({ where: { email: username } });
    return await this.accountsRep.find({ where: { onwer: user.id } });
  }
}
