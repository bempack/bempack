'use strict';

/**
 * bemhtml loader
 *
 * @param  {string} source
 * @return {string}
 */
module.exports = function (source) {
  this.cacheable();

  var corePath = require.resolve('./runtime');
  return "var bemhtml = require('" + corePath + "');\n\nbemhtml.compile(function () {\n" +
    source + "\n});\n\nmodule.exports = bemhtml;\n";
};
