import { PureClient } from '../dist/index.js'

try {
   
    const client = new PureClient(process.env.PURE_URL, process.env.PURE_API_KEY);

    const res = await client.get('users/', {order: "modified", size: 1, offset: 698})
   
    console.log(res)
} catch (error) {
    console.error('An error occurred:', error.data)
}