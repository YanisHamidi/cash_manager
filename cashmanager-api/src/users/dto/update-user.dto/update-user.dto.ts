import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;
}
