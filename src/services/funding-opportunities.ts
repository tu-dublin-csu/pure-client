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

    /**
     * Lists all funding opportunities
     *
     * Lists all funding opportunities in the Pure instance. If you need to filter the funding opportunities returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned funding opportunities per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /fundingOpportunities/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: FundingOpportunityListParams, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return invokeOperation<FundingOpportunityListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for funding opportunities
     *
     * Lists funding opportunities in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: FundingOpportunitiesQuery, config?: AxiosRequestConfig): Promise<FundingOpportunityListResult> {
        return invokeOperation<FundingOpportunityListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get funding opportunity
     *
     * Get funding opportunity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired funding opportunity
     * @param config Axios request configuration overrides.
     */
    async get(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return invokeOperation<FundingOpportunity>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create funding opportunity
     *
     * Create funding opportunity
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: FundingOpportunity, config?: AxiosRequestConfig): Promise<FundingOpportunity> {
        return invokeOperation<FundingOpportunity>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update funding opportunity
     *
     * Update funding opportunity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Delete funding opportunity
     *
     * Delete funding opportunity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lock the content
     *
     * Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the content to lock
     * @param config Axios request configuration overrides.
     */
    async lock(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Unlock the content
     *
     * Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the content to unlock
     * @param config Axios request configuration overrides.
     */
    async unlock(uuid: FundingOpportunityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to a funding opportunity
     *
     * Lists all dependents to a funding opportunity with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Get file from the funding opportunity
     *
     * Get file from the funding opportunity
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Upload file to a specific funding opportunity
     *
     * Uploads file for the funding opportunity
     *
     * @param file Required request body
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Lists notes
     *
     * Lists notes associated with a funding opportunity ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Create note
     *
     * Create note and associate it with a funding opportunity
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the funding opportunity to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
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

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicDegreeEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicDegreeEligibilityTypes,
            { config }
        )
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedEligibilityTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedEligibilityTypes,
            { config }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the funding opportunity
     *
     * Get allowed classifications for the custom-defined field associated with the funding opportunity.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
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

    /**
     * A list of allowed document licenses
     *
     * Get a list of allowed document licenses for funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentLicenses,
            { config }
        )
    }

    /**
     * A list of allowed document types
     *
     * Get a list of allowed license types that can be used for the 'documents.type' attribute of funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentTypes,
            { config }
        )
    }

    /**
     * A list of allowed document version types
     *
     * Get a list of allowed version types for documents on funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentVersionTypes,
            { config }
        )
    }

    /**
     * A list of keyword group configurations
     *
     * Get a list of allowed keyword group configurations that can be used when submitting keyword groups.
     *
     * @param config Axios request configuration overrides.
     */
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

    /**
     * A list of allowed classifications for the specified keyword group
     *
     * Get a list of allowed classifications that can be used when submitting a specified keyword group.
     *
     * @param id Path parameter "id" (integer (int64)). Pure id of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
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

    /**
     * A list of allowed locales in localized strings
     *
     * Get a list of allowed locales that can be used when submitting localized string entities.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of funding opportunity
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the type property
     *
     * Get a list of classifications that can be used when submitting a type.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the funding opportunities endpoint. These values can be used by the order parameter when listing funding opportunities.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
