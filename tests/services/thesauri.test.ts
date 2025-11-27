import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ThesauriService,
    type Thesaurus,
    type ThesaurusListParams,
    type ThesaurusListResult,
    type ThesaurusQuery,
    type LocalesList,
    type OrderingsList
} from '../../src/services/thesauri'

type PureClientLike = Pick<PureClient, 'get' | 'post'>

describe('ThesauriService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ThesauriService

    const basePath = '/thesauri'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ThesauriService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists thesauri with params and config', async () => {
        const params = { size: 25 } as ThesaurusListParams
        const config: AxiosRequestConfig = { timeout: 300 }
        const result = { count: 2 } as unknown as ThesaurusListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes thesauri query', async () => {
        const query = { uuids: ['thesaurus-1'] } as unknown as ThesaurusQuery
        const response = { count: 1 } as unknown as ThesaurusListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves a thesaurus', async () => {
        const uuid = 'thesaurus-uuid'
        const thesaurus = { uuid } as unknown as Thesaurus

        client.get.mockResolvedValueOnce(thesaurus)

        expect(await service.get(uuid)).toBe(thesaurus)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('fetches allowed locales and orderings', async () => {
        const locales = { locales: [] } as unknown as LocalesList
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValueOnce(locales).mockResolvedValueOnce(orderings)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBasePath = '/custom-thesauri'
        const customService = new ThesauriService(client, { basePath: customBasePath })
        const result = { count: 0 } as unknown as ThesaurusListResult

        client.get.mockResolvedValueOnce(result)

        expect(await customService.list()).toBe(result)
        expect(client.get).toHaveBeenCalledWith(customBasePath, undefined, undefined)
    })
})
