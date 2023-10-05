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
import { RequestValidationPipe } from 'src/common/pipes/validation.pipe';
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

  @Post('create')
  create(@Body(new RequestValidationPipe()) createEventDto: CreateEventDto) {
    const user = this.usersService.findById(createEventDto.UserID);
    if (!user) return 'No user found';
    return this.eventsService.create(createEventDto);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body(new RequestValidationPipe()) UpdateEventDto: any,
  ) {
    console.log(UpdateEventDto, id);
    return this.eventsService.update(UpdateEventDto, id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }

  @Get('all')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('day')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new RequestValidationPipe())
  findDailyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findDailyEvents(date, req.user);
  }

  @Get('week')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new RequestValidationPipe())
  findWeeklyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findWeaklyEvents(date, req.user);
  }
  @Get('month')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new RequestValidationPipe())
  findMonthlyEvents(
    @Query() queryParameters: GetEventsQueryParametersDto,
    @Request() req,
  ) {
    const { date } = queryParameters;
    return this.eventsService.findMonthlyEvents(date, req.user);
  }
}
