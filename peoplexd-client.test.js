import axios from 'axios';
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { PeopleXdClient } from './peoplexd-client';

jest.mock('axios');

describe('PeopleXdClient', () => {
    let client;
    const url = 'http://example.com/';
    const apiKey = 'test-api-key';

    beforeEach(() => {
        client = new PeopleXdClient(url, apiKey);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with correct url and apiKey', () => {
        expect(client.url).toBe(url);
        expect(client.apiKey).toBe(apiKey);
        expect(client.headers).toEqual({
            'content-type': 'application/json',
            'Accept': 'application/json',
            'api-key': apiKey
        });
    });

    test('should make a GET request and return response', async () => {
        const responseData = { data: 'test data' };
        axios.get.mockResolvedValue(responseData);

        const response = await client.get('test-path');

        expect(axios.get).toHaveBeenCalledWith(`${url}test-path`, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should handle GET request error', async () => {
        const error = new Error('Network Error');
        axios.get.mockRejectedValue(error);

        await expect(client.get('test-path')).rejects.toThrow(error);
    });

    // error response with data
    // test('should handle GET request error', async () => {
    //     const error = new Error({'response': {'data': 'error response data'}});
    //     axios.get.mockRejectedValue(error);

    //     await expect(client.get('test-path')).rejects.toThrow('error response data');
    // });

    test('should make a POST request and return response', async () => {
        const responseData = { data: 'test data' };
        axios.post.mockResolvedValue(responseData);

        const response = await client.post('test-path', { key: 'value' });

        expect(axios.post).toHaveBeenCalledWith(`${url}test-path`, { key: 'value' }, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should handle POST request error', async () => {
        const error = new Error('Network Error');
        axios.post.mockRejectedValue(error);

        await expect(client.post('test-path', { key: 'value' })).rejects.toThrow(error);
    });

    test('should make a PUT request and return response', async () => {
        const responseData = { data: 'test data' };
        axios.put.mockResolvedValue(responseData);

        const response = await client.put('test-path', { key: 'value' });

        expect(axios.put).toHaveBeenCalledWith(`${url}test-path`, { key: 'value' }, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should handle PUT request error', async () => {
        const error = new Error('Network Error');
        axios.put.mockRejectedValue(error);

        await expect(client.put('test-path', { key: 'value' })).rejects.toThrow(error);
    });

    test('should make a DELETE request and return response', async () => {
        const responseData = new Error('Network Error');
        axios.delete.mockResolvedValue(responseData);

        const response = await client.delete('test-path');

        expect(axios.delete).toHaveBeenCalledWith(`${url}test-path`, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should handle DELETE request error', async () => {
        const error = new Error('Network Error');
        axios.delete.mockRejectedValue(error);

        await expect(client.delete('test-path')).rejects.toThrow(error);
    });
});