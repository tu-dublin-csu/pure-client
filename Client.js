import axios from 'axios';

export class PeopleXdClient {

    url;
    apiKey;
    headers;

    constructor(url, apiKey) {
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
            this.handleError(error)
        }
        return;
    }

    async post(path, body){
        try {
            const response = await axios.post(`${this.url}/${path}`, body, { 'headers': this.headers });
            console.log(`Post request received a response...`)
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    async put(path, body){
        try {
            const response = await axios.put(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`Put request received a response...`)
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    async delete(path){
        try {
            const response = await axios.delete(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`Delete request received a response...`);
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    /**
     * Generic function to handle errors
     * @param  {object} error 
     * @returns null 
     */
    handleError(error) {
        
        console.error('Error fetching data.');

        if (!error.response) {
            //console.error(`Error: `, error.toJSON());
            throw error;
        }

        if(error.response.data){
            //console.error(`Error Response Status: ${error.response.status} - ${STATUS_CODES[error.response.status]}`);
            throw error.response.data;
        }
        
        if(error.response.status){
            //console.error('Error Response Data:', error.response.data);
            throw error.status;
        }
    }
}
