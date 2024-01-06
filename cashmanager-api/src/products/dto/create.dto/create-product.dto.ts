import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  shopId: number;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(10, { message: 'Description must have atleast 10 characters.' })
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  price: number;
}
