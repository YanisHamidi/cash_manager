import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  totalPrice: number;

  @IsArray()
  @IsNotEmpty()
  idProducts: number[];

  @IsString()
  @IsNotEmpty()
  status: string;
}
