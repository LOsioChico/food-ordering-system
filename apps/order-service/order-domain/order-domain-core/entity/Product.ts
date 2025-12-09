import { BaseEntity } from 'apps/common/src/domain/entity/BaseEntity';
import { Money } from 'apps/common/src/domain/value-object/Money';
import { ProductId } from 'apps/common/src/domain/value-object/ProductId';

type ProductProps = {
  productId: ProductId;
  name: string;
  price: Money;
};

export class Product extends BaseEntity<ProductId> {
  private name: string;
  private price: Money;

  constructor(state: ProductProps) {
    super(state.productId);
    this.name = state.name;
    this.price = state.price;
  }

  public updateWithConfirmedNameAndPrice(name: string, price: Money): void {
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): Money {
    return this.price;
  }
}
