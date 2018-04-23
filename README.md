# ttlog
Terminal and browser console colorizer

## Usage in node.js
```js
const log = require('ttlog');
log`hello {white.bgBlack darkness} {underline my} {green old} {underline.blue.bgYellow friend}`;
```

## Usage in the browser
```html
<script src="./log.js"></script>
```
```js
log`hello {white.bgBlack darkness} {underline my} {green old} {underline.blue.bgYellow friend}`;
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
