// tagged color logs in browser and console
// usage: log`hell{underline o} {green.bgBlack world}`

if ((typeof(window) === 'object') && !window.log) window.log = __DEFINE_TTLOG;
else module.exports = __DEFINE_TTLOG;

function __DEFINE_TTLOG (strings, ...keys) {

	const apiRegex = /(\{(?:[A-Za-z]*\.?)*\s)([^\}]*)\}/g;
	const isNode = !(typeof(window) === 'object');
	
	let outputBuilder = '';
	let browserCss = []; // for browser context only
	let bracesOpen = false;

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

	const cleanOutput = outputBuilder.replace(
		apiRegex,
		(match, g1, g2) => {
			return g2;
		}
	);

	outputBuilder = outputBuilder.replace(
		apiRegex,
		(match, g1, g2) => {
			let matchArray = g1.slice(1, -1).split('.');
			let output = '';
			if (isNode) {
				if (matchArray.includes('red')) output += '\x1b[91m';
				if (matchArray.includes('green')) output += '\x1b[92m';
				if (matchArray.includes('blue')) output += '\x1b[94m';
				if (matchArray.includes('cyan')) output += '\x1b[96m';
				if (matchArray.includes('magenta')) output += '\x1b[95m';
				if (matchArray.includes('yellow')) output += '\x1b[93m';
				if (matchArray.includes('black')) output += '\x1b[90m';
				if (matchArray.includes('white')) output += '\x1b[97m';

				if (matchArray.includes('bgRed')) output += '\x1b[101m';
				if (matchArray.includes('bgGreen')) output += '\x1b[102m';
				if (matchArray.includes('bgBlue')) output += '\x1b[104m';
				if (matchArray.includes('bgCyan')) output += '\x1b[106m';
				if (matchArray.includes('bgMagenta')) output += '\x1b[105m';
				if (matchArray.includes('bgYellow')) output += '\x1b[103m';
				if (matchArray.includes('bgBlack')) output += '\x1b[100m';
				if (matchArray.includes('bgWhite')) output += '\x1b[107m';

				if (matchArray.includes('underline')) output += '\x1b[4m';
			}
			else {
				output = '%c';
				let css = '';
				if (matchArray.includes('red')) css += `color: ${_cssRed};`;
				if (matchArray.includes('green')) css += `color: ${_cssGreen};`;
				if (matchArray.includes('blue')) css += `color: ${_cssBlue};`;
				if (matchArray.includes('cyan')) css += `color: ${_cssCyan};`;
				if (matchArray.includes('magenta')) css += `color: ${_cssMagenta};`;
				if (matchArray.includes('yellow')) css += `color: ${_cssYellow};`;
				if (matchArray.includes('black')) css += `color: ${_cssBlack};`;
				if (matchArray.includes('white')) css += `color: ${_cssWhite};`;

				if (matchArray.includes('bgRed')) css += `background-color: ${_cssRed};`;
				if (matchArray.includes('bgGreen')) css += `background-color: ${_cssGreen};`;
				if (matchArray.includes('bgBlue')) css += `background-color: ${_cssBlue};`;
				if (matchArray.includes('bgCyan')) css += `background-color: ${_cssCyan};`;
				if (matchArray.includes('bgMagenta')) css += `background-color: ${_cssMagenta};`;
				if (matchArray.includes('bgYellow')) css += `background-color: ${_cssYellow};`;
				if (matchArray.includes('bgBlack')) css += `background-color: ${_cssBlack};`;
				if (matchArray.includes('bgWhite')) css += `background-color: ${_cssWhite};`;

				if (matchArray.includes('underline')) css += 'text-decoration: underline;';

				browserCss.push(css);
			}

			output += g2;

			if (isNode) output += '\x1b[0m';
			else {
				browserCss.push('color: ;background-color: ;');
				output += '%c';
			}
			return output;
		}
	);

	if (isNode) console.log(outputBuilder);
	else console.log(outputBuilder, ...browserCss);

	return cleanOutput;
}