import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ClassificationSchemesService,
    type ClassificationScheme,
    type ClassificationSchemeList,
    type ClassificationSchemeListParams,
    type ClassificationRefList,
    type LocalesList
} from '../../src/services/classification-schemes'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ClassificationSchemesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ClassificationSchemesService

    const basePath = '/classification-schemes'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ClassificationSchemesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists and retrieves classification schemes', async () => {
        const params = { size: 5 } as ClassificationSchemeListParams
        const config: AxiosRequestConfig = { timeout: 1000 }
        const list = { items: [] } as unknown as ClassificationSchemeList
        const scheme = { uuid: 'scheme' } as unknown as ClassificationScheme

        client.get.mockResolvedValueOnce(list)
        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        client.get.mockResolvedValueOnce(scheme)
        expect(await service.get('scheme')).toBe(scheme)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/scheme`, undefined, undefined)
    })

    it('creates, updates and removes classification schemes', async () => {
        const scheme = { uuid: 'scheme' } as unknown as ClassificationScheme
        client.put.mockResolvedValueOnce(scheme)

        expect(await service.create(scheme)).toBe(scheme)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, scheme, undefined, undefined)

        client.put.mockResolvedValueOnce(scheme)
        expect(await service.update('scheme', scheme)).toBe(scheme)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/scheme`, scheme, undefined, undefined)

        client.delete.mockResolvedValueOnce(undefined)
        await service.remove('scheme')
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/scheme`, undefined, undefined)
    })

    it('locks and unlocks classification schemes', async () => {
        client.post.mockResolvedValue(undefined)

        await service.lock('scheme')
        await service.unlock('scheme')

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/scheme/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/scheme/actions/unlock`, undefined, undefined, undefined)
    })

    it('retrieves allowed metadata', async () => {
        const classifications = { items: [] } as unknown as ClassificationRefList
        const locales = { locales: [] } as unknown as LocalesList

        client.get.mockResolvedValueOnce(classifications)
        expect(await service.getAllowedAssociatedSchemesClassifications()).toBe(classifications)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-associated-schemes`, undefined, undefined)

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValueOnce(classifications)
        expect(await service.getAllowedTypeClassifications()).toBe(classifications)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-type-classifications`, undefined, undefined)
    })

    it('respects a custom base path', async () => {
        const customBase = '/custom-classification-schemes'
        const customService = new ClassificationSchemesService(client, { basePath: customBase })
        const list = { items: [] } as unknown as ClassificationSchemeList

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
