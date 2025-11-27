import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ImpactsService,
    type Impact,
    type ImpactListParams,
    type ImpactListResult,
    type ImpactQuery,
    type ImpactDependentsParams,
    type ImpactNotesParams,
    type ImpactAllowedDisciplinesParams,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type ContentRefListResult,
    type Note,
    type NoteListResult,
    type UploadedFile
} from '../../src/services/impacts'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ImpactsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ImpactsService

    const basePath = '/impacts'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ImpactsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists impacts with params and config', async () => {
        const params = { size: 10 } as ImpactListParams
        const config: AxiosRequestConfig = { timeout: 500 }
        const result = { count: 1 } as unknown as ImpactListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes impact query', async () => {
        const query = { uuids: ['impact-1'] } as unknown as ImpactQuery
        const response = { count: 1 } as unknown as ImpactListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes an impact', async () => {
        const uuid = 'impact-uuid'
        const payload = { uuid } as unknown as Impact

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

    it('locks and unlocks an impact', async () => {
        const uuid = 'locked-impact'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents with optional parameters', async () => {
        const uuid = 'impact-with-dependents'
        const params = { verbose: true } as ImpactDependentsParams
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(dependents)

        expect(await service.listDependents(uuid, params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, params, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'impact-discipline'
        const disciplineScheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const associations = { items: [] } as unknown as DisciplinesAssociationListResult
        const disciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const disciplineSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const query = { window: { size: 3 } } as unknown as DisciplinesAssociationsQuery
        const params = { size: 5 } as ImpactAllowedDisciplinesParams

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, disciplineScheme)).toBe(association)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/disciplines/${disciplineScheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(association)
        expect(await service.updateDisciplineAssociation(uuid, disciplineScheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${disciplineScheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(associations)
        expect(await service.listDisciplineAssociations(disciplineScheme, query)).toBe(associations)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/disciplines/${disciplineScheme}/search`, query, undefined, undefined)

        client.get.mockResolvedValueOnce(disciplines)
        expect(await service.getAllowedDisciplines(disciplineScheme, params)).toBe(disciplines)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/disciplines/${disciplineScheme}/allowed-disciplines`, params, undefined)

        client.get.mockResolvedValueOnce(disciplineSchemes)
        expect(await service.getAllowedDisciplineSchemes()).toBe(disciplineSchemes)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('handles file operations', async () => {
        const uuid = 'impact-files'
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
        const uuid = 'impact-notes'
        const params = { size: 3 } as ImpactNotesParams
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
        const workflow = { items: [] } as unknown as WorkflowListResult

        client.get
            .mockResolvedValueOnce(classification) // classified identifier types
            .mockResolvedValueOnce(classification) // custom defined field classifications
            .mockResolvedValueOnce(classification) // description types
            .mockResolvedValueOnce(classification) // document licenses
            .mockResolvedValueOnce(classification) // document types
            .mockResolvedValueOnce(classification) // image types
            .mockResolvedValueOnce(classification) // impact categories
            .mockResolvedValueOnce(classification) // impact evidence indicators
            .mockResolvedValueOnce(classification) // impact levels
            .mockResolvedValueOnce(classification) // impact status
            .mockResolvedValueOnce(keywordConfigs) // keyword group configurations
            .mockResolvedValueOnce(classification) // keyword group configuration classifications
            .mockResolvedValueOnce(classification) // link types
            .mockResolvedValueOnce(locales) // locales
            .mockResolvedValueOnce(classification) // persons countries
            .mockResolvedValueOnce(classification) // persons roles
            .mockResolvedValueOnce(classification) // types
            .mockResolvedValueOnce(workflow) // workflow steps

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-custom-defined-field-values/field/classifications`, undefined, undefined)

        expect(await service.getAllowedDescriptionTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-description-types`, undefined, undefined)

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-image-types`, undefined, undefined)

        expect(await service.getAllowedImpactCategories()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-impact-categories`, undefined, undefined)

        expect(await service.getAllowedImpactEvidenceIndicators()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-impact-evidence-indicators`, undefined, undefined)

        expect(await service.getAllowedImpactLevels()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-impact-levels`, undefined, undefined)

        expect(await service.getAllowedImpactStatus()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/allowed-impact-status`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(11, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(99)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(12, `${basePath}/allowed-keyword-group-configurations/99/classifications`, undefined, undefined)

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(13, `${basePath}/allowed-link-types`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(14, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedPersonsCountries()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(15, `${basePath}/allowed-persons-countries`, undefined, undefined)

        expect(await service.getAllowedPersonsRoles()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(16, `${basePath}/allowed-persons-roles`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(17, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenNthCalledWith(18, `${basePath}/allowed-workflow-steps`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-impacts'
        const customService = new ImpactsService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as ImpactListResult

        client.get.mockResolvedValueOnce(result)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
