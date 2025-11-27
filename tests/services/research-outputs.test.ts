import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ResearchOutputsService,
    type ResearchOutput,
    type ResearchOutputListParams,
    type ResearchOutputsQuery,
    type ResearchOutputListResult,
    type ClassificationRefList,
    type OrderingsList
} from '../../src/services/research-outputs'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ResearchOutputsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ResearchOutputsService

    const basePath = '/research-outputs'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ResearchOutputsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists research outputs with params and config', async () => {
        const params: ResearchOutputListParams = { size: 10, offset: 5 }
        const config: AxiosRequestConfig = { timeout: 2000 }
        const result = { count: 1 } as unknown as ResearchOutputListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes research output query', async () => {
        const body = { window: { size: 25 } } as unknown as ResearchOutputsQuery
        const result = { count: 1 } as unknown as ResearchOutputListResult
        const config: AxiosRequestConfig = { timeout: 1500 }

        client.post.mockResolvedValue(result)

        const response = await service.query(body, config)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, config)
        expect(response).toBe(result)
    })

    it('fetches a single research output', async () => {
        const uuid = '123'
        const result = { uuid } as unknown as ResearchOutput
        client.get.mockResolvedValue(result)

        const response = await service.get(uuid)

        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('creates a research output', async () => {
        const payload = { title: 'Example' } as unknown as ResearchOutput
        client.put.mockResolvedValue(payload)

        const response = await service.create(payload)

        expect(client.put).toHaveBeenCalledWith(basePath, payload, undefined, undefined)
        expect(response).toBe(payload)
    })

    it('updates an existing research output', async () => {
        const uuid = '456'
        const payload = { uuid } as unknown as ResearchOutput
        client.put.mockResolvedValue(payload)

        const response = await service.update(uuid, payload)

        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}`, payload, undefined, undefined)
        expect(response).toBe(payload)
    })

    it('removes a research output', async () => {
        const uuid = '789'
        client.delete.mockResolvedValue(undefined)

        await service.remove(uuid)

        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('retrieves allowed categories', async () => {
        const result = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(result)

        const response = await service.getAllowedCategories()

        expect(client.get).toHaveBeenCalledWith(`${basePath}/allowed-categories`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves orderings', async () => {
        const result = { orderings: [] } as unknown as OrderingsList
        client.get.mockResolvedValue(result)

        const response = await service.getOrderings()

        expect(client.get).toHaveBeenCalledWith(`${basePath}/orderings`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('respects custom base path', async () => {
        const customBasePath = '/custom'
        const customService = new ResearchOutputsService(client, { basePath: customBasePath })
        const result = { count: 0 } as unknown as ResearchOutputListResult
        client.get.mockResolvedValue(result)

        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBasePath, undefined, undefined)
    })
})
