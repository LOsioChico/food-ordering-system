import { Injectable, Logger } from '@nestjs/common';
import { TrackOrderQuery } from './domain/dto/track/TrackOrderQuery';
import { TrackOrderResponse } from './domain/dto/track/TrackOrderResponse';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import type { OrderRepository } from './domain/ports/output/repository/OrderRepository';
import { DataSource } from 'typeorm';
import { TrackingId } from '../order-domain-core/value-object/TrackingId';
import { OrderDomainException } from '../order-domain-core/exception/OrderDomainException';
import { OrderNotFoundException } from '../order-domain-core/exception/OrderNotFoundException';

@Injectable()
export class OrderTrackCommandHandler {
  private readonly logger = new Logger(OrderTrackCommandHandler.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly orderDataMapper: OrderDataMapper,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async trackOrder(
    trackOrderQuery: TrackOrderQuery,
  ): Promise<TrackOrderResponse> {
    return await this.dataSource.transaction<TrackOrderResponse>(
      async (manager) => {
        const orderResult =
          await this.orderRepository.findByTrackingIdWithManager(
            manager,
            new TrackingId(trackOrderQuery.getOrderTrackingId()),
          );
        if (!orderResult) {
          this.logger.warn(
            `Could not find order with tracking id ${trackOrderQuery.getOrderTrackingId()}`,
          );
          throw new OrderNotFoundException({
            message: `Could not find order with tracking id ${trackOrderQuery.getOrderTrackingId()}`,
          });
        }
        return this.orderDataMapper.orderToTrackOrderResponse(orderResult);
      },
    );
  }
}
