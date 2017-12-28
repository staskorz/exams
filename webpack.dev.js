const dotenv = require('dotenv')
dotenv.config()

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const ntlmAuthenticationMiddleware = require('./server/express-middleware/ntlm-authentication')


const webpackCommonConfig = require('./webpack.common')


const { HTTP_PORT } = process.env

const HTTP_SERVER_PORT = HTTP_PORT || 3000


const SERVER_URL = 'http://localhost:' + HTTP_SERVER_PORT


const setUserInHeaderMiddleware = (req, res, next) => {
	if(req.connection && req.connection.user) {
		req.headers['webpack-dev-server-ntlm-user'] = req.connection.user
	}
	
	next()
}


module.exports = webpackMerge(webpackCommonConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				
				use: [
					{
						loader: 'babel-loader',
						query: {
							plugins: [
								'transform-react-jsx-source',
							],
						},
					},
					
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
	
	plugins: [
		new webpack.NamedModulesPlugin(),
		
		new webpack.HotModuleReplacementPlugin(),
		
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
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
		before: app => {
			app.use(ntlmAuthenticationMiddleware())
			
			app.use(setUserInHeaderMiddleware)
		},
	},
})
