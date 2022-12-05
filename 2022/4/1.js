const fs = require('fs');
const sectionAssignments = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x)
	.map((x) => x.split(/,|-/).map((y) => parseInt(y)));

let total = 0;

// Example: [ 4, 90, 1, 4 ]
sectionAssignments.forEach((assignment) => {
	const bContainsA =
		assignment[0] >= assignment[2] && assignment[1] <= assignment[3];
	const aContainsB =
		assignment[2] >= assignment[0] && assignment[3] <= assignment[1];
	if (aContainsB || bContainsA) total++;
});

console.log(total);
