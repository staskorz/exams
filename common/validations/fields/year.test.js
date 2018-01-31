import validate from './year'


describe('validates year', () => {
	it('tells a float is invalid', () => {
		expect(validate(2016.1)).toBeFalsy()
	})
	
	it('tells a number less than 2016 is invalid', () => {
		expect(validate(2014)).toBeFalsy()
	})
	
	it('tells a number greater than 2099 is invalid', () => {
		expect(validate(2114)).toBeFalsy()
	})
	
	it('tells a string with non-numeric characters is invalid', () => {
		expect(validate('123a')).toBeFalsy()
	})
	
	it('tells a string shorter than 4 is invalid', () => {
		expect(validate('123')).toBeFalsy()
	})
	
	it('tells a string longer than 4 is invalid', () => {
		expect(validate('12345')).toBeFalsy()
	})
	
	it('tells a string with a number less than 2016 is invalid', () => {
		expect(validate('2012')).toBeFalsy()
	})
	
	it('tells a string with a  number greater than 2099 is invalid', () => {
		expect(validate('2112')).toBeFalsy()
	})
	
	it('tells a number between 2016 and 2099 is valid', () => {
		expect(validate(2017)).toBeTruthy()
	})
	
	it('tells a string with a number between 2016 and 2099 is valid', () => {
		expect(validate('2018')).toBeTruthy()
	})
})
