/* global window:false */

//eslint-disable-next-line no-underscore-dangle
export default (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
