
let log = require('./log.js');

//// TESTS

console.time('template test');
log`template test {bgGreen.red a${1}bc} {red ${2}d${3}} {bgGreen ${4}ef}`;
console.timeEnd('template test');

log`hello {white.bgBlack darkness} {red my} {green old} {blue friend} {cyan I've} {magenta come} {yellow to} {underline talk} {to} {black.bgCyan you} {underline.red.bgBlack again}`
log`{black.bgWhite black white}`
log`{white.bgRed white red}`
log`{red.bgGreen red green}`
log`{green.bgBlue green blue}`
log`{blue.bgMagenta blue magenta}`
log`{cyan.bgYellow cyan yellow}`
log`{magenta.bgCyan magenta cyan}`
log`{yellow.bgBlack yellow black}`
log`{underline underline}`
console.log('this is normal text from console.log()')