import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    StudentThesesService,
    type StudentThesis,
    type StudentThesisListParams,
    type StudentThesisListResult,
    type StudentThesesQuery,
    type StudentThesisDependentsParams,
    type StudentThesisNotesParams,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type OrderingsList,
    type Note,
    type NoteListResult,
    type UploadedFile,
    type ContentRefListResult
} from '../../src/services/student-theses'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('StudentThesesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: StudentThesesService

    const basePath = '/student-theses'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new StudentThesesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists student theses and executes queries', async () => {
        const params = { size: 5 } as StudentThesisListParams
        const config: AxiosRequestConfig = { timeout: 1000 }
        const list = { count: 1 } as unknown as StudentThesisListResult
        const query = { window: { size: 25 } } as unknown as StudentThesesQuery

        client.get.mockResolvedValueOnce(list)
        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        client.post.mockResolvedValueOnce(list)
        expect(await service.query(query)).toBe(list)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes student theses', async () => {
        const thesis = { uuid: 'thesis' } as unknown as StudentThesis

        client.get.mockResolvedValueOnce(thesis)
        expect(await service.get('thesis')).toBe(thesis)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/thesis`, undefined, undefined)

        client.put.mockResolvedValueOnce(thesis)
        expect(await service.create(thesis)).toBe(thesis)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, thesis, undefined, undefined)

        client.put.mockResolvedValueOnce(thesis)
        expect(await service.update('thesis', thesis)).toBe(thesis)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/thesis`, thesis, undefined, undefined)

        client.delete.mockResolvedValueOnce(undefined)
        await service.remove('thesis')
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/thesis`, undefined, undefined)
    })

    it('locks, unlocks and lists dependents', async () => {
        const dependents = { items: [] } as unknown as ContentRefListResult
        const params = { verbose: true } as StudentThesisDependentsParams
        client.post.mockResolvedValue(undefined)

        await service.lock('thesis')
        await service.unlock('thesis')

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/thesis/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/thesis/actions/unlock`, undefined, undefined, undefined)

        client.get.mockResolvedValueOnce(dependents)
        expect(await service.listDependents('thesis', params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/thesis/dependents`, params, undefined)
    })

    it('manages notes', async () => {
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note
        const params = { size: 10 } as StudentThesisNotesParams

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes('thesis', params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/thesis/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote('thesis', note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/thesis/notes`, note, undefined, undefined)
    })

    it('handles files', async () => {
        client.get.mockResolvedValueOnce('file')
        expect(await service.getFile('thesis', 'fileId')).toBe('file')
        expect(client.get).toHaveBeenCalledWith(`${basePath}/thesis/files/fileId`, undefined, undefined)

        const uploaded = { id: 'fileId' } as unknown as UploadedFile
        const config: AxiosRequestConfig = { timeout: 1, headers: { 'X-Test': '1' } }
        client.put.mockResolvedValueOnce(uploaded)

        expect(await service.uploadFile('payload', 'text/plain', config)).toBe(uploaded)
        expect(client.put).toHaveBeenCalledWith(
            `${basePath}/file-uploads`,
            'payload',
            undefined,
            expect.objectContaining({
                timeout: 1,
                headers: expect.objectContaining({
                    'Content-Type': 'text/plain',
                    'X-Test': '1'
                })
            })
        )
    })

    it('retrieves classification metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(classification)

        const expectations: Array<{ call: () => Promise<ClassificationRefList>; path: string }> = [
            { call: () => service.getAllowedContributorCountries(), path: `${basePath}/allowed-contributor-countries` },
            { call: () => service.getAllowedContributorRoles(), path: `${basePath}/allowed-contributor-roles` },
            { call: () => service.getAllowedDocumentEmbargoReasons(), path: `${basePath}/allowed-document-embargo-reasons` },
            { call: () => service.getAllowedDocumentLicenses(), path: `${basePath}/allowed-document-license-types` },
            { call: () => service.getAllowedDocumentTypes(), path: `${basePath}/allowed-document-types` },
            { call: () => service.getAllowedDocumentVersionTypes(), path: `${basePath}/allowed-document-version-types` },
            { call: () => service.getAllowedImageTypes(), path: `${basePath}/allowed-image-types` },
            { call: () => service.getAllowedLanguages(), path: `${basePath}/allowed-languages` },
            { call: () => service.getAllowedLinkTypes(), path: `${basePath}/allowed-link-types` },
            { call: () => service.getAllowedSupervisorRoles(), path: `${basePath}/allowed-supervisor-roles` },
            { call: () => service.getAllowedTypes(), path: `${basePath}/allowed-types` }
        ]

        for (const expectation of expectations) {
            expect(await expectation.call()).toBe(classification)
            expect(client.get).toHaveBeenLastCalledWith(expectation.path, undefined, undefined)
        }
    })

    it('retrieves advanced configuration lists', async () => {
        const keywordConfigs = { items: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const workflow = { items: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList
        const classification = { items: [] } as unknown as ClassificationRefList

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        client.get.mockResolvedValueOnce(classification)
        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-keyword-group-configurations/42/classifications`,
            undefined,
            undefined
        )

        client.get.mockResolvedValueOnce(classification)
        expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-custom-defined-field-values/field/classifications`,
            undefined,
            undefined
        )

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)

        client.get.mockResolvedValueOnce(orderings)
        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('respects custom base path', async () => {
        const customBase = '/custom-student-theses'
        const customService = new StudentThesesService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as StudentThesisListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
