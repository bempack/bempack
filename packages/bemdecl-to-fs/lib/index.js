var glob = require('globby');
var path = require('path');
var utils = require('./utils');

/**
 * @param {object[]} bemdecl
 * @param {string|string[]} _levels
 * @param {string|string[]} _techs
 */
module.exports = function (bemdecl, _levels, _techs) {
  var levels = utils.stringToArray(_levels);
  var techs = utils.stringToArray(_techs);

  // validate

  if (bemdecl.length === 0) {
    return Promise.resolve([]);
  }

  var techPattern = utils.globify(techs);

  var files = bemdecl
    .map(utils.resolveDecl)
    .reduce(function (total, resolvedDecl) {
      return total.concat(levels.map(function (level) {
        return path.resolve(level, resolvedDecl + '.' + techPattern)
      }));
    }, []);

  return glob(files);
};
