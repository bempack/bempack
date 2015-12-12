const babel = require('babel-core');
module.exports = function(source) {
    this.cacheable();
    return babel.transform(source, {
        plugins: [require('./transform')]
    }).code;
};
