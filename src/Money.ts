class Money {
	static dollar = (amount: number): Dollar => {
		return new Dollar(amount, "USD")
	}

	static franc = (amount: number): Franc => {
		return new Franc(amount, "CHF")
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

//////////
// DOLLAR
/////////
class Dollar extends Money {
	constructor(amount: number, currency: string) {
		super(amount, currency)
		this.currency = currency
	}
}

///////////
// FRANC
//////////
class Franc extends Money {
	constructor(amount: number, currency: string) {
		super(amount, currency)
	}
}

export default Money
export { Dollar, Franc }