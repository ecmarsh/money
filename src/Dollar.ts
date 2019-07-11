class Dollar {
	constructor(public amount: number) { }

	times = (multiplier: number): Dollar => {
		return new Dollar(this.amount * multiplier)
	}

	equals = (object: Dollar) => {
		const dollar: Dollar = object
		return this.amount === dollar.amount
	}
}


export default Dollar
