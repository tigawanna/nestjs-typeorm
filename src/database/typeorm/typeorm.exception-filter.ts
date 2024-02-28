import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class GlobalTypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.constructor) {
      case QueryFailedError:
        // Handle QueryFailedError specifically
        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: exception.message,
        });
        break;
      case EntityNotFoundError:
        // Handle EntityNotFoundError
        response.status(HttpStatus.NOT_FOUND).json({
          message: exception.message,
        });
        break;

      case CannotCreateEntityIdMapError:
        // Handle CannotCreateEntityIdMapError
        response.status(HttpStatus.BAD_REQUEST).json({
          message: exception.message,
        });
        break;

      default:
        // Handle other unexpected TypeORM errors (optional)
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Internal server error',
        });
    }
  }
}
