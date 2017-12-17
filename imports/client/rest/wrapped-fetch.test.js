import createWrappedFetch from './wrapped-fetch'


describe('Interacts with REST API using provided method', () => {
	it('calls fetch with correct arguments', () => {
		const mockFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const wrappedFetch = createWrappedFetch(mockFetch)
		
		const testPath = '/test-path'
		const method = 'POST'
		const json = { a: 1 }
		
		wrappedFetch(testPath, method, json)
		
		expect(mockFetch).toBeCalledWith(testPath, {
			method,
			body: JSON.stringify(json),
			credentials: 'same-origin',
		})
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
		
		const wrappedFetch = createWrappedFetch(fakeFetch)
		
		return expect(wrappedFetch('/ignored')).resolves.toEqual(body)
	})
	
	
	it('throws Error with status and statusText on unsuccessful response', () => {
		const obj = {
			ok: false,
			status: 404,
			statusText: 'Not found',
		}
		
		const fakeFetch = () => Promise.resolve(obj)
		
		const wrappedFetch = createWrappedFetch(fakeFetch)
		
		return wrappedFetch('/ignored').catch(e => {
			expect(e).toEqual(new Error('Fetch failed'))
			expect(e.status).toBe(obj.status)
			expect(e.statusText).toBe(obj.statusText)
		})
	})
})
