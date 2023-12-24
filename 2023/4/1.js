const fs = require('fs');
const cards = fs
	.readFileSync(__dirname + '/input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const calcCardPoints = (winningNums) => {
	let points = 1;

	if (winningNums.length === 1) {
		return points;
	}

	for (let i = 0; i < winningNums.length - 1; i++) {
		points = points * 2;
	}

	return points;
};

const res = cards.reduce((acc, currentCard) => {
	const numberLines = currentCard
		.substring(currentCard.indexOf(':'))
		.split('|');

	const winningNumbers = [...numberLines[0].matchAll(/\d+/g)].map(
		(num) => num[0]
	);
	const scratchedNumbers = [...numberLines[1].matchAll(/\d+/g)].map(
		(num) => num[0]
	);

	const winners = scratchedNumbers.filter((scratchedNumber) =>
		winningNumbers.includes(scratchedNumber)
	);

	if (winners.length === 0) {
		return acc;
	}

	return acc + calcCardPoints(winners);
}, 0);

console.log(res);
