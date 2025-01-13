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
        console.log(`Attempting GET request.`);
        try {
            const response = await axios.get(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`GET request received a response.`);
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    async post(path, body){
        console.log(`Attempting POST request.`);
        try {
            const response = await axios.post(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`POST request received a response.`)
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    async put(path, body){
        console.log(`Attempting PUT request.`);
        try {
            const response = await axios.put(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`PUT request received a response.`)
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    async delete(path){
        console.log(`Attempting DELETE request.`);
        try {
            const response = await axios.delete(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`DELETE request received a response.`);
            return response;
        } catch(error) {
            this.handleError(error)
        }
        return;
    }

    /**
     * Generic function to handle errors
     * @param  {object} error 
     * @returns void 
     */
    handleError(error) {
        
        console.error('Error fetching data.');

        if(error.response){
            if(error.response.data){
                console.log('GIT HERE..')
                throw error.response.data;
            }
            
            if(error.response.status){
                throw error.response.status;
            }
        }

        // always throw an error
        throw error;
        
    }
}
