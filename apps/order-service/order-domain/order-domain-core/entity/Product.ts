import { BaseEntity } from 'apps/common/src/domain/entity/BaseEntity';
import { Money } from 'apps/common/src/domain/value-object/Money';
import { ProductId } from 'apps/common/src/domain/value-object/ProductId';

export class Product extends BaseEntity<ProductId> {
  constructor(
    productId: ProductId,
    private readonly name: string,
    private readonly price: Money,
  ) {
    super(productId);
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): Money {
    return this.price;
  }
}
