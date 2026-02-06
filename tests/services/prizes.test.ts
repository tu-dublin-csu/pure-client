import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    PrizesService,
    type Prize,
    type PrizeListParams,
    type PrizeListResult,
    type PrizesQuery,
    type PrizeNotesParams,
    type PrizeAllowedDisciplinesParams,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type OrderingsList,
    type Note,
    type NoteListResult,
    type UploadedFile
} from '../../src/services/prizes'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('PrizesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: PrizesService

    const basePath = '/prizes'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new PrizesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists prizes with params and config', async () => {
        const params = { size: 5 } as PrizeListParams
        const config: AxiosRequestConfig = { timeout: 500 }
        const list = { count: 2 } as unknown as PrizeListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes prizes query', async () => {
        const query = { window: { size: 3 } } as unknown as PrizesQuery
        const response = { count: 3 } as unknown as PrizeListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes a prize', async () => {
        const uuid = 'prize-uuid'
        const payload = { uuid } as unknown as Prize

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

    it('locks and unlocks a prize', async () => {
        const uuid = 'lockable-prize'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline-prize'
        const scheme = 'discipline-scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const associationsList = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { disciplines: [] } as unknown as DisciplinesDisciplineListResult
        const disciplineSchemes = { disciplineSchemes: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const params = { size: 10 } as PrizeAllowedDisciplinesParams
        const query = { window: { size: 5 } } as unknown as DisciplinesAssociationsQuery

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(association)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(associationsList)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(associationsList)
        expect(client.post).toHaveBeenCalledWith(
            `${basePath}/disciplines/${scheme}/search`,
            query,
            undefined,
            undefined
        )

        client.get.mockResolvedValueOnce(allowedDisciplines)
        expect(await service.getAllowedDisciplines(scheme, params)).toBe(allowedDisciplines)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/disciplines/${scheme}/allowed-disciplines`,
            params,
            undefined
        )

        client.get.mockResolvedValueOnce(disciplineSchemes)
        expect(await service.getAllowedDisciplineSchemes()).toBe(disciplineSchemes)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/disciplines/allowed-discipline-schemes`,
            undefined,
            undefined
        )
    })

    it('handles file operations', async () => {
        const uuid = 'fileful-prize'
        const fileId = 'file-id'
        const fileContent = 'binary-data'
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
        const uuid = 'noteworthy-prize'
        const params = { size: 3 } as PrizeNotesParams
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
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get
            .mockResolvedValueOnce(classification) // categories
            .mockResolvedValueOnce(classification) // classified identifier types
            .mockResolvedValueOnce(classification) // custom defined field
            .mockResolvedValueOnce(classification) // degree of recognitions
            .mockResolvedValueOnce(classification) // description types
            .mockResolvedValueOnce(classification) // document licenses
            .mockResolvedValueOnce(classification) // document types
            .mockResolvedValueOnce(classification) // image types
            .mockResolvedValueOnce(keywordConfigs) // keyword configs
            .mockResolvedValueOnce(classification) // keyword config classifications
            .mockResolvedValueOnce(classification) // link types
            .mockResolvedValueOnce(locales) // locales
            .mockResolvedValueOnce(classification) // receivers of prize roles
            .mockResolvedValueOnce(classification) // types
            .mockResolvedValueOnce(workflow) // workflow steps
            .mockResolvedValueOnce(orderings) // orderings

        expect(await service.getAllowedCategories()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-categories`, undefined, undefined)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(
            3,
            `${basePath}/allowed-custom-defined-field-values/field/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedDegreeOfRecognitions()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-degree-of-recognitions`, undefined, undefined)

        expect(await service.getAllowedDescriptionTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-description-types`, undefined, undefined)

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-image-types`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(99)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(
            10,
            `${basePath}/allowed-keyword-group-configurations/99/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(11, `${basePath}/allowed-link-types`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(12, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedReceiversOfPrizeRoles()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(13, `${basePath}/allowed-receivers-of-prize-roles`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(14, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenNthCalledWith(15, `${basePath}/allowed-workflow-steps`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(16, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-prizes'
        const customService = new PrizesService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as PrizeListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
