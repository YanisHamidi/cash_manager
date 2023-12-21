import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { TransactionsController } from './transactions.controller';
import { AccountsService } from './services/accounts.service';
import { TransactionsService } from './services/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController, TransactionsController],
  providers: [AccountsService, TransactionsService],
  exports: [AccountsService, TransactionsService],
})
export class AccountsModule {}
