bemdecl-to-fs-loader
====================

Webpack loader wrapper for [bemdecl-to-fs](https://github.com/sullenor/bemdecl-to-fs).

## Installation

```bash
$ npm i bemdecl-to-fs-loader
```

## Usage

Loader accepts javascript data, like array or plain object, or raw module code as a string (`module.exports = [...]`).

```javascript
module.exports = {
  /* entry, output */

  module: {
    loaders: [
      {
        test: /\.bemjson\.js$/i,
        loader: 'bemdecl-to-fs!bemjson',
      }
    ]
  },

  bem: {
    levels: [
      'libs/blocks'
    ],
    extensions: [
      'css'
    ],
  }
};
```

Note that you can provide **extensions** and **levels** arguments to the loader, so they will overwrite globals from the `bem` section. For example:

```javascript
{
  test: /\.bemjson\.js$/i,
  loader: 'bemdecl-to-fs?extensions[]=css&levels[]=libs/blocks!bemjson',
}
```
