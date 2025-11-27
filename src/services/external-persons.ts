import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type ExternalPerson = components['schemas']['ExternalPerson']
export type ExternalPersonListResult = components['schemas']['ExternalPersonListResult']
export type ExternalPersonsQuery = components['schemas']['ExternalPersonsQuery']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type ExternalPersonListParams = NonNullable<operations['externalPerson_list']['parameters']['query']>
export type ExternalPersonDependentsParams = NonNullable<operations['externalPerson_dependents']['parameters']['query']>
export type ExternalPersonNotesParams = NonNullable<operations['externalPerson_listNotes']['parameters']['query']>
export type ExternalPersonAllowedDisciplineParams = NonNullable<operations['getAllowedDisciplines']['parameters']['query']>

export interface ExternalPersonsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/external-persons'

export class ExternalPersonsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ExternalPersonsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ExternalPersonListParams, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
        return this.client.get<ExternalPersonListResult>(this.basePath, params, config)
    }

    async query(body: ExternalPersonsQuery, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
        return this.client.post<ExternalPersonListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<ExternalPerson> {
        return this.client.get<ExternalPerson>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: ExternalPerson, config?: AxiosRequestConfig): Promise<ExternalPerson> {
        return this.client.put<ExternalPerson>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: ExternalPerson, config?: AxiosRequestConfig): Promise<ExternalPerson> {
        return this.client.put<ExternalPerson>(`${this.basePath}/${uuid}`, payload, undefined, config)
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
        params?: ExternalPersonDependentsParams,
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
        params?: ExternalPersonAllowedDisciplineParams,
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

    async listNotes(uuid: string, params?: ExternalPersonNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
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

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-classified-identifier-types`,
            undefined,
            config
        )
    }

    async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-countries`, undefined, config)
    }

    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-image-types`, undefined, config)
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

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }
}
