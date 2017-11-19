const webpackMerge = require('webpack-merge')

const webpackCommonConfig = require('./webpack.common')


module.exports = webpackMerge(webpackCommonConfig, {
	entry: {
		client: [
			'babel-polyfill',
			'whatwg-fetch',
			'./index-prod.js',
		],
	},
})
