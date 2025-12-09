import { Order } from './entity/Order';
import { Restaurant } from './entity/Restaurant';
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderPaidEvent,
} from './event/OrderEvents';

export interface OrderDomainService {
  validateAndInitiateOrder(
    order: Order,
    restaurant: Restaurant,
  ): OrderCreatedEvent;

  payOrder(order: Order): OrderPaidEvent;

  approveOrder(order: Order): void;

  cancelOrderPayment(
    order: Order,
    failureMessages: string[],
  ): OrderCancelledEvent;

  cancelOrder(order: Order, failureMessages: string[]): void;
}
