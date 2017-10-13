const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html')
        }),
        new UglifyJSPlugin()
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
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
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