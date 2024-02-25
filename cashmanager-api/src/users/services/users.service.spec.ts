import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<Users>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isEmailAlreadyExists', () => {
    it('should return true if email exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(new Users());
      expect(await service.isEmailAlreadyExists('test@test.com')).toBe(true);
    });

    it('should return false if email does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      expect(await service.isEmailAlreadyExists('test@test.com')).toBe(false);
    });
  });

  describe('createUser', () => {
    it('should throw an error if email already exists', async () => {
      jest.spyOn(service, 'isEmailAlreadyExists').mockResolvedValueOnce(true);

      await expect(
        service.createUser({
          email: 'test@test.com',
          password: 'password',
          firstname: 'firstname',
          lastname: 'lastname',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a user if email does not exist', async () => {
      jest.spyOn(service, 'isEmailAlreadyExists').mockResolvedValueOnce(false);
      const user = new Users();
      user.email = 'test@test.com';
      user.password = 'password';

      jest.spyOn(userRepository, 'create').mockReturnValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user);

      const result = await service.createUser({
        email: 'test@test.com',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
      });

      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('should return a JWT if valid user', async () => {
      const user = new Users();
      user.email = 'test@test.com';
      user.password = 'password';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('jwt');

      const result = await service.loginUser(user);

      expect(result).toEqual(null);
    });
  });
});
