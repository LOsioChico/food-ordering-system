import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'apps/common/common-domain/exception/DomainException';

type OrderNotFoundExceptionProps = {
  message: string;
  statusCode?: HttpStatus;
  cause?: Error;
};

const DEFAULT_STATUS_CODE = HttpStatus.NOT_FOUND;

export class OrderNotFoundException extends DomainException {
  constructor(state: OrderNotFoundExceptionProps) {
    super({
      message: state.message,
      statusCode: state.statusCode ?? DEFAULT_STATUS_CODE,
      cause: state.cause,
    });
  }
}
