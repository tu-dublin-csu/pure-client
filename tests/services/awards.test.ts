import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    AwardsService,
    type Award,
    type AwardAllowedDisciplinesParams,
    type AwardListParams,
    type AwardListResult,
    type AwardNotesParams,
    type AwardsQuery,
    type AllowedKeywordGroupConfigurationList,
    type AllowedTemplateListResult,
    type AwardBudget,
    type AwardBudgetResult,
    type AwardCluster,
    type DisciplinesAssociation,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ClassificationRefList,
    type LocalesList,
    type OrderingsList,
    type ContentRefListResult,
    type Note,
    type NoteListResult,
    type UploadedFile,
    type WorkflowListResult
} from '../../src/services/awards'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('AwardsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: AwardsService

    const basePath = '/awards'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new AwardsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists awards with params and config', async () => {
        const params = { size: 20 } as AwardListParams
        const config: AxiosRequestConfig = { timeout: 3000 }
        const result = { count: 2 } as unknown as AwardListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes awards query', async () => {
        const body = { window: { size: 5 } } as unknown as AwardsQuery
        const result = { count: 1 } as unknown as AwardListResult

        client.post.mockResolvedValue(result)

        const response = await service.query(body)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves, creates, updates and removes an award', async () => {
        const uuid = 'award-uuid'
        const payload = { uuid } as unknown as Award

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

    it('locks and unlocks an award', async () => {
        const uuid = 'lock-id'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('handles budgets and clusters', async () => {
        const uuid = 'award-budget'
        const budgetId = 42
        const budgets = { items: [] } as unknown as AwardBudgetResult
        const budget = { id: budgetId } as unknown as AwardBudget
        const cluster = { uuid } as unknown as AwardCluster

        client.get.mockResolvedValueOnce(budgets)
        client.get.mockResolvedValueOnce(budget)
        client.put.mockResolvedValueOnce(budget)
        client.get.mockResolvedValueOnce(cluster)

        expect(await service.getBudgets(uuid)).toBe(budgets)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/budgets`, undefined, undefined)

        expect(await service.getBudget(uuid, budgetId)).toBe(budget)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/budgets/${budgetId}`, undefined, undefined)

        expect(await service.updateBudget(uuid, budgetId, budget)).toBe(budget)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/budgets/${budgetId}`, budget, undefined, undefined)

        expect(await service.getCluster(uuid)).toBe(cluster)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/${uuid}/cluster`, undefined, undefined)
    })

    it('manages dependents and disciplines', async () => {
        const uuid = 'award-dependents'
        const scheme = 'discipline-scheme'
        const dependents = { items: [] } as unknown as ContentRefListResult
        const association = { uuid } as unknown as DisciplinesAssociation

        client.get.mockResolvedValueOnce(dependents)
        client.get.mockResolvedValueOnce(association)
        client.put.mockResolvedValueOnce(association)

        expect(await service.listDependents(uuid, { verbose: true })).toBe(dependents)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/dependents`, { verbose: true }, undefined)

        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)
    })

    it('lists and creates notes', async () => {
        const uuid = 'award-notes'
        const params = { size: 10 } as AwardNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it.each<[
        keyof AwardsService,
        string
    ]>([
        ['getAllowedAwardholderRoles', '/allowed-awardholder-roles'],
        ['getAllowedBudgetAccountClassifications', '/allowed-budget-account-classifications'],
        ['getAllowedClassifiedIdentifierTypes', '/allowed-classified-identifier-types'],
        ['getAllowedCollaboratorTypes', '/allowed-collaborator-types'],
        ['getAllowedDescriptionTypes', '/allowed-description-types'],
        ['getAllowedDocumentLicenses', '/allowed-document-licenses'],
        ['getAllowedDocumentTypes', '/allowed-document-types'],
        ['getAllowedDocumentVersionTypes', '/allowed-document-version-types'],
        ['getAllowedFundingClassifications', '/allowed-funding-classifications'],
        ['getAllowedLinkTypes', '/allowed-link-types'],
        ['getAllowedNatureTypes', '/allowed-nature-types'],
        ['getAllowedTypes', '/allowed-types']
    ])('retrieves classification metadata via %s', async (methodName, suffix) => {
        const list = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(list)

        const result = await (service as unknown as Record<string, () => Promise<ClassificationRefList>>)[
            methodName as string
        ]()

        expect(result).toBe(list)
        expect(client.get).toHaveBeenCalledWith(`${basePath}${suffix}`, undefined, undefined)
    })

    it('retrieves custom field and keyword classifications', async () => {
        const custom = { items: [] } as unknown as ClassificationRefList
        const keyword = { items: [] } as unknown as ClassificationRefList

        client.get.mockResolvedValueOnce(custom).mockResolvedValueOnce(keyword)

        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(custom)
        expect(client.get).toHaveBeenNthCalledWith(
            1,
            `${basePath}/allowed-custom-defined-field-values/field/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(12)).toBe(keyword)
        expect(client.get).toHaveBeenNthCalledWith(
            2,
            `${basePath}/allowed-keyword-group-configurations/12/classifications`,
            undefined,
            undefined
        )
    })

    it('retrieves keyword configurations and templates', async () => {
        const configurations = { items: [] } as unknown as AllowedKeywordGroupConfigurationList
        const templates = { items: [] } as unknown as AllowedTemplateListResult

        client.get.mockResolvedValueOnce(configurations).mockResolvedValueOnce(templates)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(configurations)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedTemplates()).toBe(templates)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-templates`, undefined, undefined)
    })

    it('retrieves locales and workflow steps', async () => {
        const locales = { locales: [] } as unknown as LocalesList
        const workflow = { steps: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get
            .mockResolvedValueOnce(locales)
            .mockResolvedValueOnce(workflow)
            .mockResolvedValueOnce(orderings)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(await service.getOrderings()).toBe(orderings)

        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-locales`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-workflow-steps`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/orderings`, undefined, undefined)
    })

    it('retrieves discipline metadata', async () => {
        const list = { items: [] } as unknown as DisciplinesDisciplineListResult
        const schemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult

        client.get.mockResolvedValueOnce(list).mockResolvedValueOnce(schemes)

        expect(
            await service.getAllowedDisciplines('scheme', { size: 5 } as AwardAllowedDisciplinesParams)
        ).toBe(list)
        expect(client.get).toHaveBeenNthCalledWith(
            1,
            `${basePath}/disciplines/scheme/allowed-disciplines`,
            { size: 5 },
            undefined
        )

        expect(await service.getAllowedDisciplineSchemes()).toBe(schemes)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('fetches and uploads files', async () => {
        const file = 'binary'
        const uploaded = { id: '1' } as unknown as UploadedFile

        client.get.mockResolvedValueOnce(file)
        client.put.mockResolvedValueOnce(uploaded)

        expect(await service.getFile('uuid', 'file')).toBe(file)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/uuid/files/file`, undefined, undefined)

        expect(await service.uploadFile('payload', 'text/plain', { timeout: 1 })).toBe(uploaded)
        expect(client.put).toHaveBeenCalledWith(
            `${basePath}/file-uploads`,
            'payload',
            undefined,
            expect.objectContaining({
                headers: expect.objectContaining({ 'Content-Type': 'text/plain' }),
                timeout: 1
            })
        )
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-awards'
        const customService = new AwardsService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as AwardListResult
        client.get.mockResolvedValue(result)

        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
