import { DomainEventPublisher } from 'apps/common/common-domain/event/publisher/DomainEventPublisher';
import { OrderPaidEvent } from 'apps/order-service/order-domain/order-domain-core/domain/event/OrderEvents';

export interface OrderPaidRestaurantRequestMessagePublisher extends DomainEventPublisher<OrderPaidEvent> {}
