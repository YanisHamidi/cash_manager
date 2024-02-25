import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phonenumber: string;

  @IsNotEmpty()
  accountId: string;

  cbId: string;

  @IsNotEmpty()
  solde: number;
}
