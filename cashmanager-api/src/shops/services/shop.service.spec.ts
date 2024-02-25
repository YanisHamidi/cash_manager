import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shop.service';
import { Repository } from 'typeorm';
import { Shops } from '../../typeorm';

describe('ShopService', () => {
  let service: ShopsService;
  let repository: Repository<Shops>;

  beforeEach(async () => {
    const mockShop = {
      id: parseInt('1'),
      name: 'Test Shop',
      address: 'Test Address',
      latitude: 0,
      longitude: 0,
      image: 'test',
      products: [],
      owner: {
        id: 1,
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.fr',
        password: 'password',
        orders: null,
        shops: null,
        valid: true,
      },
    };
    const repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn().mockImplementation(() => Promise.resolve([mockShop])),
      findOneBy: jest.fn().mockImplementation(() => Promise.resolve(mockShop)),
      delete: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn(),
    };
    const usersRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopsService,
        { provide: 'ShopsRepository', useValue: repositoryMock },
        { provide: 'UsersRepository', useValue: usersRepositoryMock },
      ],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
    repository = module.get<Repository<Shops>>('ShopsRepository');
  });

  describe('deleteShopById', () => {
    it('should call repository.delete', async () => {
      const shopId = '1';
      const mockShop = {
        id: parseInt(shopId),
        name: 'Test Shop',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
        image: 'test',
        products: [],
        owner: {
          id: 1,
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.fr',
          password: 'password',
          orders: null,
          shops: null,
          valid: true,
        },
      };
      jest.spyOn(repository, 'find').mockResolvedValueOnce([mockShop]);
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined);

      await service.deleteShopById(shopId);

      expect(repository.delete).toHaveBeenCalledWith({ id: parseInt(shopId) });
    });
  });

  describe('getInfosByShopId', () => {
    it('should call repository.findOne', async () => {
      const shopId = '1';
      const mockShop = {
        id: parseInt(shopId),
        name: 'Test Shop',
        address: 'Test Address',
        latitude: 0,
        longitude: 0,
        image: 'test',
        products: [],
        owner: {
          id: 1,
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.fr',
          password: 'password',
          orders: null,
          shops: null,
          valid: true,
        },
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockShop);

      const result = await service.getInfosByShopId(shopId);

      expect(result).toEqual(mockShop);
    });
  });
});
