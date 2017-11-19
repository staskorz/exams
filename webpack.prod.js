const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const webpackCommonConfig = require('./webpack.common')


module.exports = webpackMerge(webpackCommonConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
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
		
		new ExtractTextWebpackPlugin({
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
