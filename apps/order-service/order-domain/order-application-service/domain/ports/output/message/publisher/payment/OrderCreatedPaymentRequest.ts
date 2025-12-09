import { DomainEventPublisher } from 'apps/common/common-domain/event/publisher/DomainEventPublisher';
import { OrderCreatedEvent } from 'apps/order-service/order-domain/order-domain-core/event/OrderEvents';

export interface OrderCreatedPaymentRequestMessagePublisher extends DomainEventPublisher<OrderCreatedEvent> {}
