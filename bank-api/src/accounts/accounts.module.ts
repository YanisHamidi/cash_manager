import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './services/accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
