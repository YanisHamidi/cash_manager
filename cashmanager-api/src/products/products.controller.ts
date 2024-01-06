import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly userService: ProductsService) {}
}
