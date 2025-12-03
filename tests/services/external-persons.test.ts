import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ExternalPersonsService,
    type ExternalPerson,
    type ExternalPersonListParams,
    type ExternalPersonListResult,
    type ExternalPersonsQuery,
    type ContentRefListResult,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ExternalPersonAllowedDisciplineParams,
    type ExternalPersonDependentsParams,
    type ExternalPersonNotesParams,
    type OrderingsList,
    type Note,
    type NoteListResult,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type UploadedFile
} from '../../src/services/external-persons'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ExternalPersonsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ExternalPersonsService

    const basePath = '/external-persons'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ExternalPersonsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists external persons and executes queries', async () => {
        const params = { size: 10 } as ExternalPersonListParams
        const config: AxiosRequestConfig = { timeout: 1500 }
        const list = { count: 5 } as unknown as ExternalPersonListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const query = { window: { size: 2 } } as unknown as ExternalPersonsQuery
        const queryResult = { count: 7 } as unknown as ExternalPersonListResult

        client.post.mockResolvedValueOnce(queryResult)

        expect(await service.query(query)).toBe(queryResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('performs CRUD operations', async () => {
        const uuid = 'external-person-uuid'
        const payload = { uuid } as unknown as ExternalPerson

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

    it('locks and unlocks an external person', async () => {
        const uuid = 'lockable-external-person'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents', async () => {
        const uuid = 'dependents-external-person'
        const params = { verbose: true } as ExternalPersonDependentsParams
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(dependents)

        expect(await service.listDependents(uuid, params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, params, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline-external-person'
        const scheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const updated = { uuid, values: [] } as unknown as DisciplinesAssociation
        const query = { window: { size: 1 } } as unknown as DisciplinesAssociationsQuery
        const listResult = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const allowedSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const allowedParams = { size: 25 } as ExternalPersonAllowedDisciplineParams

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(updated)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(updated)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(listResult)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(listResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/disciplines/${scheme}/search`, query, undefined, undefined)

        client.get.mockResolvedValueOnce(allowedDisciplines)
        expect(await service.getAllowedDisciplines(scheme, allowedParams)).toBe(allowedDisciplines)
        expect(client.get).toHaveBeenCalledWith(
            `${basePath}/disciplines/${scheme}/allowed-disciplines`,
            allowedParams,
            undefined
        )

        client.get.mockResolvedValueOnce(allowedSchemes)
        expect(await service.getAllowedDisciplineSchemes()).toBe(allowedSchemes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('handles notes and file operations', async () => {
        const uuid = 'note-external-person'
        const params = { size: 5 } as ExternalPersonNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note
        const fileContent = 'file-contents'
        const uploadResponse = { id: 'uploaded-file' } as unknown as UploadedFile
        const config: AxiosRequestConfig = { timeout: 1200, headers: { Accept: 'application/json' } }

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)

        client.get.mockResolvedValueOnce(fileContent)
        expect(await service.getFile(uuid, 'file-id')).toBe(fileContent)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/${uuid}/files/file-id`, undefined, undefined)

        client.put.mockResolvedValueOnce(uploadResponse)
        expect(await service.uploadFile('binary-data', 'image/png', config)).toBe(uploadResponse)
        expect(client.put).toHaveBeenLastCalledWith(
            `${basePath}/file-uploads`,
            'binary-data',
            undefined,
            {
                ...config,
                headers: {
                    ...(config.headers as Record<string, unknown>),
                    'Content-Type': 'image/png'
                }
            }
        )
        expect(config.headers).toEqual({ Accept: 'application/json' })
    })

    it('retrieves orderings', async () => {
        const orderings = { orderings: [] } as unknown as OrderingsList
        client.get.mockResolvedValueOnce(orderings)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('fetches classification metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(classification)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCountries()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-countries`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-image-types`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-types`, undefined, undefined)
    })

    it('retrieves keyword, locale, and workflow metadata', async () => {
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const classification = { items: [] } as unknown as ClassificationRefList
        const locales = { locales: [] } as unknown as LocalesList
        const workflow = { items: [] } as unknown as WorkflowListResult

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        client.get.mockResolvedValueOnce(classification)
        expect(await service.getAllowedKeywordGroupConfigurationClassifications(99)).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-keyword-group-configurations/99/classifications`,
            undefined,
            undefined
        )

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-external-persons'
        const customService = new ExternalPersonsService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as ExternalPersonListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
