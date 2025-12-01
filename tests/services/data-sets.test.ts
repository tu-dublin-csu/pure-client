import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    DataSetsService,
    type DataSet,
    type DataSetListParams,
    type DataSetListResult,
    type DataSetsQuery,
    type DataSetNotesParams,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type Note,
    type NoteListResult,
    type UploadedFile
} from '../../src/services/data-sets'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('DataSetsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: DataSetsService

    const basePath = '/data-sets'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new DataSetsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists data sets and executes queries', async () => {
        const params = { size: 25 } as DataSetListParams
        const config: AxiosRequestConfig = { timeout: 2000 }
        const list = { count: 3 } as unknown as DataSetListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const query = { window: { size: 2 } } as unknown as DataSetsQuery
        const queryResult = { count: 4 } as unknown as DataSetListResult

        client.post.mockResolvedValueOnce(queryResult)

        expect(await service.query(query, config)).toBe(queryResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, config)
    })

    it('performs CRUD operations', async () => {
        const uuid = 'data-set-uuid'
        const payload = { uuid } as unknown as DataSet

        client.get.mockResolvedValueOnce(payload)
        expect(await service.get(uuid)).toBe(payload)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.create(payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.update(uuid, payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks a data set', async () => {
        const uuid = 'lockable-data-set'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('handles notes', async () => {
        const uuid = 'notable-data-set'
        const params = { size: 10 } as DataSetNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('handles file operations', async () => {
        const uuid = 'fileful-data-set'
        const fileId = 'file-id'
        const fileContent = 'binary'
        const uploadResponse = { id: 'uploaded' } as unknown as UploadedFile

        client.get.mockResolvedValueOnce(fileContent)
        expect(await service.getFile(uuid, fileId)).toBe(fileContent)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/files/${fileId}`, undefined, undefined)

        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('data')).toBe(uploadResponse)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/file-uploads`, 'data', undefined, undefined)

        const headersConfig: AxiosRequestConfig = { headers: { Authorization: 'token' } }
        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('binary', 'application/json', headersConfig)).toBe(uploadResponse)
        expect(client.put).toHaveBeenLastCalledWith(
            `${basePath}/file-uploads`,
            'binary',
            undefined,
            {
                ...headersConfig,
                headers: {
                    ...(headersConfig.headers as Record<string, unknown>),
                    'Content-Type': 'application/json'
                }
            }
        )
        expect(headersConfig.headers).toEqual({ Authorization: 'token' })
    })

    it('fetches allowed metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const workflow = { items: [] } as unknown as WorkflowListResult

        client.get.mockResolvedValue(classification)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedContributorsRoles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-contributors-roles`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-custom-defined-field-values/field/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedDescriptionTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-description-types`, undefined, undefined)

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedDoiAccessTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-doi-access-types`, undefined, undefined)

        expect(await service.getAllowedDoiLicenseTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-doi-license-types`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-image-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-keyword-group-configurations`,
            undefined,
            undefined
        )

        client.get.mockResolvedValue(classification)
        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-keyword-group-configurations/42/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedLegalConditionTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-legal-condition-types`, undefined, undefined)

        expect(await service.getAllowedLicenses()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-licenses`, undefined, undefined)

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-link-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValue(classification)
        expect(await service.getAllowedNatureTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-nature-types`, undefined, undefined)

        expect(await service.getAllowedOpenAccessPermissions()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-open-access-permissions`, undefined, undefined)

        expect(await service.getAllowedPersonsRoles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-persons-roles`, undefined, undefined)

        expect(await service.getAllowedPhysicalDataTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-physical-data-types`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-data-sets'
        const customService = new DataSetsService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as DataSetListResult

        client.get.mockResolvedValueOnce(list)
        expect(await customService.list()).toBe(list)
        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
