import { Customer } from 'apps/order-service/order-domain/order-domain-core/entity/Customer';
import { UUID } from 'node:crypto';

export interface CustomerRepository {
  findCustomer(customerId: UUID): Customer | undefined;
}
