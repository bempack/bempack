const path = require('path');

module.exports = {
    context: __dirname,
    entry: ['./entry', './blocks/a/a.js', './blocks/b/b.js', './blocks/c/c.js'],
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: path.resolve(__dirname + '/../')
        }]
    },
    bail: true,
    resolve: {
        root: [
            __dirname + '/blocks'
        ]
    }
};
