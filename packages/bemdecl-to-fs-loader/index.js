var bemdeclToFs = require('bemdecl-to-fs');
var loaderUtils = require('loader-utils');
var get = require('lodash.get');
var path = require('path');

/**
 * query:
 * - levels {string|string[]}
 * - techs {string|string[]}
 *
 * @param {string|array} content
 */
module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable();
  }

  var callback = this.async();
  var query = loaderUtils.parseQuery(this.query);
  var self = this;

  var exts = query.extensions || get(this.options, 'bem.extensions');
  var levels = query.levels || get(this.options, 'bem.levels');

  var bemdecl = typeof content === 'string'
    ? this.exec(content, this.resourcePath)
    : content; // assume that its a plain object / array

  bemdeclToFs(bemdecl, levels, exts)
    .then(function (files) {
      var source = files.map(function (file) {
        self.addDependency(file);
        return 'require(' + loaderUtils.stringifyRequest(self, path.relative(self.context, file)) + ')';
      })
      .join('\n');

      callback(null, source);
    })
    .catch(callback);
};
