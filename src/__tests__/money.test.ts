import Money from '../Money'

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
 * [X] Dollar/Franc duplication
 * [X] Common equals
 * [X] Common times
 * [X] Compare Francs to Dollars
 * [X] Currency?
 * [X] Delete testFrancMultiplication?
 *
 */