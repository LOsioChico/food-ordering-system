import { RestaurantId } from 'apps/common/common-domain/value-object/RestaurantId';
import { Restaurant } from 'apps/order-service/order-domain/order-domain-core/entity/Restaurant';

export interface RestaurantRepository {
  findRestaurantInformation(restaurant: RestaurantId): Restaurant | undefined;
}
