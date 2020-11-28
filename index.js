const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'usersDateRegestration.csv',
  header: [
    {
      id: 'date',
      title: 'DATE',
    },
  ],
  append: true,
});

const fs = require('fs');

const pathIDs = `./ids/MariupolRada/usersIDName/0.json`;
const pathUsers = `./ids/MariupolRada/users`;

// var fs = require('fs');

// // Load environment variables from a .env
// require('dotenv').config();

// const { MongoClient } = require('mongodb');

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = `mongodb+srv://matvii:${process.env.MONGODB_DB_PASSWORD}@cluster0.myetm.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

// const mongoClient = new MongoClient(uri);

// const Twitter = require('twitter');

// const twitterClient = new Twitter({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token_key: process.env.ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
// });

// const screen_name = 'MariupolRada';

// const params = { screen_name };

// let key = true;
// let next_cursor = '-1';

// async function getFollowers() {
//   try {
//     while (next_cursor != '0') {
//       const {
//         next_cursor_str,
//         ids,
//         ...result
//       } = await twitterClient.get('followers/ids', {
//         stringify_ids: true,
//         cursor: next_cursor,
//         ...params,
//       });
//       next_cursor = next_cursor_str;
//       console.log('Start writting to file');
//       fs.writeFile(
//         `./ids/${screen_name}/usersIDName/${next_cursor}.json`,
//         JSON.stringify(ids),
//         (err) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           console.log(
//             `Wrote usersIdName to file. Cursor: ${next_cursor}`
//           );
//         }
//       );
//       await sleep(60001);
//     }
//   } finally {
//     console.log('End');
//   }
// }

// let count = 0;

// async function getUsersInfo(usersList) {
//   for (const id of usersList) {
//     await getUserInfo(id);
//     count += 1;
//     console.log(count);
//   }
// }

// async function getUserInfo(user_id) {
//   try {
//     const result = await twitterClient.get('users/show', {
//       user_id: user_id,
//     });
//     if (result.id) {
//       fs.writeFileSync(
//         `./ids/${screen_name}/users/${user_id}.json`,
//         JSON.stringify(result),
//         (err) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           console.log(`Wrote user to file. ID: ${user_id}`);
//         }
//       );

//       console.log(result);
//       await sleep(2001);
//     } else {
//       throw new Error("Can't get user info");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// // Main function
(async function () {
  // await getFollowers()
  // fs.readFile(`./ids/${screen_name}/usersIDName/0.json`, async (err, data) => {
  // 	if (err) throw err;
  // 	const ids = JSON.parse(data)
  // 	console.log(ids.length);
  // 	await getUsersInfo(ids)
  // });
  const idsJSON = fs.readFileSync(pathIDs);
  const ids = JSON.parse(idsJSON);
  ids.forEach(async (id) => {
    const userJSON = fs.readFileSync(`${pathUsers}/${id}.json`);
    const user = JSON.parse(userJSON);
    const records = [
      {
        date: user.created_at,
      },
    ];

    await csvWriter
      .writeRecords(records) // returns a promise
      .then(() => {
        console.log('...Done');
      });
  });
})();
