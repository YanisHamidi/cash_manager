import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateShopDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
