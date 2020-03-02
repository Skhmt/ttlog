# ttlog (tagged template log)
Terminal and browser console colorizer

Ttlog `console.log()`s using tagged template syntax similar to chalk.js, but works in both the browser and terminal (Windows 10, unix/linux, and macOS). Ttlog also returns the plain-text string without colorization information so you can output it to a file or whatever.

## Usage in node.js or webpack
```js
const log = require('ttlog');
log`hello {white.bgBlack darkness} {underline my} {green old} {underline.blue.bgYellow friend}`;
```

## Both outputting and writing a log in node.js
```js
const fs = require('fs');
const log = require('ttlog');
fs.appendFile('mylog.log', log`{blue ${Date.now()}}: {green Bad things happened!!}`);
```

## Usage in the browser
Put this in your html (head or body) if you host the file yourself:
```html
<script src="ttlog.min.js"></script>
```

Use it like this in a `.js` or `<script>` tag:
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

## Todo

- Support console.info/warn/etc?
	- Problem is node doesn't support those, so it won't be consistent behavior
- Support `import`
	- `import` and `require` are competing and I haven't found a way to allow both from the same .js file

## Further reading and interesting links

- [Chrome console colors](https://coderwall.com/p/fskzdw/colorful-console-log): For browser console
- [ANSI escape colors](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors): For terminal/cmd
- [Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates): ES2015
- [Chalk](https://github.com/chalk/chalk): What inspired this
- [Generate SRI hash code](https://www.srihash.org/): Yay security
