import { HttpException, HttpStatus } from '@nestjs/common';

type DomainExceptionProps = {
  message: string;
  statusCode?: HttpStatus;
  cause?: Error;
};

const DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;

export class DomainException extends HttpException {
  constructor(state: DomainExceptionProps) {
    super(
      {
        message: state.message,
        cause: state.cause,
      },
      state.statusCode ?? DEFAULT_STATUS_CODE,
      {
        cause: state.cause,
      },
    );
  }
}
