import type { AxiosRequestConfig } from 'axios'

import type { components } from '../../src/generated/pure'
import { PureClient } from '../../src/pure-client'
import {
    ApplicationsService,
    type Application,
    type ApplicationListParams,
    type ApplicationListResult,
    type ApplicationsQuery,
    type ClassificationRefList,
    type DisciplinesAssociation,
    type ApplicationBudget,
    type ApplicationBudgetResult,
    type ApplicationCluster,
    type OrderingsList,
    type ContentRefListResult,
    type Note
} from '../../src/services/applications'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ApplicationsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ApplicationsService

    const basePath = '/applications'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ApplicationsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists applications with params and config', async () => {
        const params = { size: 10 } as ApplicationListParams
        const config: AxiosRequestConfig = { timeout: 1000 }
        const result = { count: 4 } as unknown as ApplicationListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes applications query', async () => {
        const body = { window: { size: 5 } } as unknown as ApplicationsQuery
        const result = { count: 2 } as unknown as ApplicationListResult

        client.post.mockResolvedValue(result)

        const response = await service.query(body)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves, creates, updates and removes an application', async () => {
        const uuid = 'application-uuid'
        const payload = { uuid } as unknown as Application

        client.get.mockResolvedValueOnce(payload)
        const fetched = await service.get(uuid)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
        expect(fetched).toBe(payload)

        client.put.mockResolvedValueOnce(payload)
        const created = await service.create(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)
        expect(created).toBe(payload)

        client.put.mockResolvedValueOnce(payload)
        const updated = await service.update(uuid, payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)
        expect(updated).toBe(payload)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks an application', async () => {
        const uuid = 'locked-app'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('handles budgets', async () => {
        const uuid = 'budget-app'
        const budgetId = 12
        const budgetResult = { items: [] } as unknown as ApplicationBudgetResult
        const budget = { id: budgetId } as unknown as ApplicationBudget

        client.get.mockResolvedValueOnce(budgetResult)
        client.get.mockResolvedValueOnce(budget)
        client.put.mockResolvedValueOnce(budget)

        expect(await service.getBudgets(uuid)).toBe(budgetResult)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/budgets`, undefined, undefined)

        expect(await service.getBudget(uuid, budgetId)).toBe(budget)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/budgets/${budgetId}`, undefined, undefined)

        expect(await service.updateBudget(uuid, budgetId, budget)).toBe(budget)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/budgets/${budgetId}`, budget, undefined, undefined)
    })

    it('fetches cluster and dependents', async () => {
        const uuid = 'clustered'
        const cluster = { uuid } as unknown as ApplicationCluster
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(cluster)
        client.get.mockResolvedValueOnce(dependents)

        expect(await service.getCluster(uuid)).toBe(cluster)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/cluster`, undefined, undefined)

        expect(await service.listDependents(uuid, { verbose: true })).toBe(dependents)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/dependents`, { verbose: true }, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline'
        const scheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation

        client.get.mockResolvedValueOnce(association)
        client.put.mockResolvedValueOnce(association)

        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)
    })

    it('retrieves allowed metadata and orderings', async () => {
        const roles = { items: [] } as unknown as ClassificationRefList
        const statuses = { items: [] } as unknown as ClassificationRefList
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValueOnce(roles).mockResolvedValueOnce(statuses).mockResolvedValueOnce(orderings)

        expect(await service.getAllowedApplicantRoles()).toBe(roles)
        expect(await service.getAllowedStatuses()).toBe(statuses)
        expect(await service.getOrderings()).toBe(orderings)

        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-applicant-roles`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-application-statuses`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/orderings`, undefined, undefined)
    })

    it('lists and creates notes', async () => {
        const uuid = 'note-app'
        const notes = { items: [] } as unknown as components['schemas']['NoteListResult']
        const note = { text: 'hello' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, undefined, undefined)

        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom/apps'
        const customService = new ApplicationsService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as ApplicationListResult
        client.get.mockResolvedValue(result)

        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
