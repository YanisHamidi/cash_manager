import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { CreateOrderDto } from './dto/create.dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create-order-by-user-id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createOrder(
    @Body()
    createOrderDto: CreateOrderDto,
  ) {
    const result = await this.ordersService.createOrder(createOrderDto);
    return result;
  }

  @Get('get-all-orders-by-user-id')
  async getAllOrdersByUserId(@Query('userId') userId: string) {
    const result = await this.ordersService.getAllOrdersByUserId(userId);
    if (result.length === 0)
      throw new HttpException('No Orders', HttpStatus.NO_CONTENT);
    return result;
  }

  @Get('get-order-by-order-id')
  async getOrderByOrderId(@Query('orderId') orderId: string) {
    const result = await this.ordersService.getOrderByOrderId(orderId);
    if (!result) throw new HttpException('No Order', HttpStatus.NO_CONTENT);
    return result;
  }
}
