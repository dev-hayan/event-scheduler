import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization.split(' ')[0];
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'your_secret_key',
      });
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
