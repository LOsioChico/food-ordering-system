import { UUID } from 'node:crypto';

export class StreetAddress {
  constructor(
    private readonly id: UUID,
    private readonly street: string,
    private readonly postalCode: string,
    private readonly city: string,
  ) {}

  public getId(): UUID {
    return this.id;
  }

  public getStreet(): string {
    return this.street;
  }

  public getPostalCode(): string {
    return this.postalCode;
  }

  public getCity(): string {
    return this.city;
  }

  public equals(other: StreetAddress): boolean {
    const isSameInstance = this === other;
    const isSameStreet = this.street === other.street;
    const isSamePostalCode = this.postalCode === other.postalCode;
    const isSameCity = this.city === other.city;
    return isSameInstance || (isSameStreet && isSamePostalCode && isSameCity);
  }
}
