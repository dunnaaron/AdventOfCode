const fs = require('fs');
const lines = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const parseGame = (set) => {
	const red = [...set.matchAll(/\w+( red)/g)].reduce(
		(acc, curr) =>
			parseInt(curr[0].split(' ')[0]) > acc
				? parseInt(curr[0].split(' ')[0])
				: acc,
		0
	);
	const blue = [...set.matchAll(/\w+( blue)/g)].reduce(
		(acc, curr) =>
			parseInt(curr[0].split(' ')[0]) > acc
				? parseInt(curr[0].split(' ')[0])
				: acc,
		0
	);
	const green = [...set.matchAll(/\w+( green)/g)].reduce(
		(acc, curr) =>
			parseInt(curr[0].split(' ')[0]) > acc
				? parseInt(curr[0].split(' ')[0])
				: acc,
		0
	);
	return {
		id: parseInt(set.substring(set.indexOf(' ') + 1, set.indexOf(':'))),
		valid: red <= 12 && green <= 13 && blue <= 14,
	};
};

const res = lines.reduce((acc, curr) => {
	const game = parseGame(curr);

	return game.valid ? acc + game.id : acc;
}, 0);

console.log(res);
