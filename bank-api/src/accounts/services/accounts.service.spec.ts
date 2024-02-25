import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { Accounts } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto/create-account.dto';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let accountsRepositoryMock: Partial<Repository<Accounts>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Accounts),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    accountsService = module.get<AccountsService>(AccountsService);
    accountsRepositoryMock = module.get(getRepositoryToken(Accounts));
  });

  it('should create an account successfully', async () => {
    const createAccountDto: CreateAccountDto = {
      firstname: 'John',
      lastname: 'Doe',
      phonenumber: '+33600000000',
      accountId: '0',
      cbId: '456',
      solde: 1000,
    };

    const createdAccount = { ...createAccountDto, id: 1 }; // Simulated created account object

    jest.spyOn(accountsRepositoryMock, 'save').mockResolvedValue(createdAccount);

    const result = await accountsService.createAccount(createAccountDto);
    expect(result).toEqual(createdAccount);
  });

  it('should throw conflict error if account ID already exists', async () => {
    const existingAccountId = '0'; // An ID that already exists in the database

    const createAccountDto: CreateAccountDto = {
      firstname: 'John',
      lastname: 'Doe',
      phonenumber: '+33600000000',
      accountId: existingAccountId,
      cbId: '456',
      solde: 1000,
    };
  
    const duplicateError = {
      code: '23505',
    };

    jest.spyOn(accountsRepositoryMock, 'save').mockRejectedValue(duplicateError);

    try {
      await accountsService.createAccount(createAccountDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Account ID already exists');
      expect(error.getStatus()).toEqual(HttpStatus.CONFLICT);
    }
  });

  it('should throw internal server error for other errors during account creation', async () => {
    const createAccountDto: CreateAccountDto = {
      firstname: 'John',
      lastname: 'Doe',
      phonenumber: '+1234567890',
      accountId: 'uniqueAccountId',
      cbId: '456',
      solde: 1000,
    };
  
    const unknownError = {
      code: 'SomeOtherErrorCode',
    };

    jest.spyOn(accountsRepositoryMock, 'save').mockRejectedValue(unknownError);

    try {
      await accountsService.createAccount(createAccountDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('An error occurred while creating the account');
      expect(error.getStatus()).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
