import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shops, Users } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from '../dto/create.dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shops)
    private readonly shopsRepository: Repository<Shops>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createShop(createShopDto: CreateShopDto) {
    const user = await this.userRepository.findOne({
      where: { id: createShopDto.userId },
    });

    const newShop = new Shops();
    newShop.address = createShopDto.address;
    newShop.image = createShopDto.image;
    newShop.latitude = createShopDto.latitude;
    newShop.longitude = createShopDto.longitude;
    newShop.name = createShopDto.name;
    newShop.owner = user;
    const savedShop = await this.shopsRepository.save(newShop);
    return savedShop;
  }

  async getShops(lat: string, long: string): Promise<Shops[] | null> {
    const tolerance = 0.09;

    const latFloat = parseFloat(lat);
    const longFloat = parseFloat(long);
    const minLat = latFloat - tolerance;
    const maxLat = latFloat + tolerance;
    const minLong = longFloat - tolerance;
    const maxLong = longFloat + tolerance;

    const nearbyShops = await this.shopsRepository
      .createQueryBuilder('shops')
      .where('shops.latitude BETWEEN :minLat AND :maxLat', {
        minLat,
        maxLat,
      })
      .andWhere('shops.longitude BETWEEN :minLong AND :maxLong', {
        minLong,
        maxLong,
      })
      .getMany();

    return nearbyShops;
  }

  async getShopsByUserId(userId: string): Promise<Shops[] | null> {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(userId) },
      relations: ['shops'],
    });

    if (!user) {
      return null;
    }

    return user.shops;
  }

  async deleteShopById(shopId: string) {
    const shop = await this.shopsRepository.findBy({ id: parseInt(shopId) });
    if (!shop) {
      throw new Error('Boutique non trouvée');
    }
    const resultShop = await this.shopsRepository.delete({
      id: parseInt(shopId),
    });

    return resultShop;
  }

  async getInfosByShopId(shopId: string) {
    return await this.shopsRepository.findOneBy({ id: parseInt(shopId) });
  }
}
