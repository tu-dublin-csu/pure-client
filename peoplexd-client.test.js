import axios from 'axios';
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { PeopleXdClient } from './peoplexd-client';

jest.mock('axios');

describe('PeopleXdClient', () => {
    let client;
    const url = 'http://example.com/';
    const apiKey = 'test-api-key';

    const responseData = { data: 'test data' };
    const error = new Error('Network Error');

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
        axios.get.mockResolvedValue(responseData);

        const response = await client.get('test-path');

        expect(axios.get).toHaveBeenCalledTimes(1); 
        expect(axios.get).toHaveBeenCalledWith(`${url}test-path`, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should make a POST request and return response', async () => {
        axios.post.mockResolvedValue(responseData);

        const response = await client.post('test-path', { key: 'value' });

        expect(axios.post).toHaveBeenCalledTimes(1); 
        expect(axios.post).toHaveBeenCalledWith(`${url}test-path`, { key: 'value' }, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should make a PUT request and return response', async () => {
        axios.put.mockResolvedValue(responseData);

        const response = await client.put('test-path', { key: 'value' });

        expect(axios.put).toHaveBeenCalledTimes(1); 
        expect(axios.put).toHaveBeenCalledWith(`${url}test-path`, { key: 'value' }, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should make a DELETE request and return response', async () => {
        axios.delete.mockResolvedValue(responseData);

        const response = await client.delete('test-path');

        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(axios.delete).toHaveBeenCalledWith(`${url}test-path`, { headers: client.headers });
        expect(response).toBe(responseData);
    });

    test('should handle GET request error', async () => {
        axios.get.mockRejectedValue(error);

        await expect(client.get('test-path')).rejects.toThrow(error);
    });

    test('should handle POST request error', async () => {
        axios.post.mockRejectedValue(error);

        await expect(client.post('test-path', { key: 'value' })).rejects.toThrow(error);
    });

    test('should handle PUT request error', async () => {
        axios.put.mockRejectedValue(error);

        await expect(client.put('test-path', { key: 'value' })).rejects.toThrow(error);
    });

    test('should handle DELETE request error', async () => {
        axios.delete.mockRejectedValue(error);

        await expect(client.delete('test-path')).rejects.toThrow(error);
    });

    test('should handle error with response data', async () => {
        const mockError = {
            response: {
                data: { message: 'Invalid data' },
            },
        };

        expect(() => client.handleError(mockError)).toThrow('Invalid data');
    });

    test('should handle error with response status', async () => {
        const mockError = {
            response: {
                status: 409,
            },
        };

        expect(() => client.handleError(mockError)).toThrow('409');
    });

});