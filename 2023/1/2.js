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

const possibleValues = [...Object.keys(numsDict), ...Object.values(numsDict)];

const res = lines.reduce((acc, curr, index) => {
	let firstIndex = curr.length;
	let lastIndex = -1;
	let firstVal = 0;
	let lastVal = 0;

	possibleValues.forEach((val) => {
		const firstOccuranceIndex = curr.indexOf(val);
		const lastOccuranceIndex = curr.lastIndexOf(val);
		if (firstOccuranceIndex > -1) {
			if (firstOccuranceIndex < firstIndex) {
				firstVal = numsDict[val] || val;
				firstIndex = firstOccuranceIndex;
			}

			if (lastOccuranceIndex > lastIndex) {
				lastVal = numsDict[val] || val;
				lastIndex = lastOccuranceIndex;
			}
		}
	});

	return acc + parseInt(`${firstVal}${lastVal}`);
}, 0);
