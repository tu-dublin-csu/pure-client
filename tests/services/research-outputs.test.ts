import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ResearchOutputsService,
    type ResearchOutput,
    type ResearchOutputListParams,
    type ResearchOutputsQuery,
    type ResearchOutputListResult,
    type ClassificationRefList,
    type OrderingsList,
    type ContentRefListResult,
    type ResearchOutputDependentsParams,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ResearchOutputAllowedDisciplinesParams,
    type NoteListResult,
    type Note,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type MetricCollectionDefinitionList,
    type ResearchOutputPeerReviewConfigurationListResult,
    type AllowedTemplateListResult,
    type WorkflowListResult,
    type MetricCollection,
    type ResearchOutputNotesParams,
    type UploadedFile
} from '../../src/services/research-outputs'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ResearchOutputsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ResearchOutputsService

    const basePath = '/research-outputs'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ResearchOutputsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists research outputs and executes queries', async () => {
        const params: ResearchOutputListParams = { size: 10, offset: 5 }
        const config: AxiosRequestConfig = { timeout: 2000 }
        const list = { count: 1 } as unknown as ResearchOutputListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const body = { window: { size: 25 } } as unknown as ResearchOutputsQuery
        const queryResult = { count: 2 } as unknown as ResearchOutputListResult
        const queryConfig: AxiosRequestConfig = { timeout: 1500 }

        client.post.mockResolvedValueOnce(queryResult)

        expect(await service.query(body, queryConfig)).toBe(queryResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, body, undefined, queryConfig)
    })

    it('retrieves, creates, updates and removes research outputs', async () => {
        const uuid = 'research-output'
        const output = { uuid } as unknown as ResearchOutput

        client.get.mockResolvedValueOnce(output)
        expect(await service.get(uuid)).toBe(output)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

        client.put.mockResolvedValueOnce(output)
        expect(await service.create(output)).toBe(output)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, output, undefined, undefined)

        client.put.mockResolvedValueOnce(output)
        expect(await service.update(uuid, output)).toBe(output)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, output, undefined, undefined)

        client.delete.mockResolvedValueOnce(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks, unlocks and lists dependents', async () => {
        const uuid = 'lockable-output'
        const dependents = { items: [] } as unknown as ContentRefListResult
        const params = { size: 5 } as ResearchOutputDependentsParams

        client.post.mockResolvedValue(undefined)
        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)

        client.get.mockResolvedValueOnce(dependents)
        expect(await service.listDependents(uuid, params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, params, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline-uuid'
        const scheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const updated = { ...association, values: [] } as unknown as DisciplinesAssociation
        const query = { window: { size: 1 } } as unknown as DisciplinesAssociationsQuery
        const associationList = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const allowedSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const allowedParams = { size: 100 } as ResearchOutputAllowedDisciplinesParams

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(updated)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(updated)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(associationList)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(associationList)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/disciplines/${scheme}/search`, query, undefined, undefined)

        client.get.mockResolvedValueOnce(allowedDisciplines)
        expect(await service.getAllowedDisciplines(scheme, allowedParams)).toBe(allowedDisciplines)
        expect(client.get).toHaveBeenCalledWith(
            `${basePath}/disciplines/${scheme}/allowed-disciplines`,
            allowedParams,
            undefined
        )

        client.get.mockResolvedValueOnce(allowedSchemes)
        expect(await service.getAllowedDisciplineSchemes()).toBe(allowedSchemes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('handles metrics and notes', async () => {
        const uuid = 'metrics-uuid'
        const collectionId = 'collection'
        const metrics = { items: [] } as unknown as MetricCollection
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note
        const noteParams = { size: 10 } as ResearchOutputNotesParams

        client.get.mockResolvedValueOnce(metrics)
        expect(await service.listMetricsFromCollection(uuid, collectionId)).toBe(metrics)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/metrics/${collectionId}`, undefined, undefined)

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, noteParams)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, noteParams, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
    })

    it('retrieves classification metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(classification)

        const expectations: Array<{ call: () => Promise<ClassificationRefList>; path: string }> = [
            { call: () => service.getAllowedAdditionalFileAccessTypes(), path: `${basePath}/allowed-additional-file-access-types` },
            { call: () => service.getAllowedAdditionalFileLicenseTypes(), path: `${basePath}/allowed-additional-file-license-types` },
            { call: () => service.getAllowedArticleProcessingChargeCurrencies(), path: `${basePath}/allowed-article-processing-charge-currencies` },
            { call: () => service.getAllowedBookAnthologyContributorRoles(), path: `${basePath}/allowed-book-anthology-contributor-roles` },
            { call: () => service.getAllowedBookAnthologyDescriptionTypes(), path: `${basePath}/allowed-book-anthology-description-types` },
            { call: () => service.getAllowedCaseNoteSources(), path: `${basePath}/allowed-case-note-sources` },
            { call: () => service.getAllowedCategories(), path: `${basePath}/allowed-categories` },
            {
                call: () => service.getAllowedContributionToBookAnthologyContributorRoles(),
                path: `${basePath}/allowed-contribution-to-book-anthology-contributor-roles`
            },
            {
                call: () => service.getAllowedContributionToBookAnthologyDescriptionTypes(),
                path: `${basePath}/allowed-contribution-to-book-anthology-description-types`
            },
            {
                call: () => service.getAllowedContributionToConferenceContributorRoles(),
                path: `${basePath}/allowed-contribution-to-conference-contributor-roles`
            },
            {
                call: () => service.getAllowedContributionToConferenceDescriptionTypes(),
                path: `${basePath}/allowed-contribution-to-conference-description-types`
            },
            {
                call: () => service.getAllowedContributionToJournalContributorRoles(),
                path: `${basePath}/allowed-contribution-to-journal-contributor-roles`
            },
            {
                call: () => service.getAllowedContributionToJournalDescriptionTypes(),
                path: `${basePath}/allowed-contribution-to-journal-description-types`
            },
            {
                call: () => service.getAllowedContributionToMemorandumContributorRoles(),
                path: `${basePath}/allowed-contribution-to-memorandum-contributor-roles`
            },
            {
                call: () => service.getAllowedContributionToMemorandumDescriptionTypes(),
                path: `${basePath}/allowed-contribution-to-memorandum-description-types`
            },
            {
                call: () => service.getAllowedContributionToPeriodicalContributorRoles(),
                path: `${basePath}/allowed-contribution-to-periodical-contributor-roles`
            },
            {
                call: () => service.getAllowedContributionToPeriodicalDescriptionTypes(),
                path: `${basePath}/allowed-contribution-to-periodical-description-types`
            },
            { call: () => service.getAllowedContributorCountries(), path: `${basePath}/allowed-contributor-countries` },
            { call: () => service.getAllowedCountries(), path: `${basePath}/allowed-countries` },
            {
                call: () => service.getAllowedCustomDefinedFieldClassifications('field'),
                path: `${basePath}/allowed-custom-defined-field-values/field/classifications`
            },
            {
                call: () => service.getAllowedElectronicVersionAccessTypes(),
                path: `${basePath}/allowed-electronic-version-access-types`
            },
            {
                call: () => service.getAllowedElectronicVersionLicenseTypes(),
                path: `${basePath}/allowed-electronic-version-license-types`
            },
            {
                call: () => service.getAllowedElectronicVersionVersionTypes(),
                path: `${basePath}/allowed-electronic-version-version-types`
            },
            { call: () => service.getAllowedImageTypes(), path: `${basePath}/allowed-image-types` },
            {
                call: () => service.getAllowedKeywordGroupConfigurationClassifications(42),
                path: `${basePath}/allowed-keyword-group-configurations/42/classifications`
            },
            { call: () => service.getAllowedLanguages(), path: `${basePath}/allowed-languages` },
            { call: () => service.getAllowedLinkTypes(), path: `${basePath}/allowed-link-types` },
            { call: () => service.getAllowedMainResearchAreas(), path: `${basePath}/allowed-main-research-areas` },
            { call: () => service.getAllowedMemorandumContributorRoles(), path: `${basePath}/allowed-memorandum-contributor-roles` },
            { call: () => service.getAllowedMemorandumDescriptionTypes(), path: `${basePath}/allowed-memorandum-description-types` },
            { call: () => service.getAllowedNonTextualContributorRoles(), path: `${basePath}/allowed-non-textual-contributor-roles` },
            { call: () => service.getAllowedNonTextualDescriptionTypes(), path: `${basePath}/allowed-non-textual-description-types` },
            {
                call: () => service.getAllowedOtherContributionContributorRoles(),
                path: `${basePath}/allowed-other-contribution-contributor-roles`
            },
            {
                call: () => service.getAllowedOtherContributionDescriptionTypes(),
                path: `${basePath}/allowed-other-contribution-description-types`
            },
            { call: () => service.getAllowedOutputMedias(), path: `${basePath}/allowed-output-medias` },
            { call: () => service.getAllowedPatentContributorRoles(), path: `${basePath}/allowed-patent-contributor-roles` },
            { call: () => service.getAllowedPatentDescriptionTypes(), path: `${basePath}/allowed-patent-description-types` },
            { call: () => service.getAllowedPublicationStatuses(), path: `${basePath}/allowed-publication-statuses` },
            { call: () => service.getAllowedQualifications(), path: `${basePath}/allowed-qualifications` },
            { call: () => service.getAllowedSupervisorRoles(), path: `${basePath}/allowed-supervisor-roles` },
            { call: () => service.getAllowedThesisContributorRoles(), path: `${basePath}/allowed-thesis-contributor-roles` },
            { call: () => service.getAllowedThesisDescriptionTypes(), path: `${basePath}/allowed-thesis-description-types` },
            { call: () => service.getAllowedTypes(), path: `${basePath}/allowed-types` },
            { call: () => service.getAllowedWorkingPaperContributorRoles(), path: `${basePath}/allowed-working-paper-contributor-roles` },
            { call: () => service.getAllowedWorkingPaperDescriptionTypes(), path: `${basePath}/allowed-working-paper-description-types` }
        ]

        for (const expectation of expectations) {
            expect(await expectation.call()).toBe(classification)
            expect(client.get).toHaveBeenLastCalledWith(expectation.path, undefined, undefined)
        }
    })

    it('retrieves configured lists', async () => {
        const keywordConfigs = { items: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const metrics = { items: [] } as unknown as MetricCollectionDefinitionList
        const peerReview = { items: [] } as unknown as ResearchOutputPeerReviewConfigurationListResult
        const templates = { templates: [] } as unknown as AllowedTemplateListResult
        const workflow = { items: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValueOnce(metrics)
        expect(await service.getAllowedMetricCollections()).toBe(metrics)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-metric-collections`, undefined, undefined)

        client.get.mockResolvedValueOnce(peerReview)
        expect(await service.getAllowedPeerReviewConfigurations()).toBe(peerReview)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-peer-review-configurations`, undefined, undefined)

        client.get.mockResolvedValueOnce(templates)
        expect(await service.getAllowedTemplates()).toBe(templates)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-templates`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)

        client.get.mockResolvedValueOnce(orderings)
        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('fetches and uploads files', async () => {
        const fileContents = 'binary'
        const uploaded = { id: 'fileId' } as unknown as UploadedFile
        const config: AxiosRequestConfig = { timeout: 5, headers: { 'X-Test': '1' } }

        client.get.mockResolvedValueOnce(fileContents)
        expect(await service.getFile('uuid', 'file')).toBe(fileContents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/uuid/files/file`, undefined, undefined)

        client.put.mockResolvedValueOnce(uploaded)
        expect(await service.uploadFile('payload', 'text/plain', config)).toBe(uploaded)
        expect(client.put).toHaveBeenCalledWith(
            `${basePath}/file-uploads`,
            'payload',
            undefined,
            expect.objectContaining({
                timeout: 5,
                headers: expect.objectContaining({
                    'Content-Type': 'text/plain',
                    'X-Test': '1'
                })
            })
        )
    })

    it('respects custom base path', async () => {
        const customBasePath = '/custom'
        const customService = new ResearchOutputsService(client, { basePath: customBasePath })
        const result = { count: 0 } as unknown as ResearchOutputListResult
        client.get.mockResolvedValueOnce(result)

        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBasePath, undefined, undefined)
    })
})
