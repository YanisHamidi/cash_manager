import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  latitude: number;

  longitude: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}
