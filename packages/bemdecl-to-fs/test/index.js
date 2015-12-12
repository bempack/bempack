const assert = require('assert');
const bemdeclToFs = require('../lib');
const path = require('path');

const decl = require('./fixture/bemdecl');
const levels = path.join(__dirname, 'fixture');
const techs = 'css';

suite('bemdecl-to-fs', () => {
  test('saves order', done => {
    bemdeclToFs(decl, levels, techs)
      .then(files => {
        assert.deepEqual(files, [
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/c/c.css',
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/b/b.css',
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/b/_m/b_m_a.css'
        ]);

        done();
      })
      .catch(done);
  });
});
