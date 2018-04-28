var path=require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin= require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
const config={
	entry:path.resolve(__dirname,"./app/index.jsx"),
	output:{filename:"bundle.js"},
	resolve:{extensions:[".js",".jsx",".json"]},
	module:{
		rules:[{
			test:/\.(js|jsx)$/,
			exclude:/node_modules/,
			use:{
				loader:"babel-loader"
			}

		},
		{
			test:/\.(less|css)$/,
			use:[
			{
				loader:"style-loader"
			},
			{
				loader:"css-loader"
			},
			
			{
				loader:"postcss-loader",
				options: {
	              config: {
	                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
	              }
            	}
			
				
			},
			{
				loader:"less-loader"
			}
			]
			
		},{
			test:/\.(png|gif|jpg|jpeg|bmp)$/i,
			use:["url-loader?limit=50000"]
			
		},{
			test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
			use:["url-loader?limit=50000"]
			
		},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({url:"localhost:8091"}),
		new webpack.DefinePlugin({__DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV=="dev")||"false"))})
	],
	devServer:{
		 proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3002',
            secure: false
          }
        },
		historyApiFallback:true,
		inline:true,
		hot:true,
		port:8091
	}
}
module.exports=config 