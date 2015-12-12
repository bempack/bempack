bemdecl-to-fs
=============

## Usage

```javascript
const bemdeclToFs = require('bemdecl-to-fs');

const bemdecl = [];
const levels = []; // absolute paths
const techs = ['css', 'js'];

bemdeclToFs(bemdecl, levels, techs)
  .then(files => console.log(files));
```
