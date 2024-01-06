import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, Shops } from 'src/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Shops]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
