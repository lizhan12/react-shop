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
			use:["url-loader?limit=5000"]
			
		},{
			test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
			use:["url-loader?limit=5000"]
			
		},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({url:"localhost:8080"}),
		new webpack.DefinePlugin({__DEV__:JSON.stringify(JSON.parse((process.env.NODE_ENV=="dev")||"false"))})
	],
	devServer:{
		historyApiFallback:true,
		inline:true,
		hot:true,
		port:8080
	}
}
module.exports=config 