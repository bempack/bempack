const assert = require('assert');
const config = require('./fixture/fixture.config');
const convert = require('./fixture/helper').convert;

suite('bemjson-loader', () => {
  test('should inline comment', done => {
    convert(config)
      .then(result => {
        assert.deepEqual(result, require('./cases/simple/expected'));
        done();
      })
      .catch(done);
  });
});
