const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    devtool: 'inline-source-map',  //方便调试用，报错后可以直接指出错误位于源码第几行、列。并且开发模式可直接在控制台查看到源码
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html')
        })
    ],
    output: {
      filename: '[name].bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        // 手动配置
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1,
                minimize: true,
                sourceMap: true
              }
            }
          ]
        },
        /** 或者默认配置也行
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader" //一定是style-loader在css-loader前面
            },
            {
              loader: "css-loader"
            }
          ]
        },
        **/
        // 解析sass文件
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings 
            },
            {
              loader: "css-loader", // translates CSS into CommonJS 
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                ]
              } 
            }
          ]
        }
      ]
    }
}