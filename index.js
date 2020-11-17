// tagged color logs in browser and console
// usage: log`hell{underline o} {green.bgBlack world}`

if (typeof(module) === 'object' && module.exports) module.exports = __TTLOG;
else if (!window['log']) window['log'] = __TTLOG;
else throw 'window.log already defined';

function __TTLOG (strings, ...keys) {
	
	// web console colors, based on atom one dark colors. Any CSS colors can be used such as hex, HSL, HWB, CMYK, etc.
	const _cssRed     = 'rgb(241,76,76)';
	const _cssGreen   = 'rgb(35,209,139)';
	const _cssBlue    = 'rgb(59,142,234)';
	const _cssCyan    = 'rgb(41,184,219)';
	const _cssMagenta = 'rgb(214,112,214)';
	const _cssYellow  = 'rgb(245,245,67)';
	const _cssBlack   = 'rgb(40,44,52)';
	const _cssWhite   = 'rgb(200,200,200)';

	// pattern for finding: {word.word.word lorem ipsum}
	const apiRegex = /(\{(?:[A-Za-z]*\.?)*\s)([^\}]*)\}/g;

	// if there's no "window" object, assuming this is a node terminal instead of a browser console
	const inBrowser = (typeof(window) === 'object');

	// output builders
	let outputBuilder = '';
	let browserCss = [];

	// build the output string from template string variables and regular text
	for (let i in strings) {
		outputBuilder += strings[i];
		if (keys && keys[i]) outputBuilder += keys[i];
	}

	// the output without any ttlog-specific markup
	const cleanOutput = outputBuilder.replace(apiRegex, (match, g1, g2) => g2);

	// replace ttlog-specific markup with the console or terminal codes necessary
	outputBuilder = outputBuilder.replace(
		apiRegex,
		(match, g1, g2) => {
			let apiList = g1.slice(1, -1).split('.');
			const has = (str) => apiList.includes(str);
			let output = '';
			if (inBrowser) {
				output = '%c';
				
				let css = 'color: ';
				
				if (has('red')) css += _cssRed;
				else if (has('green')) css += _cssGreen;
				else if (has('blue')) css += _cssBlue;
				else if (has('cyan')) css += _cssCyan;
				else if (has('magenta')) css += _cssMagenta;
				else if (has('yellow')) css += _cssYellow;
				else if (has('black')) css += _cssBlack;
				else if (has('white')) css += _cssWhite;
				
				css += ';background-color: ';
				
				if (has('bgRed')) css += _cssRed;
				else if (has('bgGreen')) css += _cssGreen;
				else if (has('bgBlue')) css += _cssBlue;
				else if (has('bgCyan')) css += _cssCyan;
				else if (has('bgMagenta')) css += _cssMagenta;
				else if (has('bgYellow')) css += _cssYellow;
				else if (has('bgBlack')) css += _cssBlack;
				else if (has('bgWhite')) css += _cssWhite;

				css += ';';
				
				if (has('underline')) css += 'text-decoration: underline;';
				
				browserCss.push(css);
			}
			else {
				const mods = [];

				if (has('red')) output += '\u001b[91m';
				else if (has('green')) output += '\u001b[92m';
				else if (has('blue')) output += '\u001b[94m';
				else if (has('cyan')) output += '\u001b[96m';
				else if (has('magenta')) output += '\u001b[95m';
				else if (has('yellow')) output += '\u001b[93m';
				else if (has('black')) output += '\u001b[90m';
				else if (has('white')) output += '\u001b[97m';

				if (has('bgRed')) output += '\u001b[101m';
				else if (has('bgGreen')) output += '\u001b[102m';
				else if (has('bgBlue')) output += '\u001b[104m';
				else if (has('bgCyan')) output += '\u001b[106m';
				else if (has('bgMagenta')) output += '\u001b[105m';
				else if (has('bgYellow')) output += '\u001b[103m';
				else if (has('bgBlack')) output += '\u001b[100m';
				else if (has('bgWhite')) output += '\u001b[107m';

				if (has('underline')) output += '\u001b[4m';
			}

			// adding back in the regular text to be colorized
			output += g2;

			// clearing the color changes
			if (inBrowser) {
				browserCss.push('color:;background-color:;');
				output += '%c';
			}
			else output += '\u001b[0m';

			return output;
		} // (match, g1, g2) => {
	);

	// console.log the colored text
	if (inBrowser) console.log(outputBuilder, ...browserCss);
	else console.log(outputBuilder);

	// return the plaintext for use in writing a logfile
	return cleanOutput;
}
