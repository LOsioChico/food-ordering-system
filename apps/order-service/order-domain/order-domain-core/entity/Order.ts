import { AggregateRoot } from 'apps/common/src/domain/entity/AggregateRoot';
import { CustomerId } from 'apps/common/src/domain/value-object/CustomerId';
import { RestaurantId } from 'apps/common/src/domain/value-object/RestaurantId';
import { StreetAddress } from '../value-object/StreetAddress';
import { Money } from 'apps/common/src/domain/value-object/Money';
import { OrderItem } from './OrderItem';
import { TrackingId } from '../value-object/TrackingId';
import { OrderStatus } from 'apps/common/src/domain/value-object/OrderStatus';
import { OrderId } from 'apps/common/src/domain/value-object/OrderId';
import { randomUUID } from 'node:crypto';
import { OrderItemId } from '../value-object/OrderItemId';
import { OrderDomainException } from '../exception/OrderDomainException';

export class Order extends AggregateRoot<OrderId> {
  private readonly customerId: CustomerId;
  private readonly restaurantId: RestaurantId;
  private readonly streetAddress: StreetAddress;
  private readonly price: Money;
  private readonly items: OrderItem[];

  private trackingId: TrackingId;
  private orderStatus: OrderStatus;
  private failureMessages: string[];

  public initializeOrder(): void {
    this.setId(new OrderId(randomUUID()));
    this.trackingId = new TrackingId(randomUUID());
    this.orderStatus = OrderStatus.PENDING;
    this.initializeOrderItems();
  }

  public validateOrder(): void {
    this.validateInitialOrder();
    this.validateTotalPrice();
    this.validateItemsPrice();
  }

  private validateInitialOrder(): void {
    if (this.orderStatus != null || this.getId() != null) {
      throw new OrderDomainException(
        'Order is not in correct state for initialization!',
      );
    }
  }

  private validateTotalPrice(): void {
    if (this.price == null || !this.price.isGreaterThanZero()) {
      throw new OrderDomainException('Total price must be greater than zero!');
    }
  }
  private validateItemsPrice(): void {
    const orderItemsTotal = this.items
      .map((orderItem) => {
        this.validateItemPrice(orderItem);
        return orderItem.getSubTotal();
      })
      .reduce((prev, curr) => prev.add(curr), Money.ZERO);

    if (this.price.equals(orderItemsTotal)) {
      throw new OrderDomainException(
        `Total price: ${this.price.getAmount().toString()} is not equal to Order items total: ${orderItemsTotal.getAmount().toString()}!`,
      );
    }
  }

  private validateItemPrice(orderItem: OrderItem): void {
    if (!orderItem.isPriceValid()) {
      throw new OrderDomainException(
        `Order item price: ${orderItem.getPrice().getAmount().toString()} is not valid for product ${orderItem.getProduct().getId().getValue()}`,
      );
    }
  }

  private initializeOrderItems(): void {
    let itemId = 1;
    for (const orderItem of this.items) {
      orderItem.initializeOrder(super.getId(), new OrderItemId(itemId++));
    }
  }

  constructor(orderBuilder: OrderBuilder) {
    super(orderBuilder.getOrderId());
    this.customerId = orderBuilder.getCustomerId();
    this.restaurantId = orderBuilder.getRestaurantId();
    this.streetAddress = orderBuilder.getStreetAddress();
    this.price = orderBuilder.getPrice();
    this.items = orderBuilder.getItems();
    this.trackingId = orderBuilder.getTrackingId();
    this.orderStatus = orderBuilder.getOrderStatus();
    this.failureMessages = orderBuilder.getFailureMessages();
  }

  public static builder(): OrderBuilder {
    return new OrderBuilder();
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getRestaurantId(): RestaurantId {
    return this.restaurantId;
  }

  public getStreetAddress(): StreetAddress {
    return this.streetAddress;
  }

  public getPrice(): Money {
    return this.price;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getTrackingId(): TrackingId {
    return this.trackingId;
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public getFailureMessages(): string[] {
    return this.failureMessages;
  }
}

class OrderBuilder {
  private orderId: OrderId;
  private customerId: CustomerId;
  private restaurantId: RestaurantId;
  private streetAddress: StreetAddress;
  private price: Money;
  private items: OrderItem[];
  private trackingId: TrackingId;
  private orderStatus: OrderStatus;
  private failureMessages: string[];

  public getOrderId(): OrderId {
    return this.orderId;
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getRestaurantId(): RestaurantId {
    return this.restaurantId;
  }

  public getStreetAddress(): StreetAddress {
    return this.streetAddress;
  }

  public getPrice(): Money {
    return this.price;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getTrackingId(): TrackingId {
    return this.trackingId;
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public getFailureMessages(): string[] {
    return this.failureMessages;
  }

  public withOrderId(orderId: OrderId): OrderBuilder {
    this.orderId = orderId;
    return this;
  }

  public withCustomerId(customerId: CustomerId): OrderBuilder {
    this.customerId = customerId;
    return this;
  }

  public withRestaurantId(restaurantId: RestaurantId): OrderBuilder {
    this.restaurantId = restaurantId;
    return this;
  }

  public withStreetAddress(streetAddress: StreetAddress): OrderBuilder {
    this.streetAddress = streetAddress;
    return this;
  }

  public withPrice(price: Money): OrderBuilder {
    this.price = price;
    return this;
  }

  public withItems(items: OrderItem[]): OrderBuilder {
    this.items = items;
    return this;
  }

  public withTrackingId(trackingId: TrackingId): OrderBuilder {
    this.trackingId = trackingId;
    return this;
  }

  public withOrderStatus(orderStatus: OrderStatus): OrderBuilder {
    this.orderStatus = orderStatus;
    return this;
  }

  public withFailureMessages(failureMessages: string[]): OrderBuilder {
    this.failureMessages = failureMessages;
    return this;
  }

  public build(): Order {
    return new Order(this);
  }
}
