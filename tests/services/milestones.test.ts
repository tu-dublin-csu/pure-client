import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    MilestonesService,
    type Milestone,
    type MilestoneListParams,
    type MilestoneListResult,
    type MilestoneQuery,
    type MilestoneDependentsParams,
    type ClassificationRefList,
    type LocalesList,
    type OrderingsList,
    type ContentRefListResult,
    type APIStringListResult,
    type UploadedFile
} from '../../src/services/milestones'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('MilestonesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: MilestonesService

    const basePath = '/milestones'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new MilestonesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists milestones with params and config', async () => {
        const params = { size: 5 } as MilestoneListParams
        const config: AxiosRequestConfig = { timeout: 5000 }
        const result = { count: 1 } as unknown as MilestoneListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes milestones query', async () => {
        const body = { window: { size: 25 } } as unknown as MilestoneQuery
        const result = { count: 10 } as unknown as MilestoneListResult

        client.post.mockResolvedValue(result)

        const response = await service.query(body)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves a single milestone', async () => {
        const uuid = 'milestone-uuid'
        const result = { uuid } as unknown as Milestone

        client.get.mockResolvedValue(result)

        const response = await service.get(uuid)

        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('creates, updates and removes a milestone', async () => {
        const payload = { title: 'Milestone' } as unknown as Milestone
        const uuid = 'milestone-uuid'

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

    it('locks and unlocks a milestone', async () => {
        const uuid = 'lock-me'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents', async () => {
        const uuid = 'milestone-dependents'
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(dependents)

        expect(await service.listDependents(uuid, { verbose: true } as MilestoneDependentsParams)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, { verbose: true }, undefined)
    })

    it('retrieves file and uploads file', async () => {
        const uuid = 'milestone-file'
        const fileId = 'file-id'
        const file = 'file-content'
        const uploaded = { id: 1 } as unknown as UploadedFile

        client.get.mockResolvedValueOnce(file)
        client.put.mockResolvedValueOnce(uploaded)

        expect(await service.getFile(uuid, fileId)).toBe(file)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/files/${fileId}`, undefined, undefined)

        expect(await service.uploadFile('content')).toBe(uploaded)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/file-uploads`, 'content', undefined, undefined)
    })

    it('retrieves ordering metadata', async () => {
        const orderings = { orderings: [] } as unknown as OrderingsList
        client.get.mockResolvedValueOnce(orderings)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it.each<[keyof MilestonesService, string, 'classification' | 'string']>([
        ['getAllowedCategories', '/allowed-categories', 'classification'],
        ['getAllowedCompletionStates', '/allowed-completion-states', 'classification'],
        ['getAllowedDocumentTypes', '/allowed-document-types', 'classification'],
        ['getAllowedMilestoneStates', '/allowed-milestone-states', 'classification'],
        ['getAllowedAcademicRolesRelatedToApplications', '/application/allowed-academic-roles', 'classification'],
        ['getAllowedAcademicRolesRelatedToAwards', '/award/allowed-academic-roles', 'classification'],
        ['getAllowedAcademicRolesRelatedToContract', '/contract/allowed-academic-roles', 'classification'],
        ['getAllowedAcademicRolesRelatedToEthicalReview', '/ethical-review/allowed-academic-roles', 'classification'],
        ['getAllowedAcademicRolesRelatedToProjects', '/project/allowed-academic-roles', 'classification'],
        ['getAllowedAdministrativeRolesRelatedToApplications', '/application/allowed-administrative-roles', 'string'],
        ['getAllowedAdministrativeRolesRelatedToAwards', '/award/allowed-administrative-roles', 'string'],
        ['getAllowedAdministrativeRolesRelatedToContract', '/contract/allowed-administrative-roles', 'string'],
        ['getAllowedAdministrativeRolesRelatedToEthicalReview', '/ethical-review/allowed-administrative-roles', 'string'],
        ['getAllowedAdministrativeRolesRelatedToProject', '/project/allowed-administrative-roles', 'string']
    ])('retrieves milestone metadata via %s', async (methodName, suffix, responseType) => {
        if (responseType === 'classification') {
            const list = { items: [] } as unknown as ClassificationRefList
            client.get.mockResolvedValueOnce(list)

            const result = await (service as unknown as Record<string, (...args: unknown[]) => Promise<ClassificationRefList>>)[
                methodName as string
            ]()

            expect(result).toBe(list)
        } else {
            const list = { items: [] } as unknown as APIStringListResult
            client.get.mockResolvedValueOnce(list)

            const result = await (service as unknown as Record<string, (...args: unknown[]) => Promise<APIStringListResult>>)[
                methodName as string
            ]()

            expect(result).toBe(list)
        }

        expect(client.get).toHaveBeenCalledWith(`${basePath}${suffix}`, undefined, undefined)
    })

    it('retrieves locales', async () => {
        const locales = { locales: [] } as unknown as LocalesList
        client.get.mockResolvedValueOnce(locales)

        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/allowed-locales`, undefined, undefined)
    })
})
