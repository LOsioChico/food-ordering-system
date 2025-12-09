import { Customer } from 'apps/order-service/order-domain/order-domain-core/entity/Customer';
import { UUID } from 'node:crypto';
import { EntityManager } from 'typeorm';

export interface CustomerRepository {
  findCustomerWithManager(
    manager: EntityManager,
    customerId: UUID,
  ): Promise<Customer | undefined>;
}
