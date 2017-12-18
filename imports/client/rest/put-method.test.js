import createPutMethod from './put-method'


describe('Calls PUT method to API', () => {
	it('calls wrapped-fetch with correct arguments', () => {
		const mockWrappedFetch = jest.fn(() => Promise.resolve('ignored'))
		
		const testPath = '/test-path'
		const json = {
			a: 1,
		}
		
		const putMethod = createPutMethod(mockWrappedFetch)
		
		putMethod(testPath, json)
		
		expect(mockWrappedFetch).toBeCalledWith(testPath, 'PUT', json)
	})
})
