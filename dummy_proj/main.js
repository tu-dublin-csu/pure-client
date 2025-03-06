import { PureClient } from '../dist/index.js'

try {
   
    const client = new PureClient(process.env.PURE_URL, process.env.PURE_API_KEY);

    const res = await client.get('activities/', {order: "modified", size: 3})

    // const res = await client.delete('users/fb05b393-9814-412f-830f-2e12467c6674', { uuid: "fb05b393-9814-412f-830f-2e12467c6674" }, { size: 10}); 
   
    console.log(res)
} catch (error) {
    console.error('An error occurred:', error.data)
}