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
				output += '\u001b[';

				const mods = [];

				if (has('red')) mods.push('91');
				else if (has('green')) mods.push('92');
				else if (has('blue')) mods.push('94');
				else if (has('cyan')) mods.push('96');
				else if (has('magenta')) mods.push('95');
				else if (has('yellow')) mods.push('93');
				else if (has('black')) mods.push('90');
				else if (has('white')) mods.push('97');

				if (has('bgRed')) mods.push('101');
				else if (has('bgGreen')) mods.push('102');
				else if (has('bgBlue')) mods.push('104');
				else if (has('bgCyan')) mods.push('106');
				else if (has('bgMagenta')) mods.push('105');
				else if (has('bgYellow')) mods.push('103');
				else if (has('bgBlack')) mods.push('100');
				else if (has('bgWhite')) mods.push('107');

				if (has('underline')) mods.push('4');
				
				output += mods.join(';') + 'm';
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
