import type { AxiosRequestConfig } from 'axios'

import { createHttpClient, PureApiError } from './http/client'
import type { PureHttpClient, PureHttpClientConfig, PureLogger } from './http/client'

export interface PureClientOptions extends Partial<Omit<PureHttpClientConfig, 'baseURL' | 'apiKey'>> {
    httpClient?: PureHttpClient
    logger?: PureLogger
}

type RequestParams = Record<string, unknown>

export class PureClient {
    readonly baseURL: string

    private readonly http: PureHttpClient

    constructor(url: string, apiKey: string, options: PureClientOptions = {}) {
        this.baseURL = url
        const { httpClient, ...httpOptions } = options
        this.http = httpClient ?? createHttpClient({
            baseURL: url,
            apiKey,
            ...(httpOptions as Omit<PureHttpClientConfig, 'baseURL' | 'apiKey'>)
        })
    }

    async request<TResponse>(config: AxiosRequestConfig): Promise<TResponse> {
        return this.http.request<TResponse>(config)
    }

    async get<TResponse, TParams extends RequestParams = RequestParams>(
        path: string,
        params?: TParams,
        config: AxiosRequestConfig = {}
    ): Promise<TResponse> {
        return this.http.get<TResponse>(path, withParams(config, params))
    }

    async post<TResponse, TBody = unknown, TParams extends RequestParams = RequestParams>(
        path: string,
        body?: TBody,
        params?: TParams,
        config: AxiosRequestConfig = {}
    ): Promise<TResponse> {
        return this.http.post<TResponse>(path, body, withParams(config, params))
    }

    async put<TResponse, TBody = unknown, TParams extends RequestParams = RequestParams>(
        path: string,
        body?: TBody,
        params?: TParams,
        config: AxiosRequestConfig = {}
    ): Promise<TResponse> {
        return this.http.put<TResponse>(path, body, withParams(config, params))
    }

    async delete<TResponse, TParams extends RequestParams = RequestParams>(
        path: string,
        params?: TParams,
        config: AxiosRequestConfig = {}
    ): Promise<TResponse> {
        return this.http.delete<TResponse>(path, withParams(config, params))
    }

    static isApiError(error: unknown): error is PureApiError {
        return error instanceof PureApiError
    }
}

export { PureApiError, PureHttpClient, PureLogger }

function withParams(config: AxiosRequestConfig, params?: RequestParams): AxiosRequestConfig {
    if (!params || Object.keys(params).length === 0) {
        return config
    }

    return {
        ...config,
        params: {
            ...(config.params as Record<string, unknown> | undefined),
            ...params
        }
    }
}
