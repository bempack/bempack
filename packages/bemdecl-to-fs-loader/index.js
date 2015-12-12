var bemdeclToFs = require('bemdecl-to-fs');
var loaderUtils = require('loader-utils');

/**
 * query:
 * - levels
 * - techs
 *
 * @param  {string} content
 */
module.exports = function (content) {
  var callback = this.async();
  var query = loaderUtils.parseQuery(this.query);

  bemdeclToFs();
};
