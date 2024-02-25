import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';
import { Transaction } from 'src/typeorm';
import { Repository } from 'typeorm';
import * as twilio from 'twilio';

@Injectable()
export class TransactionsService {
  private twilioClient: twilio.Twilio;

  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {
    this.twilioClient = twilio(
      'ACc6f9247f398a78f7b09c0d9aa8be7ceb',
      'edb8e232a22c413b91b0aa249ec535e2',
    );
  }

  async getAccountByIdentifier(identifier: string): Promise<Accounts | null> {
    const account = await this.accountsRepository.findOne({
      where: [{ accountId: identifier }, { cbId: identifier }],
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }
  async initiateTransaction(identifier: string): Promise<void> {
    const existingTransaction = await this.transactionRepository.findOne({
      where: { identifier, status: 'pending' },
    });

    if (existingTransaction) {
      throw new Error(
        'A pending transaction already exists for this identifier',
      );
    }

    const newTransaction = new Transaction(identifier);

    newTransaction.status = 'pending';

    await this.transactionRepository.save(newTransaction);
  }

  async confirmTransaction(identifier: string, price: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { identifier, status: 'pending' },
    });
    if (transaction) {
      transaction.status = 'confirmed';
      await this.transactionRepository.save(transaction);
    }

    await this.deductPriceFromAccount(identifier, price);
  }

  async deductPriceFromAccount(
    identifier: string,
    price: number,
  ): Promise<void> {
    const account = await this.getAccountByIdentifier(identifier);

    if (account.solde < price) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    account.solde -= price;
    await this.accountsRepository.save(account);
  }
}
