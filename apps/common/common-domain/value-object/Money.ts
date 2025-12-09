import { Decimal as BigDecimal } from 'decimal.js';

export class Money {
  public static readonly ZERO = new Money(BigDecimal(0));

  constructor(private readonly amount: BigDecimal) {
    BigDecimal.set({
      precision: 2,
      rounding: BigDecimal.ROUND_HALF_EVEN,
    });
  }

  public isGreaterThanZero(): boolean {
    return this.amount != null && this.amount.comparedTo(BigDecimal(0)) > 0;
  }

  public isGreaterThan(money: Money) {
    return this.amount != null && this.amount.comparedTo(money.amount) > 0;
  }

  public add(money: Money): Money {
    return new Money(this.amount.add(money.getAmount()));
  }

  public substract(money: Money): Money {
    return new Money(this.amount.sub(money.getAmount()));
  }

  public multiply(multiplier: number): Money {
    return new Money(this.amount.mul(new BigDecimal(multiplier)));
  }

  public getAmount(): BigDecimal {
    return this.amount;
  }

  public equals(other: Money): boolean {
    const isSameInstance = this === other;
    const isSameId = this.getAmount() === other.getAmount();
    return isSameInstance || isSameId;
  }
}
