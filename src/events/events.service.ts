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
    startDate.setDate(currentDate.getDate() - (currentDate.getDay() - 1));

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));

    const weeklyEvents = events.filter((event) => {
      const eventDate = new Date(event.Date);
      return endDate >= eventDate && event.UserID === user.sub;
    });

    const daysOfWeek = [];

    while (startDate <= endDate) {
      daysOfWeek.push(startDate.toISOString().split('T')[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log(weeklyEvents);

    const allEventsOfMonth = [];

    for (const day of daysOfWeek) {
      const currentWeekDay = new Date(day);
      for (const event of weeklyEvents) {
        const eventDate = new Date(event.Date);
        if (
          event.IsRecurring &&
          event.CategoryID === 'Daily' &&
          currentWeekDay >= eventDate
        ) {
          allEventsOfMonth.push({
            ...event,
            Date: day,
          });
        } else if (event.IsRecurring && event.CategoryID === 'Weekly') {
          const extendedDate = new Date(eventDate);
          extendedDate.setDate(eventDate.getDate() + 7);
          console.log(currentWeekDay, '    ', extendedDate);
          if (currentWeekDay.getDate() === extendedDate.getDate()) {
            console.log('hello motto');
            allEventsOfMonth.push({
              ...event,
              Date: day,
            });
          }
        } else if (event.Date === day) {
          allEventsOfMonth.push(event);
        }
      }
    }

    return allEventsOfMonth;
  }

  findMonthlyEvents(date: string, user: any) {
    const currentDate = new Date(date);
    if (isNaN(currentDate.getTime())) return 'Invalid Date';
    console.log('Current date: ', currentDate);

    const lastDayOfMonth = this.getEndOfMonth(currentDate);

    const monthlyEvents = events.filter((event) => {
      const eventDate = new Date(event.Date);
      return lastDayOfMonth >= eventDate && event.UserID === user.sub;
    });

    const daysOfMonth = [];

    for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
      daysOfMonth.push(lastDayOfMonth.toISOString().split('T')[0]);
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);
    }

    const allEventsOfMonth = [];
    console.log(daysOfMonth);

    for (const day of daysOfMonth) {
      const currentWeekDay = new Date(day);
      for (const event of monthlyEvents) {
        const eventDate = new Date(event.Date);
        if (
          event.IsRecurring &&
          event.CategoryID === 'Daily' &&
          currentWeekDay >= eventDate
        ) {
          allEventsOfMonth.push({
            ...event,
            Date: day,
          });
        } else if (event.IsRecurring && event.CategoryID === 'Weekly') {
          const extendedDate = new Date(eventDate);
          extendedDate.setDate(eventDate.getDate() + 7);
          console.log(currentWeekDay, '    ', extendedDate);
          if (currentWeekDay.getDate() === extendedDate.getDate()) {
            console.log('hello motto');
            allEventsOfMonth.push({
              ...event,
              Date: day,
            });
          }
        } else if (event.Date === day) {
          allEventsOfMonth.push(event);
        }
      }
    }
    console.log(allEventsOfMonth);
    return allEventsOfMonth;
  }

  getEndOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0); // Setting day to 0 gives the last day of the previous month
    return lastDay;
  }
}
