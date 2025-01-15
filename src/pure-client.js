import axios from 'axios';

/**
 * PureClient class to interact with the PURE API.
 */
export class PureClient {

    url;
    apiKey;
    headers;

    /**
     * Creates an instance of PureClient
     * @param {string} url - The base URL of the PURE API
     * @param {tring} apiKey - An API key to access the PURE API
     */
    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
        this.headers = { 
            'content-type': 'application/json', 
            'Accept': 'application/json', 
            'api-key': this.apiKey 
        };
    }

    /**
     * Makes a HTTP GET request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<Object>} - The response data from the GET request
     * @throws Will throw an error if the request fails
     */
    async get(path) {
        console.log(`Attempting GET request.`);
        try {
            const response = await axios.get(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`GET request received a response.`);
            return response.data;
        } catch(error) {
            this.handleError(error);
        }
        return;
    }

    /**
     * Makes a HTTP POST request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<Object>} - The response data from the POST request
     * @throws Will throw an error if the request fails
     */
    async post(path, body){
        console.log(`Attempting POST request.`);
        try {
            const response = await axios.post(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`POST request received a response.`)
            return response.data;
        } catch(error) {
            this.handleError(error);
        }
        return;
    }

    /**
     * Makes a HTTP PUT request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<Object>} - The response data from the PUT request
     * @throws Will throw an error if the request fails
     */
    async put(path, body){
        console.log(`Attempting PUT request.`);
        try {
            const response = await axios.put(`${this.url}${path}`, body, { 'headers': this.headers });
            console.log(`PUT request received a response.`)
            return response.data;
        } catch(error) {
            this.handleError(error);
        }
        return;
    }

    /**
     * Makes a HTTP DELETE request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<Object>} - The response data from the DELETE request
     * @throws Will throw an error if the request fails
     */
    async delete(path){
        console.log(`Attempting DELETE request.`);
        try {
            const response = await axios.delete(`${this.url}${path}`, { 'headers': this.headers });
            console.log(`DELETE request received a response.`);
            return response;
        } catch(error) {
            this.handleError(error);
        }
        return;
    }

    /**
     * Generic function to handle errors
     * @param  {Error} error 
     * @throws Throws a specific error
     */
    handleError(error) {
        
        console.error('Error fetching data.');

        if(error.response){
            if(error.response.data){
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
