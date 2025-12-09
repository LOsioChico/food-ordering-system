import type { UUID } from 'node:crypto';
import { Decimal as BigDecimal } from 'decimal.js';
import { IsNotEmpty } from 'class-validator';

type OrderItemProps = {
  productId: UUID;
  quantity: number;
  price: BigDecimal;
  subTotal: BigDecimal;
};

export class OrderItem {
  @IsNotEmpty()
  private readonly productId: UUID;

  @IsNotEmpty()
  private readonly quantity: number;

  @IsNotEmpty()
  private readonly price: BigDecimal;

  @IsNotEmpty()
  private readonly subTotal: BigDecimal;

  constructor(props: OrderItemProps) {
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.price = props.price;
    this.subTotal = props.subTotal;
  }

  public getProductId(): UUID {
    return this.productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getPrice(): BigDecimal {
    return this.price;
  }

  public getSubTotal(): BigDecimal {
    return this.subTotal;
  }
}
