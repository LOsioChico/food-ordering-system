import { PaymentStatus } from 'apps/common/common-domain/value-object/PaymentStatus';
import { Decimal as BigDecimal } from 'decimal.js';

type PaymentResponseProps = {
  id: string;
  sagaId: string;
  paymentId: string;
  customerId: string;
  price: BigDecimal;
  createdAt: Date;
  paymentStatus: PaymentStatus;
  failureMessages: string[];
};

export class PaymentResponse {
  private id: string;
  private sagaId: string;
  private paymentId: string;
  private customerId: string;
  private price: BigDecimal;
  private createdAt: Date;
  private paymentStatus: PaymentStatus;
  private failureMessages: string[];

  constructor(props: PaymentResponseProps) {
    this.id = props.id;
    this.sagaId = props.sagaId;
    this.paymentId = props.paymentId;
    this.customerId = props.customerId;
    this.price = props.price;
    this.createdAt = props.createdAt;
    this.paymentStatus = props.paymentStatus;
    this.failureMessages = props.failureMessages;
  }

  public getId(): string {
    return this.id;
  }

  public getSagaId(): string {
    return this.sagaId;
  }

  public getPaymentId(): string {
    return this.paymentId;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getPrice(): BigDecimal {
    return this.price;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getPaymentStatus(): PaymentStatus {
    return this.paymentStatus;
  }

  public getFailureMessages(): string[] {
    return this.failureMessages;
  }
}
