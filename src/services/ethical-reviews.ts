import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { ethicalReviewsServiceConfig, invokeOperation } from './service-config'

export type EthicalReview = components['schemas']['EthicalReview']
export type EthicalReviewListResult = components['schemas']['EthicalReviewListResult']
export type EthicalReviewQuery = components['schemas']['EthicalReviewQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type MilestoneListResult = components['schemas']['MilestoneListResult']

export type EthicalReviewListParams = NonNullable<operations['ethicalReview_list']['parameters']['query']>
export type EthicalReviewDependentsParams = NonNullable<operations['ethicalReview_dependents']['parameters']['query']>
export type EthicalReviewNotesParams = NonNullable<operations['ethicalReview_listNotes']['parameters']['query']>

type EthicalReviewPathParams = operations['ethicalReview_get']['parameters']['path']
type EthicalReviewKeywordGroupPathParams =
    operations['ethicalReview_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type EthicalReviewCustomFieldPathParams =
    operations['ethicalReview_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type EthicalReviewFilePathParams = operations['ethicalReview_getFile']['parameters']['path']

export interface EthicalReviewsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class EthicalReviewsService {
    private readonly basePath: string
    private readonly operations = ethicalReviewsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: EthicalReviewsServiceOptions = {}) {
        this.basePath = options.basePath ?? ethicalReviewsServiceConfig.basePath
    }

    /**
     * Lists all ethical reviews
     *
     * Lists all ethical reviews in the Pure instance. If you need to filter the ethical reviews returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned ethical reviews per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from ethicalReview_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: EthicalReviewListParams, config?: AxiosRequestConfig): Promise<EthicalReviewListResult> {
        return invokeOperation<EthicalReviewListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for ethical reviews
     *
     * Lists ethical reviews in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: EthicalReviewQuery, config?: AxiosRequestConfig): Promise<EthicalReviewListResult> {
        return invokeOperation<EthicalReviewListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get ethical review
     *
     * Get ethical review with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired ethical review
     * @param config Axios request configuration overrides.
     */
    async get(uuid: EthicalReviewPathParams['uuid'], config?: AxiosRequestConfig): Promise<EthicalReview> {
        return invokeOperation<EthicalReview>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create ethical review
     *
     * Create ethical review
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: EthicalReview, config?: AxiosRequestConfig): Promise<EthicalReview> {
        return invokeOperation<EthicalReview>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update ethical review
     *
     * Update ethical review with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: EthicalReviewPathParams['uuid'], payload: EthicalReview, config?: AxiosRequestConfig): Promise<EthicalReview> {
        return invokeOperation<EthicalReview>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete ethical review
     *
     * Delete ethical review with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: EthicalReviewPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: EthicalReviewPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: EthicalReviewPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * List dependents
     *
     * Lists all dependents to an ethical review with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param params Optional query parameters: verbose - boolean, default false. Whether to include verbose metadata.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: EthicalReviewPathParams['uuid'],
        params?: EthicalReviewDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get file
     *
     * Get file from the ethical review.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param fileId Path parameter "fileId" (string, pattern .+). ID of the file
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: EthicalReviewFilePathParams['uuid'],
        fileId: EthicalReviewFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload a file
     *
     * Upload a file to the ethical review service.
     *
     * @param body Required request body. File content
     * @param config Axios request configuration overrides.
     */
    async uploadFile(body: string, config?: AxiosRequestConfig): Promise<UploadedFile> {
        return invokeOperation<UploadedFile>(this.client, this.basePath, this.operations.uploadFile, {
            body,
            config
        })
    }

    /**
     * List notes
     *
     * Lists notes associated with an ethical review ordered by date (nulls last).
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: EthicalReviewPathParams['uuid'],
        params?: EthicalReviewNotesParams,
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
     * Create note and associate it with an ethical review.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param payload Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: EthicalReviewPathParams['uuid'], payload: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Get milestones for the ethical review
     *
     * Get milestones for the ethical review with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the ethical review
     * @param config Axios request configuration overrides.
     */
    async getMilestones(uuid: EthicalReviewPathParams['uuid'], config?: AxiosRequestConfig): Promise<MilestoneListResult> {
        return invokeOperation<MilestoneListResult>(this.client, this.basePath, this.operations.getMilestones, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of ethical reviews.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedIdentifierTypes,
            {
                config
            }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the ethical review
     *
     * @param propertyName Path parameter "propertyName" (string). Custom-defined field property name
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: EthicalReviewCustomFieldPathParams['propertyName'],
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
     * A list of allowed description types
     *
     * Get a list of allowed types for descriptions on ethical reviews
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedDescriptionTypes, {
            config
        })
    }

    /**
     * A list of allowed document types
     *
     * Get a list of allowed types for documents on ethical reviews
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedDocumentTypes, {
            config
        })
    }

    /**
     * A list of keyword group configurations
     *
     * Get a list of allowed keyword group configurations that can be used when submitting keyword groups.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return invokeOperation<AllowedKeywordGroupConfigurationList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurations,
            {
                config
            }
        )
    }

    /**
     * A list of allowed classifications for the specified keyword group
     *
     * Get a list of allowed classifications that can be used when submitting a specified keyword group.
     *
     * @param id Path parameter "id" (integer (int64)). ID of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurationClassifications(
        id: EthicalReviewKeywordGroupPathParams['id'],
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
     * A list of allowed link types
     *
     * Get a list of allowed link types on ethical reviews
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedLinkTypes, {
            config
        })
    }

    /**
     * A list of allowed locales in localized strings
     *
     * Get a list of allowed locales that can be used when submitting localized string entities.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, {
            config
        })
    }

    /**
     * A list of allowed person roles
     *
     * Get a list of allowed roles for persons on ethical reviews.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedPersonsRoles, {
            config
        })
    }

    /**
     * A list of allowed ethical review types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of ethical reviews.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of ethical reviews.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return invokeOperation<WorkflowListResult>(this.client, this.basePath, this.operations.getAllowedWorkflowSteps, {
            config
        })
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the ethical reviews endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }
}
