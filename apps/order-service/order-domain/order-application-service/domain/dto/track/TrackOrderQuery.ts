import { IsNotEmpty } from 'class-validator';
import type { UUID } from 'node:crypto';

type TrackOrderQueryProps = {
  orderTrackingId: UUID;
};

export class TrackOrderQuery {
  @IsNotEmpty()
  private readonly orderTrackingId: UUID;

  constructor(props: TrackOrderQueryProps) {
    this.orderTrackingId = props.orderTrackingId;
  }

  public getOrderTrackingId(): UUID {
    return this.orderTrackingId;
  }
}
