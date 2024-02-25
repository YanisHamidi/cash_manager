import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders, Users } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/create.dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: createOrderDto.userId,
      },
    });

    if (user) {
      const newOrder = new Orders();
      newOrder.idProduct = createOrderDto.idProducts;
      newOrder.price = createOrderDto.totalPrice;
      newOrder.status = createOrderDto.status;

      newOrder.user = user;
      const result = await this.ordersRepository.save(newOrder);
      return result;
    }
    throw new NotFoundException();
  }

  async getAllOrdersByUserId(userId: string): Promise<Orders[]> {
    const user = parseInt(userId);

    const orders = await this.ordersRepository.find({
      where: {
        user: { id: user },
      },
    });

    return orders;
  }

  async getOrderByOrderId(orderId: string): Promise<Orders> {
    const order = await this.ordersRepository.findOne({
      where: { id: parseInt(orderId) },
    });
    return order;
  }
}
