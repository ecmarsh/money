import HashTable, { Hashable } from './HashTable'

export interface Expression {
  reduce(bank: Bank, to: string): Money
  plus(addend: Expression): Expression
  times(multiplier: number): Expression
}

class Money implements Expression {
  static dollar = (amount: number): Money => {
    return new Money(amount, 'USD')
  }

  static franc = (amount: number): Money => {
    return new Money(amount, 'CHF')
  }

  constructor(public amount: number, public currency: string) {
    this.amount = amount
    this.currency = currency
  }

  public equals = (money: Money): boolean => {
    const { amount, currency }: Money = money
    const isEqualAmt = this.amount == amount
    const isEqualCurrency = this.currency == currency

    return isEqualAmt && isEqualCurrency
  }

  public times = (multiplier: number): Money => {
    return new Money(this.amount * multiplier, this.currency)
  }

  public plus = (addend: Expression): Expression => {
    return new Sum(this, addend)
  }

  public reduce = (bank: Bank, to: string): Money => {
    const rate: number = bank.rate(this.currency, to)
    return new Money(this.amount / rate, to)
  }
}

// SUM
export class Sum implements Expression {
  constructor(
    public augend: Expression,
    public addend: Expression
  ) { }

  public reduce = (bank: Bank, to: string): Money => {
    const amount =
      this.augend.reduce(bank, to).amount
      + this.addend.reduce(bank, to).amount

    return new Money(amount, to)
  }

  public plus = (addend: Expression): Expression => {
    return new Sum(this, addend)
  }

  public times = (multiplier: number): Expression => {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }
}

// BANK
export class Bank {
  public rates: HashTable<number> = new HashTable()

  public rate = (from: string, to: string): number => {
    if (from == to) {
      return 1
    }

    const rate: number = this.rates.get(new Pair(from, to))
    return rate
  }

  public addRate = (from: string, to: string, rate: number) => {
    this.rates.set(new Pair(from, to), rate)
  }

  public reduce = (source: Expression, to: string): Money => {
    return source.reduce(this, to)
  }
}

// PAIR
export class Pair implements Hashable {
  constructor(private from: string, private to: string) {
    this.from = from
    this.to = to
  }

  public hashCode = () => {
    return 0
  }
}


export default Money