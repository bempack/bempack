var bemjsonToDecl = require('bemjson-to-decl');
var loaderUtils = require('loader-utils');

/**
 * @param  {string} source
 * @return {string}
 */
module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  
  var bemjson = this.exec(source);
  var query = loaderUtils.parseQuery(this.query);
  var stringify = typeof query.stringify === 'boolean'
    ? query.stringify
    : true;

  if (stringify) {
    return 'module.exports = ' + bemjsonToDecl.stringify(bemjson);
  }

  return bemjsonToDecl.convert(bemjson);
};
