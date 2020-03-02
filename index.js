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
			let output = '';
			if (inBrowser) {
				output = '%c';
				
				let css = 'color: ';
				
				if (apiList.includes('red')) css += _cssRed;
				else if (apiList.includes('green')) css += _cssGreen;
				else if (apiList.includes('blue')) css += _cssBlue;
				else if (apiList.includes('cyan')) css += _cssCyan;
				else if (apiList.includes('magenta')) css += _cssMagenta;
				else if (apiList.includes('yellow')) css += _cssYellow;
				else if (apiList.includes('black')) css += _cssBlack;
				else if (apiList.includes('white')) css += _cssWhite;
				
				css += ';background-color: ';
				
				if (apiList.includes('bgRed')) css += _cssRed;
				else if (apiList.includes('bgGreen')) css += _cssGreen;
				else if (apiList.includes('bgBlue')) css += _cssBlue;
				else if (apiList.includes('bgCyan')) css += _cssCyan;
				else if (apiList.includes('bgMagenta')) css += _cssMagenta;
				else if (apiList.includes('bgYellow')) css += _cssYellow;
				else if (apiList.includes('bgBlack')) css += _cssBlack;
				else if (apiList.includes('bgWhite')) css += _cssWhite;

				css += ';';
				
				if (apiList.includes('underline')) css += 'text-decoration: underline;';
				
				browserCss.push(css);
			}
			else {
				output += '\u001b[';
				
				if (apiList.includes('red')) output += '91';
				else if (apiList.includes('green')) output += '92';
				else if (apiList.includes('blue')) output += '94';
				else if (apiList.includes('cyan')) output += '96';
				else if (apiList.includes('magenta')) output += '95';
				else if (apiList.includes('yellow')) output += '93';
				else if (apiList.includes('black')) output += '90';
				else if (apiList.includes('white')) output += '97';

				if (apiList.includes('bgRed')) output += '101';
				else if (apiList.includes('bgGreen')) output += '102';
				else if (apiList.includes('bgBlue')) output += '104';
				else if (apiList.includes('bgCyan')) output += '106';
				else if (apiList.includes('bgMagenta')) output += '105';
				else if (apiList.includes('bgYellow')) output += '103';
				else if (apiList.includes('bgBlack')) output += '100';
				else if (apiList.includes('bgWhite')) output += '107';

				if (apiList.includes('underline')) output += '4;';
				
				output += 'm';
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
