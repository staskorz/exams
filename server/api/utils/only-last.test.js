import onlyLast from './only-last'


describe('only returns last elements having a specified property', () => {
	const src = [
		{
			p1: 101,
			p2: 201,
		},
		
		{
			p1: 102,
			p2: 201,
		},
		
		{
			p1: 103,
			p2: 201,
		},
		
		{
			p1: 104,
			p2: 202,
		},
		
		{
			p1: 105,
			p2: 202,
		},
		
		{
			p1: 106,
			p2: 203,
		},
		
		{
			p1: 107,
			p2: 204,
		},
		
		{
			p1: 108,
			p2: 204,
		},
	]
	
	const expectedDst = [
		{
			p1: 103,
			p2: 201,
		},
		
		{
			p1: 105,
			p2: 202,
		},
		
		{
			p1: 106,
			p2: 203,
		},
		
		{
			p1: 108,
			p2: 204,
		},
	
	]
	
	it('only returns last elements', () => {
		expect(onlyLast(src, 'p2')).toEqual(expectedDst)
	})
})
