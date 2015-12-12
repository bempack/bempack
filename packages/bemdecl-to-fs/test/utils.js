const assert = require('assert');
const decl = require('./fixture/bemdecl');
const utils = require('../lib/utils');

suite('utils', () => {
  test('.resolveDecl()', () => {
    assert.equal(utils.resolveDecl(decl[2]), 'b/_m/b_m_a');
  });
});
