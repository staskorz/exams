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
		
		const fakeFetch = () => Promise.resolve(obj)
		
		const get = createGet(fakeFetch)
		
		return expect(get('/ignored')).resolves.toEqual(body)
	})
	
	
	it('throws Error with status and statusText on unsuccessful response', () => {
		const obj = {
			ok: false,
			status: 404,
			statusText: 'Not found',
		}
		
		const fakeFetch = () => Promise.resolve(obj)
		
		const get = createGet(fakeFetch)
		
		return get('/ignored').catch(e => {
			expect(e).toEqual(new Error('Fetch failed'))
			expect(e.status).toBe(obj.status)
			expect(e.statusText).toBe(obj.statusText)
		})
	})
})
