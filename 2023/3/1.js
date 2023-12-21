const fs = require('fs');
const grid = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

let total = 0;

const getAdjacentIndicies = (rowIndex, startIndex, endIndex) => {
	const adjacentIndices = [];

	for (let i = startIndex - 1; i <= endIndex + 1; i++) {
		// Row below
		if (grid[rowIndex + 1] && grid[rowIndex + 1][i]) {
			adjacentIndices.push({ row: rowIndex + 1, column: i });
		}

		// Row above
		if (grid[rowIndex - 1] && grid[rowIndex - 1][i]) {
			adjacentIndices.push({ row: rowIndex - 1, column: i });
		}
	}

	return adjacentIndices;
};

const isValidNum = (rowIndex, startIndex, endIndex) => {
	const adjacentIndices = getAdjacentIndicies(rowIndex, startIndex, endIndex);

	// Space to the left
	if (startIndex > 0) {
		adjacentIndices.push({ row: rowIndex, column: startIndex - 1 });
	}

	// Space to the right
	if (endIndex < grid[rowIndex].length - 1) {
		adjacentIndices.push({ row: rowIndex, column: endIndex + 1 });
	}

	// if any adjacent space is a symbol, return true
	return adjacentIndices.some((index) =>
		grid[index.row][index.column].match(/[^\w\d.]/g)
	);
};

for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
	const row = grid[rowIndex];
	const nums = [...row.matchAll(/\d+/g)];

	nums.forEach((num) => {
		if (isValidNum(rowIndex, num['index'], num['index'] + num[0].length - 1)) {
			total += parseInt(num[0]);
		}
	});
}

console.log(total);
