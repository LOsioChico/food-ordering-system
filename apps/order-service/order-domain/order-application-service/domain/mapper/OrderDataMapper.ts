import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateOrderCommand } from '../dto/create/CreateOrderCommand';
import { ProductId } from 'apps/common/common-domain/value-object/ProductId';
import { RestaurantId } from 'apps/common/common-domain/value-object/RestaurantId';
import { Order } from 'apps/order-service/order-domain/order-domain-core/entity/Order';
import { CustomerId } from 'apps/common/common-domain/value-object/CustomerId';
import { Money } from 'apps/common/common-domain/value-object/Money';
import { OrderItem as OrderItemEntity } from 'apps/order-service/order-domain/order-domain-core/entity/OrderItem';
import { StreetAddress } from 'apps/order-service/order-domain/order-domain-core/value-object/StreetAddress';
import { Product } from 'apps/order-service/order-domain/order-domain-core/entity/Product';
import { OrderItemId } from 'apps/order-service/order-domain/order-domain-core/value-object/OrderItemId';
import { OrderId } from 'apps/common/common-domain/value-object/OrderId';
import { OrderAddress } from '../dto/create/OrderAddress';
import { OrderItem } from '../dto/create/OrderItem';
import { CreateOrderResponse } from '../dto/create/CreateOrderResponse';
import { TrackOrderResponse } from '../dto/track/TrackOrderResponse';

@Injectable()
export class OrderDataMapper {
  createOrderCommandToRestaurant(
    createOrderCommand: CreateOrderCommand,
  ): [RestaurantId, ProductId[]] {
    const restaurantId = new RestaurantId(createOrderCommand.getRestaurantId());
    const productIds = createOrderCommand
      .getItems()
      .map((orderItem) => new ProductId(orderItem.getProductId()));
    return [restaurantId, productIds];
  }

  createOrderCommandToOrder(createOrderCommand: CreateOrderCommand): Order {
    return new Order({
      customerId: new CustomerId(createOrderCommand.getCustomerId()),
      restaurantId: new RestaurantId(createOrderCommand.getRestaurantId()),
      price: new Money(createOrderCommand.getPrice()),
      items: this.orderItemsToOrderItemEntities(createOrderCommand.getItems()),
      streetAddress: this.orderAddressToStreetAddress(
        createOrderCommand.getAddress(),
      ),
      failureMessages: [],
    });
  }

  public orderToCreateOrderResponse(order: Order): CreateOrderResponse {
    return new CreateOrderResponse({
      orderTrackingId: order.getTrackingId().getValue(),
      orderStatus: order.getOrderStatus(),
      message: '',
    });
  }

  public orderToTrackOrderResponse(order: Order): TrackOrderResponse {
    return new TrackOrderResponse({
      orderTrackingId: order.getTrackingId().getValue(),
      orderStatus: order.getOrderStatus(),
      failureMessages: order.getFailureMessages(),
    });
  }

  private orderItemsToOrderItemEntities(
    orderItems: OrderItem[],
  ): OrderItemEntity[] {
    return orderItems.map((orderItem) => {
      return new OrderItemEntity({
        id: new OrderItemId(0),
        orderId: new OrderId(randomUUID()),
        product: new Product({
          name: '',
          price: new Money(orderItem.getPrice()),
          productId: new ProductId(orderItem.getProductId()),
        }),
        price: new Money(orderItem.getPrice()),
        quantity: orderItem.getQuantity(),
        subTotal: new Money(orderItem.getSubTotal()),
      });
    });
  }

  private orderAddressToStreetAddress(
    orderAddress: OrderAddress,
  ): StreetAddress {
    return new StreetAddress(
      randomUUID(),
      orderAddress.getStreet(),
      orderAddress.getPostalCode(),
      orderAddress.getCity(),
    );
  }
}
