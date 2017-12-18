import createWrappedFetch from './wrapped-fetch'
import createGetMethod from './get-method'
import createPutMethod from './put-method'


const wrappedFetch = createWrappedFetch(fetch)


export const get = createGetMethod(wrappedFetch)
export const put = createPutMethod(wrappedFetch)
