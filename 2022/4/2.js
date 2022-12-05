const fs = require('fs');
const sectionAssignments = fs
	.readFileSync('input.txt', 'utf8')
	.split('\n')
	.filter((x) => x)
	.map((x) => x.split(/,|-/).map((y) => parseInt(y)));

let total = 0;

sectionAssignments.forEach((assignment) => {
	let hasOverlap = false;
	for (let i = assignment[0]; i <= assignment[1]; i++) {
		if (i >= assignment[2] && i <= assignment[3]) {
			total++;
			hasOverlap = true;
			break;
		}
	}

	if (!hasOverlap) {
		for (let i = assignment[2]; i <= assignment[3]; i++) {
			if (i >= assignment[0] && i <= assignment[1]) {
				total++;
				break;
			}
		}
	}
});

console.log(total);
