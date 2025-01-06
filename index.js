import { Client } from './Client.js';

console.log(`Pure Client starting...`);

const client = new Client();

const path = 'users/';

// test get request
await client.get(path);

console.log(`Pure client ending...`);