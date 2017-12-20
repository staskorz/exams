const path = require('path')


module.exports = {
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
								['env', {
									targets: {
										ie: '11',
										edge: '16',
										chrome: '60',
									},
									modules: false,
								}],
								
								'stage-2',
								'react',
							],
							
							babelrc: false,
						},
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
