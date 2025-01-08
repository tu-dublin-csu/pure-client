import { Client } from './Client.js';

console.log(`Pure Client Starting...`);

const client = new Client();

const path = 'users/';

const uuids = [
    'ff789c6c-a890-4906-bae9-661adcc2efea',
    'b1f15599-433e-48fd-8216-72e3e62ddd41',
    'FOO'
];

(async () => {
    for (const uuid of uuids) {
        try {
            const res = await client.get(`${path}${uuid}`);
            if (res.status === 200) {
                console.log(`User ${uuid} found:`);
                console.log(res.data);
            } else {
                console.log(`User ${uuid} not found`);
            }
        } catch (error) {
            console.error(`Error during get request to ${path}${uuid}:`);
        }
    }
})();



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