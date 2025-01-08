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

    async _request(method, path, data = null) {
        try {
            console.log(`Requesting ${method.toUpperCase()} ${this.url}${path}`);
            const response = await axios({
                method: method,
                url: `${this.url}/${path}`,
                headers: this.headers,
                data: data
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error(error.response.data);
                return null;
            } else {
                throw error;
            }
        }
    }

    async get(path) {
        return this._request('get', path);
    }

    async post(path, data) {
        return this._request('post', path, data);
    }

    async put(path, data) {
        return this._request('put', path, data);
    }

    async delete(path) {
        return this._request('delete', path);
    }
}