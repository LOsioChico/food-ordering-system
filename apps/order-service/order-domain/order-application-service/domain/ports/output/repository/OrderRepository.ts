import { Order } from 'apps/order-service/order-domain/order-domain-core/entity/Order';
import { TrackingId } from 'apps/order-service/order-domain/order-domain-core/value-object/TrackingId';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findByTrackingId(trackingId: TrackingId): Order | undefined;
}
