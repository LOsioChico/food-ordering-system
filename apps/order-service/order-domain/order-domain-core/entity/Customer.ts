import { AggregateRoot } from 'apps/common/src/domain/entity/AggregateRoot';
import { CustomerId } from 'apps/common/src/domain/value-object/CustomerId';

export class Customer extends AggregateRoot<CustomerId> {}
