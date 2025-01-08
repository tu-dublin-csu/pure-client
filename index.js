import { Client } from './Client.js';

console.log(`Pure Client starting...`);

const client = new Client();

// const path = 'users/';

// test get request
// await client.get(path);

// test post request
// const path = 'activities/disciplines/abc/search';
// await client.post(path, {
//     "uuids": [
//       "19445435-8580-4000-8c15-bb550f0cfc01"
//     ],
//     "size": 0,
//     "offset": 0
//   }
// );

// test put request
// const uuid = "f68b78e9-f894-41ad-858c-fd561c8e360c";
// await client.put(`${path}${uuid}`, { "email": "p2@postman.ie"});

// test delete request
// const path = 'activities/'
// const uuid = "10259a2a-2dc0-4556-b937-2ee170c50a93"
// await client.delete(`${path}${uuid}`);

console.log(`Pure client ending...`);