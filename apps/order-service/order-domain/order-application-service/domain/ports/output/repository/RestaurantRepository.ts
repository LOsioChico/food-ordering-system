import { Restaurant } from 'apps/order-service/order-domain/order-domain-core/entity/Restaurant';

export interface RestaurantRepository {
  findRestaurantInformation(restaurant: Restaurant): Restaurant | undefined;
}
