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
  Param,
  Delete,
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

  @Get('/get-shops')
  async getShops(@Query('lat') lat: string, @Query('long') long: string) {
    const result = await this.shopsService.getShops(lat, long);
    if (result.length === 0) {
      throw new HttpException('No shops found', HttpStatus.NO_CONTENT);
    }
    return result;
  }

  @Get('/get-shops/:userId')
  async getShopsByUserId(@Param('userId') userId: string) {
    const result = await this.shopsService.getShopsByUserId(userId);
    if (result.length === 0) {
      throw new HttpException('No shops found', HttpStatus.NO_CONTENT);
    }
    return result;
  }

  @Delete('delete-shop/:shopId')
  async deleteShopById(@Param('shopId') shopId: string) {
    return await this.shopsService.deleteShopById(shopId);
  }

  @Get('get-infos-by-shopId/:shopId')
  async getInfosByShopId(@Param('shopId') shopId: string) {
    return await this.shopsService.getInfosByShopId(shopId);
  }
}
