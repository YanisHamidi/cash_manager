import { Controller, Post, Body, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/request-transaction')
  @UsePipes(new ValidationPipe({ transform: true }))
  async initiateTransaction(@Body() transactionData: { identifier: string; price: number }) {
    try {
      const { identifier, price } = transactionData;

      if (!identifier || !price || typeof price !== 'number') {
        throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
      }

      const confirmationCode = await this.transactionsService.initiateTransaction(identifier, price);

      return { message: 'Transaction initiated successfully', confirmationCode };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/confirm-transaction')
  @UsePipes(new ValidationPipe({ transform: true }))
  async confirmTransaction(@Body() confirmationData: { identifier: string; code: string; price: number }) {
    try {
      const { identifier, code, price } = confirmationData;

      if (!identifier || !code || !price || typeof price !== 'number') {
        throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
      }

      await this.transactionsService.confirmTransaction(identifier, code, price);

      return { message: 'Transaction confirmed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
