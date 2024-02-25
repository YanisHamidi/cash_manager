import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm';
import { BrevoService } from './services/brevo.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret:
        '0affcbd6ab8594eea41b4cc063c225821a745e1a6e38e7a960e9c5bdff4fe791',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, BrevoService],
  exports: [UserService],
})
export class UsersModule {}
