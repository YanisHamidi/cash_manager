import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { hashPassword } from '../utils';

@Injectable()
export class UserService {
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
      throw new ConflictException('Email already exists');
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

  async getUsers() {
    return this.userRepository.find();
  }
}
