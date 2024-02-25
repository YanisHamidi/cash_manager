import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './services/shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, Shops, Users } from 'src/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shops, Products, Users]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
