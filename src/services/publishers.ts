import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, publishersServiceConfig } from './service-config'

export type Publisher = components['schemas']['Publisher']
export type PublisherListResult = components['schemas']['PublisherListResult']
export type PublishersQuery = components['schemas']['PublishersQuery']
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
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type PublisherListParams = NonNullable<operations['publisher_list']['parameters']['query']>
export type PublisherDependentsParams = NonNullable<operations['publisher_dependents']['parameters']['query']>
export type PublisherNotesParams = NonNullable<operations['publisher_listNotes']['parameters']['query']>
export type PublisherAllowedDisciplinesParams = NonNullable<operations['publisher_getAllowedDisciplines']['parameters']['query']>

type PublisherPathParams = operations['publisher_get']['parameters']['path']
type PublisherDependentsPathParams = operations['publisher_dependents']['parameters']['path']
type PublisherDisciplineAssociationPathParams = operations['publisher_getDisciplineAssociation']['parameters']['path']
type PublisherDisciplineSearchPathParams = operations['publisher_listDisciplineAssociations']['parameters']['path']
type PublisherAllowedDisciplinePathParams = operations['publisher_getAllowedDisciplines']['parameters']['path']
type PublisherNotesPathParams = operations['publisher_listNotes']['parameters']['path']
type PublisherKeywordGroupClassificationPathParams =
    operations['publisher_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface PublishersServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PublishersService {
    private readonly basePath: string
    private readonly operations = publishersServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PublishersServiceOptions = {}) {
        this.basePath = options.basePath ?? publishersServiceConfig.basePath
    }

    /**
     * Lists all publishers
     *
     * Lists all publishers in the Pure instance. If you need to filter the publishers returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned publishers per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /publishers/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: PublisherListParams, config?: AxiosRequestConfig): Promise<PublisherListResult> {
        return invokeOperation<PublisherListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for publishers
     *
     * Lists publishers in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: PublishersQuery, config?: AxiosRequestConfig): Promise<PublisherListResult> {
        return invokeOperation<PublisherListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get publisher
     *
     * Get publisher with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired publisher
     * @param config Axios request configuration overrides.
     */
    async get(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create publisher
     *
     * Create publisher
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Publisher, config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update publishers
     *
     * Update publishers with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: PublisherPathParams['uuid'], payload: Publisher, config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete publisher
     *
     * Delete publisher with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to a publisher
     *
     * Lists all dependents to a publisher with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: PublisherDependentsPathParams['uuid'],
        params?: PublisherDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the publisher
     *
     * Get disciplines from the discipline scheme associated with the publisher with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired publisher
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: PublisherDisciplineAssociationPathParams['uuid'],
        disciplineScheme: PublisherDisciplineAssociationPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.getDisciplineAssociation,
            {
                pathParams: {
                    uuid,
                    'discipline-scheme': disciplineScheme
                },
                config
            }
        )
    }

    /**
     * Update disciplines from the discipline scheme associated with the publisher
     *
     * Update disciplines from the discipline scheme associated with the publisher with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: PublisherDisciplineAssociationPathParams['uuid'],
        disciplineScheme: PublisherDisciplineAssociationPathParams['discipline-scheme'],
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.updateDisciplineAssociation,
            {
                pathParams: {
                    uuid,
                    'discipline-scheme': disciplineScheme
                },
                body: payload,
                config
            }
        )
    }

    /**
     * Query operation for disciplines associated with publishers
     *
     * Lists disciplines from the discipline scheme associated with publishers in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: PublisherDisciplineSearchPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for publishers
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for publishers
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: PublisherAllowedDisciplinePathParams['discipline-scheme'],
        params?: PublisherAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for publishers
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
     * Lists notes
     *
     * Lists notes associated with a publisher ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: PublisherNotesPathParams['uuid'],
        params?: PublisherNotesParams,
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
     * Create note and associate it with a publisher
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the publisher to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: PublisherNotesPathParams['uuid'],
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
     * A list of allowed countries
     *
     * Get a list of allowed countries that can be used for the 'countries' attribute of publishers
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCountries,
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
        id: PublisherKeywordGroupClassificationPathParams['id'],
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
     * A list of allowed publisher types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of publishers
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
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of publishers
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
     * Lists all orderings available to the publisher endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
