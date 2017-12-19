import createWrappedFetch from './wrapped-fetch'
import createGetMethod from './get-method'
import createPutMethod from './put-method'
import createPostMethod from './post-method'


/* global fetch:false */
const wrappedFetch = createWrappedFetch(fetch)


export const get = createGetMethod(wrappedFetch)
export const put = createPutMethod(wrappedFetch)
export const post = createPostMethod(wrappedFetch)
