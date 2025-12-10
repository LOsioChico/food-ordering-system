import { Injectable, Logger } from '@nestjs/common';
import { PaymentResponseMessageListener } from './domain/ports/input/message/listener/payment/PaymentResponseMessageListener';
import { PaymentResponse } from './domain/dto/message/PaymentResponse';

@Injectable()
export class PaymentResponseMessageListenerImpl implements PaymentResponseMessageListener {
  private readonly logger = new Logger(PaymentResponseMessageListenerImpl.name);

  public paymentCompleted(paymentResponse: PaymentResponse): void {
    throw new Error('Method not implemented.');
  }

  public paymentCancelled(paymentResponse: PaymentResponse): void {
    throw new Error('Method not implemented.');
  }
}
