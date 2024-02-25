import { validate } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';

describe('CreateAccountDto', () => {
  it('should validate a valid CreateAccountDto object', async () => {
    const validDto = new CreateAccountDto();
    validDto.firstname = 'John';
    validDto.lastname = 'Doe';
    validDto.phonenumber = '+33600000000';
    validDto.accountId = '123';
    validDto.cbId = '456';
    validDto.solde = 1000;
  
    const errors = await validate(validDto);
    expect(errors.length).toBe(0);
  });
  

  it('should not validate an invalid CreateAccountDto object', async () => {
    const invalidDto = new CreateAccountDto();
    invalidDto.firstname = ''; // Invalid: empty firstname
    invalidDto.lastname = 'Doe';
    invalidDto.phonenumber = '12345'; // Invalid: not a valid phone number
    invalidDto.accountId = ''; // Invalid: empty accountId
    invalidDto.cbId = '456';
    invalidDto.solde = -1000; // Invalid: negative solde

    const errors = await validate(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
   
  });


});
