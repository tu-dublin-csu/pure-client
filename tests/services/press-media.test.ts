import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    PressMediaService,
    type PressMedia,
    type PressMediaListParams,
    type PressMediaListResult,
    type PressMediaQuery,
    type PressMediaNotesParams,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type OrderingsList,
    type UploadedFile,
    type APIStringListResult,
    type Note,
    type NoteListResult
} from '../../src/services/press-media'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('PressMediaService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: PressMediaService

    const basePath = '/pressmedia'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new PressMediaService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists press media with params and config', async () => {
        const params = { size: 10 } as PressMediaListParams
        const config: AxiosRequestConfig = { timeout: 500 }
        const result = { count: 1 } as unknown as PressMediaListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes press media query', async () => {
        const query = { uuids: ['press-media-1'] } as unknown as PressMediaQuery
        const response = { count: 1 } as unknown as PressMediaListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes press media', async () => {
        const uuid = 'press-media-uuid'
        const payload = { uuid } as unknown as PressMedia

        client.get.mockResolvedValueOnce(payload)
        expect(await service.get(uuid)).toBe(payload)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.create(payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.update(uuid, payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)

        client.delete.mockResolvedValueOnce(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks press media', async () => {
        const uuid = 'locked-press-media'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('handles file operations', async () => {
        const uuid = 'press-media-files'
        const fileId = 'file-id'
        const fileContent = 'binary-content'
        const uploadResponse = { id: 'uploaded' } as unknown as UploadedFile
        const config: AxiosRequestConfig = { timeout: 200 }

        client.get.mockResolvedValueOnce(fileContent)
        expect(await service.getFile(uuid, fileId)).toBe(fileContent)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/files/${fileId}`, undefined, undefined)

        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('payload')).toBe(uploadResponse)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/file-uploads`, 'payload', undefined, undefined)

        const configWithHeaders: AxiosRequestConfig = { ...config, headers: { Authorization: 'token' } }
        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('payload', 'application/json', configWithHeaders)).toBe(uploadResponse)
        expect(client.put).toHaveBeenLastCalledWith(
            `${basePath}/file-uploads`,
            'payload',
            undefined,
            {
                ...configWithHeaders,
                headers: {
                    ...(configWithHeaders.headers as Record<string, unknown>),
                    'Content-Type': 'application/json'
                }
            }
        )
        expect(configWithHeaders.headers).toEqual({ Authorization: 'token' })
    })

    it('lists and creates notes', async () => {
        const uuid = 'press-media-notes'
        const params = { size: 3 } as PressMediaNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('fetches allowed metadata and supporting lists', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const workflow = { items: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList
        const mediaCoverageTypes = { items: [] } as unknown as APIStringListResult

        client.get
            .mockResolvedValueOnce(classification) // categories
            .mockResolvedValueOnce(classification) // custom field classifications
            .mockResolvedValueOnce(classification) // description types
            .mockResolvedValueOnce(classification) // image types
            .mockResolvedValueOnce(keywordConfigs) // keyword configs
            .mockResolvedValueOnce(classification) // keyword config classifications
            .mockResolvedValueOnce(locales) // locales
            .mockResolvedValueOnce(mediaCoverageTypes) // media coverage types
            .mockResolvedValueOnce(classification) // media coverages countries
            .mockResolvedValueOnce(classification) // media coverages degree of recognitions
            .mockResolvedValueOnce(classification) // media coverages media types
            .mockResolvedValueOnce(classification) // media coverages persons roles
            .mockResolvedValueOnce(classification) // media coverages subdivisions
            .mockResolvedValueOnce(classification) // types
            .mockResolvedValueOnce(workflow) // workflow
            .mockResolvedValueOnce(orderings) // orderings

        expect(await service.getAllowedCategories()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-categories`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-custom-defined-field-values/field/classifications`, undefined, undefined)

        expect(await service.getAllowedDescriptionsTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-descriptions-types`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-image-types`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-keyword-group-configurations/42/classifications`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedMediaCoverageTypes()).toBe(mediaCoverageTypes)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-media-coverage-types`, undefined, undefined)

        expect(await service.getAllowedMediaCoveragesCountries()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-media-coverages-countries`, undefined, undefined)

        expect(await service.getAllowedMediaCoveragesDegreeOfRecognitions()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/allowed-media-coverages-degree-of-recognitions`, undefined, undefined)

        expect(await service.getAllowedMediaCoveragesMediaTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(11, `${basePath}/allowed-media-coverages-media-types`, undefined, undefined)

        expect(await service.getAllowedMediaCoveragesPersonsRoles()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(12, `${basePath}/allowed-media-coverages-persons-roles`, undefined, undefined)

        expect(await service.getAllowedMediaCoveragesSubdivisions()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(13, `${basePath}/allowed-media-coverages-subdivisions`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(14, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenNthCalledWith(15, `${basePath}/allowed-workflow-steps`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(16, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-pressmedia'
        const customService = new PressMediaService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as PressMediaListResult

        client.get.mockResolvedValueOnce(result)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
