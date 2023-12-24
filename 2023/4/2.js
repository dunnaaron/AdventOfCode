const fs = require('fs');
const cards = fs
	.readFileSync(__dirname + '/input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const parsedCards = cards.map((card, index) => {
	const numberLines = card.substring(card.indexOf(':')).split('|');

	const winningNumbers = [...numberLines[0].matchAll(/\d+/g)].map(
		(num) => num[0]
	);
	const scratchedNumbers = [...numberLines[1].matchAll(/\d+/g)].map(
		(num) => num[0]
	);

	return { id: index + 1, winningNumbers, scratchedNumbers, multiplier: 1 };
});

const totalCards = parsedCards.reduce((acc, card) => {
	const { id, winningNumbers, scratchedNumbers, multiplier } = card;
	const winners = scratchedNumbers.filter((scratchedNumber) =>
		winningNumbers.includes(scratchedNumber)
	);

	for (let i = 1; i < winners.length + 1; i++) {
		const cardIndex = parsedCards.findIndex((card) => card.id === id + i);

		parsedCards[cardIndex].multiplier += multiplier;
	}

	return acc + multiplier;
}, 0);

console.log(totalCards);
