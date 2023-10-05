import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string) {
    const user = this.userService.findByEmail(email);

    if (!user) {
      return false;
    }

    // Compare the hashed password here
    const isPasswordValid = user.password === password ? true : false;

    if (!isPasswordValid) {
      return false;
    }

    return user;
  }

  async generateJwtToken(user: any) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
