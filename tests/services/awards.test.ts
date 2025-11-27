import type { AxiosRequestConfig } from 'axios'

import type { components } from '../../src/generated/pure'
import { PureClient } from '../../src/pure-client'
import {
    AwardsService,
    type Award,
    type AwardListParams,
    type AwardListResult,
    type AwardsQuery,
    type AwardBudget,
    type AwardBudgetResult,
    type AwardCluster,
    type DisciplinesAssociation,
    type ClassificationRefList,
    type OrderingsList,
    type ContentRefListResult,
    type Note
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
        const notes = { items: [] } as unknown as components['schemas']['NoteListResult']
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, undefined, undefined)

        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('retrieves allowed metadata', async () => {
        const roles = { items: [] } as unknown as ClassificationRefList
        const types = { items: [] } as unknown as ClassificationRefList
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValueOnce(roles).mockResolvedValueOnce(types).mockResolvedValueOnce(orderings)

        expect(await service.getAllowedAwardholderRoles()).toBe(roles)
        expect(await service.getAllowedTypes()).toBe(types)
        expect(await service.getOrderings()).toBe(orderings)

        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-awardholder-roles`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-types`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/orderings`, undefined, undefined)
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
