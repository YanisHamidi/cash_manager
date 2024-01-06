import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products, Shops } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create.dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Shops)
    private readonly shopsRepository: Repository<Shops>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const shop = await this.shopsRepository.findOne({
      where: {
        id: createProductDto.shopId,
      },
    });

    if (shop) {
      const newProduct = new Products();
      newProduct.name = createProductDto.name;
      newProduct.description = createProductDto.description;
      newProduct.image = createProductDto.image;
      newProduct.price = createProductDto.price;

      newProduct.shop = shop;
      const savedProduct = await this.productsRepository.save(newProduct);
      return savedProduct;
    }
    return;
  }
}
