const assert = require('assert');
const decl = require('./fixture/bemdecl');
const utils = require('../lib/utils');

suite('utils', () => {
  test('.buildSet()', () => {
    assert.equal(utils.buildSet(['a']), 'a');
    assert.equal(utils.buildSet(['a', 'b', 'c']), '{a,b,c}');
  });

  test('.resolveDecl()', () => {
    assert.equal(utils.resolveDecl(decl[2]), 'b/_m/b_m_a');
  });

  test('.stringToArray()', () => {
    assert.deepEqual(utils.stringToArray('a'), ['a']);
    assert.deepEqual(utils.stringToArray(['a']), ['a']);
  });
});
