// validation-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === HttpStatus.BAD_REQUEST) {
      const validationErrors = exception.getResponse() as any;

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: validationErrors.errors, // Custom error message
      });
    } else {
      // Handle other types of exceptions if needed
      console.log(exception);
      response.status(status).json({
        statusCode: status,
        message: 'Internal server error', // or a custom message
      });
    }
  }
}
