var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: path.resolve(__dirname, 'src/react/entry.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle2.js'
  },
  module: {
    loaders: [
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader?sourceMap!less-loader?sourceMap'
        }
        ,{
          test: /\.jsx?$/,

          // There is not need to run the loader through
          // vendors
          exclude: [node_modules_dir],
          loader: 'babel'
        }
    ]
  }
};

module.exports = config;