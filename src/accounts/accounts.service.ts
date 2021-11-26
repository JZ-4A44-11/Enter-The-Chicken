import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { AccountProfile } from './interfaces/accountProfile';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRep: Repository<Account>,
  ) {}

  public async getProfile(username: string): Promise<AccountProfile> {
    const account = await this.accountsRep.findOne({ where: { username } });
    if (!account) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Account not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      name: account.username,
      bio: account.bio,
      createAt: account.createAt,
      profilePic: account.profilePic,
    };
  }
}
