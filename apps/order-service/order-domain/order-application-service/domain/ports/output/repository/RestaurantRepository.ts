import { RestaurantId } from 'apps/common/common-domain/value-object/RestaurantId';
import { Restaurant } from 'apps/order-service/order-domain/order-domain-core/domain/entity/Restaurant';
import { EntityManager } from 'typeorm';

export interface RestaurantRepository {
  findRestaurantInformationWithManager(
    manager: EntityManager,
    restaurant: RestaurantId,
  ): Promise<Restaurant | undefined>;
}
