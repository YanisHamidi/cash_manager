import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
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
}
