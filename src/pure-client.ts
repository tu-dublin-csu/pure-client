import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

enum PureClientHeadersContentType {
    APPLICATION_JSON = 'application/json'
}

enum PureClientHeadersAccept {
    APPLICATION_JSON = 'application/json'
}

interface PureClientHeaders {
    'Content-Type': PureClientHeadersContentType
    Accept: PureClientHeadersAccept
    'api-key': string
}

/**
 * PureClient class to interact with the PURE API.
 */
export class PureClient {
    private url: string
    private apiKey: string
    private headers: PureClientHeaders

    /**
     * Creates an instance of PureClient
     * @param {string} url - The base URL of the PURE API
     * @param {string} apiKey - An API key to access the PURE API
     */
    constructor(url: string, apiKey: string) {
        this.url = url
        this.apiKey = apiKey
        this.headers = {
            'Content-Type': PureClientHeadersContentType.APPLICATION_JSON,
            Accept: PureClientHeadersAccept.APPLICATION_JSON,
            'api-key': this.apiKey
        }
    }

    /**
     * Makes a HTTP GET request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<AxiosResponse>} - The response data from the GET request
     * @throws Will throw an error if the request fails
     */
    async get(path: string): Promise<AxiosResponse> {
        console.log(`Attempting GET request.`)
        try {
            const response = await axios.get(`${this.url}${path}`, {
                headers: this.headers
            } as unknown as AxiosRequestConfig)
            console.log(`GET request received a response.`)
            return response.data
        } catch (error: unknown) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP POST request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {unknown} body - Depending on the end point of the API request, the body param will have varrying formats
     * @returns {Promise<AxiosResponse>} - The response data from the POST request
     * @throws Will throw an error if the request fails
     */
    async post(path: string, body: unknown): Promise<AxiosResponse> {
        console.log(`Attempting POST request.`)
        try {
            const response = await axios.post(`${this.url}${path}`, body, {
                headers: this.headers
            } as unknown as AxiosRequestConfig)
            console.log(`POST request received a response.`)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP PUT request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {unknown} body - Depending on the end point of the API request, the body param will have varrying formats
     * @returns {Promise<AxiosResponse>} - The response data from the PUT request
     * @throws Will throw an error if the request fails
     */
    async put(path: string, body: unknown): Promise<AxiosResponse> {
        console.log(`Attempting PUT request.`)
        try {
            const response = await axios.put(`${this.url}${path}`, body, {
                headers: this.headers
            } as unknown as AxiosRequestConfig)
            console.log(`PUT request received a response.`)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP DELETE request to the PURE API
     * @param {string} path - The path to the endpoint
     * @returns {Promise<AxiosResponse>} - The response data from the DELETE request
     * @throws Will throw an error if the request fails
     */
    async delete(path: string): Promise<AxiosResponse> {
        console.log(`Attempting DELETE request.`)
        try {
            const response = await axios.delete(`${this.url}${path}`, {
                headers: this.headers
            } as unknown as AxiosRequestConfig)
            console.log(`DELETE request received a response.`)
            return response
        } catch (error) {
            this.handleError(error)
        }
    }

    /**
     * Generic function to handle errors
     * @param  {unknown} error
     * @returns {never} This function will always throw an error
     * @throws Throws the error being handled
     */
    private handleError(error: unknown): never {
        if (error instanceof Error) {
            if (error && error.message) {
                console.log(`Error fetching data: ${error.message}`)
            }
        } else {
            console.log('Error fetching data.')
        }

        // always throw an error
        throw error
    }
}
