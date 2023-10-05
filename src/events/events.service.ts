import { Injectable } from '@nestjs/common';
import events from '../dummyServices/events';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private events = events;

  create(createEventDto: CreateEventDto) {
    const id = events.length + 1;
    const newEvent = { id: id.toString(), ...createEventDto };
    events.push(newEvent);
    return newEvent;
  }

  update(updateEventDto: any, id: string) {
    const index = events.findIndex((event) => event.id === id);
    this.events[index] = { id: id, ...updateEventDto };
    return this.events[index];
  }

  delete(id: string) {
    const filteredEvents = events.filter((event) => event.id !== id);
    this.events = filteredEvents;
    return 'Event deleted';
  }

  findAll() {
    return this.events;
  }

  findById(id: string) {
    return this.events.find((event) => event.id === id);
  }

  findDailyEvents(date: string, user: any) {
    console.log(user);
    const currentDate = new Date(date);
    if (isNaN(currentDate.getTime())) return 'Invalid Date';

    const userEvents = events.filter(
      (event) => event.Date === date && event.UserID === user.sub,
    );
    return userEvents;
  }

  findWeaklyEvents(date: string, user: any) {
    console.log(user);
    const currentDate = new Date(date);
    if (isNaN(currentDate.getTime())) return 'Invalid Date';
    console.log('Current date: ', currentDate);

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

    const userEvents = events.filter((event) => {
      const eventDate = new Date(event.Date);
      return (
        eventDate >= startDate &&
        eventDate <= endDate &&
        event.UserID === user.sub
      );
    });

    const daysOfWeek = [];

    while (startDate <= endDate) {
      daysOfWeek.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log('hello');

    const allEventsOfWeek = [];

    for (const day of daysOfWeek) {
      for (const event of userEvents) {
        if (
          event.IsRecurring &&
          event.CategoryID === 'Daily' &&
          new Date(day) >= new Date(event.Date)
        ) {
          allEventsOfWeek.push({
            ...event,
            Date: day,
          });
        } else if (event.Date === day) {
          allEventsOfWeek.push(event);
        }
      }
    }

    return allEventsOfWeek;
  }

  findMonthlyEvents(date: string, user: any) {
    const currentDate = new Date(date);
    if (isNaN(currentDate.getTime())) return 'Invalid Date';
    console.log('Current date: ', currentDate);

    const userEvents = events.filter((event) => {
      const eventDate = new Date(event.Date);
      const eventMonth = eventDate.getMonth() + 1;
      const currentMonth = currentDate.getMonth() + 1;
      return eventMonth === currentMonth && event.UserID === user.sub;
    });
    console.log(userEvents);

    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const daysOfMonth = [];

    for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
      daysOfMonth.push(lastDayOfMonth.toISOString().split('T')[0]);
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
    }
    console.log('hello');

    const allEventsOfMonth = [];
    console.log(daysOfMonth);

    for (const day of daysOfMonth) {
      for (const event of userEvents) {
        if (
          event.IsRecurring &&
          event.CategoryID === 'Daily' &&
          new Date(day) >= new Date(event.Date)
        ) {
          allEventsOfMonth.push({
            ...event,
            Date: day,
          });
        } else if (event.Date === day) {
          allEventsOfMonth.push(event);
        }
      }
    }
    console.log(allEventsOfMonth);
    return allEventsOfMonth;
  }
}
