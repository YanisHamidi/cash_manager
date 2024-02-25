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
import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create.dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ) {
    const result = await this.productsService.createProduct(createProductDto);
    return result;
  }

  @Get('get-products-by-shop-id')
  async getProductsByShop(@Query('shopId') shopId: string) {
    const result = await this.productsService.getProductsByShop(shopId);
    if (result.length === 0)
      throw new HttpException('No product', HttpStatus.NO_CONTENT);
    return result;
  }

  @Delete('delete-product/:productId')
  async deleteProductByProductId(@Param('productId') productId: string) {
    return await this.productsService.deleteProductByProductId(productId);
  }
}
