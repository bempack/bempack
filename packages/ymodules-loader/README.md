# ymodules-loader [![Build Status](https://travis-ci.org/just-boris/ymodules-loader.svg?branch=master)](https://travis-ci.org/just-boris/ymodules-loader)

> Webpack loader for [ymodules](https://github.com/ymaps/modules) module definitions

## Getting started

```
npm install ymodules-loader --save-dev
```

Add the following into your loader list:

```js
module: {
    loaders: [{
        test: /\.js$/,
        loader: 'ymodules-loader'
    }]
}
```

*ProTip*: add `exclude: /node_modules/` if you don't need to look for that modules among vendor components

Then loader will pass through your `js`-files and detect all imports in `ymodules` format. All found 
dependencies would be added with `require()` call.


**Source file**
```js
modules.define('example', ['dep1', 'dep2'], (provide, d1, d2) => {
    //...
});
```

**Processed file**
```js
var modules = require('ym');

require('dep1/dep1');
require('dep2/dep2');

modules.define('example', ['dep1', 'dep2'], (provide, d1, d2) => {
    //...
});
```

After that webpack will find all your modules and put them together as well as usual CommonJS modules.

## Example

See the [test](test) folder for real usage example.

## Technical details

The code processing is performed by [babel](http://babeljs.io/).

Now we are assuming that your modules placed by default bem-project structure like: 
```
common.blocks/
├── button
│   └── button.js
├── input
│   └── input.js
└── select
    └── select.js
```

In future versions module path resolving will be configurable.
