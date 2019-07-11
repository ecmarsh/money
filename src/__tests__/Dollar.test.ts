import Dollar from '../Dollar'


test('Multiplication', () => {
	const five: Dollar = new Dollar(5)

	let product: Dollar = five.times(2)
	expect(product.amount).toEqual(10)

	product = five.times(3)
	expect(product.amount).toEqual(15)
})

test('Equality', () => {
	expect(new Dollar(5).equals(new Dollar(5))).toBe(true)
	expect(new Dollar(5).equals(new Dollar(6))).toBe(false)
})


/**
 * TODO
 *
 * [] $5 + 10 CHF = $10 if rate is 2:1
 * [X] $5 * 2 = $10
 * [] Make "amount" private
 * [X] Dollar side effects?
 * [] Money rounding?
 * [X] equals()
 * [] hashCode()
 * [] Equal Null
 * [] Equal object
 *
 */