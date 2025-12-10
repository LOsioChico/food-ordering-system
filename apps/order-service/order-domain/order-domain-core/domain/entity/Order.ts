import { AggregateRoot } from 'apps/common/common-domain/entity/AggregateRoot';
import { CustomerId } from 'apps/common/common-domain/value-object/CustomerId';
import { Money } from 'apps/common/common-domain/value-object/Money';
import { OrderStatus } from 'apps/common/common-domain/value-object/OrderStatus';
import { RestaurantId } from 'apps/common/common-domain/value-object/RestaurantId';
import { OrderDomainException } from '../exception/OrderDomainException';
import { OrderItem } from './OrderItem';
import { OrderId } from 'apps/common/common-domain/value-object/OrderId';
import { OrderItemId } from '../value-object/OrderItemId';
import { StreetAddress } from '../value-object/StreetAddress';
import { TrackingId } from '../value-object/TrackingId';
import { randomUUID } from 'node:crypto';

type OrderProps = {
  customerId: CustomerId;
  restaurantId: RestaurantId;
  streetAddress: StreetAddress;
  price: Money;
  items: OrderItem[];
  failureMessages: string[];
};

export class Order extends AggregateRoot<OrderId> {
  private readonly customerId: CustomerId;
  private readonly restaurantId: RestaurantId;
  private readonly deliveryAddress: StreetAddress;
  private readonly price: Money;
  private readonly items: OrderItem[];
  private readonly failureMessages: string[];

  private trackingId: TrackingId;
  private orderStatus: OrderStatus;

  constructor(state: OrderProps) {
    super(new OrderId(randomUUID()));
    this.customerId = state.customerId;
    this.restaurantId = state.restaurantId;
    this.deliveryAddress = state.streetAddress;
    this.price = state.price;
    this.items = state.items;
    this.failureMessages = state.failureMessages;

    this.trackingId = new TrackingId(randomUUID());
    this.orderStatus = OrderStatus.PENDING;

    this.validateTotalPrice();
    this.validateItemsPrice();
    this.initializeOrderItems();
  }

  public validateOrder() {
    this.validateTotalPrice();
    this.validateItemsPrice();
  }

  public pay(): void {
    if (this.orderStatus != OrderStatus.PENDING) {
      throw new OrderDomainException({
        message: 'Order is not correct state for pay operation!',
      });
    }
    this.orderStatus = OrderStatus.PAID;
  }

  public approve(): void {
    if (this.orderStatus != OrderStatus.PAID) {
      throw new OrderDomainException({
        message: 'Order is not in correct state for approve operation!',
      });
    }
    this.orderStatus = OrderStatus.APPROVED;
  }

  public initCancel(failureMessages: string[]): void {
    if (this.orderStatus != OrderStatus.PAID) {
      throw new OrderDomainException({
        message: 'Order is not in correct state for initCancel operation!',
      });
    }
    this.updateFailureMessages(failureMessages);
  }

  public cancel(failureMessages: string[]): void {
    if (
      !(
        this.orderStatus == OrderStatus.CANCELLING ||
        this.orderStatus == OrderStatus.PENDING
      )
    ) {
      throw new OrderDomainException({
        message: 'Order is not in correct state for cancel operation!',
      });
    }
    this.orderStatus = OrderStatus.CANCELLED;
    this.updateFailureMessages(failureMessages);
  }

  private updateFailureMessages(failureMessages: string[]): void {
    if (!failureMessages.length) return;
    this.failureMessages.push(...failureMessages);
  }

  private validateTotalPrice(): void {
    if (!this.price.isGreaterThanZero()) {
      throw new OrderDomainException({
        message: 'Total price must be greater than zero!',
      });
    }
  }

  private validateItemsPrice(): void {
    const orderItemsTotal = this.items
      .map((orderItem) => {
        this.validateItemPrice(orderItem);
        return orderItem.getSubTotal();
      })
      .reduce((prev, curr) => prev.add(curr), Money.ZERO);

    if (!this.price.equals(orderItemsTotal)) {
      throw new OrderDomainException({
        message: `Total price: ${this.price.getAmount().toString()} is not equal to Order items total: ${orderItemsTotal.getAmount().toString()}!`,
      });
    }
  }

  private validateItemPrice(orderItem: OrderItem): void {
    if (!orderItem.isPriceValid()) {
      throw new OrderDomainException({
        message: `Order item price: ${orderItem.getPrice().getAmount().toString()} is not valid for product ${orderItem.getProduct().getId().getValue()}`,
      });
    }
  }

  private initializeOrderItems(): void {
    let itemId = 1;
    for (const orderItem of this.items) {
      orderItem.initializeOrder(super.getId(), new OrderItemId(itemId++));
    }
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getRestaurantId(): RestaurantId {
    return this.restaurantId;
  }

  public getStreetAddress(): StreetAddress {
    return this.deliveryAddress;
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
