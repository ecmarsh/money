import Dollar from '../Dollar'
import Franc from '../Franc'

describe('Dollar', () => {

	test('Multiplication', () => {
		const five: Dollar = new Dollar(5)
		expect(new Dollar(10).equals(five.times(2))).toBe(true)
		expect(new Dollar(15).equals(five.times(3))).toBe(true)
	})

	test('Equality', () => {
		expect(new Dollar(5).equals(new Dollar(5))).toBe(true)
		expect(new Dollar(5).equals(new Dollar(6))).toBe(false)
	})

})

describe('Franc', () => {

	test('Multiplication', () => {
		const five: Franc = new Franc(5)
		expect(new Franc(10).equals(five.times(2))).toBe(true)
		expect(new Franc(15).equals(five.times(3))).toBe(true)
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
 * [] Common times
 *
 */