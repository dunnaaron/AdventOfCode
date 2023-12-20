const fs = require('fs');
const lines = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const res = lines.reduce((acc, curr, index) => {
	const nums = Array.from(curr).filter((char) => parseInt(char));

	return acc + parseInt(`${nums[0]}${nums[nums.length - 1]}`);
}, 0);

console.log(res);
