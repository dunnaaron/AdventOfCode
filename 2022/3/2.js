const fs = require('fs');
const rucksacks = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const getItemPriority = (item) => {
	if (item === item.toLowerCase()) {
		return item.charCodeAt(0) - 96;
	}

	return item.charCodeAt(0) - 38;
};

let priorityScore = 0;
for (let i = 0; i < rucksacks.length - 2; i += 3) {
	for (let item of rucksacks[i]) {
		if (rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)) {
			priorityScore += getItemPriority(item);
			break;
		}
	}
}

console.log(priorityScore);
