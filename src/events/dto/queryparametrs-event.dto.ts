import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetEventsQueryParametersDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date',
  })
  @IsString()
  @IsNotEmpty({ message: 'Date cannot be empty' })
  readonly date: string;
}
