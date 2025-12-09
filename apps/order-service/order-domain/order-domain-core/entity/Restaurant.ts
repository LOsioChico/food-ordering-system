import { AggregateRoot } from 'apps/common/src/domain/entity/AggregateRoot';
import { RestaurantId } from 'apps/common/src/domain/value-object/RestaurantId';
import { Product } from './Product';

export class Restaurant extends AggregateRoot<RestaurantId> {
  private readonly products: Product[];
  private active: boolean;

  constructor(restaurantBuilder: RestaurantBuilder) {
    super(restaurantBuilder.getRestaurantId());
    this.products = restaurantBuilder.getProducts();
    this.active = restaurantBuilder.isActive();
  }

  public static builder(): RestaurantBuilder {
    return new RestaurantBuilder();
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public isActive(): boolean {
    return this.active;
  }
}

class RestaurantBuilder {
  private restaurantId: RestaurantId;
  private products: Product[];
  private active: boolean;

  public getRestaurantId(): RestaurantId {
    return this.restaurantId;
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public isActive(): boolean {
    return this.active;
  }

  public withRestaurantId(restaurantId: RestaurantId): RestaurantBuilder {
    this.restaurantId = restaurantId;
    return this;
  }

  public withProducts(products: Product[]): RestaurantBuilder {
    this.products = products;
    return this;
  }

  public withActive(active: boolean): RestaurantBuilder {
    this.active = active;
    return this;
  }

  public build(): Restaurant {
    return new Restaurant(this);
  }
}
