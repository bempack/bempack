bemhtml-loader
==============

[Webpack](https://webpack.github.io/) loader for [bemhtml](http://bem.github.io/bem-xjst/) template engine.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```javascript
var bemhtml = require('bemhtml!./template.bemhtml.js');

bemhtml.apply({block: 'header', content: 'It\'s a header!'});
// => returns html
```
