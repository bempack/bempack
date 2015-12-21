/**
 * bemhtml loader
 *
 * @param  {string} source
 * @return {string}
 */
module.exports = function (source) {
  this.cacheable();

  var corePath = require.resolve('./runtime');
  return "require('" + core + "').compile(function () {\n" + source + "\n});\n";
};
