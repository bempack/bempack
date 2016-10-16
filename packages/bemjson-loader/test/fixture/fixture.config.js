const path = require("path");
const loader = path.join(__dirname, "../../index.js");
const destination = path.join(__dirname, "index.bundle.js");

module.exports = {
  output: {
    filename: path.basename(destination),
    libraryTarget: "commonjs2",
    path: path.dirname(destination),
  },

  module: {
    loaders: [{
      test: /\.js$/i,
      loader: loader,
    }]
  },

  target: "node",

  // small helper for test purpose
  destination: destination,
};
