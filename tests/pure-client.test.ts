import { PureClient, PureApiError, PureHttpClient } from '../src/pure-client'

describe('Pure Client', () => {
    let client: PureClient
    let httpClient: jest.Mocked<PureHttpClient>

    const url = 'http://example.com/'
    const apiKey = 'test-api-key'

    const responseData = { data: 'test data' }
    const apiError = new PureApiError('Network Error')

    beforeEach(() => {
        httpClient = {
            axios: {} as never,
            request: jest.fn(),
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        }

        client = new PureClient(url, apiKey, { httpClient })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should initialize correctly', () => {
        expect(client).toBeInstanceOf(PureClient)
    })

    test('should make a GET request and return response', async () => {
        httpClient.get.mockResolvedValue(responseData)

        const response = await client.get('test-path')

        expect(httpClient.get).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData)
    })

    test('should make a POST request and return response', async () => {
        httpClient.post.mockResolvedValue(responseData)

        const response = await client.post('test-path', { key: 'value' })

        expect(httpClient.post).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData)
    })

    test('should make a PUT request and return response', async () => {
        httpClient.put.mockResolvedValue(responseData)

        const response = await client.put('test-path', { key: 'value' })

        expect(httpClient.put).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData)
    })

    test('should make a DELETE request and return response', async () => {
        httpClient.delete.mockResolvedValue(responseData)

        const response = await client.delete('test-path')

        expect(httpClient.delete).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData)
    })

    test('should handle GET request error', async () => {
        httpClient.get.mockRejectedValue(apiError)

        await expect(client.get('test-path')).rejects.toThrow(apiError)
    })

    test('should handle POST request error', async () => {
        httpClient.post.mockRejectedValue(apiError)

        await expect(client.post('test-path', { key: 'value' })).rejects.toThrow(apiError)
    })

    test('should handle PUT request error', async () => {
        httpClient.put.mockRejectedValue(apiError)

        await expect(client.put('test-path', { key: 'value' })).rejects.toThrow(apiError)
    })

    test('should handle DELETE request error', async () => {
        httpClient.delete.mockRejectedValue(apiError)

        await expect(client.delete('test-path')).rejects.toThrow(apiError)
    })

    test('should handle request with correct parameters', async () => {
        httpClient.get.mockResolvedValue(responseData)

        const params = { size: 1, 'discipline-scheme': 'test' }
        const response = await client.get('test-path', params)

        expect(httpClient.get).toHaveBeenCalledWith(
            'test-path',
            expect.objectContaining({ params: expect.objectContaining(params) })
        )
        expect(response).toBe(responseData)
    })

    test('should detect PureApiError instances', () => {
        expect(PureClient.isApiError(apiError)).toBe(true)
        expect(PureClient.isApiError(new Error('error'))).toBe(false)
    })

})
