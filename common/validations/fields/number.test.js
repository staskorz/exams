import validate from './number'


describe('validates number', () => {
	it('tells a number is valid', () => {
		expect(validate(123)).toBeTruthy()
	})
	
	it('tells a string with numeric only chars is valid', () => {
		expect(validate('123')).toBeTruthy()
	})
	
	it('tells a string with spaces is invalid', () => {
		expect(validate('123 ')).toBeFalsy()
	})
	
	it('tells a string with letters is invalid', () => {
		expect(validate('123a')).toBeFalsy()
	})
})
