import createWrappedFetch from './wrapped-fetch'


describe('Interacts with REST API using provided method', () => {
	it('calls fetch with correct arguments', () => {
		const mockFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const wrappedFetch = createWrappedFetch(mockFetch)
		
		const testPath = '/test-path'
		const method = 'POST'
		const json = { a: 1 }
		
		wrappedFetch(testPath, method, json).catch(f => f)
		
		expect(mockFetch).toBeCalledWith(testPath, {
			method,
			body: JSON.stringify(json),
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	})
	
	
	it('returns correct object if content-length is greater than 0', () => {
		const body = {
			a: 1,
			b: 2,
		}
		
		const obj = {
			json: () => body,
			ok: true,
			status: 200,
			statusText: 'OK',
			headers: {
				get: () => 5,
			},
		}
		
		const fakeFetch = () => Promise.resolve(obj)
		
		const wrappedFetch = createWrappedFetch(fakeFetch)
		
		return expect(wrappedFetch('/ignored')).resolves.toEqual(body)
	})
	
	
	it('returns undefined if content-length is 0', () => {
		const obj = {
			ok: true,
			status: 200,
			statusText: 'OK',
			headers: {
				get: () => 0,
			},
		}
		
		const fakeFetch = () => Promise.resolve(obj)
		
		const wrappedFetch = createWrappedFetch(fakeFetch)
		
		return expect(wrappedFetch('/ignored')).resolves.toBeUndefined()
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
