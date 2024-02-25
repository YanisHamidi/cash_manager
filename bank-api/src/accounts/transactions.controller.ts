import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/confirm-transaction')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async confirmTransaction(
    @Body()
    confirmationData: {
      identifier: string;
      price: number;
    },
  ) {
    try {
      const { identifier, price } = confirmationData;

      if (!identifier || !price || typeof price !== 'number') {
        throw new HttpException('Invalid request data', HttpStatus.BAD_REQUEST);
      }

      await this.transactionsService.confirmTransaction(identifier, price);

      return { message: 'Transaction confirmed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
