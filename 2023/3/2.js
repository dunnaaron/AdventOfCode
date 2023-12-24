const fs = require('fs');
const grid = fs
	.readFileSync(__dirname + '/input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

let res = 0;
let numsWithGears = [];
let gearLocations = [];

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

const getAdjacentGears = (rowIndex, startIndex, endIndex) => {
	const adjacentIndices = getAdjacentIndicies(rowIndex, startIndex, endIndex);

	// Space to the left
	if (startIndex > 0) {
		adjacentIndices.push({ row: rowIndex, column: startIndex - 1 });
	}

	// Space to the right
	if (endIndex < grid[rowIndex].length - 1) {
		adjacentIndices.push({ row: rowIndex, column: endIndex + 1 });
	}

	return adjacentIndices.filter((index) =>
		grid[index.row][index.column].match(/\*/g)
	);
};

for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
	const row = grid[rowIndex];
	const nums = [...row.matchAll(/\d+/g)];
	const gearCoords = [...row.matchAll(/\*/g)].map((gear) => ({
		row: rowIndex,
		column: gear.index,
	}));

	gearLocations = gearLocations.concat(gearCoords);

	numsWithGears = numsWithGears.concat(
		nums
			.map((num) => {
				return {
					num,
					adjacentGears: getAdjacentGears(
						rowIndex,
						num['index'],
						num['index'] + num[0].length - 1
					),
				};
			})
			.filter((num) => num.adjacentGears)
	);
}

gearLocations.forEach((gearLocation) => {
	const matchingNums = numsWithGears.filter((num) => {
		return num.adjacentGears.some(
			(adjacentGear) =>
				JSON.stringify(adjacentGear) === JSON.stringify(gearLocation)
		);
	});

	if (matchingNums.length === 2) {
		res += parseInt(matchingNums[0].num[0]) * parseInt(matchingNums[1].num[0]);
	}
});

console.log(res);
