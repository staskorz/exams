import validate from './id'


describe('validates id', () => {
	it('tells non-string is invalid', () => {
		expect(validate([1, 2, 3])).toBeFalsy()
	})
	
	it('tells a less than 17 chars string is invalid', () => {
		expect(validate('abc')).toBeFalsy()
	})
	
	it('tells a more than 17 chars string is invalid', () => {
		expect(validate('abcdefgh89abcdefgh89')).toBeFalsy()
	})
	
	it('tells a string with forbidden chars is invalid', () => {
		expect(validate('abcdefgh80abcdefg')).toBeFalsy()
	})
	
	it('tells a 17 chars string is valid', () => {
		expect(validate('abcdefgh89abcdefg')).toBeTruthy()
	})
})
