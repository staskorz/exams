const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const webpackCommonConfig = require('./webpack.common')


const srcDir = path.join(__dirname, 'client')
const dstDir = path.join(__dirname, 'dist', 'client')


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
		
		new CopyWebpackPlugin([
			{
				from: path.join(srcDir, 'index-prod.html'),
				to: path.join(dstDir, 'index.html'),
			},
			
			path.join(srcDir, 'favicon.ico'),
			
			path.join(srcDir, 'company-logo.png'),
		]),
	],
	
	entry: {
		client: [
			'babel-polyfill',
			'whatwg-fetch',
			'./index-prod.js',
		],
	},
})
