import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderCommand } from './domain/dto/create/CreateOrderCommand';
import { CreateOrderResponse } from './domain/dto/create/CreateOrderResponse';
import { TrackOrderQuery } from './domain/dto/track/TrackOrderQuery';
import { TrackOrderResponse } from './domain/dto/track/TrackOrderResponse';
import { OrderApplicationService } from './domain/ports/input/service/OrderApplicationService';
import { OrderCreateCommandHandler } from './OrderCreateCommandHandler';
import { OrderTrackCommandHandler } from './OrderTrackCommandHandler';

@Injectable()
export class OrderApplicationServiceImpl implements OrderApplicationService {
  private readonly logger = new Logger(OrderApplicationServiceImpl.name);

  constructor(
    private readonly orderCreateCommandHandler: OrderCreateCommandHandler,
    private readonly orderTrackCommandHandler: OrderTrackCommandHandler,
  ) {}

  createOrder(createOrderCommand: CreateOrderCommand): CreateOrderResponse {
    return this.orderCreateCommandHandler.createOrder(createOrderCommand);
  }

  trackOrder(trackOrderQuery: TrackOrderQuery): TrackOrderResponse {
    return this.orderTrackCommandHandler.trackOrder(trackOrderQuery);
  }
}
