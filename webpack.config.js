const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'controllers', 'outputView.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
