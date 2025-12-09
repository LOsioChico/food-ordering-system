import { BaseId } from 'apps/common/src/domain/value-object/BaseId';
import { UUID } from 'node:crypto';

export class TrackingId extends BaseId<UUID> {
  constructor(value: UUID) {
    super(value);
  }
}
