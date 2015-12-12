bemdecl-to-fs
=============

## Usage

```javascript
const bemdeclToFs = require('bemdecl-to-fs');

const bemdecl = [{block: 'a'}];
const levels = ['blocks'];
const techs = ['css', 'js'];

bemdeclToFs(bemdecl, levels, techs)
  .then(files => console.log(files));
```
