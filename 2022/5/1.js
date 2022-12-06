const fs = require('fs');
let [crates, instructs] = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n\n')
	.map((group) => group.split('\n'));

// I HATE REGEX
crates = crates.map((x) =>
	x
		.replaceAll('    ', '[ ]')
		.replaceAll(/(\](\s)\[)/g, '')
		.replaceAll(/\[|\]/g, '')
);

const tempLastRow = crates[crates.length - 1];
const numberOfCrateStacks = parseInt(tempLastRow[tempLastRow.length - 2]);

// Remove number row
crates.pop();

// Format instructions into array of ints
instructs = instructs
	.map((thing) =>
		thing
			.split(' ')
			.filter((y) => parseInt(y))
			.map((z) => parseInt(z))
	)
	.filter((x) => x.length !== 0);

let reorderedCrates = [];

// make each "stack" into an array with the top of the stack being index 0
for (let i = 0; i < numberOfCrateStacks; i++) {
	const temp = [];
	crates.forEach((x) => temp.push(x[i]));
	reorderedCrates.push(temp);
}

reorderedCrates = reorderedCrates.map((x) => x.filter((y) => y !== ' '));

// ^^^^^ Data parsing and formatting ^^^^^

instructs.forEach((instruct) => {
	const from = parseInt(instruct[1]) - 1;
	const quantity = parseInt(instruct[0]);
	const to = parseInt(instruct[2] - 1);

	if (reorderedCrates[from].length > 0) {
		if (reorderedCrates[from].length >= quantity) {
			const movedCrates = reorderedCrates[from].splice(0, quantity).reverse();
			reorderedCrates[to] = [...movedCrates, ...reorderedCrates[to]];
		} else {
			const movedCrates = reorderedCrates[from]
				.splice(0, reorderedCrates[from].length)
				.reverse();

			reorderedCrates[to] = [...movedCrates, ...reorderedCrates[to]];
		}
	}
});

const tops = reorderedCrates.map((x) => x[0]).join('');

console.log(tops);
