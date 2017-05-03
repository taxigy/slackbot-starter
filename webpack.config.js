const path = require('path');
const fs = require('fs');

const externals = {};

fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1).forEach((mod) => {
  externals[mod] = `commonjs ${mod}`;
});

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  target: 'node',
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'src')],
      test: /\.js$/,
      query: {
        presets: ['es2017', 'stage-0'],
      },
    }],
  },
  externals,
};
