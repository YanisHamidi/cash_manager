import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { BrevoService } from './services/brevo.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let brevoService: BrevoService;

  beforeEach(async () => {
    const userServiceMock = {
      createUser: jest.fn(),
      confirmAccount: jest.fn(),
      loginUser: jest.fn(),
      getUserInfos: jest.fn(),
      updateUserInfosByUserId: jest.fn(),
      getConfirmAccount: jest.fn(),
    };

    const brevoServiceMock = {
      sendEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: BrevoService, useValue: brevoServiceMock },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    brevoService = module.get<BrevoService>(BrevoService);
  });

  describe('createUsers', () => {
    it('should call userService.createUser and brevoService.sendEmail', async () => {
      const dto = new CreateUserDto();
      const response = {
        email: 'test@test.com',
        firstname: 'Test',
        lastname: 'Test',
        id: 1,
        password: 'password',
        valid: true,
        shops: null,
        orders: null,
      };

      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(response);
      jest.spyOn(brevoService, 'sendEmail').mockResolvedValueOnce(undefined);

      await controller.createUsers(dto);

      expect(userService.createUser).toHaveBeenCalledWith(dto);
      expect(brevoService.sendEmail).toHaveBeenCalledWith(
        response.email,
        response.firstname,
        `Bien vu chef ton lien : <a href="https://localhost:3000/users/confirm-account?id=${response.id}">Confirmer ton compte</a>`,
        'Veuillez confirmer votre compte',
      );
    });
  });

  describe('getConfirmAccount', () => {
    it('should call userService.confirmAccount', async () => {
      const id = 1;
      jest
        .spyOn(userService, 'getConfirmAccount')
        .mockResolvedValueOnce(undefined);

      await controller.getConfirmAccount(id);

      expect(userService.getConfirmAccount).toHaveBeenCalledWith(id);
    });
  });

  describe('loginUser', () => {
    it('should call userService.loginUser', async () => {
      const dto = new LoginUserDto();
      const response = {
        token: 'token',
        email: 'test@test.com',
        firstname: 'Test',
        userId: 1,
        lastname: 'Test',
        valid: true as any,
      };
      jest.spyOn(userService, 'loginUser').mockResolvedValueOnce(response);

      const result = await controller.loginUser(dto);

      expect(userService.loginUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(response);
    });
  });

  describe('getUserInfos', () => {
    it('should call userService.getUserInfos', async () => {
      const id = '1';
      const response = {
        email: 'test@test.com',
        firstname: 'Test',
        userId: 1,
        lastname: 'Test',
        valid: true,
      };
      jest.spyOn(userService, 'getUserInfos').mockResolvedValueOnce(response);

      const result = await controller.getUserInfo('1');

      expect(userService.getUserInfos).toHaveBeenCalledWith(id);
      expect(result).toEqual(response);
    });
  });

  describe('updateUserInfosByUserId', () => {
    it('should call userService.updateUserInfosByUserId', async () => {
      const dto = new UpdateUserDto();
      const response = {
        email: 'test@test.com',
        password: 'password',
        firstname: 'Test',
        lastname: 'Test',
        userId: 1,
      };
      jest
        .spyOn(userService, 'updateUserInfosByUserId')
        .mockResolvedValueOnce();

      const result = await controller.updateUserInfosByUserId(dto);

      expect(userService.updateUserInfosByUserId).toHaveBeenCalledWith(dto);
      if (response) expect(result).toEqual(undefined);
    });
  });
});
