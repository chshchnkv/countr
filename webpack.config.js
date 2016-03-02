var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'build')
  },

  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
//    publicPath: path.resolve(__dirname, '/build/js'),
    filename: './js/main.js',
    sourceMapFilename: '[file].map'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src/js']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'}
    ]
  }
};
