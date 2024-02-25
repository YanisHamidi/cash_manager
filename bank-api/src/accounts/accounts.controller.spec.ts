import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './services/accounts.service';
import { CreateAccountDto } from './dto/create-account.dto/create-account.dto';

describe('AccountsController', () => {
  let controller: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        {
          provide: AccountsService,
          useValue: {
            createAccount: jest.fn(),
            getAccounts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });


  it('should create an account', async () => {
    const createAccountDto: CreateAccountDto = {
      firstname: 'John',
      lastname: 'Doe',
      phonenumber: '+33600000000',
      accountId: '0',
      cbId: '456',
      solde: 1000,
    };

    const createdAccount = { ...createAccountDto, id: 1 };

    jest.spyOn(accountsService, 'createAccount').mockResolvedValue(createdAccount);

    const result = await controller.createAccount(createAccountDto);
    expect(result).toEqual(createdAccount);
  });

  it('should get accounts', async () => {
    const mockAccounts = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        phonenumber: '+33600000000',
        accountId: '0',
        cbId: '456',
        solde: 1000,
      }
    ]; 

    jest.spyOn(accountsService, 'getAccounts').mockResolvedValue(mockAccounts);

    const result = await controller.getAccount();
    expect(result).toEqual(mockAccounts);
  });
});
