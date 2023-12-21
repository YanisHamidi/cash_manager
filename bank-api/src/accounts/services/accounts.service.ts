import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto/create-account.dto';

@Injectable()
export class AccountsService {
 constructor(
    @InjectRepository(Accounts) private readonly accountsRepository: Repository<Accounts>,
 ) {}

 async createAccount(createAccountDto: CreateAccountDto) {
    const newAccount = this.accountsRepository.create(createAccountDto);
    try {

      return await this.accountsRepository.save(newAccount);

  } catch (error) {

      if (error.code === '23505') { // Unique constraint violation error code

          throw new HttpException('Account ID already exists', HttpStatus.CONFLICT);

      } else {

          throw new HttpException('An error occurred while creating the account', HttpStatus.INTERNAL_SERVER_ERROR);

      }

  }
}

 async getAccounts() {
    return this.accountsRepository.find();
 }
}