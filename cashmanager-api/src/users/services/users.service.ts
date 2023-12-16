import {
  ConflictException,
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { comparePasswords, hashPassword } from '../utils';
import { LoginUserDto } from '../dto/login-user.dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly secretKey =
    '0affcbd6ab8594eea41b4cc063c225821a745e1a6e38e7a960e9c5bdff4fe791';
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async isEmailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, ...rest } = createUserDto;

    const isEmailExist = await this.isEmailAlreadyExists(email);

    if (isEmailExist) {
      throw new ConflictException();
    }

    const { password } = createUserDto;
    const hashedPassword = await hashPassword(password);

    const newUser = this.userRepository.create({
      ...rest,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async getConfirmAccount(userId: number) {
    return this.userRepository.update({ id: userId }, { valid: true });
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const emailExist = await this.isEmailAlreadyExists(loginUserDto.email);
    if (!emailExist) {
      return {
        statusCode: HttpStatus.NO_CONTENT,
        data: null,
      };
    }
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    const comparePasswordsResult = await comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!comparePasswordsResult) throw new UnauthorizedException();
    if (comparePasswordsResult) {
      const payload = {
        userId: user.id,
        email: user.email,
      };
      return {
        statusCode: HttpStatus.OK,
        data: jwt.sign(payload, this.secretKey),
      };
    }
  }
}
