import ApiError from '../errors/ApiError';
import config from '../config';
import { IGenericErrorMessages } from '../interfaces/error';
import handleValidationError from '../errors/handleValidationError';
import { errorLogger } from '../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('globalErrorHandler ~', error)
    : errorLogger.error('globalErrorHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error?.name === 'ValidationError') {
    const simpleFieldError = handleValidationError(error);
    statusCode = simpleFieldError.statusCode;
    message = simpleFieldError.message;
    errorMessages = simpleFieldError.errorMessages;
  } else if (error instanceof ZodError) {
    const simpleFieldError = handleZodError(error);
    statusCode = simpleFieldError.statusCode;
    message = simpleFieldError.message;
    errorMessages = simpleFieldError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
