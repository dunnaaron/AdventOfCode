const fs = require('fs');
const groups = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.map((str) => str.split(' '))
	.filter((item) => item[0] !== '');

const win = 6;
const draw = 3;

const getVal = (str, isOpponent) => {
	if (isOpponent) {
		return str.charCodeAt(0) - 64;
	}

	return str.charCodeAt(0) - 87;
};

const tallyScore = groups.reduce((acc, curr) => {
	const opp = getVal(curr[0], true);
	const home = getVal(curr[1]);

	const outcome = opp - home;

	if (opp === home) {
		return acc + draw + home;
	}

	if (outcome === 2 || outcome === -1 || outcome === -3) {
		return acc + win + home;
	}

	if (opp - home === -2 || outcome === 1 || outcome === 3) return acc + home;
}, 0);

console.log(tallyScore);
