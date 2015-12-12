var glob = require('glob');
var path = require('path');
var utils = require('./utils');

/**
 * @param {object[]} bemdecl
 * @param {string|string[]} _levels
 * @param {string|string[]} _techs
 * @param {function} callback
 */
module.exports = function (bemdecl, _levels, _techs, callback) {
  var levels = utils.stringToArray(_levels);
  var techs = utils.stringToArray(_techs);

  // validate

  if (bemdecl.length === 0) {
    return void callback(null, []);
  }

  var techPattern = utils.globify(techs);

  var files = bemdecl
    .map(utils.resolveDecl)
    .reduce(function (total, resolvedDecl) {
      return total.concat(levels.map(function (level) {
        return path.resolve(level, resolvedDecl + '.' + techPattern)
      }));
    }, []);

  glob(utils.globify(files), {realpath: true}, callback);
};
