import { BaseEntity } from 'apps/common/src/domain/entity/BaseEntity';
import { OrderItemId } from '../value-object/OrderItemId';
import { OrderId } from 'apps/common/src/domain/value-object/OrderId';
import { Product } from './Product';
import { Money } from 'apps/common/src/domain/value-object/Money';

export class OrderItem extends BaseEntity<OrderItemId> {
  private orderId: OrderId;
  private readonly product: Product;
  private readonly quantity: number;
  private readonly price: Money;
  private readonly subTotal: Money;
  is: any;

  public initializeOrder(orderId: OrderId, orderItemId: OrderItemId): void {
    this.orderId = orderId;
    super.setId(orderItemId);
  }

  public isPriceValid(): boolean {
    return (
      this.price.isGreaterThanZero() &&
      this.price.equals(this.product.getPrice()) &&
      this.price.multiply(this.quantity).equals(this.subTotal)
    );
  }

  constructor(orderItemBuilder: OrderItemBuilder) {
    super(orderItemBuilder.getOrderItemId());
    this.orderId = orderItemBuilder.getOrderId();
    this.product = orderItemBuilder.getProduct();
    this.quantity = orderItemBuilder.getQuantity();
    this.price = orderItemBuilder.getPrice();
    this.subTotal = orderItemBuilder.getSubTotal();
  }

  public static builder(): OrderItemBuilder {
    return new OrderItemBuilder();
  }

  public getOrderId(): OrderId {
    return this.orderId;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getPrice(): Money {
    return this.price;
  }

  public getSubTotal(): Money {
    return this.subTotal;
  }
}

class OrderItemBuilder {
  private orderId: OrderId;
  private orderItemId: OrderItemId;
  private product: Product;
  private quantity: number;
  private price: Money;
  private subTotal: Money;

  public getOrderId(): OrderId {
    return this.orderId;
  }

  public getOrderItemId(): OrderItemId {
    return this.orderItemId;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getPrice(): Money {
    return this.price;
  }

  public getSubTotal(): Money {
    return this.subTotal;
  }

  public withOrderId(orderId: OrderId): OrderItemBuilder {
    this.orderId = orderId;
    return this;
  }

  public withOrderItemId(orderItemId: OrderItemId): OrderItemBuilder {
    this.orderItemId = orderItemId;
    return this;
  }

  public withProduct(product: Product): OrderItemBuilder {
    this.product = product;
    return this;
  }

  public withQuantity(quantity: number): OrderItemBuilder {
    this.quantity = quantity;
    return this;
  }

  public withPrice(price: Money): OrderItemBuilder {
    this.price = price;
    return this;
  }

  public withSubTotal(subTotal: Money): OrderItemBuilder {
    this.subTotal = subTotal;
    return this;
  }

  public build(): OrderItem {
    return new OrderItem(this);
  }
}
