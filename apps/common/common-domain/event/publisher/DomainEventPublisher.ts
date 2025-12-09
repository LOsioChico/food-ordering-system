import { DomainEvent } from '../DomainEvent';

export interface DomainEventPublisher<T extends DomainEvent> {
  publish(domainEvent: T): void;
}
