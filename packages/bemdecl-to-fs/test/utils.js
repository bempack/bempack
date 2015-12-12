const assert = require('assert');
const decl = require('./fixture/bemdecl');
const utils = require('../lib/utils');

suite('utils', () => {
  test('.resolveDecl()', () => {
    assert.equal(utils.resolveDecl(decl[0]), 'page/_theme/page_theme_islands');
  });
});
