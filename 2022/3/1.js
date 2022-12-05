const fs = require('fs');
const rucksacks = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x);

const getSharedItem = (rucksack) => {
	const compartments = [];
	const rucksackHalf = Math.ceil(rucksack.length / 2);
	let sharedItem = undefined;

	compartments.push(rucksack.substring(0, rucksackHalf));
	compartments.push(rucksack.substring(rucksackHalf));

	for (let item of compartments[0]) {
		if (compartments[1].includes(item)) {
			sharedItem = item;
			break;
		}
	}

	return sharedItem;
};

const getItemPriority = (item) => {
	console.log(item);
	if (item === item.toLowerCase()) {
		return item.charCodeAt(0) - 96;
	}

	return item.charCodeAt(0) - 38;
};

const sharedItemPriorities = [];

rucksacks.forEach((rucksack) => {
	const sharedItem = getSharedItem(rucksack);
	const priority = getItemPriority(sharedItem);
	sharedItemPriorities.push(priority);
});

// rucksacks.forEach((thing) => console.log(thing));
console.log(sharedItemPriorities.reduce((acc, curr) => acc + curr, 0));
