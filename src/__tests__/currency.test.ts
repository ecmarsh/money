import Money, { Dollar, Franc } from '../Money'


describe('Dollar', () => {

	test('Multiplication', () => {
		const five: Money = Money.dollar(5)
		expect(Money.dollar(10).equals(five.times(2))).toBe(true)
		expect(Money.dollar(15).equals(five.times(3))).toBe(true)
	})

	test('Equality', () => {
		expect(Money.dollar(5).equals(Money.dollar(5))).toBe(true)
		expect(Money.dollar(5).equals(Money.dollar(6))).toBe(false)
		expect(Money.franc(5).equals(Money.franc(5))).toBe(true)
		expect(Money.franc(5).equals(Money.franc(6))).toBe(false)
		expect(Money.franc(5).equals(Money.dollar(5))).toBe(false)
	})

})

describe('Franc', () => {

	test('Multiplication', () => {
		const five: Money = Money.franc(5)
		expect(Money.franc(10).equals(five.times(2))).toBe(true)
		expect(Money.franc(15).equals(five.times(3))).toBe(true)
	})

})

describe('Currency', () => {

	test('Currency descriptors', () => {
		expect('USD').toEqual(Money.dollar(1).currency)
		expect('CHF').toEqual(Money.franc(1).currency)
	})

	test('Different subclass equality', () => {
		expect(new Money(10, 'CHF').equals(new Franc(10, 'CHF'))).toBe(true)
	})

})

/**
 * TODO
 *
 * [] $5 + 10 CHF = $10 if rate is 2:1
 * [X] $5 * 2 = $10
 * [X] Make "amount" private
 * [X] Dollar side effects?
 * [] Money rounding?
 * [X] equals()
 * [] hashCode()
 * [] Equal Null
 * [] Equal object
 * [X] 5 CHF * 2 = 10 CHF
 * [] Dollar/Franc duplication
 * [X] Common equals
 * [X] Common times
 * [X] Compare Francs to Dollars
 * [X] Currency?
 * [] Delete testFrancMultiplication?
 *
 */