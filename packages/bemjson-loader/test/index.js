'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const config = require('./fixture/fixture.config');
const convert = require('./fixture/helper').convert;

const cases = fs.readdirSync(path.join(__dirname, 'cases'));

describe('bemjson-loader', () => {
  cases.forEach(testCase => {
    it(`should pass ${testCase}`, done => {
      config.entry = path.join(__dirname, `./cases/${testCase}/source.bemjson.js`);
      convert(config)
        .then(result => {
          assert.deepEqual(result, require(`./cases/${testCase}/expected.bemdecl.json`));
          done();
        })
        .catch(done);
    });
  });
});
