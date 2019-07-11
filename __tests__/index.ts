class Dollar {
	constructor(public amount: number) { }

	times = (multiplier: number): void => {
		this.amount = this.amount * multiplier
	}
}

test('Multiplication', () => {
	const five: Dollar = new Dollar(5)
	five.times(2)
	expect(five.amount).toEqual(10)
})