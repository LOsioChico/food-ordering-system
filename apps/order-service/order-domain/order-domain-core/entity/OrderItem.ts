import { BaseEntity } from 'apps/common/src/domain/entity/BaseEntity';
import { OrderId } from 'apps/common/src/domain/value-object/OrderId';
import { Money } from 'apps/common/src/domain/value-object/Money';
import { OrderDomainException } from '../exception/OrderDomainException';
import { OrderItemId } from '../value-object/OrderItemId';
import { Product } from './Product';

type OrderItemProps = {
  id: OrderItemId;
  orderId: OrderId;
  product: Product;
  quantity: number;
  price: Money;
  subTotal: Money;
};

export class OrderItem extends BaseEntity<OrderItemId> {
  private orderId: OrderId;
  private readonly product: Product;
  private readonly quantity: number;
  private readonly price: Money;
  private readonly subTotal: Money;

  constructor(state: OrderItemProps) {
    super(state.id);
    this.orderId = state.orderId;
    this.product = state.product;
    this.quantity = state.quantity;
    this.price = state.price;
    this.subTotal = state.subTotal;
    this.validatePriceConsistency();
  }

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

  private validatePriceConsistency(): void {
    if (!this.isPriceValid()) {
      throw new OrderDomainException({
        message: 'Order item price/quantity/subtotal is inconsistent.',
      });
    }
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
