import createWrappedFetch from './wrapped-fetch'
import createGetMethod from './get-method'


const wrappedFetch = createWrappedFetch(fetch)


export const get = createGetMethod(wrappedFetch)
