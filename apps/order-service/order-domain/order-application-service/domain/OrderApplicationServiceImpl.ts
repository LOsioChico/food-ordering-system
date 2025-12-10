import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderCommand } from './dto/create/CreateOrderCommand';
import { CreateOrderResponse } from './dto/create/CreateOrderResponse';
import { TrackOrderQuery } from './dto/track/TrackOrderQuery';
import { TrackOrderResponse } from './dto/track/TrackOrderResponse';
import { OrderApplicationService } from './ports/input/service/OrderApplicationService';
import { OrderCreateCommandHandler } from './OrderCreateCommandHandler';
import { OrderTrackCommandHandler } from './OrderTrackCommandHandler';

@Injectable()
export class OrderApplicationServiceImpl implements OrderApplicationService {
  private readonly logger = new Logger(OrderApplicationServiceImpl.name);

  constructor(
    private readonly orderCreateCommandHandler: OrderCreateCommandHandler,
    private readonly orderTrackCommandHandler: OrderTrackCommandHandler,
  ) {}

  public async createOrder(
    createOrderCommand: CreateOrderCommand,
  ): Promise<CreateOrderResponse> {
    return this.orderCreateCommandHandler.createOrder(createOrderCommand);
  }

  public async trackOrder(
    trackOrderQuery: TrackOrderQuery,
  ): Promise<TrackOrderResponse> {
    return this.orderTrackCommandHandler.trackOrder(trackOrderQuery);
  }
}
