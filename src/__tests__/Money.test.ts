import Money, { Bank, Expression, Sum } from '../Money'
import HashTable, { Hashable } from '../HashTable'

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

})

test('HashTable', () => {
	const hashTable: HashTable<number> = new HashTable()
	const hashable: Hashable = {
		hashCode: () => 0
	}

	hashTable.set(hashable, 2)
	expect(hashTable.get(hashable)).toEqual(2)
})

/**
 * TODO
 *
 * [] $5 + 10 CHF = $10 if rate is 2:1
 * [] $5 + $5 = $10
 * [] Return Money from $5 + $5
 * [X] Bank.reduce(Money)
 * [X] Reduce Money with conversion
 * [X] Reduce(Bank, String)
 * [X] HashTable
 * [X] $5 * 2 = $10
 * [X] Make `amount` private
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
 * [X] Delete test Franc multiplication`?
 *
 */