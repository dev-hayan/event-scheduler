import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  Title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  Description: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'InValid date',
  })
  @IsString()
  @IsNotEmpty({ message: 'Date cannot be empty' })
  Date: string; // You can use a Date type if you prefer

  @IsString()
  @IsNotEmpty({ message: 'Start Time cannot be empty' })
  startTime: string;

  @IsString()
  @IsNotEmpty({ message: 'End Time cannot be empty' })
  endTime: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Recurring cannot be empty' })
  IsRecurring: boolean;

  @IsString()
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  UserID: string;

  @IsString()
  CategoryID: string;
}
