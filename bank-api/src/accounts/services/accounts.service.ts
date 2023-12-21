import { Injectable } from '@nestjs/common';
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
    return this.accountsRepository.save(newAccount);
 }

 async getAccounts() {
    return this.accountsRepository.find();
 }
}