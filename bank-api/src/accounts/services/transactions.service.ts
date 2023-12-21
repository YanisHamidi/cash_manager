import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Accounts) private readonly accountsRepository: Repository<Accounts>,
  ) {}

  async getAccountByIdentifier(identifier: string): Promise<Accounts | null> {
    const account = await this.accountsRepository.findOne({
      where: [{ accountId: identifier }, { cbId: identifier }],
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async deductAmountFromAccount(identifier: string, price: number): Promise<void> {
    const account = await this.getAccountByIdentifier(identifier);

    if (account.solde < price) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    account.solde -= price;
    await this.accountsRepository.save(account);
  }

}
