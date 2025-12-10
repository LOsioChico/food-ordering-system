import { AggregateRoot } from 'apps/common/common-domain/entity/AggregateRoot';
import { RestaurantId } from 'apps/common/common-domain/value-object/RestaurantId';
import { Product } from './Product';

type RestaurantProps = {
  id: RestaurantId;
  products: Product[];
  active: boolean;
};

export class Restaurant extends AggregateRoot<RestaurantId> {
  private readonly products: Product[];
  private active: boolean;

  constructor(state: RestaurantProps) {
    super(state.id);
    this.products = state.products;
    this.active = state.active;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public isActive(): boolean {
    return this.active;
  }
}
