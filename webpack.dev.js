const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')

const webpackCommonConfig = require('./webpack.common')


const SERVER_URL = 'http://localhost:3000'


module.exports = webpackMerge(webpackCommonConfig, {
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	
	devtool: 'cheap-module-eval-source-map',
	
	entry: {
		client: [
			'babel-polyfill',
			'whatwg-fetch',
			'react-hot-loader/patch',
			'./index-dev.js',
		],
	},
	
	devServer: {
		contentBase: path.join(__dirname, 'client'),
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': SERVER_URL,
		},
	},
})
