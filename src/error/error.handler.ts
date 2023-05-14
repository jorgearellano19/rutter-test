import {Response} from 'express';
import STATUS_CODES from '../utils/statusCodes';

import {AppError} from './app.error';

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return (error as AppError).isOperational;
    }

    return false;
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  handleTrustedError(error: AppError, response: Response) {
    response.status(error.httpCode).json({
      message: error.message,
      name: error.name,
    });
  }

  handleCriticalError(_error: Error | AppError, response?: Response) {
    console.log(response);
    if (response) {
      response
        .sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({message: 'Internal server error'});
    }

    console.log('Application encountered a critical error. Exiting');
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
