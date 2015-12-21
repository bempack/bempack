const fs = require('fs');
const path = require('path');

const cases = path.resolve('test/cases');

module.exports = {
  entry: fs.readdirSync(cases)
    .reduce((entry, dir) => {
      entry[dir] = path.join(cases, dir, 'source.bemhtml.js');
      return entry;
    }, {}),

  output: {
    filename: '[name].bemhtml.js',
    libraryTarget: 'commonjs',
    path: path.resolve('dist'),
  },

  module: {
    loaders: [
      {
        test: /\.bemhtml\.js$/,
        loader: path.resolve('index.js'),
      },
    ],
  },
};
