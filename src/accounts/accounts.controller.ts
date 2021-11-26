import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AccountProfile } from './interfaces/accountProfile';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('create')
  public index_test(@Res() res: Response): void {
    res.sendFile('views/index.html', { root: process.cwd() });
  }

  //@UseGuards(JwtGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('picture'))
  public uploadFile(@UploadedFile() picture: Express.Multer.File): void {
    console.log(picture);
  }

  @UseGuards(JwtGuard)
  @Post('profile')
  public getProfile(
    @Body() body: { username: string },
  ): Promise<AccountProfile> {
    console.log(body);
    return this.accountsService.getProfile(body.username);
  }
}
