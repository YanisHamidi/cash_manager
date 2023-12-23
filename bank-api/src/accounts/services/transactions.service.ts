import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';
import { Transaction } from 'src/typeorm';
import { Repository } from 'typeorm';
import * as twilio from 'twilio';

@Injectable()
export class TransactionsService {
  private twilioClient: twilio.Twilio;

  constructor(
    @InjectRepository(Accounts) private readonly accountsRepository: Repository<Accounts>,
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {
    this.twilioClient = '';
  }

  async getTransactionCode(identifier: string): Promise<string | null> {
    const transaction = await this.transactionRepository.findOne({ where: { identifier, status: 'pending' } });

    return transaction ? transaction.code : null;
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
  async initiateTransaction(identifier: string, price: number): Promise<void> {
    const account = await this.getAccountByIdentifier(identifier);
  
    const existingTransaction = await this.transactionRepository.findOne({ where: { identifier, status: 'pending' } });
  
    if (existingTransaction) {
      throw new Error('A pending transaction already exists for this identifier');
    }
  
    const confirmationCode = Math.random().toString(36).substring(7);
  
    const newTransaction = new Transaction(identifier, confirmationCode);
    

    newTransaction.status = 'pending';
    
    await this.transactionRepository.save(newTransaction);
  

    await this.sendConfirmationSMS(account.phonenumber, confirmationCode);
  }
  

  async confirmTransaction(identifier: string, code: string, price: number): Promise<void> {
    const isCodeValid = await this.verifyConfirmationCode(identifier, code);

    if (!isCodeValid) {
      throw new HttpException('Invalid confirmation code', HttpStatus.BAD_REQUEST);
    }

    const transaction = await this.transactionRepository.findOne({ where: { identifier, status: 'pending' } });
    if (transaction) {
      transaction.status = 'confirmed';
      await this.transactionRepository.save(transaction);
    }

    await this.deductPriceFromAccount(identifier, price);
  }

  async deductPriceFromAccount(identifier: string, price: number): Promise<void> {
    const account = await this.getAccountByIdentifier(identifier);

    if (account.solde < price) {
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    account.solde -= price;
    await this.accountsRepository.save(account);
  }

  private async sendConfirmationSMS(phoneNumber: string, code: string): Promise<void> {
    try {
      
      await this.twilioClient.messages.create({
        body: code,
        from: '+12054798569',
        to: phoneNumber,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }

  private async verifyConfirmationCode(identifier: string, code: string): Promise<boolean> {
    
    const storedCode = await this.getTransactionCode(identifier);

    return code === storedCode; 
  }
}
