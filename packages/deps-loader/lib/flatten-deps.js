var bemDeps = require('@bem/deps');
var toArray = require('stream-to-array');

var loadPromise;

function scanDepsFiles(levels) {
  return toArray(bemDeps.load({ levels: levels }));
}

module.exports = function (declaration, levels, extenstion) {
  if (!loadPromise) {
    loadPromise = scanDepsFiles(levels)
  }

  return loadPromise.then(function (relations) {
    var result = bemDeps.resolve(declaration, relations, {tech: extenstion});
    return result.entities;
  });
};
