import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMUserUniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.message.includes('UNIQUE constraint failed')) {
      if (exception.message.includes('email')) {
        response.status(HttpStatus.CONFLICT).json({
          message: 'Email already exists',
          status: HttpStatus.CONFLICT,
        });
      } else if (exception.message.includes('username')) {
        response.status(HttpStatus.CONFLICT).json({
          message: 'Username already exists',
          status: HttpStatus.CONFLICT,
        });
      }
    } else {
      response.status(HttpStatus.CONFLICT).json({
        message: 'Unique constraint failed',
        status: HttpStatus.CONFLICT,
      });
    }
  }
}
