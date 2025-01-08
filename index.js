import { Client } from './Client.js';

console.log(`Pure Client Starting...`);

const client = new Client();

// const path = 'users/';

// test get request
// const res = await client.get(path);
// console.log(`as variable: `);
// console.log(res);

// test post request
// const path = 'activities/disciplines/abc/search';
// const res = await client.post(path, {
//     "uuids": [
//       "19445435-8580-4000-8c15-bb550f0cfc01"
//     ],
//     "size": 0,
//     "offset": 0
//   }
// );
// console.log(`as variable: `);
// console.log(res);

// test put request
// const uuid = "f68b78e9-f894-41ad-858c-fd561c8e360c";
// const res = await client.put(`${path}${uuid}`, { "email": "p4@postman.ie"});
// console.log(res);

// test delete request
// const path = 'activities/'
// const uuid = "481cb151-f03c-4394-a40a-8b29ecc045bc"
// const res =await client.delete(`${path}${uuid}`);
// console.log(res);

console.log(`Pure Client Ending...`);