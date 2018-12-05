const { smart } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')

module.exports = smart(base, {
	module: {
		rules: [
			// 用 smart API，当这里的匹配规则相同且 use 值都是数组时，smart 会识别后处理
            // 和上述 base 配置合并后，这里会是 { test: /\.js$/, use: ['babel', 'coffee'] }
            // 如果这里 use 的值用的是字符串或者对象的话，那么会替换掉原本的规则 use 的值
            {
            	test: /\.js$/,
            	use: ['coffee']
            }
		]
	},

	plugins: [
		// plugin这里的数组回合base中的plugins数组进行合并
		new webpack.DefinePlugin({
			'process.env.MODE_ENV': JSON.stringify(process.env.MODE_ENV)
		})
	]
})