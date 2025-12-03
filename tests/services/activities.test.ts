import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ActivitiesService,
    type Activity,
    type ActivityAllowedDisciplinesParams,
    type ActivityListParams,
    type ActivityListResult,
    type ActivityNotesParams,
    type ActivitiesQuery,
    type AllowedKeywordGroupConfigurationList,
    type ClassificationRefList,
    type DisciplinesAssociation,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type LocalesList,
    type Note,
    type NoteListResult,
    type OrderingsList,
    type UploadedFile,
    type WorkflowListResult
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

    it.each<[
        keyof ActivitiesService,
        string
    ]>([
        ['getAllowedAttendancePersonRoles', '/allowed-attendance-person-roles'],
        ['getAllowedCategories', '/allowed-categories'],
        ['getAllowedClassifiedIdentifierTypes', '/allowed-classified-identifier-types'],
        ['getAllowedConsultancyPersonRoles', '/allowed-consultancy-person-roles'],
        ['getAllowedDegreeOfRecognitions', '/allowed-degree-of-recognitions'],
        ['getAllowedDescriptionTypes', '/allowed-description-types'],
        ['getAllowedDocumentLicenses', '/allowed-document-licenses'],
        ['getAllowedDocumentTypes', '/allowed-document-types'],
        ['getAllowedEditorialWorkPersonRoles', '/allowed-editorial-work-person-roles'],
        ['getAllowedExaminationPersonRoles', '/allowed-examination-person-roles'],
        ['getAllowedHostVisitorCountries', '/allowed-host-visitor-countries'],
        ['getAllowedHostVisitorPersonRoles', '/allowed-host-visitor-person-roles'],
        ['getAllowedImageTypes', '/allowed-image-types'],
        ['getAllowedIndicators', '/allowed-indicators'],
        ['getAllowedLinkTypes', '/allowed-link-types'],
        ['getAllowedMembershipPersonRoles', '/allowed-membership-person-roles'],
        ['getAllowedOtherActivityPersonRoles', '/allowed-other-activity-person-roles'],
        ['getAllowedTalkPersonRoles', '/allowed-talk-person-roles'],
        ['getAllowedTypes', '/allowed-types'],
        ['getAllowedVisitOtherPersonRoles', '/allowed-visit-other-person-roles']
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

    it('retrieves locale and workflow information', async () => {
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
        const uuid = 'discipline-target'
        const scheme = 'some-scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const disciplineList = { items: [] } as unknown as DisciplinesDisciplineListResult
        const disciplineSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult

        client.get
            .mockResolvedValueOnce(association)
            .mockResolvedValueOnce(disciplineList)
            .mockResolvedValueOnce(disciplineSchemes)

        const fetched = await service.getDisciplineAssociation(uuid, scheme)
        expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)
        expect(fetched).toBe(association)

        await service.getAllowedDisciplines(scheme, { size: 5 } as ActivityAllowedDisciplinesParams)
        expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/disciplines/${scheme}/allowed-disciplines`, { size: 5 }, undefined)

        await service.getAllowedDisciplineSchemes()
        expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
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

    it('fetches and uploads files', async () => {
        const fileContents = 'binary'
        const uploaded = { id: 'upload' } as unknown as UploadedFile

        client.get.mockResolvedValueOnce(fileContents)
        client.put.mockResolvedValueOnce(uploaded)

        expect(await service.getFile('uuid', 'file-id')).toBe(fileContents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/uuid/files/file-id`, undefined, undefined)

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

    it('lists and creates notes', async () => {
        const uuid = 'noted'
        const params = { size: 5 } as ActivityNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'example' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        client.put.mockResolvedValueOnce(note)

        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

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
