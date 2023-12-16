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
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';
import { UserService } from './services/users.service';
import { BrevoService } from './services/brevo.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly brevoService: BrevoService,
  ) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUsers(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.createUser(createUserDto);
    this.brevoService.sendEmail(
      response.email,
      response.firstname,
      `Bien vu chef ton lien : <a href="http://localhost:3000/users/confirm-account?id=${response.id}">Confirmer ton compte</a>`,
      'Veuillez confirmer votre compte',
    );
    return;
  }

  @Get('/confirm-account')
  async getConfirmAccount(@Query('id') userId: number) {
    return this.userService.getConfirmAccount(userId);
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const response = await this.userService.loginUser(loginUserDto);
    return response;
  }
}
