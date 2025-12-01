import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, pressMediaServiceConfig } from './service-config'

export type PressMedia = components['schemas']['PressMedia']
export type PressMediaListResult = components['schemas']['PressMediaListResult']
export type PressMediaQuery = components['schemas']['PressMediaQuery']
export type OrderingsList = components['schemas']['OrderingsList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type APIStringListResult = components['schemas']['APIStringListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type PressMediaListParams = NonNullable<operations['pressmedia_list']['parameters']['query']>
export type PressMediaNotesParams = NonNullable<operations['pressmedia_listNotes']['parameters']['query']>

type PressMediaPathParams = operations['pressmedia_get']['parameters']['path']
type PressMediaFilePathParams = operations['pressmedia_getFile']['parameters']['path']
type PressMediaCustomFieldPathParams = operations['pressmedia_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type PressMediaKeywordGroupPathParams = operations['pressmedia_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface PressMediaServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PressMediaService {
    private readonly basePath: string
    private readonly operations = pressMediaServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PressMediaServiceOptions = {}) {
        this.basePath = options.basePath ?? pressMediaServiceConfig.basePath
    }

    /**
     * List all Press/Media content
     *
     * List all Press/Media content in the Pure instance. If you need to filter which content is returned returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned Press/Media per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /pressmedia/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: PressMediaListParams, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return invokeOperation<PressMediaListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for Press/Media content
     *
     * Lists Press/Media content in the Pure instance that matches the provided query. similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: PressMediaQuery, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return invokeOperation<PressMediaListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get specific Press/Media
     *
     * Get Press/Media with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired Press/Media
     * @param config Axios request configuration overrides.
     */
    async get(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create Press/Media content
     *
     * Create Press/Media content in the Pure instance.
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update Press/Media
     *
     * Update Press/Media with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the Press/Media to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: PressMediaPathParams['uuid'], payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete specific Press/Media
     *
     * Delete Press/Media content with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the Press/Media
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get file related to Press/Media
     *
     * Get file related to Press/Media
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the Press/Media
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(uuid: PressMediaFilePathParams['uuid'], fileId: PressMediaFilePathParams['fileId'], config?: AxiosRequestConfig): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific Press/Media
     *
     * Uploads file for the Press/Media with the specified UUID.
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
     * Lists notes associated with a specific Press/Media ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the Press/Media to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: PressMediaPathParams['uuid'],
        params?: PressMediaNotesParams,
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
     * Create note and associate it with a piece of Press/Media
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the Press/Media to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: PressMediaPathParams['uuid'],
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
     * A list of allowed categories
     *
     * Get a list of allowed categories on Press/Media content
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCategories,
            { config }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the Press/Media
     *
     * Get allowed classifications for the custom-defined field associated with the Press/Media.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        fieldIdentifier: PressMediaCustomFieldPathParams['fieldIdentifer'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        // API spec exposes the misspelled token `fieldIdentifer` for this path parameter.
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { fieldIdentifer: fieldIdentifier },
                config
            }
        )
    }

    /**
     * A list of allowed description types
     *
     * Get a list of classifications that can be used when submitting a description.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDescriptionsTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDescriptionsTypes,
            { config }
        )
    }

    /**
     * A list of allowed image types
     *
     * Get a list of allowed image types that can be used for the 'images.type' attribute of activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedImageTypes,
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
    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
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
        id: PressMediaKeywordGroupPathParams['id'],
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
     * A list of allowed media coverage types
     *
     * Get a list of allowed types that can be used for the 'mediaCoverageType' attribute of media coverages on Press/Media
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoverageTypes(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoverageTypes,
            { config }
        )
    }

    /**
     * A list of allowed countries
     *
     * Get a list of allowed countries for media coverages on Press/Media
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoveragesCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesCountries,
            { config }
        )
    }

    /**
     * A list the degrees of recognition allowed on Press/Media
     *
     * Get a list of degrees of recognition that are allowed to be used for the attribute 'mediaCoverage.degreeOfRecognition' on Press/Media.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoveragesDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesDegreeOfRecognitions,
            { config }
        )
    }

    /**
     * A list of allowed media types
     *
     * Get a list of allowed types that can be used for the 'mediaType' attribute of media coverages on Press/Media
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoveragesMediaTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesMediaTypes,
            { config }
        )
    }

    /**
     * A list of allowed person roles
     *
     * Get a list of allowed person roles that can be used for the 'persons.role' attribute of the Press/Media media coverage.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoveragesPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesPersonsRoles,
            { config }
        )
    }

    /**
     * A list of allowed subdivisions
     *
     * Get a list of allowed subdivisions for media coverages on Press/Media
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMediaCoveragesSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesSubdivisions,
            { config }
        )
    }

    /**
     * A list of allowed Press/Media types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of Press/Media
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTypes,
            { config }
        )
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of Press/Media content
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return invokeOperation<WorkflowListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedWorkflowSteps,
            { config }
        )
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the Press/Media endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
