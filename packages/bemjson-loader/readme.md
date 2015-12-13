bemjson-loader
==============

Bemjson webpack loader. Extracts declarations from the bemjson file and converts then to the commonJs module.

## Installation

```bash
$ npm i bemjson-loader
```

## Usage

```javascript
module.exports = {
  entry: './index.bemjson.js',

  module: {
    loaders: [
      {
        test: /\.bemjson\.js$/i,
        loader: 'bemjson'
      }
    ]
  }
};
```

or

```javascript
module.exports = {
  entry: './index.bemjson.js',

  module: {
    loaders: [
      {
        test: /\.bemjson\.js$/i,
        loader: 'bemdecl-to-fs!bemjson&stringify=false'
      }
    ]
  }
};
```
