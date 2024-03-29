import Money, { Bank, Expression, Sum } from '../Money'

describe('Money', () => {

  test('Multiplication', () => {
    const five: Money = Money.dollar(5)
    expect(Money.dollar(10).equals(five.times(2))).toBe(true)
    expect(Money.dollar(15).equals(five.times(3))).toBe(true)
  })

  test('Equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true)
    expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false)
    expect(Money.franc(5).equals(Money.dollar(5))).toBe(false)
  })

  test('Currency descriptors', () => {
    expect('USD').toEqual(Money.dollar(1).currency)
    expect('CHF').toEqual(Money.franc(1).currency)
  })

  test('Addition', () => {
    const five: Money = Money.dollar(5)
    const sum: Expression = five.plus(five)
    const bank: Bank = new Bank()
    const reduced: Money = bank.reduce(sum, 'USD')
    expect(Money.dollar(10).equals(reduced)).toBe(true)
  })
})

describe('Mixed currencies', () => {

  test('Plus returns Sum', () => {
    const five: Money = Money.dollar(5)
    const result: Expression = five.plus(five)
    const sum: Sum = result as Sum
    expect(five).toEqual(sum.augend)
    expect(five).toEqual(sum.addend)
  })

  test('Reduce Sum', () => {
    const sum: Expression = new Sum(
      Money.dollar(3),
      Money.dollar(4)
    )
    const bank: Bank = new Bank()
    const result: Money = bank.reduce(sum, 'USD')

    expect(Money.dollar(7).equals(result)).toBe(true)
  })

  test('Reduce Money', () => {
    const bank: Bank = new Bank()
    const result: Money = bank.reduce(Money.dollar(1), 'USD')
    expect(Money.dollar(1).equals(result)).toBe(true)
  })

  test('Reduce Money, Different Currency', () => {
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result: Money = bank.reduce(Money.franc(2), 'USD')
    expect(Money.dollar(1).equals(result)).toBe(true)
  })

  test('Identity Rate', () => {
    expect(new Bank().rate('USD', 'USD')).toEqual(1)
  })

  test('Mixed Addition', () => {
    const fiveBucks: Expression = Money.dollar(5)
    const tenFrancs: Expression = Money.franc(10)
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result: Money = bank.reduce(fiveBucks.plus(tenFrancs), 'USD')
    expect(Money.dollar(10).equals(result)).toBe(true)
  })

  test('Sum plus Money', () => {
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)

    const fiveBucks: Expression = Money.dollar(5)
    const tenFrancs: Expression = Money.franc(10)

    const sum: Expression = new Sum(fiveBucks, tenFrancs).plus(fiveBucks)
    const result: Money = bank.reduce(sum, 'USD')

    expect(Money.dollar(15).equals(result)).toBe(true)
  })

  test('Sum times', () => {
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)

    const fiveBucks: Expression = Money.dollar(5)
    const tenFrancs: Expression = Money.franc(10)

    const sum: Expression = new Sum(fiveBucks, tenFrancs).times(2)
    const result: Money = bank.reduce(sum, 'USD')

    expect(Money.dollar(20).equals(result)).toBe(true)
  })

})



/**
 * TODO
 *
 * [X] $5 + 10 CHF = $10 if rate is 2:1
 * [X] $5 + $5 = $10
 * [-] Return Money from $5 + $5
 * [X] Bank.reduce(Money)
 * [X] Reduce Money with conversion
 * [X] Reduce(Bank, String)
 * [X] HashTable
 * [X] Sum.plus
 * [X] Expression.times
 * [X] $5 * 2 = $10
 * [X] Make `amount` private
 * [X] Dollar side effects?
 * [-] Money rounding?
 * [X] equals()
 * [X] hashCode()
 * [-] Equal Null
 * [X] Equal object
 * [X] 5 CHF * 2 = 10 CHF
 * [X] Dollar/Franc duplication
 * [X] Common equals
 * [X] Common times
 * [X] Compare Francs to Dollars
 * [X] Currency?
 * [X] Delete test Franc multiplication?
 *
 */