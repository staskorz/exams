import generateId from './generate-id'


describe('generates random id', () => {
	it('generates 17 character id', () => {
		expect(generateId()).toHaveLength(17)
	})
	
	it('generates ids that are different to each other', () => {
		expect(generateId()).not.toEqual(generateId())
	})
})
