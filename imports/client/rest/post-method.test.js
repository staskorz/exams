import createPostMethod from './post-method'


describe('Calls POST method to API', () => {
	it('calls wrapped-fetch with correct arguments', () => {
		const mockWrappedFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const testPath = '/test-path'
		const json = {
			a: 1,
		}
		
		const postMethod = createPostMethod(mockWrappedFetch)
		
		postMethod(testPath, json)
		
		expect(mockWrappedFetch).toBeCalledWith(testPath, 'POST', json)
	})
})
