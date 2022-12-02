const fs = require('fs');
const calorieGroups = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const parsedCalorieGroups = calorieGroups.map((group) => group.split('\n'));

const getHighestCalories = parsedCalorieGroups.reduce((acc, curr, i, arr) => {
	let temp = 0;
	curr.forEach((cal) => (temp += parseInt(cal)));

	if (temp > acc) acc = temp;

	return acc;
}, 0);

console.log(getHighestCalories);
