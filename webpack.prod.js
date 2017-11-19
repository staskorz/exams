const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const webpackCommonConfig = require('./webpack.common')


module.exports = webpackMerge(webpackCommonConfig, {
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
	
	entry: {
		client: [
			'babel-polyfill',
			'whatwg-fetch',
			'./index-prod.js',
		],
	},
})
