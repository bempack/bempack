const assert = require('assert');
const fs = require('fs');
const mocha = require('mocha');
const path = require('path');
const webpack = require('webpack');

const cases = path.resolve('test/cases');
const config = require('./fixture/webpack.config');

suite('bemhtml-loader', done => {
  setup(done => {
    new webpack(config, er => {
      if (er) {
        return void done(er);
      }

      done();
    });
  });

  fs.readdirSync(cases).map(testCase => {
    suite(testCase, () => {
      test('should match expected.html', () => {
        const bemjson = require(path.resolve(cases, testCase, 'source.bemjson'));
        const template = require(path.resolve('dist', `${testCase}.bemhtml.js`));

        assert.equal(template.apply(bemjson),
          fs.readFileSync(path.resolve(cases, testCase, 'expected.html'), 'utf8').trim());
      });
    });
  });
});
