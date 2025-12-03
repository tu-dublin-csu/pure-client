import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    EventsService,
    type Event,
    type EventListParams,
    type EventListResult,
    type EventsQuery,
    type EventNotesParams,
    type EventAllowedDisciplinesParams,
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
    type NoteListResult
} from '../../src/services/events'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('EventsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: EventsService

    const basePath = '/events'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new EventsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists events with params and config', async () => {
        const params = { size: 20 } as EventListParams
        const config: AxiosRequestConfig = { timeout: 1500 }
        const result = { count: 4 } as unknown as EventListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes events query', async () => {
        const query = { window: { size: 5 } } as unknown as EventsQuery
        const response = { count: 5 } as unknown as EventListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes an event', async () => {
        const uuid = 'event-uuid'
        const payload = { uuid } as unknown as Event

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

    it('locks and unlocks an event', async () => {
        const uuid = 'lockable-event'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'event-discipline'
        const scheme = 'discipline-scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const associationList = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { disciplines: [] } as unknown as DisciplinesDisciplineListResult
        const disciplineSchemes = { disciplineSchemes: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const params = { size: 25 } as EventAllowedDisciplinesParams
        const query = { window: { size: 10 } } as unknown as DisciplinesAssociationsQuery

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(association)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(associationList)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(associationList)
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

    it('lists and creates notes', async () => {
        const uuid = 'event-notes'
        const params = { size: 3 } as EventNotesParams
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
            .mockResolvedValueOnce(classification) // classified identifier types
            .mockResolvedValueOnce(classification) // countries
            .mockResolvedValueOnce(classification) // degree of recognitions
            .mockResolvedValueOnce(keywordConfigs) // keyword configs
            .mockResolvedValueOnce(classification) // keyword config classifications
            .mockResolvedValueOnce(classification) // link types
            .mockResolvedValueOnce(locales) // locales
            .mockResolvedValueOnce(classification) // subdivisions
            .mockResolvedValueOnce(classification) // types
            .mockResolvedValueOnce(workflow) // workflow steps
            .mockResolvedValueOnce(orderings) // orderings

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCountries()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-countries`, undefined, undefined)

        expect(await service.getAllowedDegreeOfRecognitions()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-degree-of-recognition`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(7)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(
            5,
            `${basePath}/allowed-keyword-group-configurations/7/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-link-types`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedSubdivisions()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-subdivision`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/allowed-workflow-steps`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(11, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-events'
        const customService = new EventsService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as EventListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
