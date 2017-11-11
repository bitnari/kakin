const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssExtract = ExtractTextPlugin.extract({
	use: [
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true
			}
		}
	],
	fallback: 'vue-style-loader'
});

module.exports = {
	entry: path.resolve(__dirname, 'app', 'index.js'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'kakin.bundle.js'
	},

	module: {
		rules: [
			{
				test:/\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'css': cssExtract,
						'js': {
							loader: 'babel-loader',
							options: {
								presets: ['env']
							}
						}
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: cssExtract
			},
			{
				test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot|otf|wav)$/,
				loader: 'file-loader',
				options: {
					name: 'files/[name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('kakin.bundle.css')
	],

	resolve: {
		alias: {
			'theme': path.resolve(__dirname, 'app', 'css', 'theme.css')
		}
	},

	devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
