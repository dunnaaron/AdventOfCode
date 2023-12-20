const fs = require('fs');
const lines = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const numsDict = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const res = lines.reduce((acc, curr, index) => {
	const nums = Array.from(curr).filter((char) => parseInt(char));

	return acc + parseInt(`${nums[0]}${nums[nums.length - 1]}`);
}, 0);

console.log(res);
