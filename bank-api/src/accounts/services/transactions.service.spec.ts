import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { Accounts } from 'src/typeorm';
import { Transaction } from 'src/typeorm';
import { Repository } from 'typeorm';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let accountsRepositoryMock: Partial<Repository<Accounts>>;
  let transactionRepositoryMock: Partial<Repository<Transaction>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Accounts),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    accountsRepositoryMock = module.get<Partial<Repository<Accounts>>>(getRepositoryToken(Accounts));
    transactionRepositoryMock = module.get<Partial<Repository<Transaction>>>(getRepositoryToken(Transaction));

    jest.spyOn(accountsRepositoryMock, 'findOne').mockResolvedValue(null);
    jest.spyOn(accountsRepositoryMock, 'save').mockResolvedValue({} as any);

    jest.spyOn(transactionRepositoryMock, 'findOne').mockResolvedValue({
      identifier: 'exampleIdentifier',
      status: 'pending',
    } as any);
    jest.spyOn(transactionRepositoryMock, 'save').mockResolvedValue({} as any);
    jest.spyOn(transactionRepositoryMock, 'remove').mockResolvedValue({} as any);
  });

  it('should throw NotFoundException if account is not found by identifier', async () => {
    await expect(transactionsService.getAccountByIdentifier('nonexistent')).rejects.toThrowError(
      NotFoundException,
    );
  });



  it('should confirm a transaction', async () => {
    const identifier = 'exampleIdentifier';
    const price = 50;

    // Mock the getAccountByIdentifier to return an account
    jest.spyOn(transactionsService, 'getAccountByIdentifier').mockResolvedValue({
      accountId: 'exampleAccountId',
      solde: 50,
    } as Accounts);

    await transactionsService.confirmTransaction(identifier, price);

    expect(transactionRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ identifier, status: 'confirmed' }));
    expect(accountsRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ accountId: 'exampleAccountId', solde: 0 }));
  });

  it('should deduct price from account and confirm transaction', async () => {
    const identifier = 'exampleIdentifier';
    const price = 30;

    // Mock the getAccountByIdentifier to return an account with sufficient balance
    jest.spyOn(transactionsService, 'getAccountByIdentifier').mockResolvedValue({
      accountId: 'exampleAccountId',
      solde: 50,
    } as Accounts);

    await transactionsService.deductPriceFromAccount(identifier, price);

    expect(accountsRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ accountId: 'exampleAccountId', solde: 20 }));
  });

  it('should throw HttpException when deducting price with insufficient balance', async () => {
    const identifier = 'exampleIdentifier';
    const price = 70;

    // Mock the getAccountByIdentifier to return an account with insufficient balance
    jest.spyOn(transactionsService, 'getAccountByIdentifier').mockResolvedValue({
      accountId: 'exampleAccountId',
      solde: 50,
    } as Accounts);

    await expect(transactionsService.deductPriceFromAccount(identifier, price)).rejects.toThrowError(
      HttpException,
    );
  });
});
