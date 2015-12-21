'use strict';

const fs = require('fs');
const path = require('path');

const cases = path.resolve('test/cases');

module.exports = {
  entry: provideEntry(cases, fs.readdirSync(cases)),

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

function isFile(filepath) {
  try {
    return fs.statSync(filepath).isFile();
  } catch (e) {}

  return false;
}

function provideEntry(cases, dirs) {
  return dirs.reduce((entry, dir) => {
    const source = path.join(cases, dir, 'source.bemhtml.js');
    entry[dir] = isFile(source) ? source : path.join(cases, dir, 'source.js');

    return entry;
  }, {});
}
