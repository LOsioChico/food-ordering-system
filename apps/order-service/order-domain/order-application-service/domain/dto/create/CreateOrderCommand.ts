import type { UUID } from 'node:crypto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Decimal as BigDecimal } from 'decimal.js';
import { OrderItem } from './OrderItem';
import { OrderAddress } from './OrderAddress';

type CreateOrderCommandProps = {
  restaurantId: UUID;
  price: BigDecimal;
  items: OrderItem[];
  address: OrderAddress;
};

export class CreateOrderCommand {
  @IsNotEmpty()
  private readonly restaurantId: UUID;

  @IsNotEmpty()
  private readonly price: BigDecimal;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  private readonly items: OrderItem[];

  @IsNotEmpty()
  private readonly address: OrderAddress;

  constructor(props: CreateOrderCommandProps) {
    this.restaurantId = props.restaurantId;
    this.price = props.price;
    this.items = props.items;
    this.address = props.address;
  }

  public getRestaurantId(): UUID {
    return this.restaurantId;
  }

  public getPrice(): BigDecimal {
    return this.price;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getAddress(): OrderAddress {
    return this.address;
  }
}
