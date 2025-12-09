import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    cause?: Error,
  ) {
    super(
      {
        message,
        cause,
      },
      statusCode,
      {
        cause,
      },
    );
  }
}
