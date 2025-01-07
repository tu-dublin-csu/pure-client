import 'dotenv/config'
import axios from 'axios';

export class Client {

    url;
    apiKey;
    headers;

    constructor(url = process.env.PURE_STAGING_URL, apiKey = process.env.PURE_STAGING_API_KEY) {
        this.url = url;
        this.apiKey = apiKey;
        this.headers = { 
            'content-type': 'application/json', 
            'Accept': 'application/json', 
            'api-key': this.apiKey 
        };
    }

    async get(path) {
        await axios.get(`${this.url}/${path}`, { 'headers': this.headers }).then(response => {
            console.log(`Get request received a response...`)
            console.log(response.data);
        }).catch(error => {
            console.error('Error fetching data', error);
        });
    }

    // TODO: Test call (How to make request?)
    async post(path, body){
        await axios.post(`${this.url}/${path}`, body, { 'headers': this.headers }).then(response => {
            console.log(`Post request received a response...`)
            console.log(response);
        }).catch(function (error) {
            console.error('Error fetching data', error);
        });
    }

    async put(path, body){
        await axios.put(`${this.url}/${path}`, body, { 'headers': this.headers }).then(response => {
            console.log(`Put request received a response...`)
            console.log(response);
        }).catch(function (error) {
            console.error('Error fetching data', error);
        });
    }

    // TODO: Test call (permissions issue)
    async delete(path){
        await axios.delete(`${this.url}/${path}`, { 'headers': this.headers }).then(response => {
            console.log(`Delete request received a response...`)
            console.log(response);
        }).catch(function (error) {
            console.error('Error fetching data', error);
        });
    }

}
