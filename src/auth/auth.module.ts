import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from 'src/common/filters/exception.filter';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your_secret_key',
      signOptions: {
        expiresIn: '5h', // Set the expiration time for the token
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
