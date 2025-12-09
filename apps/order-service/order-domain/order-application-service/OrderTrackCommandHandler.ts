import { Injectable, Logger } from '@nestjs/common';
import { TrackOrderQuery } from './domain/dto/track/TrackOrderQuery';
import { TrackOrderResponse } from './domain/dto/track/TrackOrderResponse';

@Injectable()
export class OrderTrackCommandHandler {
  private readonly logger = new Logger(OrderTrackCommandHandler.name);

  public trackOrder(trackOrderQuery: TrackOrderQuery): TrackOrderResponse {}
}
