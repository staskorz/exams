const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackCommonConfig = require('./webpack.common')


module.exports = webpackMerge(webpackCommonConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},
		],
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		
		new ExtractTextPlugin({
			filename: 'styles.css',
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
