import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    FundingOpportunitiesService,
    type FundingOpportunity,
    type FundingOpportunityListParams,
    type FundingOpportunityListResult,
    type FundingOpportunitiesQuery,
    type FundingOpportunityDependentsParams,
    type FundingOpportunityNotesParams,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type OrderingsList,
    type ContentRefListResult,
    type Note,
    type NoteListResult,
    type UploadedFile
} from '../../src/services/funding-opportunities'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('FundingOpportunitiesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: FundingOpportunitiesService

    const basePath = '/funding-opportunities'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new FundingOpportunitiesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists funding opportunities with params and config', async () => {
        const params = { size: 10 } as FundingOpportunityListParams
        const config: AxiosRequestConfig = { timeout: 1000 }
        const result = { count: 1 } as unknown as FundingOpportunityListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes funding opportunity query', async () => {
        const query = { window: { size: 2 } } as unknown as FundingOpportunitiesQuery
        const response = { count: 2 } as unknown as FundingOpportunityListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes a funding opportunity', async () => {
        const uuid = 'funding-opportunity-uuid'
        const payload = { uuid } as unknown as FundingOpportunity

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

    it('locks and unlocks a funding opportunity', async () => {
        const uuid = 'lock-me'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('manages dependents and files', async () => {
        const uuid = 'funding-opportunity'
        const dependentsParams = { verbose: true } as FundingOpportunityDependentsParams
        const dependents = { items: [] } as unknown as ContentRefListResult
        const fileId = 'file-id'
        const fileContent = 'binary'
        const uploadResponse = { id: 'uploaded' } as unknown as UploadedFile
        const baseConfig: AxiosRequestConfig = { timeout: 100 }

        client.get.mockResolvedValueOnce(dependents)
        expect(await service.listDependents(uuid, dependentsParams)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, dependentsParams, undefined)

        client.get.mockResolvedValueOnce(fileContent)
        expect(await service.getFile(uuid, fileId)).toBe(fileContent)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/files/${fileId}`, undefined, undefined)

        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('raw-data')).toBe(uploadResponse)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/file-uploads`, 'raw-data', undefined, undefined)

        const configWithHeaders: AxiosRequestConfig = { ...baseConfig, headers: { Authorization: 'token' } }
        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('binary', 'application/json', configWithHeaders)).toBe(uploadResponse)
        expect(client.put).toHaveBeenLastCalledWith(
            `${basePath}/file-uploads`,
            'binary',
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
        const uuid = 'note-owner'
        const params = { size: 3 } as FundingOpportunityNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('fetches allowed metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(keywordConfigs)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(locales)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(orderings)

        expect(await service.getAllowedAcademicDegreeEligibilityTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-classified-academic-degree-eligibility-types`, undefined, undefined)

        expect(await service.getAllowedEligibilityTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-classified-eligibility-types`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-custom-defined-field-values/field/classifications`, undefined, undefined)

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedDocumentVersionTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-document-version-types`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-keyword-group-configurations/42/classifications`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedNatureTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/allowed-nature-types`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(11, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(12, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-funding-opportunities'
        const customService = new FundingOpportunitiesService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as FundingOpportunityListResult

        client.get.mockResolvedValueOnce(result)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
