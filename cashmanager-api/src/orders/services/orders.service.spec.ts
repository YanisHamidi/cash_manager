import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { Orders, Users } from '../../typeorm';
import { Repository } from 'typeorm';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: Repository<Orders>;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Orders), useClass: Repository },
        { provide: getRepositoryToken(Users), useClass: Repository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<Repository<Orders>>(
      getRepositoryToken(Orders),
    );
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const result = new Orders();
      const createOrderDto = {
        userId: 1,
        idProducts: [1, 2],
        totalPrice: 200,
        status: 'pending',
      };

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(new Users());
      jest.spyOn(ordersRepository, 'save').mockResolvedValueOnce(result);

      expect(await service.createOrder(createOrderDto)).toEqual(result);
    });
  });

  describe('getAllOrdersByUserId', () => {
    it('should return all orders of a user', async () => {
      const result = [new Orders(), new Orders()];

      jest.spyOn(ordersRepository, 'find').mockResolvedValueOnce(result);

      expect(await service.getAllOrdersByUserId('1')).toEqual(result);
    });
  });

  describe('getOrderByOrderId', () => {
    it('should return an order', async () => {
      const result = new Orders();

      jest.spyOn(ordersRepository, 'findOne').mockResolvedValueOnce(result);

      expect(await service.getOrderByOrderId('1')).toEqual(result);
    });
  });
});
