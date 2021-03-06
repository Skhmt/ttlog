
const log = require('../dist/ttlog.min.js');
const {performance} = require('perf_hooks');

//// TESTS

const startTime = performance.now();
log`{black.bgWhite black text | white background}`;
log`{white.bgRed white text | red background}`;
log`{red.bgGreen red text | green background}`;
log`{green.bgBlue green text | blue background}`;
log`{blue.bgMagenta blue text | magenta background}`;
log`{cyan.bgYellow cyan text | yellow background}`;
log`{magenta.bgCyan magenta text | cyan background}`;
log`{yellow.bgBlack yellow text | black background}`;
log`{underline underline}`;
log`{red Multiple} {white text} {blue coloring}`;
log`{cyan ${'template'} ${'t' + 'e' + 's' + 't'}}`;
const runTime = performance.now() - startTime;
const averageTime = runTime / 11;
console.log(`Average parse time for the above: ${averageTime}ms`)