import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    EthicalReviewsService,
    type EthicalReview,
    type EthicalReviewListParams,
    type EthicalReviewListResult,
    type EthicalReviewQuery,
    type EthicalReviewDependentsParams,
    type EthicalReviewNotesParams,
    type AllowedKeywordGroupConfigurationList,
    type ClassificationRefList,
    type LocalesList,
    type OrderingsList,
    type ContentRefListResult,
    type Note,
    type NoteListResult,
    type WorkflowListResult,
    type UploadedFile,
    type MilestoneListResult
} from '../../src/services/ethical-reviews'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('EthicalReviewsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: EthicalReviewsService

    const basePath = '/ethical-reviews'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new EthicalReviewsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists ethical reviews with params and config', async () => {
        const params = { size: 5 } as EthicalReviewListParams
        const config: AxiosRequestConfig = { timeout: 5000 }
        const result = { count: 1 } as unknown as EthicalReviewListResult

        client.get.mockResolvedValue(result)

        const response = await service.list(params, config)

        expect(client.get).toHaveBeenCalledWith(basePath, params, config)
        expect(response).toBe(result)
    })

    it('executes ethical reviews query', async () => {
        const body = { window: { size: 25 } } as unknown as EthicalReviewQuery
        const result = { count: 10 } as unknown as EthicalReviewListResult

        client.post.mockResolvedValue(result)

        const response = await service.query(body)

        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, undefined)
        expect(response).toBe(result)
    })

    it('retrieves a single ethical review', async () => {
        const uuid = 'ethical-review-uuid'
        const result = { uuid } as unknown as EthicalReview

        client.get.mockResolvedValue(result)

        const response = await service.get(uuid)

        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
        expect(response).toBe(result)
    })

    it('creates, updates and removes an ethical review', async () => {
        const payload = { title: 'Ethical Review' } as unknown as EthicalReview
        const uuid = 'ethical-review-uuid'

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

    it('locks and unlocks an ethical review', async () => {
        const uuid = 'lock-me'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents and milestones', async () => {
        const uuid = 'ethical-review-dependents'
        const dependents = { items: [] } as unknown as ContentRefListResult
        const milestones = { items: [] } as unknown as MilestoneListResult

        client.get.mockResolvedValueOnce(dependents)
        client.get.mockResolvedValueOnce(milestones)

        expect(await service.listDependents(uuid, { verbose: true } as EthicalReviewDependentsParams)).toBe(dependents)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/dependents`, { verbose: true }, undefined)

        expect(await service.getMilestones(uuid)).toBe(milestones)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/milestones`, undefined, undefined)
    })

    it('retrieves notes and creates a note', async () => {
        const uuid = 'ethical-review-notes'
        const params = { size: 10 } as EthicalReviewNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('retrieves file and uploads file', async () => {
        const uuid = 'ethical-review-file'
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

    it.each<[keyof EthicalReviewsService, string]>([
        ['getAllowedClassifiedIdentifierTypes', '/allowed-classified-identifier-types'],
        ['getAllowedDescriptionTypes', '/allowed-description-types'],
        ['getAllowedDocumentTypes', '/allowed-document-types'],
        ['getAllowedLinkTypes', '/allowed-link-types'],
        ['getAllowedPersonsRoles', '/allowed-persons-roles'],
        ['getAllowedTypes', '/allowed-types']
    ])('retrieves classification data via %s', async (methodName, suffix) => {
        const list = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(list)

        const result = await (service as unknown as Record<string, (...args: unknown[]) => Promise<ClassificationRefList>>)[
            methodName as string
        ]()

        expect(result).toBe(list)
        expect(client.get).toHaveBeenCalledWith(`${basePath}${suffix}`, undefined, undefined)
    })

    it('retrieves keyword group configurations', async () => {
        const configurations = { items: [] } as unknown as AllowedKeywordGroupConfigurationList
        const classification = { items: [] } as unknown as ClassificationRefList

        client.get.mockResolvedValueOnce(configurations).mockResolvedValueOnce(classification)

        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(configurations)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(123)).toBe(classification)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-keyword-group-configurations/123/classifications`, undefined, undefined)
    })

    it('retrieves locale, workflow and ordering information', async () => {
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

    it('retrieves custom field classifications', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValueOnce(classification)

        expect(await service.getAllowedCustomDefinedFieldClassifications('custom-field')).toBe(classification)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/allowed-custom-defined-field-values/custom-field/classifications`, undefined, undefined)
    })
})
