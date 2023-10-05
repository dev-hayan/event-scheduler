import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestValidationPipe } from 'src/common/pipes/validation.pipe';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  @UsePipes(new RequestValidationPipe())
  async login(@Body() createLoginDto: LoginDto, @Res() res: Response) {
    const { email, password } = createLoginDto;
    const user = this.authService.validateUser(email, password);
    if (!user) return res.status(400).send('Invalid credentials');
    const token = await this.authService.generateJwtToken(user);
    return res.status(200).send(token);
  }
}
