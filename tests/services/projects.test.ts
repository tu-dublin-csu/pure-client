import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    ProjectsService,
    type Project,
    type ProjectListParams,
    type ProjectListResult,
    type ProjectsQuery,
    type ApplicationClusterListResult,
    type AwardClusterListResult,
    type ContentRefListResult,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type AllowedTemplateListResult,
    type LocalesList,
    type WorkflowListResult,
    type OrderingsList,
    type Note,
    type NoteListResult,
    type ProjectDependentsParams,
    type ProjectAllowedDisciplinesParams,
    type ProjectNotesParams,
    type UploadedFile
} from '../../src/services/projects'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('ProjectsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: ProjectsService

    const basePath = '/projects'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new ProjectsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists projects and executes queries', async () => {
        const params = { size: 5 } as ProjectListParams
        const config: AxiosRequestConfig = { timeout: 2000 }
        const list = { count: 1 } as unknown as ProjectListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const query = { window: { size: 1 } } as unknown as ProjectsQuery
        const queryResult = { count: 2 } as unknown as ProjectListResult
        client.post.mockResolvedValueOnce(queryResult)

        expect(await service.query(query)).toBe(queryResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('retrieves, creates, updates and removes a project', async () => {
        const uuid = 'project-uuid'
        const project = { uuid } as unknown as Project

        client.get.mockResolvedValueOnce(project)
        expect(await service.get(uuid)).toBe(project)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

        client.put.mockResolvedValueOnce(project)
        expect(await service.create(project)).toBe(project)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, project, undefined, undefined)

        client.put.mockResolvedValueOnce(project)
        expect(await service.update(uuid, project)).toBe(project)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, project, undefined, undefined)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks a project', async () => {
        const uuid = 'lockable-project'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('handles clusters and dependents', async () => {
        const uuid = 'project-clusters'
        const applicationClusters = { items: [] } as unknown as ApplicationClusterListResult
        const awardClusters = { items: [] } as unknown as AwardClusterListResult
        const dependents = { items: [] } as unknown as ContentRefListResult
        const dependentsParams = { verbose: true } as ProjectDependentsParams

        client.get.mockResolvedValueOnce(applicationClusters)
        expect(await service.getApplicationClusters(uuid)).toBe(applicationClusters)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/application-clusters`, undefined, undefined)

        client.get.mockResolvedValueOnce(awardClusters)
        expect(await service.getAwardClusters(uuid)).toBe(awardClusters)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/award-clusters`, undefined, undefined)

        client.get.mockResolvedValueOnce(dependents)
        expect(await service.listDependents(uuid, dependentsParams)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, dependentsParams, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'project-discipline'
        const scheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const updatedAssociation = { uuid, values: [] } as unknown as DisciplinesAssociation
        const query = { window: { size: 1 } } as unknown as DisciplinesAssociationsQuery
        const associationResults = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const allowedSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const allowedParams = { size: 25 } as ProjectAllowedDisciplinesParams

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(updatedAssociation)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(updatedAssociation)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(associationResults)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(associationResults)
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

    it('retrieves allowed metadata sets', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const locales = { locales: [] } as unknown as LocalesList
        const templates = { templates: [] } as unknown as AllowedTemplateListResult
        const workflow = { items: [] } as unknown as WorkflowListResult
        const orderings = { orderings: [] } as unknown as OrderingsList

        client.get.mockResolvedValue(classification)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCollaboratorTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-collaborator-types`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('identifier')).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-custom-defined-field-values/identifier/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedDescriptionTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-description-types`, undefined, undefined)

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedImageTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-image-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-keyword-group-configurations/42/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-link-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        expect(await service.getAllowedNatureTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-nature-types`, undefined, undefined)

        expect(await service.getAllowedParticipantRoles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-participant-roles`, undefined, undefined)

        expect(await service.getAllowedProjectRelationTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-project-relation-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(templates)
        expect(await service.getAllowedTemplates()).toBe(templates)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-templates`, undefined, undefined)

        expect(await service.getAllowedTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-types`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)

        client.get.mockResolvedValueOnce(orderings)
        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('lists and creates notes', async () => {
        const uuid = 'project-notes'
        const params = { size: 10 } as ProjectNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
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
        const customBase = '/custom-projects'
        const customService = new ProjectsService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as ProjectListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
