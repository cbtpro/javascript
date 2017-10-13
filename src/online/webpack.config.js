const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',  //方便调试用，报错后可以直接指出错误位于源码第几行、列。并且开发模式可直接在控制台查看到源码
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new ManifestPlugin()
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      /**
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        },
        {
          test: /.css$/,
          loader: 'style-loader!css-loader?modules'
        }
      ]
      **/
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }   
      ]
    }
}