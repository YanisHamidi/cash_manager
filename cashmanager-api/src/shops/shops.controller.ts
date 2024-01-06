import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ShopsService } from './services/shop.service';
import { CreateShopDto } from './dto/create.dto/create-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createShop(@Body() createShopDto: CreateShopDto) {
    const result = await this.shopsService.createShop(createShopDto);
    return result;
  }
}
