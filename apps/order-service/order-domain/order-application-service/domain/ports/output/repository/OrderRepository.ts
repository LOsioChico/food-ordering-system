import { Order } from 'apps/order-service/order-domain/order-domain-core/domain/entity/Order';
import { TrackingId } from 'apps/order-service/order-domain/order-domain-core/domain/value-object/TrackingId';
import { EntityManager } from 'typeorm';

export interface OrderRepository {
  saveWithManager(manager: EntityManager, order: Order): Promise<Order>;
  findByTrackingIdWithManager(
    manager: EntityManager,
    trackingId: TrackingId,
  ): Promise<Order | undefined>;
}
