class Money {
	protected amount: number

	constructor(amount: number) {
		this.amount = amount
	}

	public equals = (object: Money): boolean => {
		const money: Money = object
		return this.amount === money.amount
	}
}

export default Money