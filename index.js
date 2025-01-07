import { Client } from './Client.js';

console.log(`Pure Client starting...`);

const client = new Client();

const path = 'users/';

// test get request
// await client.get(path);

// test post request
// await client.post(path, {name: 'TEST CIAN'});

// test put request
// const uuid = "f68b78e9-f894-41ad-858c-fd561c8e360c";
// await client.put(`${path}${uuid}`, { "email": "p2@postman.ie"});

// test delete request
// const uuid = "b93a2561-340c-421b-9932-dd0fa22c4ef2"
// await client.delete(`${path}${uuid}`);

console.log(`Pure client ending...`);