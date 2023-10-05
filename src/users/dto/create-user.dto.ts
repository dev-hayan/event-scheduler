import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  readonly email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: 'Password must be strong',
    },
  )
  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string;
}
