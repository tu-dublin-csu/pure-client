import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Project = components['schemas']['Project']
export type ProjectListResult = components['schemas']['ProjectListResult']
export type ProjectsQuery = components['schemas']['ProjectsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type AllowedTemplateListResult = components['schemas']['AllowedTemplateListResult']
export type ApplicationClusterListResult = components['schemas']['ApplicationClusterListResult']
export type AwardClusterListResult = components['schemas']['AwardClusterListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']

export type ProjectListParams = NonNullable<operations['project_list']['parameters']['query']>
export type ProjectDependentsParams = NonNullable<operations['project_dependents']['parameters']['query']>
export type ProjectNotesParams = NonNullable<operations['project_listNotes']['parameters']['query']>
export type ProjectAllowedDisciplinesParams = NonNullable<operations['project_getAllowedDisciplines']['parameters']['query']>

export interface ProjectsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/projects'

export class ProjectsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ProjectsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ProjectListParams, config?: AxiosRequestConfig): Promise<ProjectListResult> {
        return this.client.get<ProjectListResult>(this.basePath, params, config)
    }

    async query(body: ProjectsQuery, config?: AxiosRequestConfig): Promise<ProjectListResult> {
        return this.client.post<ProjectListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Project> {
        return this.client.get<Project>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Project, config?: AxiosRequestConfig): Promise<Project> {
        return this.client.put<Project>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Project, config?: AxiosRequestConfig): Promise<Project> {
        return this.client.put<Project>(`${this.basePath}/${uuid}`, payload, undefined, config)
    }

    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.delete<void>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/lock`, undefined, undefined, config)
    }

    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/unlock`, undefined, undefined, config)
    }

    async getApplicationClusters(uuid: string, config?: AxiosRequestConfig): Promise<ApplicationClusterListResult> {
        return this.client.get<ApplicationClusterListResult>(`${this.basePath}/${uuid}/application-clusters`, undefined, config)
    }

    async getAwardClusters(uuid: string, config?: AxiosRequestConfig): Promise<AwardClusterListResult> {
        return this.client.get<AwardClusterListResult>(`${this.basePath}/${uuid}/award-clusters`, undefined, config)
    }

    async listDependents(uuid: string, params?: ProjectDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
        return this.client.get<ContentRefListResult>(`${this.basePath}/${uuid}/dependents`, params, config)
    }

    async getDisciplineAssociation(uuid: string, disciplineScheme: string, config?: AxiosRequestConfig): Promise<DisciplinesAssociation> {
        return this.client.get<DisciplinesAssociation>(`${this.basePath}/${uuid}/disciplines/${disciplineScheme}`, undefined, config)
    }

    async updateDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return this.client.put<DisciplinesAssociation>(`${this.basePath}/${uuid}/disciplines/${disciplineScheme}`, payload, undefined, config)
    }

    async listDisciplineAssociations(
        disciplineScheme: string,
        body: DisciplinesAssociationsQuery,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociationListResult> {
        return this.client.post<DisciplinesAssociationListResult>(
            `${this.basePath}/disciplines/${disciplineScheme}/search`,
            body,
            undefined,
            config
        )
    }

    async getAllowedDisciplines(
        disciplineScheme: string,
        params?: ProjectAllowedDisciplinesParams,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineListResult> {
        return this.client.get<DisciplinesDisciplineListResult>(
            `${this.basePath}/disciplines/${disciplineScheme}/allowed-disciplines`,
            params,
            config
        )
    }

    async getAllowedDisciplineSchemes(config?: AxiosRequestConfig): Promise<DisciplinesDisciplineSchemeListResult> {
        return this.client.get<DisciplinesDisciplineSchemeListResult>(
            `${this.basePath}/disciplines/allowed-discipline-schemes`,
            undefined,
            config
        )
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
    }

    async getAllowedCollaboratorTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-collaborator-types`, undefined, config)
    }

    async getAllowedCustomDefinedFieldClassifications(propertyName: string, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-custom-defined-field-values/${propertyName}/classifications`,
            undefined,
            config
        )
    }

    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-description-types`, undefined, config)
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-licenses`, undefined, config)
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-types`, undefined, config)
    }

    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-image-types`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return this.client.get<AllowedKeywordGroupConfigurationList>(`${this.basePath}/allowed-keyword-group-configurations`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurationClassifications(id: number, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`, undefined, config)
    }

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-link-types`, undefined, config)
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-nature-types`, undefined, config)
    }

    async getAllowedParticipantRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-participant-roles`, undefined, config)
    }

    async getAllowedProjectRelationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-project-relation-types`, undefined, config)
    }

    async getAllowedTemplates(config?: AxiosRequestConfig): Promise<AllowedTemplateListResult> {
        return this.client.get<AllowedTemplateListResult>(`${this.basePath}/allowed-templates`, undefined, config)
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }

    async listNotes(uuid: string, params?: ProjectNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }
}
