import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { comparePasswords, hashPassword } from '../utils';
import { LoginUserDto } from '../dto/login-user.dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../dto/update-user.dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly secretKey =
    '0affcbd6ab8594eea41b4cc063c225821a745e1a6e38e7a960e9c5bdff4fe791';
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
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
    if (!emailExist) return null;
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (user.valid === false) throw new NotAcceptableException();
    const comparePasswordsResult = await comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!comparePasswordsResult) throw new UnauthorizedException();
    if (comparePasswordsResult) {
      const token = await this.jwtService.signAsync({ sub: user.id });

      return {
        token: token,
        userId: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        valid: user.valid,
      };
    }
  }

  async getUserInfos(token: string) {
    try {
      const tokenInfos = await this.jwtService.verifyAsync(token);

      const user = await this.userRepository.findOne({
        where: { id: tokenInfos.sub },
      });
      return {
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        valid: user.valid,
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async updateUserInfosByUserId(updateUserDto: UpdateUserDto): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { id: updateUserDto.userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }
    Object.keys(updateUserDto).forEach(async (key) => {
      const value = (updateUserDto as any)[key];

      if (value !== '' && value !== undefined && key !== 'userId') {
        if (key === 'password') {
          const hashedPassword = await hashPassword(value);
          existingUser[key] = hashedPassword;
        } else {
          existingUser[key] = value;
        }
      }
    });

    await this.userRepository.save(existingUser);
  }
}
