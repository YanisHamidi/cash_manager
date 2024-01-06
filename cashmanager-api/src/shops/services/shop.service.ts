import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shops } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from '../dto/create.dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shops)
    private readonly shopsRepository: Repository<Shops>,
  ) {}

  async createShop(createShopDto: CreateShopDto) {
    const newShop = this.shopsRepository.create(createShopDto);
    const savedShop = await this.shopsRepository.save(newShop);
    return savedShop;
  }
}
