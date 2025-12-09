export abstract class BaseId<T> {
  protected constructor(private readonly value: T) {}

  public getValue() {
    return this.value;
  }

  public equals(other: BaseId<T>): boolean {
    const isSameInstance = this === other;
    const isSameId = this.getValue() === other.getValue();
    return isSameInstance || isSameId;
  }
}
