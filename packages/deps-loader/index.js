var flattenDeps = require('./lib/flatten-deps');
var get = require('lodash.get');
var loaderUtils = require('loader-utils');

/**
 * query:
 * - levels {string|string[]}
 * - techs {string|string[]}
 *
 * @param {string|array} content
 */
module.exports = function (content) {
    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);

    var exts = query.extensions || get(this.options, 'bem.extensions');
    var levels = query.levels || get(this.options, 'bem.levels');

    var bemdecl = typeof content === 'string'
        ? this.exec(content, this.resourcePath)
        : content; // assume that its a plain object / array

    flattenDeps(bemdecl, levels, exts)
      .then(function (deps) {
        callback(null, deps);
      })
      .catch(callback);
};
