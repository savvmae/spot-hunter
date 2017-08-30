var webpack = require('webpack');
var path = require('path');
var DotenvPlugin = require('webpack-dotenv-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
context: __dirname + "/app",
    entry: "./index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader',
      }
    ]
  }
  // plugins: [
  //   new DotenvPlugin({
  //     sample: '.././.env.example',
  //     path: '../.env'
  //   })
  // ]
};

module.exports = config;
