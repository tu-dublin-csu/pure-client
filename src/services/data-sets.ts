import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type DataSet = components['schemas']['DataSet']
export type DataSetListResult = components['schemas']['DataSetListResult']
export type DataSetsQuery = components['schemas']['DataSetsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type DataSetListParams = NonNullable<operations['dataSet_list']['parameters']['query']>
export type DataSetNotesParams = NonNullable<operations['dataSet_listNotes']['parameters']['query']>

export interface DataSetsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/data-sets'

export class DataSetsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: DataSetsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: DataSetListParams, config?: AxiosRequestConfig): Promise<DataSetListResult> {
        return this.client.get<DataSetListResult>(this.basePath, params, config)
    }

    async query(body: DataSetsQuery, config?: AxiosRequestConfig): Promise<DataSetListResult> {
        return this.client.post<DataSetListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<DataSet> {
        return this.client.get<DataSet>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: DataSet, config?: AxiosRequestConfig): Promise<DataSet> {
        return this.client.put<DataSet>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: DataSet, config?: AxiosRequestConfig): Promise<DataSet> {
        return this.client.put<DataSet>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async listNotes(uuid: string, params?: DataSetNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
    }

    async getAllowedContributorsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-contributors-roles`, undefined, config)
    }

    async getAllowedCustomDefinedFieldClassifications(
        propertyName: string,
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
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

    async getAllowedDoiAccessTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-doi-access-types`, undefined, config)
    }

    async getAllowedDoiLicenseTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-doi-license-types`, undefined, config)
    }

    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-image-types`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(
        config?: AxiosRequestConfig
    ): Promise<AllowedKeywordGroupConfigurationList> {
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

    async getAllowedLegalConditionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-legal-condition-types`, undefined, config)
    }

    async getAllowedLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-licenses`, undefined, config)
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

    async getAllowedOpenAccessPermissions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-open-access-permissions`, undefined, config)
    }

    async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-persons-roles`, undefined, config)
    }

    async getAllowedPhysicalDataTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-physical-data-types`, undefined, config)
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }
}
