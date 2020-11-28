const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: 'dates.csv',
	header: [{ id: 'date', title: 'DATE' }],
});

const records = [{ date: 'Fri' }];

csvWriter
	.writeRecords(records) // returns a promise
	.then(() => {
		console.log('...Done');
	});

// const fs = require('fs');

// const pathIDs = `./ids/MariupolRada/usersIDName/0.json`;
// const pathUsers = `./ids/MariupolRada/users/`;

// fs.readFile(pathIDs, async (err, data) => {
// 	if (err) throw err;
// 	const ids = JSON.parse(data)
// 	fs.readFileSync(pathUsers, async ()=> {
// 		fs.writeFileSync(
// 			`./ids/MariupolRada/usersDateRegestration.csv`,
// 			JSON.stringify(ids),
// 			(err) => {
// 				if (err) {
// 					console.error(err);
// 					return;
// 				}
// 				console.log(
// 					`Wrote usersIdName to file. Cursor: ${next_cursor}`
// 				);
// 			}
// 		);
// 	})
// });
