const assert = require('assert');

modules.require(['a'], function(a) {
    assert.equal(a.join(), 'a,b,c');
});
