import 'dotenv/config'
import axios from 'axios';

export class Client {

    url;
    apiKey;
    headers;

    constructor(url = process.env.PURE_URL, apiKey = process.env.PURE_API_KEY) {
        this.url = url;
        this.apiKey = apiKey;
        this.headers = { 
            'content-type': 'application/json', 
            'Accept': 'application/json', 
            'api-key': this.apiKey 
        };
    }

    async get(path) {
        try {
            const response = await axios.get(`${this.url}/${path}`, { 'headers': this.headers });
            console.log(`Get request received a response...`);
            return response;
        } catch(error) {
            console.error('Error fetching data', error);
        }
        return;
    }

    async post(path, body){
        try {
            const response = await axios.post(`${this.url}/${path}`, body, { 'headers': this.headers });
            console.log(`Post request received a response...`)
            return response;
        } catch(error) {
            console.error('Error fetching data', error);
        }
        return;
    }

    async put(path, body){
        try {
            const response = await axios.put(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`Put request received a response...`)
            return response;
        } catch(error) {
            console.error('Error fetching data', error);
        }
        return;
    }

    async delete(path){
        try {
            const response = await axios.delete(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`Delete request received a response...`);
            return response;
        } catch(error) {
            console.error('Error fetching data', error);
        }
        return;
    }

}
