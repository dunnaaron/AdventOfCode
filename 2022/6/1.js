const fs = require('fs');
const bufferStream = fs.readFileSync('input.txt', 'utf8');

let res = 0;

for (let i = 0; i < bufferStream.length - 4; i++) {
	const substr = bufferStream.substring(i, i + 4);

	const unique = new Set(substr.split(''));
	if (unique.size === 4) {
		res = i + 4;
		break;
	}
}

console.log(res);
