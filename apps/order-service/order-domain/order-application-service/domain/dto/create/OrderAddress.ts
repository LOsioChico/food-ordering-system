import { IsNotEmpty, MaxLength } from 'class-validator';

type OrderAddressProps = {
  street: string;
  postalCode: string;
  city: string;
};

export class OrderAddress {
  @IsNotEmpty()
  @MaxLength(50)
  private readonly street: string;

  @IsNotEmpty()
  @MaxLength(10)
  private readonly postalCode: string;

  @IsNotEmpty()
  @MaxLength(50)
  private readonly city: string;

  constructor(props: OrderAddressProps) {
    this.street = props.street;
    this.postalCode = props.postalCode;
    this.city = props.city;
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
}
