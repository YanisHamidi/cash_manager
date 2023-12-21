import { Controller, Post, Body, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/request-transaction')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deductAmountFromAccount(@Body() deductionData: { identifier: string; price: number }) {
    try {
      const { identifier, price } = deductionData;

      if (!identifier || !price || typeof price !== 'number') {
        throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
      }

      await this.transactionsService.deductAmountFromAccount(identifier, price);

      return { message: 'Amount deducted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
