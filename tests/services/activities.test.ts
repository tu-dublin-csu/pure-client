import type { AxiosRequestConfig } from 'axios'

import type { components } from '../../src/generated/pure'
import { PureClient } from '../../src/pure-client'
import {
    ActivitiesService,
    type Activity,
    type ActivityListParams,
    type ActivityListResult,
    type ActivitiesQuery,
    type DisciplinesAssociation,
    type ClassificationRefList,
    type OrderingsList,
    type Note
} from '../../src/services/activities'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ActivitiesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ActivitiesService

    const basePath = '/activities'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ActivitiesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists activities with params and config', async () => {
        const params = { size: 5 } as ActivityListParams
        const config: AxiosRequestConfig = { timeout: 5000 }
        const result = { count: 1 } as unknown as ActivityListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes activities query', async () => {
        const body = { window: { size: 25 } } as unknown as ActivitiesQuery
        const result = { count: 10 } as unknown as ActivityListResult

        client.post.mockResolvedValue(result)

        const response = await service.query(body)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves a single activity', async () => {
        const uuid = 'activity-uuid'
        const result = { uuid } as unknown as Activity

        client.get.mockResolvedValue(result)

        const response = await service.get(uuid)

        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('creates, updates and removes an activity', async () => {
        const payload = { title: 'Activity' } as unknown as Activity
        const uuid = 'activity-uuid'

        client.put.mockResolvedValueOnce(payload).mockResolvedValueOnce(payload)

        const created = await service.create(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)
        expect(created).toBe(payload)

        const updated = await service.update(uuid, payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)
        expect(updated).toBe(payload)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks an activity', async () => {
        const uuid = 'lock-me'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('retrieves allowed metadata', async () => {
        const categories = { items: [] } as unknown as ClassificationRefList
        const descriptions = { items: [] } as unknown as ClassificationRefList
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValueOnce(categories).mockResolvedValueOnce(descriptions).mockResolvedValueOnce(orderings)

        expect(await service.getAllowedCategories()).toBe(categories)
        expect(await service.getAllowedDescriptionTypes()).toBe(descriptions)
        expect(await service.getOrderings()).toBe(orderings)

        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-categories`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-description-types`, undefined, undefined)
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/orderings`, undefined, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline-target'
        const scheme = 'some-scheme'
        const association = { uuid } as unknown as DisciplinesAssociation

        client.get.mockResolvedValueOnce(association)
        client.put.mockResolvedValueOnce(association)

        const fetched = await service.getDisciplineAssociation(uuid, scheme)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)
        expect(fetched).toBe(association)

        const updated = await service.updateDisciplineAssociation(uuid, scheme, association)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)
        expect(updated).toBe(association)
    })

    it('lists and creates notes', async () => {
        const uuid = 'noted'
        const notes = { items: [] } as unknown as components['schemas']['NoteListResult']
        const note = { text: 'example' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, undefined, undefined)

        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-activities'
        const customService = new ActivitiesService(client, { basePath: customBase })
        const result = { count: 0 } as unknown as ActivityListResult
        client.get.mockResolvedValue(result)

        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
