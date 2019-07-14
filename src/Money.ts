import HashTable from './HashTable'

export interface Expression {
  reduce(bank: Bank, to: string): Money
  plus(addend: Expression): Expression
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

// BANK
export class Bank {
  public reduce = (source: Expression, to: string): Money => {
    return source.reduce(this, to)
  }

  public rate = (from: string, to: string): number => {
    if (from == to) {
      return 1
    }

    const rate: number = this.rates.get(new Pair(from, to)) as number
    return rate
  }

  public addRate = (from: string, to: string, rate: number) => {
    this.rates.set(new Pair(from, to), rate)
  }

  public rates: HashTable<number> = new HashTable()
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
    return this
  }
}

// PAIR
export class Pair {
  constructor(private from: string, private to: string) {
    this.from = from
    this.to = to
  }

  public equals(object: Object) {
    const pair: Pair = object as Pair
    return this.from == pair.from && this.to == pair.to
  }

  public hashCode = () => {
    return 0
  }
}


export default Money