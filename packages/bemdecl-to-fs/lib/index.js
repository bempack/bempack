var compose = require('lodash.compose');
var glob = require('glob');
var flatten = require('lodash.flatten');
var path = require('path');
var promisify = require('tiny-promisify');
var utils = require('./utils');

var globby = promisify(glob);

/**
 * @param  {string} pattern
 * @return {promise}
 */
function lookup(pattern) {
  return globby(pattern, {noglobstar: true, nosort: true, realpath: true});
}

/**
 * @param {object[]} bemdecl
 * @param {string|string[]} _levels
 * @param {string|string[]} _techs
 * @param {function} callback
 */
function bemdeclToFsCore(bemdecl, _levels, _techs, callback) {
  var levels = utils.stringToArray(_levels);
  var techs = utils.stringToArray(_techs);

  if (!Array.isArray(bemdecl)) {
    return void callback(new Error('bemdecl should be array'));
  }

  if (levels.length === 0) {
    return void callback(new Error('should provide levels'));
  }

  if (techs.length === 0) {
    return void callback(new Error('should provide techs'));
  }

  if (bemdecl.length === 0) {
    return callback(null, []);
  }

  var set = utils.buildSet(levels);
  var exts = utils.buildSet(techs);

  /**
   * @param  {string} decl
   * @return {string}
   */
  var buildPattern = function (decl) {
    return path.join(set, decl + '.' + exts);
  };

  var files = bemdecl.map(compose(lookup, buildPattern, utils.resolveDecl));

  return Promise.all(files)
    .then(flatten)
    .then(function (files) {
      callback(null, files);
    })
    .catch(callback);
}

/**
 * @param {object[]} bemdecl
 * @param {string|string[]} _levels
 * @param {string|string[]} _techs
 * @param {function} [callback]
 */
module.exports = function bemdeclToFs(bemdecl, _levels, _techs, callback) {
  if (callback) {
    return void bemdeclToFsCore.apply(null, arguments);
  }

  return promisify(bemdeclToFsCore).apply(null, arguments);
};
