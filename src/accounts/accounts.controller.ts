import { Req, Controller, Post, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AccountsService } from './accounts.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Account } from './account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtGuard)
  @Post('profile')
  public getProfile(@Req() req: Request): Promise<Account[]> {
    return this.accountsService.getProfiles(req.user['email']);
  }
}
