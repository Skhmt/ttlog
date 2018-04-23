# ttlog
Terminal and browser console colorizer

## Usage in node.js
```js
const log = require('ttlog');
log`hello {white.bgBlack darkness} {red my} {green old} {blue friend} {cyan I've} {magenta come} {yellow to} {underline talk} {to} {black.bgCyan you} {underline.red.bgBlack again}`;
```

## Usage in the browser
```html
<script src="./log.js"></script>
```
```js
log`hello {white.bgBlack darkness} {red my} {green old} {blue friend} {cyan I've} {magenta come} {yellow to} {underline talk} {to} {black.bgCyan you} {underline.red.bgBlack again}`;
```

## API

- red
- green
- blue
- cyan
- magenta
- yellow
- black
- white
- bgRed
- bgGreen
- bgBlue
- bgCyan
- bgMagenta
- bgYellow
- bgBlack
- bgWhite
- underline
