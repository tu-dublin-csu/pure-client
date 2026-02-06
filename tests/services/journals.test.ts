import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    JournalsService,
    type Journal,
    type JournalListParams,
    type JournalListResult,
    type JournalsQuery,
    type JournalDependentsParams,
    type JournalNotesParams,
    type JournalAllowedDisciplinesParams,
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
    type MetricCollection,
    type MetricCollectionDefinitionList,
    type ContentRefListResult,
    type Note,
    type NoteListResult
} from '../../src/services/journals'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('JournalsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: JournalsService

    const basePath = '/journals'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new JournalsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists journals with params and config', async () => {
        const params = { size: 10 } as JournalListParams
        const config: AxiosRequestConfig = { timeout: 500 }
        const result = { count: 1 } as unknown as JournalListResult

        client.get.mockResolvedValueOnce(result)

        expect(await service.list(params, config)).toBe(result)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
    })

    it('executes journals query', async () => {
        const query = { uuids: ['journal-1'] } as unknown as JournalsQuery
        const response = { count: 1 } as unknown as JournalListResult

        client.post.mockResolvedValueOnce(response)

        expect(await service.query(query)).toBe(response)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes a journal', async () => {
        const uuid = 'journal-uuid'
        const payload = { uuid } as unknown as Journal

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

    it('locks and unlocks a journal', async () => {
        const uuid = 'locked-journal'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents with optional parameters', async () => {
        const uuid = 'journal-with-dependents'
        const params = { verbose: true } as JournalDependentsParams
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(dependents)

        expect(await service.listDependents(uuid, params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, params, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'journal-discipline'
        const disciplineScheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const associations = { items: [] } as unknown as DisciplinesAssociationListResult
        const disciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const disciplineSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const query = { window: { size: 3 } } as unknown as DisciplinesAssociationsQuery
        const params = { size: 5 } as JournalAllowedDisciplinesParams

        client.get
            .mockResolvedValueOnce(association)
            .mockResolvedValueOnce(disciplines)
            .mockResolvedValueOnce(disciplineSchemes)
        client.put.mockResolvedValueOnce(association)
        client.post.mockResolvedValueOnce(associations)

        expect(await service.getDisciplineAssociation(uuid, disciplineScheme)).toBe(association)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/disciplines/${disciplineScheme}`, undefined, undefined)

        expect(await service.updateDisciplineAssociation(uuid, disciplineScheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${disciplineScheme}`, association, undefined, undefined)

        expect(await service.listDisciplineAssociations(disciplineScheme, query)).toBe(associations)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/disciplines/${disciplineScheme}/search`, query, undefined, undefined)

        expect(await service.getAllowedDisciplines(disciplineScheme, params)).toBe(disciplines)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/disciplines/${disciplineScheme}/allowed-disciplines`, params, undefined)

        expect(await service.getAllowedDisciplineSchemes()).toBe(disciplineSchemes)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('lists metrics from collection', async () => {
        const uuid = 'journal-metrics'
        const collectionId = 'collection'
        const metrics = { collectionId } as unknown as MetricCollection

        client.get.mockResolvedValueOnce(metrics)

        expect(await service.listMetricsFromCollection(uuid, collectionId)).toBe(metrics)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/metrics/${collectionId}`, undefined, undefined)
    })

    it('lists and creates notes', async () => {
        const uuid = 'journal-notes'
        const params = { size: 3 } as JournalNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('fetches allowed metadata and orderings', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const metricCollections = { collections: [] } as unknown as MetricCollectionDefinitionList
        const workflow = { items: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(keywordConfigs)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(locales)
            .mockResolvedValueOnce(metricCollections)
            .mockResolvedValueOnce(classification)
            .mockResolvedValueOnce(workflow)
            .mockResolvedValueOnce(orderings)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCountries()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-countries`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-keyword-group-configurations/42/classifications`, undefined, undefined)

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-link-types`, undefined, undefined)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenNthCalledWith(6, `${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedMetricCollections()).toBe(metricCollections)
        expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-metric-collections`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-types`, undefined, undefined)

        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-workflow-steps`, undefined, undefined)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-journals'
        const customService = new JournalsService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as JournalListResult

        client.get.mockResolvedValueOnce(result)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
