const fs = require('fs');
const bufferStream = fs.readFileSync('input.txt', 'utf8');

let res = 0;

for (let i = 0; i < bufferStream.length - 14; i++) {
	const substr = bufferStream.substring(i, i + 14);

	const unique = new Set(substr);
	if (unique.size === 14) {
		res = i + 14;
		break;
	}
}

console.log(res);
