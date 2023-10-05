import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import users from '../dummyServices/users';
// import { ValidationExceptionFilter } from './filters/user-validation-exception.filter';

@Injectable()
export class UsersService {
  private readonly users = users;

  create(createUserDto: CreateUserDto) {
    const id = users.length + 1;
    const newUser = { id: id.toString(), ...createUserDto };

    users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findById(id: string) {
    const user = users.find((user) => user.id === id);
    return user;
  }

  findByEmail(email: string) {
    const user = users.find((user) => user.email === email);
    return user;
  }
}
