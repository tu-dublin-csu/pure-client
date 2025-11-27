import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type ExternalOrganization = components['schemas']['ExternalOrganization']
export type ExternalOrganizationListResult = components['schemas']['ExternalOrganizationListResult']
export type ExternalOrganizationsQuery = components['schemas']['ExternalOrganizationsQuery']
export type ExternalOrganizationRefList = components['schemas']['ExternalOrganizationRefList']
export type ExternalOrganizationList = components['schemas']['ExternalOrganizationList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']

export type ExternalOrganizationListParams = NonNullable<operations['externalOrganization_list']['parameters']['query']>
export type ExternalOrganizationDependentsParams = NonNullable<operations['externalOrganization_dependents']['parameters']['query']>
export type ExternalOrganizationNotesParams = NonNullable<operations['externalOrganization_listNotes']['parameters']['query']>
export type ExternalOrganizationAllowedDisciplinesParams = NonNullable<operations['externalOrganization_getAllowedDisciplines']['parameters']['query']>

export interface ExternalOrganizationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/external-organizations'

export class ExternalOrganizationsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ExternalOrganizationsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ExternalOrganizationListParams, config?: AxiosRequestConfig): Promise<ExternalOrganizationListResult> {
        return this.client.get<ExternalOrganizationListResult>(this.basePath, params, config)
    }

    async query(body: ExternalOrganizationsQuery, config?: AxiosRequestConfig): Promise<ExternalOrganizationListResult> {
        return this.client.post<ExternalOrganizationListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return this.client.get<ExternalOrganization>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: ExternalOrganization, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return this.client.put<ExternalOrganization>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: ExternalOrganization, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return this.client.put<ExternalOrganization>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async listDependents(
        uuid: string,
        params?: ExternalOrganizationDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return this.client.get<ContentRefListResult>(`${this.basePath}/${uuid}/dependents`, params, config)
    }

    async getDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return this.client.get<DisciplinesAssociation>(
            `${this.basePath}/${uuid}/disciplines/${disciplineScheme}`,
            undefined,
            config
        )
    }

    async updateDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return this.client.put<DisciplinesAssociation>(
            `${this.basePath}/${uuid}/disciplines/${disciplineScheme}`,
            payload,
            undefined,
            config
        )
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
        params?: ExternalOrganizationAllowedDisciplinesParams,
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

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }

    async listNotes(uuid: string, params?: ExternalOrganizationNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getFile(uuid: string, fileId: string, config?: AxiosRequestConfig): Promise<string> {
        return this.client.get<string>(`${this.basePath}/${uuid}/files/${fileId}`, undefined, config)
    }

    async uploadFile(file: string, contentType?: string, config?: AxiosRequestConfig): Promise<UploadedFile> {
        const uploadConfig = contentType
            ? {
                  ...config,
                  headers: {
                      ...(config?.headers ?? {}),
                      'Content-Type': contentType
                  }
              }
            : config

        return this.client.put<UploadedFile>(`${this.basePath}/file-uploads`, file, undefined, uploadConfig)
    }

    async merge(refs: ExternalOrganizationRefList, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return this.client.post<ExternalOrganization>(`${this.basePath}/merge`, refs, undefined, config)
    }

    async previewDeduplication(
        organizations: ExternalOrganizationList,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return this.client.post<ExternalOrganizationListResult>(
            `${this.basePath}/preview-deduplication`,
            organizations,
            undefined,
            config
        )
    }

    async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-countries`, undefined, config)
    }

    async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-subdivision`, undefined, config)
    }

    async getAllowedClassifiedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-file-types`, undefined, config)
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-licenses`, undefined, config)
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-types`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return this.client.get<AllowedKeywordGroupConfigurationList>(
            `${this.basePath}/allowed-keyword-group-configurations`,
            undefined,
            config
        )
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: number,
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`,
            undefined,
            config
        )
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

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }
}
