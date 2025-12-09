import { Logger } from '@nestjs/common';
import { Order } from './entity/Order';
import { Restaurant } from './entity/Restaurant';
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderPaidEvent,
} from './event/OrderEvents';
import { OrderDomainException } from './exception/OrderDomainException';
import { OrderDomainService } from './OrderDomainService';

export class OrderDomainServiceImpl implements OrderDomainService {
  private readonly logger = new Logger(OrderDomainServiceImpl.name);

  public validateAndInitiateOrder(
    order: Order,
    restaurant: Restaurant,
  ): OrderCreatedEvent {
    this.validateRestaurant(restaurant);
    this.setOrderProductInformation(order, restaurant);
    order.validateOrder();
    this.logger.log(`Order with id : ${order.getId().toString()} is initiated`);
    return new OrderCreatedEvent(order, new Date());
  }

  public payOrder(order: Order): OrderPaidEvent {
    order.pay();
    this.logger.log(`Order with id: ${order.getId().toString()} is paid`);
    return new OrderPaidEvent(order, new Date());
  }

  public approveOrder(order: Order): void {
    order.approve();
    this.logger.log(`Order with id: ${order.getId().toString()} is approved`);
  }

  public cancelOrderPayment(
    order: Order,
    failureMessages: string[],
  ): OrderCancelledEvent {
    order.initCancel(failureMessages);
    this.logger.log(
      `Order payment ins cancelling for order id: ${order.getId().toString()}`,
    );
    return new OrderCancelledEvent(order, new Date());
  }

  public cancelOrder(order: Order, failureMessages: string[]): void {
    order.cancel(failureMessages);
    this.logger.log(`Order with id: ${order.getId().toString()} is cancelled`);
  }

  private validateRestaurant(restaurant: Restaurant): void {
    if (!restaurant.isActive()) {
      throw new OrderDomainException({
        message: `Restaurant with id ${restaurant.getId().toString()} is currently not active!`,
      });
    }
  }

  private setOrderProductInformation(
    order: Order,
    restaurant: Restaurant,
  ): void {
    order.getItems().forEach((orderItem) => {
      restaurant.getProducts().forEach((restaurantProduct) => {
        const currentProduct = orderItem.getProduct();
        if (currentProduct.equals(restaurantProduct)) {
          currentProduct.updateWithConfirmedNameAndPrice(
            restaurantProduct.getName(),
            restaurantProduct.getPrice(),
          );
        }
      });
    });
  }
}
