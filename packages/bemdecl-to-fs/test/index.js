const assert = require('assert');
const bemdeclToFs = require('../lib');
const path = require('path');

const decl = require('./fixture/bemdecl');
const levels = [
  path.join(__dirname, 'fixture/common-level'),
  path.join(__dirname, 'fixture/one-more-level'),
];

suite('bemdecl-to-fs', () => {
  test('saves order', done => {
    bemdeclToFs(decl, 'test/fixture/common-level', 'css', (er, files) => {
      if (er) {
        return void done(er);
      }

      assert.deepEqual(files, [
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/c/c.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/b.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/_m/b_m_a.css',
      ]);

      done();
    });
  });

  test('single tech', done => {
    bemdeclToFs(decl, levels, ['css'], (er, files) => {
      if (er) {
        return void done(er);
      }

      assert.deepEqual(files, [
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/c/c.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/b.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/one-more-level/b/b.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/_m/b_m_a.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/one-more-level/a/a.css',
      ]);

      done();
    });
  });

  test('multiple techs', done => {
    bemdeclToFs(decl, levels, ['css', 'js'], (er, files) => {
      if (er) {
        return void done(er);
      }

      assert.deepEqual(files, [
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/c/c.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/c/c.js',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/b.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/b.js',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/one-more-level/b/b.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/_m/b_m_a.css',
        '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/one-more-level/a/a.css',
      ]);

      done();
    });
  });

  test('promise api', done => {
    bemdeclToFs(decl, 'test/fixture/common-level', 'css')
      .then(files => {
        assert.deepEqual(files, [
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/c/c.css',
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/b.css',
          '/Users/sullenor/Documents/repos/bemdecl-to-fs/test/fixture/common-level/b/_m/b_m_a.css',
        ]);

        done();
      })
      .catch(done);
  });
});
