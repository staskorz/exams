import Promise from 'promise-polyfill'


/* global window:false */
if(!window.Promise) {
	window.Promise = Promise
}
