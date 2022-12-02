const axios = require('axios');

require('dotenv').config();

if (process.argv.length <= 2) {
	console.log(`Try: node getInput.js [day] > [input file name]`);
	process.exit(-1);
}

const cookie = process.env.COOKIE;
const year = process.env.YEAR;
const day = parseInt(process.argv[2]);

if (!cookie || !year || !day) {
	console.log('Error. Incorrect cookie, year, or day');
	process.exit(-1);
}

axios
	.get(`https://adventofcode.com/${year}/day/${day}/input`, {
		headers: { Cookie: `session=${cookie};` },
	})
	.then((response) => {
		data = String(response.data).slice(0, -1);
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
