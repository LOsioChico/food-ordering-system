import { Order } from 'apps/order-service/order-domain/order-domain-core/entity/Order';
import { TrackingId } from 'apps/order-service/order-domain/order-domain-core/value-object/TrackingId';
import { EntityManager } from 'typeorm';

export interface OrderRepository {
  saveWithManager(manager: EntityManager, order: Order): Promise<Order>;
  findByTrackingIdWithManager(
    manager: EntityManager,
    trackingId: TrackingId,
  ): Promise<Order | undefined>;
}
