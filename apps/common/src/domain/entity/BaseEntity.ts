export abstract class BaseEntity<ID> {
  constructor(private id: ID) {}

  public getId(): ID {
    return this.id;
  }

  public setId(id: ID): void {
    this.id = id;
  }

  public equals(other: BaseEntity<ID>): boolean {
    const isSameInstance = this === other;
    const isSameId = this.getId() === other.getId();
    return isSameInstance || isSameId;
  }
}
