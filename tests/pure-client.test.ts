import axios from 'axios'
import { PureClient } from '../src/pure-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Pure Client', () => {
    let client: PureClient

    const url = 'http://example.com/'
    const apiKey = 'test-api-key'

    const responseData = { data: 'test data' }
    const error = new Error('Network Error')

    beforeEach(() => {
        client = new PureClient(url, apiKey)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should initialize correctly', () => {
        expect(client).toBeInstanceOf(PureClient)
    })

    test('should make a GET request and return response', async () => {
        mockedAxios.get.mockResolvedValue(responseData)

        const response = await client.get('test-path')

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData.data)
    })

    test('should make a POST request and return response', async () => {
        mockedAxios.post.mockResolvedValue(responseData)

        const response = await client.post('test-path', { key: 'value' })

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData.data)
    })

    test('should make a PUT request and return response', async () => {
        mockedAxios.put.mockResolvedValue(responseData)

        const response = await client.put('test-path', { key: 'value' })

        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData.data)
    })

    test('should make a DELETE request and return response', async () => {
        mockedAxios.delete.mockResolvedValue(responseData)

        const response = await client.delete('test-path')

        expect(axios.delete).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData)
    })

    test('should handle GET request error', async () => {
        mockedAxios.get.mockRejectedValue(error)

        await expect(client.get('test-path')).rejects.toThrow(error)
    })

    test('should handle POST request error', async () => {
        mockedAxios.post.mockRejectedValue(error)

        await expect(client.post('test-path', { key: 'value' })).rejects.toThrow(error)
    })

    test('should handle PUT request error', async () => {
        mockedAxios.put.mockRejectedValue(error)

        await expect(client.put('test-path', { key: 'value' })).rejects.toThrow(error)
    })

    test('should handle DELETE request error', async () => {
        mockedAxios.delete.mockRejectedValue(error)

        await expect(client.delete('test-path')).rejects.toThrow(error)
    })

    test('should handle request with correct parameters', async () => {
        mockedAxios.get.mockResolvedValue(responseData)

        const response = await client.get('test-path', { size: 1, 'discipline-scheme': 'test' })

        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(response).toBe(responseData.data)
    })
})
