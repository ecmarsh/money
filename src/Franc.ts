import Money from './Money'

class Franc extends Money {
	constructor(amount: number) {
		super(amount)
	}

	times = (multiplier: number): Franc => {
		return new Franc(this.amount * multiplier)
	}
}

export default Franc