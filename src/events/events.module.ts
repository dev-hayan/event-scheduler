import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { UsersModule } from 'src/users/users.module';

import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [UsersModule],
  controllers: [EventsController],
  providers: [EventsService, JwtAuthGuard],
})
export class EventsModule {}
