import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from 'src/users/users.service';
import { GetEventsQueryParametersDto } from './dto/queryparametrs-event.dto';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('')
  create(@Body() createEventDto: CreateEventDto) {
    const user = this.usersService.findById(createEventDto.UserID);
    if (!user) return 'No user found';
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateEventDto: any) {
    console.log(UpdateEventDto, id);
    return this.eventsService.update(UpdateEventDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Get('')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('day')
  @UseGuards(JwtAuthGuard)
  @UsePipes()
  findDailyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findDailyEvents(date, req.user);
  }

  @Get('week')
  @UseGuards(JwtAuthGuard)
  @UsePipes()
  findWeeklyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findWeaklyEvents(date, req.user);
  }
  @Get('month')
  @UseGuards(JwtAuthGuard)
  @UsePipes()
  findMonthlyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findMonthlyEvents(date, req.user);
  }
}
