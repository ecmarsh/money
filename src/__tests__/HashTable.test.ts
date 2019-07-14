import HashTable, { Hashable } from '../HashTable'

const hashTable: HashTable<number> = new HashTable()
const hashable: Hashable = { hashCode: () => 0 }

beforeEach(() => {
  hashTable.clear()
})

describe('HashTable', () => {
  test('Access', () => {
    const VALUE = 2
    expect(hashTable.set(hashable, VALUE)).toBeTruthy()
    expect(hashTable.get(hashable)).toEqual(VALUE)
  })

  test('Nonexistent access', () => {
    expect(hashTable.get(hashable)).toBeFalsy()
  })
})