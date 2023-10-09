import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from '../common/filters/exception.filter';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
