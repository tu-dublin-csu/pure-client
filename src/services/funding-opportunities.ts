import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { fundingOpportunitiesServiceConfig, invokeOperation } from './service-config'

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

type FundingOpportunityPathParams = operations['fundingOpportunity_get']['parameters']['path']
type FundingOpportunityDependentsPathParams = operations['fundingOpportunity_dependents']['parameters']['path']
type FundingOpportunityFilePathParams = operations['fundingOpportunity_getFile']['parameters']['path']
type FundingOpportunityNotesPathParams = operations['fundingOpportunity_listNotes']['parameters']['path']
type FundingOpportunityCustomFieldPathParams =
    operations['fundingOpportunity_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type FundingOpportunityKeywordGroupPathParams =
    operations['fundingOpportunity_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface FundingOpportunitiesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class FundingOpportunitiesService {
    private readonly basePath: string
    private readonly operations = fundingOpportunitiesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: FundingOpportunitiesServiceOptions = {}) {
        this.basePath = options.basePath ?? fundingOpportunitiesServiceConfig.basePath
    }

    async list(params?: FundingOpportunityListParams, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return invokeOperation<FundingOpportunityListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: FundingOpportunitiesQuery, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return invokeOperation<FundingOpportunityListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return invokeOperation<FundingOpportunity>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: FundingOpportunity, config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return invokeOperation<FundingOpportunity>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(
        uuid: FundingOpportunityPathParams['uuid'],
        payload: FundingOpportunity,
        config?: AxiosRequestConfig
    ): Promise<FundingOpportunity> {
        return invokeOperation<FundingOpportunity>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(
        uuid: FundingOpportunityDependentsPathParams['uuid'],
        params?: FundingOpportunityDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getFile(
        uuid: FundingOpportunityFilePathParams['uuid'],
        fileId: FundingOpportunityFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
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

        return invokeOperation<UploadedFile>(this.client, this.basePath, this.operations.uploadFile, {
            body: file,
            config: uploadConfig
        })
    }

    async listNotes(
        uuid: FundingOpportunityNotesPathParams['uuid'],
        params?: FundingOpportunityNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: FundingOpportunityNotesPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    async getAllowedAcademicDegreeEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicDegreeEligibilityTypes,
            { config }
        )
    }

    async getAllowedEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedEligibilityTypes,
            { config }
        )
    }

    async getAllowedCustomDefinedFieldClassifications(
        propertyName: FundingOpportunityCustomFieldPathParams['propertyName'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { propertyName },
                config
            }
        )
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentLicenses,
            { config }
        )
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentTypes,
            { config }
        )
    }

    async getAllowedDocumentVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentVersionTypes,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurations(
        config?: AxiosRequestConfig
    ): Promise<AllowedKeywordGroupConfigurationList> {
        return invokeOperation<AllowedKeywordGroupConfigurationList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurations,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: FundingOpportunityKeywordGroupPathParams['id'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurationClassifications,
            {
                pathParams: { id },
                config
            }
        )
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
            { config }
        )
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
