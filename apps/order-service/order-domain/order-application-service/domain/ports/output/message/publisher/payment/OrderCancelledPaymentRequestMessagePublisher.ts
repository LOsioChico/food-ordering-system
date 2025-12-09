import { DomainEventPublisher } from 'apps/common/common-domain/event/publisher/DomainEventPublisher';
import { OrderCancelledEvent } from 'apps/order-service/order-domain/order-domain-core/event/OrderEvents';

export interface OrderCancelledPaymentRequestMessagePublisher extends DomainEventPublisher<OrderCancelledEvent> {}
