import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import type { UUID } from 'node:crypto';
import { OrderStatus } from 'apps/common/common-domain/value-object/OrderStatus';

type TrackOrderResponseProps = {
  orderTrackingId: UUID;
  orderStatus: OrderStatus;
  failureMessages?: string[];
};

export class TrackOrderResponse {
  @IsNotEmpty()
  private readonly orderTrackingId: UUID;

  @IsNotEmpty()
  private readonly orderStatus: OrderStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  private readonly failureMessages: string[] = [];

  constructor(props: TrackOrderResponseProps) {
    this.orderTrackingId = props.orderTrackingId;
    this.orderStatus = props.orderStatus;
    this.failureMessages = props.failureMessages ?? [];
  }

  public getOrderTrackingId(): UUID {
    return this.orderTrackingId;
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public getFailureMessages(): string[] {
    return this.failureMessages;
  }
}
