import createGetMethod from './get-method'


describe('Calls GET method to API', () => {
	it('calls wrapped-fetch with correct arguments', () => {
		const mockWrappedFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const testPath = '/test-path'
		
		const getMethod = createGetMethod(mockWrappedFetch)
		
		getMethod(testPath)
		
		expect(mockWrappedFetch).toBeCalledWith(testPath, 'GET')
	})
})
