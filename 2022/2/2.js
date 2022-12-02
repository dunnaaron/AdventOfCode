const fs = require('fs');
const groups = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.map((str) => str.split(' '))
	.filter((item) => item[0] !== '');

const win = 6;
const draw = 3;
const lose = 0;

const getVal = (str, isOpponent) => {
	if (isOpponent) {
		return str.charCodeAt(0) - 64;
	}

	return str.charCodeAt(0) - 87;
};

const getOutcomeVal = (outcome) => {
	if (outcome === 'X') return 0;
	if (outcome === 'Y') return 3;
	return 6;
};

const tallyScore = groups.reduce((acc, curr) => {
	const opp = getVal(curr[0], true);
	const outcome = getOutcomeVal(curr[1]);

	if (outcome === draw) {
		return acc + draw + opp;
	}

	if (outcome === win) {
		if (opp === 3) return acc + win + 1;
		return acc + win + (opp + 1);
	}

	if (outcome === lose) {
		if (opp === 1) return acc + 3;
		return acc + (opp - 1);
	}
}, 0);

console.log(tallyScore);
