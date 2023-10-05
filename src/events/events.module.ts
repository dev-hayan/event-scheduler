import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from 'src/common/filters/exception.filter';

@Module({
  imports: [UsersModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class EventsModule {}
