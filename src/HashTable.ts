export interface Hashable {
	hashCode(): number
}

export default class HashTable<T> {
	private items: { [key: number]: T } = {}

	public get = (key: Hashable) => {
		return this.items[key.hashCode()]
	}

	public set = (key: Hashable, value: T) => {
		this.items[key.hashCode()] = value
		return this.items
	}
}