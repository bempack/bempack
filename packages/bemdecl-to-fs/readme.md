bemdecl-to-fs
=============

Finds files that satisfy the provided bemdecl.

## Usage

Promise API:

```javascript
const bemdeclToFs = require('bemdecl-to-fs');

const bemdecl = [{block: 'a'}];
const levels = ['blocks'];
const techs = ['css', 'js'];

bemdeclToFs(bemdecl, levels, techs)
  .then(files => console.log(files));
```

Common API:

```javascript
const bemdeclToFs = require('bemdecl-to-fs');

const bemdecl = [{block: 'a'}];
const levels = ['blocks'];
const techs = ['css', 'js'];

bemdeclToFs(bemdecl, levels, techs, (er, files) => {
  if (er) {
    throw er;
  }

  console.log(files);
});
```
