'use strict'

const webpack = require('webpack')
const path = require('path')


const SERVER_URL = 'http://localhost:3000'


const BUILDING = process.env.npm_lifecycle_event.includes('build')


const common = {
	resolve: {
		extensions: [
			'.js',
			'.jsx',
		],
	},
	
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: [
								['es2015', { modules: false }],
								'stage-2',
								'react',
							],
							
							babelrc: false,
						},
					},
				],
			},
			
			{
				test: /\.css$/,
				
				use: [
					{
						loader: 'style-loader',
					},
					
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	
	context: path.join(__dirname, 'client'),
	
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist', 'client'),
		publicPath: '/',
	},
}


const dev = {
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	
	devtool: 'cheap-module-eval-source-map',
	
	entry: {
		client: [
			'babel-polyfill',
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
}


const prod = {
	entry: {
		client: [
			'babel-polyfill',
			'./index-prod.js',
		],
	},
}


const env = BUILDING ? prod : dev


module.exports = Object.assign({}, common, env)
