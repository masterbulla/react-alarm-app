const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: "./src/index.jsx",
	
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	
	devServer: {
      inline: true,
      port: 2525
    },
	
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['env', 'stage-2', 'react']
				}
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'eslint-loader'
			},
			{
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
		]
	},
	
	plugins: [    
		new HtmlWebpackPlugin ({
			inject: true,
			template: './src/index.html'
		}),
		new UglifyJsPlugin()
    ]
};