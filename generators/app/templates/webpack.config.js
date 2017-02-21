const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package');

const plugins = [
  new webpack.BannerPlugin(
    `<%= name %> v${packageJson.version}
Copyright (c) 2017 Ritter Insurance Marketing`),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
];



module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/<%= filename %>.js'
  ],
  output: {
    path: './lib',
    filename: '<%= filename %>.min.js',
    library: '<%= classname %>',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    https: true,
  },
  plugins: plugins
};
