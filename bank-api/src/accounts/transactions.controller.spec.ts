import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('./services/transactions.service');

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    transactionsController = module.get<TransactionsController>(TransactionsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });


  describe('confirmTransaction', () => {
    it('should confirm a transaction successfully', async () => {
      const requestData = { identifier: '0', code: 'ABC123', price: 100 };

      (transactionsService.confirmTransaction as jest.Mock).mockResolvedValue(undefined);

      const result = await transactionsController.confirmTransaction(requestData);
      expect(result).toEqual({ message: 'Transaction confirmed successfully' });
    });

    it('should throw HttpException for invalid request data', async () => {
      const requestData = { identifier: '', code: '', price: 0 };
      const expectedErrorMessage = 'Invalid request data';

      (transactionsService.confirmTransaction as jest.Mock).mockRejectedValue(new HttpException(expectedErrorMessage, HttpStatus.BAD_REQUEST));

      try {
        await transactionsController.confirmTransaction(requestData);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual(expectedErrorMessage);
        expect(error.getStatus()).toEqual(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
