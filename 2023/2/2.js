const fs = require('fs');
const lines = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const getHighestAmountOfColor = (set, color) =>
	[...set.matchAll(new RegExp('\\b\\w+\\s+(' + color + ')\\b', 'g'))].reduce(
		(acc, curr) =>
			parseInt(curr[0].split(' ')[0]) > acc
				? parseInt(curr[0].split(' ')[0])
				: acc,
		0
	);

const parseGame = (set) => {
	const red = getHighestAmountOfColor(set, 'red');
	const blue = getHighestAmountOfColor(set, 'blue');
	const green = getHighestAmountOfColor(set, 'green');

	return {
		id: parseInt(set.substring(set.indexOf(' ') + 1, set.indexOf(':'))),
		valid: red <= 12 && green <= 13 && blue <= 14,
		power: red * green * blue,
	};
};

const res = lines.reduce((acc, curr) => {
	const game = parseGame(curr);

	return acc + game.power;
}, 0);

console.log(res);
