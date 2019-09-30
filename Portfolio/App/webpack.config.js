const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const config = {
	mode: production ? 'production' : 'development',
	devtool: production ? 'source-map' : 'eval-source-map',
	entry: [
		'./index.tsx',
	],
	output: {
		filename: production ? '[name].[chunkhash].js' : 'bundle.js',
		publicPath: "",
		path: path.resolve(__dirname, "dist"),
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: production ? 'ts-loader' : ['babel-loader', 'ts-loader'],
			},
			{
				test: /\.scss|.css$/,
				sideEffects: true,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							outputStyle: production ? 'compressed' : 'expanded',
						},
					},
				],
			},
			{ test: /\.png$/, loader: 'file-loader?name=[hash].[ext]' },
			{ test: /\.svg$/, loader: 'file-loader?name=[hash].[ext]' },
			{ test: /\.eot$/, loader: 'file-loader?name=[hash].[ext]' },
			{ test: /\.woff(2?)$/, loader: 'file-loader?name=[hash].[ext]' },
			{ test: /\.ttf$/, loader: 'file-loader?name=[hash].[ext]' },
			{ test: /\.mp3$/, loader: 'file-loader?name=[hash].[ext]' },
		]
	},
	optimization: optimization(),
	plugins: plugins(),
};

if (!production) {
	config.devServer = {
		hot: true,
		host: '0.0.0.0',
		port: 3001,
		disableHostCheck: true,
		//Enable this if you want to never refresh (this allows hot-reloading app.tsx, but won't auto-refresh if you change index.tsx)
		//hotOnly: true,
	};
}

function plugins() {
	const plugins = [
		new webpack.DefinePlugin({
			'process.env.API_BASE_URL': JSON.stringify(production ? '#{apiurl}#' : 'http://localhost:5000')
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'index.template.html',
		}),
	];

	if (!production) {
		plugins.push(
			new webpack.HotModuleReplacementPlugin(),
		);
	} else {
		plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name]-[contenthash].css",
				chunkFilename: "[name]-[contenthash].css"
			}),
			new CopyWebpackPlugin([
				'../web.config',
			]),
		);
	}

	return plugins;
}

function optimization() {
	const optimization = {
		splitChunks: {
			chunks: "all",
		},
	};

	if (production) {
		optimization.minimizer = [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					output: {
						ascii_only: true,
					},
				},
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: {
					zindex: false
				}
			}),
		];
	}

	return optimization;
}

module.exports = config;
