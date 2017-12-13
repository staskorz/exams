import createGet from './get'


describe('retrieves from REST API using GET method', () => {
	it('calls fetch with correct path', () => {
		const mockFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const get = createGet(mockFetch)
		
		const testPath = '/test-path'
		
		get(testPath)
		
		expect(mockFetch).toBeCalledWith(testPath)
	})
	
	
	it('returns correct object', () => {
		const body = {
			a: 1,
			b: 2,
		}
		
		const obj = {
			json: () => body,
			ok: true,
			status: 200,
			statusText: 'OK',
		}
		
		const mockFetch = jest.fn(() => Promise.resolve(obj))
		
		const get = createGet(mockFetch)
		
		expect.assertions(1)
		
		return expect(get('/ignored')).resolves.toEqual(body)
	})
	
	
	it('throws on unsuccessful response', () => {
		const errorObj = {
			status: 404,
			statusText: 'Not found',
		}
		
		const obj = {
			ok: false,
			...errorObj,
		}
		
		const mockFetch = jest.fn(() => Promise.resolve(obj))
		
		const get = createGet(mockFetch)
		
		expect.assertions(1)
		
		return expect(get('/ignored')).rejects.toEqual(errorObj)
	})
})
