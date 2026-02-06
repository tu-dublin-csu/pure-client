import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios'

export interface PureLogger {
    debug?: (message: string, context?: Record<string, unknown>) => void
    info?: (message: string, context?: Record<string, unknown>) => void
    warn?: (message: string, context?: Record<string, unknown>) => void
    error?: (message: string, context?: Record<string, unknown>) => void
}

export interface PureHttpClientConfig {
    baseURL: string
    apiKey: string
    timeout?: number
    maxRetries?: number
    retryDelayMs?: number
    logger?: PureLogger
    defaultHeaders?: Record<string, string>
    axiosConfig?: AxiosRequestConfig
}

export interface PureHttpClient {
    request<TResponse>(config: AxiosRequestConfig): Promise<TResponse>
    get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse>
    post<TResponse>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<TResponse>
    put<TResponse>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<TResponse>
    delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse>
    axios: AxiosInstance
}

export class PureApiError extends Error {
    readonly status?: number
    readonly statusText?: string
    readonly request?: AxiosRequestConfig
    readonly response?: AxiosResponse
    readonly cause?: unknown

    constructor(message: string, options: {
        status?: number
        statusText?: string
        request?: AxiosRequestConfig
        response?: AxiosResponse
        cause?: unknown
    } = {}) {
        super(message)
        this.name = 'PureApiError'
        this.status = options.status
        this.statusText = options.statusText
        this.request = options.request
        this.response = options.response
        this.cause = options.cause
    }
}

const DEFAULT_HEADERS: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const DEFAULT_TIMEOUT = 1000 * 60 // 60 seconds
const DEFAULT_RETRY_DELAY = 250
const RETRY_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504])

export function createHttpClient({
    baseURL,
    apiKey,
    timeout = DEFAULT_TIMEOUT,
    maxRetries = 2,
    retryDelayMs = DEFAULT_RETRY_DELAY,
    logger = {},
    defaultHeaders = {},
    axiosConfig = {}
}: PureHttpClientConfig): PureHttpClient {
    if (!baseURL) {
        throw new Error('baseURL is required to create the HTTP client')
    }
    if (!apiKey) {
        throw new Error('apiKey is required to create the HTTP client')
    }

    const axiosInstance = axios.create({
        baseURL: normalizeBaseUrl(baseURL),
        timeout,
        headers: {
            ...DEFAULT_HEADERS,
            ...defaultHeaders,
            'api-key': apiKey
        },
        ...axiosConfig
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => Promise.reject(normalizeError(error))
    )

    async function request<TResponse>(requestConfig: AxiosRequestConfig): Promise<TResponse> {
        const cfg = {
            ...requestConfig,
            headers: {
                ...axiosInstance.defaults.headers.common,
                ...(requestConfig.headers ?? {})
            }
        }

        const requestId = generateRequestId()
        const enrichedConfig = {
            ...cfg,
            headers: {
                ...cfg.headers,
                'x-request-id': requestId
            }
        }

        log(logger.debug, 'pure.http.request', { requestId, method: enrichedConfig.method, url: enrichedConfig.url, path: enrichedConfig.baseURL ? undefined : enrichedConfig.url })

        let attempt = 0
        while (true) {
            try {
                const response = await axiosInstance.request<TResponse>(enrichedConfig)
                log(logger.debug, 'pure.http.response', {
                    requestId,
                    status: response.status,
                    method: enrichedConfig.method,
                    url: response.config.url
                })
                return response.data
            } catch (error) {
                attempt += 1
                if (shouldRetry(error, attempt, maxRetries)) {
                    const delay = calculateDelay(retryDelayMs, attempt)
                    log(logger.warn, 'pure.http.retry', {
                        requestId,
                        attempt,
                        delay,
                        message: error instanceof Error ? error.message : 'Unknown error'
                    })
                    await wait(delay)
                    continue
                }

                log(logger.error, 'pure.http.error', {
                    requestId,
                    attempt,
                    message: error instanceof Error ? error.message : 'Unknown error'
                })

                throw wrapError(error, enrichedConfig)
            }
        }
    }

    function get<TResponse>(path: string, config: AxiosRequestConfig = {}): Promise<TResponse> {
        return request<TResponse>({
            url: path,
            method: 'GET',
            ...config
        })
    }

    function post<TResponse>(path: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<TResponse> {
        return request<TResponse>({
            url: path,
            method: 'POST',
            data,
            ...config
        })
    }

    function put<TResponse>(path: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<TResponse> {
        return request<TResponse>({
            url: path,
            method: 'PUT',
            data,
            ...config
        })
    }

    function remove<TResponse>(path: string, config: AxiosRequestConfig = {}): Promise<TResponse> {
        return request<TResponse>({
            url: path,
            method: 'DELETE',
            ...config
        })
    }

    return {
        request,
        get,
        post,
        put,
        delete: remove,
        axios: axiosInstance
    }
}

function normalizeBaseUrl(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url
}

function shouldRetry(error: unknown, attempt: number, maxRetries: number): boolean {
    if (attempt > maxRetries) {
        return false
    }

    if (!axios.isAxiosError(error)) {
        return false
    }

    const status = error.response?.status
    if (status && RETRY_STATUS_CODES.has(status)) {
        return true
    }

    return Boolean(error.code && ['ECONNABORTED', 'ENETUNREACH', 'ECONNRESET'].includes(error.code))
}

function calculateDelay(baseDelay: number, attempt: number): number {
    const jitter = Math.random() * baseDelay
    return baseDelay * Math.pow(2, attempt - 1) + jitter
}

function wait(durationMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, durationMs))
}

function generateRequestId(): string {
    return Math.random().toString(36).slice(2, 10)
}

function normalizeError(error: unknown): unknown {
    if (!axios.isAxiosError(error)) {
        return error
    }

    const normalized = error as AxiosError
    if (normalized.response) {
        normalized.message = `${normalized.response.status} ${normalized.response.statusText || 'Request failed'}`
    }

    return normalized
}

function wrapError(error: unknown, request?: AxiosRequestConfig): PureApiError {
    if (error instanceof PureApiError) {
        return error
    }

    if (axios.isAxiosError(error)) {
        const response = error.response
        return new PureApiError(error.message, {
            status: response?.status,
            statusText: response?.statusText,
            response,
            request: response?.config ?? request,
            cause: error
        })
    }

    return new PureApiError('Unexpected error', { cause: error, request })
}

function log(
    loggerMethod: PureLogger['debug'] | PureLogger['info'] | PureLogger['warn'] | PureLogger['error'],
    message: string,
    context?: Record<string, unknown>
): void {
    if (typeof loggerMethod === 'function') {
        loggerMethod(message, context)
    }
}
