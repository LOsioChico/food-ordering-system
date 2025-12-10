import { DomainEvent } from 'apps/common/common-domain/event/DomainEvent';
import { Order } from '../entity/Order';

abstract class OrderEvent implements DomainEvent<Order> {
  constructor(
    private readonly order: Order,
    private readonly createdAt: Date,
  ) {}

  public getOrder(): Order {
    return this.order;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

export class OrderCancelledEvent extends OrderEvent {}
export class OrderCreatedEvent extends OrderEvent {}
export class OrderPaidEvent extends OrderEvent {}
