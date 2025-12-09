import { AggregateRoot } from 'apps/common/common-domain/entity/AggregateRoot';
import { CustomerId } from 'apps/common/common-domain/value-object/CustomerId';

export class Customer extends AggregateRoot<CustomerId> {}
