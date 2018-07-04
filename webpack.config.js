const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './src/app.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    publicPath: '/atm-es6',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
};
