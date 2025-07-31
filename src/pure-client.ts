import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

enum HeadersContentType {
    APPLICATION_JSON = 'application/json'
}

enum HeadersAccept {
    APPLICATION_JSON = 'application/json'
}

interface Headers {
    'Content-Type': HeadersContentType
    Accept: HeadersAccept
    'api-key': string
}

export interface RequestParameters {
    size?: number
    offset?: number
    order?: string
    uuid?: string
    uuids?: string[]
    orderings?: string[]
    searchString?: string
    orderBy?: string
    fileId?: string
    'discipline-scheme'?: string
}
/**
 * PureClient class to interact with the PURE API.
 */
export class PureClient {
    private url: string
    private apiKey: string
    private headers: Headers
    private enableDebug: boolean = process.env.NODE_ENV === 'DEVELOPMENT'

    /**
     * Creates an instance of PureClient
     * @param {string} url - The base URL of the PURE API
     * @param {string} apiKey - An API key to access the PURE API
     */
    constructor(url: string, apiKey: string) {
        this.url = url
        this.apiKey = apiKey
        this.headers = {
            'Content-Type': HeadersContentType.APPLICATION_JSON,
            Accept: HeadersAccept.APPLICATION_JSON,
            'api-key': this.apiKey
        }
    }

    /**
     * Makes a HTTP GET request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {RequestParameters} params - Parameters to pass with request
     * @returns {Promise<AxiosResponse>} - The response data from the GET request
     * @throws Will throw an error if the request fails
     */
    async get(path: string, params: RequestParameters = {}): Promise<AxiosResponse> {
        this.log(`Attempting GET request.`)
        try {
            const response = await axios.get(`${this.url}${path}`, {
                headers: this.headers,
                params: params
            } as unknown as AxiosRequestConfig)
            this.log(`GET request received a response.`)
            return response.data
        } catch (error: unknown) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP POST request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {unknown} body - Depending on the end point of the API request, the body param will have varrying formats
     * @param {RequestParameters} params - Parameters to pass with request
     * @returns {Promise<AxiosResponse>} - The response data from the POST request
     * @throws Will throw an error if the request fails
     */
    async post(path: string, body: unknown, params: RequestParameters = {}): Promise<AxiosResponse> {
        this.log(`Attempting POST request.`)
        try {
            const response = await axios.post(`${this.url}${path}`, body, {
                headers: this.headers,
                params: params
            } as unknown as AxiosRequestConfig)
            this.log(`POST request received a response.`)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP PUT request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {unknown} body - Depending on the end point of the API request, the body param will have varrying formats
     * @param {RequestParameters} params - Parameters to pass with request
     * @returns {Promise<AxiosResponse>} - The response data from the PUT request
     * @throws Will throw an error if the request fails
     */
    async put(path: string, body: unknown, params: RequestParameters = {}): Promise<AxiosResponse> {
        this.log(`Attempting PUT request.`)
        try {
            const response = await axios.put(`${this.url}${path}`, body, {
                headers: this.headers,
                params: params
            } as unknown as AxiosRequestConfig)
            this.log(`PUT request received a response.`)
            return response.data
        } catch (error) {
            this.handleError(error)
        }
    }

    /**
     * Makes a HTTP DELETE request to the PURE API
     * @param {string} path - The path to the endpoint
     * @param {RequestParameters} params - Parameters to pass with request
     * @returns {Promise<AxiosResponse>} - The response data from the DELETE request
     * @throws Will throw an error if the request fails
     */
    async delete(path: string, params: RequestParameters = {}): Promise<AxiosResponse> {
        this.log(`Attempting DELETE request.`)
        try {
            const response = await axios.delete(`${this.url}${path}`, {
                headers: this.headers,
                params: params
            } as unknown as AxiosRequestConfig)
            this.log(`DELETE request received a response.`)
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
                this.log(`Error fetching data: ${error.message}`)
            }
        } else {
            this.log('Error fetching data.')
        }

        // always throw an error
        throw error
    }

    private log(...args: unknown[]) {
        if (this.enableDebug) {
            console.log(...args)
        }
    }

    setDebug(enable: boolean) {
        this.enableDebug = enable
    }
}
