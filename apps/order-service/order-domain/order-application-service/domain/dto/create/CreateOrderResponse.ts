import { OrderStatus } from 'apps/common/common-domain/value-object/OrderStatus';
import { IsNotEmpty } from 'class-validator';
import type { UUID } from 'node:crypto';

type CreateOrderResponseProps = {
  orderTrackingId: UUID;
  orderStatus: OrderStatus;
  message: string;
};

export class CreateOrderResponse {
  @IsNotEmpty()
  private readonly orderTrackingId: UUID;

  @IsNotEmpty()
  private readonly orderStatus: OrderStatus;

  @IsNotEmpty()
  private readonly message: string;

  constructor(props: CreateOrderResponseProps) {
    this.orderTrackingId = props.orderTrackingId;
    this.orderStatus = props.orderStatus;
    this.message = props.message;
  }

  public getOrderTrackingId(): UUID {
    return this.orderTrackingId;
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public getMessage(): string {
    return this.message;
  }
}
