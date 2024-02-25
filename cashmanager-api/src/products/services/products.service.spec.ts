import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Products, Shops } from '../../typeorm';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: Repository<Products>;
  let shopsRepository: Repository<Shops>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Products), useClass: Repository },
        { provide: getRepositoryToken(Shops), useClass: Repository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Products>>(
      getRepositoryToken(Products),
    );
    shopsRepository = module.get<Repository<Shops>>(getRepositoryToken(Shops));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const result = new Products();
      const createProductDto = {
        name: 'Product',
        description: 'Description',
        image: 'Image',
        price: 100,
        shopId: 1,
      };

      jest.spyOn(shopsRepository, 'findOne').mockResolvedValueOnce(new Shops());
      jest.spyOn(productsRepository, 'save').mockResolvedValueOnce(result);

      expect(await service.createProduct(createProductDto)).toEqual(result);
    });
  });

  describe('getProductsByShop', () => {
    it('should return products of a shop', async () => {
      const result = [new Products(), new Products()];
      const shop = new Shops();
      shop.products = result;

      jest.spyOn(shopsRepository, 'findOne').mockResolvedValueOnce(shop);

      expect(await service.getProductsByShop('1')).toEqual(result);
    });
  });

  describe('deleteProductByProductId', () => {
    it('should delete a product', async () => {
      const result = { affected: 1, raw: [] }; // Ajout de la propriété raw

      jest.spyOn(productsRepository, 'delete').mockResolvedValueOnce(result);

      expect(await service.deleteProductByProductId('1')).toEqual(result);
    });
  });
});
