class Money {
	static dollar = (amount: number): Money => {
		return new Money(amount, "USD")
	}

	static franc = (amount: number): Money => {
		return new Money(amount, "CHF")
	}

	constructor(protected amount: number, public currency: string) {
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
}


export default Money