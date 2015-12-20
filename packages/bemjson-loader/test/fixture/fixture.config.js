const path = require('path');

const loader = path.join(__dirname, '../../index.js');
const source = path.join(__dirname, '../cases/simple/source.js');
const destination = path.join(__dirname, 'index.bundle.js');

module.exports = {
  entry: source,

  output: {
    filename: path.basename(destination),
    libraryTarget: 'commonjs2',
    path: path.dirname(destination),
  },

  module: {
    loaders: [
      {
        test: /\.js$/i,
        loader: loader,
      }
    ]
  },

  target: 'node',

  // small helper for test purpose
  destination: destination,
};
