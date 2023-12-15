import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UserService } from './services/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
