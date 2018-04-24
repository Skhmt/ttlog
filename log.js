// tagged color logs in browser and console
// usage: log`hell{underline o} {green.bgBlack world}`

if (typeof(module) === 'object' && module.exports) module.exports = log;

function log (strings, ...keys) {

	const apiRegex = /(\{(?:[A-Za-z]*\.?)*\s)([^\}]*)\}/g;
	const inBrowser = (typeof(window) === 'object');
	
	let outputBuilder = '';
	let browserCss = [];

	const _cssRed = 'rgb(241,76,76)';
	const _cssGreen = 'rgb(35,209,139)';
	const _cssBlue = 'rgb(59,142,234)';
	const _cssCyan = 'rgb(41,184,219)';
	const _cssMagenta = 'rgb(214,112,214)';
	const _cssYellow = 'rgb(245,245,67)';
	const _cssBlack = 'rgb(40,44,52)';
	const _cssWhite = 'rgb(200,200,200)';

	// build the output string from template string variables and such
	for (let i in strings) {
		outputBuilder += strings[i];
		if (keys && keys[i]) outputBuilder += keys[i];
	}

	const cleanOutput = outputBuilder.replace(apiRegex, (match, g1, g2) => g2);

	outputBuilder = outputBuilder.replace(
		apiRegex,
		(match, g1, g2) => {
			let apiList = g1.slice(1, -1).split('.');
			let output = '';
			if (inBrowser) {
				output = '%c';
				let css = '';
				if (apiList.includes('red')) css += `color: ${_cssRed};`;
				else if (apiList.includes('green')) css += `color: ${_cssGreen};`;
				else if (apiList.includes('blue')) css += `color: ${_cssBlue};`;
				else if (apiList.includes('cyan')) css += `color: ${_cssCyan};`;
				else if (apiList.includes('magenta')) css += `color: ${_cssMagenta};`;
				else if (apiList.includes('yellow')) css += `color: ${_cssYellow};`;
				else if (apiList.includes('black')) css += `color: ${_cssBlack};`;
				else if (apiList.includes('white')) css += `color: ${_cssWhite};`;

				if (apiList.includes('bgRed')) css += `background-color: ${_cssRed};`;
				else if (apiList.includes('bgGreen')) css += `background-color: ${_cssGreen};`;
				else if (apiList.includes('bgBlue')) css += `background-color: ${_cssBlue};`;
				else if (apiList.includes('bgCyan')) css += `background-color: ${_cssCyan};`;
				else if (apiList.includes('bgMagenta')) css += `background-color: ${_cssMagenta};`;
				else if (apiList.includes('bgYellow')) css += `background-color: ${_cssYellow};`;
				else if (apiList.includes('bgBlack')) css += `background-color: ${_cssBlack};`;
				else if (apiList.includes('bgWhite')) css += `background-color: ${_cssWhite};`;

				if (apiList.includes('underline')) css += 'text-decoration: underline;';

				browserCss.push(css);
			}
			else {
				if (apiList.includes('red')) output += '\x1b[91m';
				else if (apiList.includes('green')) output += '\x1b[92m';
				else if (apiList.includes('blue')) output += '\x1b[94m';
				else if (apiList.includes('cyan')) output += '\x1b[96m';
				else if (apiList.includes('magenta')) output += '\x1b[95m';
				else if (apiList.includes('yellow')) output += '\x1b[93m';
				else if (apiList.includes('black')) output += '\x1b[90m';
				else if (apiList.includes('white')) output += '\x1b[97m';

				if (apiList.includes('bgRed')) output += '\x1b[101m';
				else if (apiList.includes('bgGreen')) output += '\x1b[102m';
				else if (apiList.includes('bgBlue')) output += '\x1b[104m';
				else if (apiList.includes('bgCyan')) output += '\x1b[106m';
				else if (apiList.includes('bgMagenta')) output += '\x1b[105m';
				else if (apiList.includes('bgYellow')) output += '\x1b[103m';
				else if (apiList.includes('bgBlack')) output += '\x1b[100m';
				else if (apiList.includes('bgWhite')) output += '\x1b[107m';

				if (apiList.includes('underline')) output += '\x1b[4m';
			}

			output += g2;

			if (inBrowser) {
				browserCss.push('color:;background-color:;');
				output += '%c';
			}
			else output += '\x1b[0m';

			return output;
		} // (match, g1, g2) => {
	);

	if (inBrowser) console.log(outputBuilder, ...browserCss);
	else console.log(outputBuilder);

	return cleanOutput;
}
