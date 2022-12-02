const fs = require('fs');
const calorieGroups = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const sumGroup = (group) =>
	group.reduce((acc, curr) => acc + parseInt(curr), 0);

const totaledCalGroups = calorieGroups.map((group) => {
	const newGroup = group.split('\n');
	return sumGroup(newGroup);
});

const sortedCalTotals = totaledCalGroups.sort((x, y) => {
	if (x > y) return -1;
	if (x > y) return 1;
	return 0;
});

const sumTopThree =
	sortedCalTotals[0] + sortedCalTotals[1] + sortedCalTotals[2];

console.log(sumTopThree);
