import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MESSAGE_KEYS, formatMessage } from '@/share/messages';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    // Map HTTP status codes to message keys
    let messageKey: string = MESSAGE_KEYS.COMMON.INTERNAL_ERROR;
    let errors: string[] = [];

    if (status === 400) {
      messageKey = MESSAGE_KEYS.COMMON.BAD_REQUEST;
      if (exceptionResponse.message) {
        errors = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message];
      }
    } else if (status === 401) {
      messageKey = MESSAGE_KEYS.COMMON.UNAUTHORIZED;
    } else if (status === 403) {
      messageKey = MESSAGE_KEYS.COMMON.FORBIDDEN;
    } else if (status === 404) {
      messageKey = MESSAGE_KEYS.USER.NOT_FOUND;
    } else if (status === 422) {
      messageKey = MESSAGE_KEYS.COMMON.VALIDATION_ERROR;
      if (exceptionResponse.message) {
        errors = Array.isArray(exceptionResponse.message)
          ? exceptionResponse.message
          : [exceptionResponse.message];
      }
    }

    const errorResponse = {
      success: false,
      messageKey,
      message: formatMessage(messageKey),
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
