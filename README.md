# ttlog
Terminal and browser console colorizer

ttlog `console.log()`s using [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) syntax similar to chalk.js, but works in both the browser and terminal (Windows 10, unix/linux, and macOS). ttlog also returns the plain-text string without colorization information so you can output it to a file or whatever.

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
alternatively, if you want to use it from a CDN:
```html
<script src="https://cdn.rawgit.com/Skhmt/ttlog/1c45acfc/dist/ttlog.min.js" integrity="sha384-6nnP4ihGtHRWG+5gRLMmuhdrXaeB3gp3u/AYtIBg5omethw9PFen53Ou1Kz1nIuE" crossorigin="anonymous"></script>
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
