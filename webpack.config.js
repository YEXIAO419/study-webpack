const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	// 入口文件
	entry: './src/index.js',

	// 打包后的文件
	output: {
		path: path.resolve(__dirname, 'dist'), // 打包的文件路径
		filename: 'bundle.js', // 打包的文件名
	},

	// 编辑模块，规则和对应编译插件
	module: {
	    rules: [
	      // 编译为js
	      {
	        test: /\.jsx?/,
	        include: [
	          path.resolve(__dirname, 'src')
	        ],
	        use: 'babel-loader', // 注意babel-loader需要install babel-code（babel-loader的核心，
	        					 //	loader8版本对应code7版本（7版本的安装是@babel/code）
      		},					 // loader7版本对应code6版本(6版本对应安装的babel-code)
    		
      		// 编译为css
      		{
      			test: /\.less$/,
      			// 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的loader
      			use: ExtractTextPlugin.extract({
      				fallback:'style-loader',
      				use:[
      					'css-loader',
      					'less-loader',
      				]
      			})
      		},

      		// css-loader会解析样式中引用文件路径，但是对应图片路径处理不了
      		// file-loader能处理jpg/png/gif等文件格式
      		{
      			rules: [
      				{
      					test: /\.(png|jpg|gif)$/,
      					use: [
      						{
      							loader: 'file-loader',
      							options: {}
      						}
      					]
      				}
      			]
      		}
    	],
  	},


	// 代码模块路径解析的配置,与路径相关的配置都在resolve字段下
	resolve: {
		// 
		modules: [
			"node_modules",
			path.resolve(__dirname, 'src')
		],

		// 配置别名,如果有模块及其常用，经常编写相对路径很麻烦，可以用别名代替
		// 这里使用 path.resolve 和 __dirname 来获取绝对路径
		alias: {
			//utils: path.resolve(__dirname, 'src/utils') // 模糊匹配，只要模块路径中携带util就可以替换掉,
			utils$: path.resolve(__dirname, 'src/utils') // 精确匹配，只会匹配import 'utils'


		}

		// 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
		// 当你在 src/utils/ 目录下有一个 common.js 文件时，就可以这样来引用：
		// import * as common from './src/utils/common'
		extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],

		//ackage.json文件按照哪个字段的文件名来查找文件
		// *****p配置 target === "web" 或者 target === "webworker"(多线程) 时 mainFields 默认值是：
		mainFields: ['browser', 'module', 'main'],

		// *****target为其他的时候，mainFields默认值为module,main
		mainFields: ['module', 'main'],

		// *****当目录下没有 package.json 文件时,使用目录下的 index.js 这个文件
		mainFiles: ['index'], //
	},

	plugins: [
		new UglifyPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html', // 配置输出文件名和路径
			template: 'src/index.html'
		}),
		// 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    	// 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    	// 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数...
	],
}