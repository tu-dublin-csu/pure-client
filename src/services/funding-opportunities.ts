import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type FundingOpportunity = components['schemas']['FundingOpportunity']
export type FundingOpportunityListResult = components['schemas']['FundingOpportunityListResult']
export type FundingOpportunitiesQuery = components['schemas']['FundingOpportunitiesQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type FundingOpportunityListParams = NonNullable<operations['fundingOpportunity_list']['parameters']['query']>
export type FundingOpportunityDependentsParams = NonNullable<operations['fundingOpportunity_dependents']['parameters']['query']>
export type FundingOpportunityNotesParams = NonNullable<operations['fundingOpportunity_listNotes']['parameters']['query']>

export interface FundingOpportunitiesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/funding-opportunities'

export class FundingOpportunitiesService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: FundingOpportunitiesServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: FundingOpportunityListParams, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return this.client.get<FundingOpportunityListResult>(this.basePath, params, config)
    }

    async query(body: FundingOpportunitiesQuery, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return this.client.post<FundingOpportunityListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return this.client.get<FundingOpportunity>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: FundingOpportunity, config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return this.client.put<FundingOpportunity>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: FundingOpportunity, config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return this.client.put<FundingOpportunity>(`${this.basePath}/${uuid}`, payload, undefined, config)
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
        params?: FundingOpportunityDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return this.client.get<ContentRefListResult>(`${this.basePath}/${uuid}/dependents`, params, config)
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

    async listNotes(uuid: string, params?: FundingOpportunityNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getAllowedAcademicDegreeEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-academic-degree-eligibility-types`, undefined, config)
    }

    async getAllowedEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-eligibility-types`, undefined, config)
    }

    async getAllowedCustomDefinedFieldClassifications(propertyName: string, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-custom-defined-field-values/${propertyName}/classifications`,
            undefined,
            config
        )
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-licenses`, undefined, config)
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-types`, undefined, config)
    }

    async getAllowedDocumentVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-version-types`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return this.client.get<AllowedKeywordGroupConfigurationList>(`${this.basePath}/allowed-keyword-group-configurations`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurationClassifications(id: number, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`,
            undefined,
            config
        )
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

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
