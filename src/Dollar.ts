import Money from './Money'

class Dollar extends Money {
	constructor(amount: number) {
		super(amount)
	}

	times = (multiplier: number): Dollar => {
		return new Dollar(this.amount * multiplier)
	}
}


export default Dollar
