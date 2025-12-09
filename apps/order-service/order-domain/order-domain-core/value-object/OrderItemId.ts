import { BaseId } from 'apps/common/src/domain/value-object/BaseId';

export class OrderItemId extends BaseId<number> {
  constructor(value: number) {
    super(value);
  }
}
