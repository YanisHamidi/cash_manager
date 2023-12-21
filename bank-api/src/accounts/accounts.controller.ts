import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';
import { AccountsService } from './services/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({transform: true}))
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  @Get()
  async getAccount() {
    return this.accountService.getAccounts();
  }
}
