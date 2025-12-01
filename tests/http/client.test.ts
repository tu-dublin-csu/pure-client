import axios, {
    type AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type RawAxiosResponseHeaders
} from 'axios'

import { createHttpClient, PureApiError } from '../../src/http/client'

describe('HTTP client retry and error handling', () => {
    let requestMock: jest.Mock
    let responseInterceptorUse: jest.Mock
    let mockAxiosInstance: AxiosInstance

    beforeEach(() => {
        requestMock = jest.fn()
        responseInterceptorUse = jest.fn()

        mockAxiosInstance = {
            defaults: { headers: { common: {} } },
            interceptors: { response: { use: responseInterceptorUse } as unknown },
            request: requestMock
        } as unknown as AxiosInstance

        jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('retries transient failures before succeeding', async () => {
        const retryableError = createAxiosError(503, 'Service Unavailable', 'Service unavailable')
        const successResponse = buildAxiosResponse(200, 'OK', { ok: true })

        requestMock.mockRejectedValueOnce(retryableError).mockResolvedValueOnce(successResponse)

        const logger = {
            debug: jest.fn(),
            warn: jest.fn()
        }

        const client = createHttpClient({
            baseURL: 'https://example.com',
            apiKey: 'test-key',
            maxRetries: 2,
            retryDelayMs: 0,
            logger
        })

        const result = await client.get<{ ok: boolean }>('/resource')

        expect(result).toEqual({ ok: true })
        expect(requestMock).toHaveBeenCalledTimes(2)
        expect(logger.warn).toHaveBeenCalledWith(
            'pure.http.retry',
            expect.objectContaining({ attempt: 1, delay: expect.any(Number) })
        )
        expect(logger.debug).toHaveBeenNthCalledWith(
            1,
            'pure.http.request',
            expect.objectContaining({ method: 'GET', requestId: expect.any(String) })
        )
        expect(logger.debug).toHaveBeenNthCalledWith(
            2,
            'pure.http.response',
            expect.objectContaining({ status: 200 })
        )
        expect(responseInterceptorUse).toHaveBeenCalledTimes(1)
    })

    it('wraps non-retryable errors in PureApiError', async () => {
        const upstreamError = createAxiosError(400, 'Bad Request', 'Upstream rejected request')

        requestMock.mockRejectedValueOnce(upstreamError)

        const logger = {
            error: jest.fn()
        }

        const client = createHttpClient({
            baseURL: 'https://example.com',
            apiKey: 'test-key',
            maxRetries: 0,
            logger
        })

        expect.assertions(4)

        const rejection = await client.get('/resource').catch((error: unknown) => error)

        expect(rejection).toBeInstanceOf(PureApiError)
        expect(rejection).toMatchObject({
            status: 400,
            statusText: 'Bad Request'
        })

        expect(requestMock).toHaveBeenCalledTimes(1)
        expect(logger.error).toHaveBeenLastCalledWith(
            'pure.http.error',
            expect.objectContaining({ attempt: 1, message: 'Upstream rejected request' })
        )
    })
})

type MockAxiosError<T = unknown> = Error & AxiosError<T>

function buildAxiosResponse<T>(status: number, statusText: string, data: T): AxiosResponse<T> {
    return {
        data,
        status,
        statusText,
        headers: {} as RawAxiosResponseHeaders,
        config: {
            url: '/resource',
            method: 'get'
        } satisfies AxiosRequestConfig
    } as AxiosResponse<T>
}

function createAxiosError(status: number, statusText: string, message = statusText): MockAxiosError {
    const error = new Error(message) as MockAxiosError
    error.isAxiosError = true
    error.response = buildAxiosResponse(status, statusText, undefined)

    return error
}
