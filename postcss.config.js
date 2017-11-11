const createResolver = require('postcss-import-webpack-resolver');

const resolve =  createResolver({
	alias: require('./webpack.config.js').resolve.alias,
	modules: ['node_modules']
});

module.exports = {
	plugins: [
		require('postcss-import')({ resolve }),
		require('postcss-cssnext'),
		require('postcss-url'),
		require('postcss-reporter'),
		require('postcss-browser-reporter')
	]
};
