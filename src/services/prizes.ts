import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, prizesServiceConfig } from './service-config'

export type Prize = components['schemas']['Prize']
export type PrizeListResult = components['schemas']['PrizeListResult']
export type PrizesQuery = components['schemas']['PrizesQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type PrizeListParams = NonNullable<operations['prize_list']['parameters']['query']>
export type PrizeAllowedDisciplinesParams = NonNullable<operations['prize_getAllowedDisciplines']['parameters']['query']>
export type PrizeNotesParams = NonNullable<operations['prize_listNotes']['parameters']['query']>

export interface PrizesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PrizesService {
    private readonly basePath: string
    private readonly operations = prizesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PrizesServiceOptions = {}) {
        this.basePath = options.basePath ?? prizesServiceConfig.basePath
    }

    /**
     * Lists all prizes
     *
     * Lists all prizes in the Pure instance. If you need to filter the prizes returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned prizes per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /prizes/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: PrizeListParams, config?: AxiosRequestConfig): Promise<PrizeListResult> {
        return invokeOperation<PrizeListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for prizes
     *
     * Lists prizes in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: PrizesQuery, config?: AxiosRequestConfig): Promise<PrizeListResult> {
        return invokeOperation<PrizeListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get prize
     *
     * Get prize with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired prize
     * @param config Axios request configuration overrides.
     */
    async get(uuid: string, config?: AxiosRequestConfig): Promise<Prize> {
        return invokeOperation<Prize>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create prize
     *
     * Create prize
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Prize, config?: AxiosRequestConfig): Promise<Prize> {
        return invokeOperation<Prize>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update prize
     *
     * Update prize with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: string, payload: Prize, config?: AxiosRequestConfig): Promise<Prize> {
        return invokeOperation<Prize>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete prize
     *
     * Delete prize with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the prize
     *
     * Get disciplines from the discipline scheme associated with the prize with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired prize
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(uuid: string, disciplineScheme: string, config?: AxiosRequestConfig): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    /**
     * Update disciplines from the discipline scheme associated with the prize
     *
     * Update disciplines from the discipline scheme associated with the prize with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.updateDisciplineAssociation,
            {
                pathParams: { uuid, 'discipline-scheme': disciplineScheme },
                body: payload,
                config
            }
        )
    }

    /**
     * Query operation for disciplines associated with prizes
     *
     * Lists disciplines from the discipline scheme associated with prizes in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: string,
        body: DisciplinesAssociationsQuery,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociationListResult> {
        return invokeOperation<DisciplinesAssociationListResult>(
            this.client,
            this.basePath,
            this.operations.listDisciplineAssociations,
            {
                pathParams: { 'discipline-scheme': disciplineScheme },
                body,
                config
            }
        )
    }

    /**
     * A list of allowed disciplines for a specific discipline scheme
     *
     * Get a list of a allowed disciplines for specific discipline scheme for prizes
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for prizes
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: string,
        params?: PrizeAllowedDisciplinesParams,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineListResult> {
        return invokeOperation<DisciplinesDisciplineListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplines,
            {
                pathParams: { 'discipline-scheme': disciplineScheme },
                query: params,
                config
            }
        )
    }

    /**
     * A list of allowed discipline schemes
     *
     * Get a list of allowed discipline schemes for prizes
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplineSchemes(config?: AxiosRequestConfig): Promise<DisciplinesDisciplineSchemeListResult> {
        return invokeOperation<DisciplinesDisciplineSchemeListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplineSchemes,
            { config }
        )
    }

    /**
     * Get file from the prize
     *
     * Get file from the prize
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(uuid: string, fileId: string, config?: AxiosRequestConfig): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file for a specific prize
     *
     * Uploads file for the prize
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
     * Lists notes associated with a prize ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(uuid: string, params?: PrizeNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Create note
     *
     * Create note and associate it with a prize
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the prize to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * A list of allowed classifications for the category property
     *
     * Get a list of classifications that can be used when submitting a category.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedCategories, {
            config
        })
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of prizes
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedIdentifierTypes,
            { config }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the prize
     *
     * Get allowed classifications for the custom-defined field associated with the prize.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: string,
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
     * A list of allowed classifications for the degree of recognition
     *
     * Get a list of classifications that can be used when submitting a degree of recognition.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDegreeOfRecognitions,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the descriptions property
     *
     * Get a list of classifications that can be used when submitting a description.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDescriptionTypes,
            { config }
        )
    }

    /**
     * A list of allowed document licenses
     *
     * Get a list of allowed license types that can be used for the 'documents.license' attribute of prizes
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
     * Get a list of allowed license types that can be used for the 'documents.type' attribute of prizes
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
     * A list of allowed image types
     *
     * Get a list of allowed image types that can be used for the 'images.type' attribute of the prize.
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
        id: number,
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
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of prizes
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
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    /**
     * A list of allowed receiver of prize roles
     *
     * Get a list of allowed receiver of prize roles that can be used for the 'receiversOfPrize.role' attribute of the prize.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedReceiversOfPrizeRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedReceiversOfPrizeRoles,
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
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of prizes
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
     * Lists all orderings available to the prizes endpoint. These values can be used by the order parameter when listing prizes.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
