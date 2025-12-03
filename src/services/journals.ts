import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, journalsServiceConfig } from './service-config'

export type Journal = components['schemas']['Journal']
export type JournalListResult = components['schemas']['JournalListResult']
export type JournalsQuery = components['schemas']['JournalsQuery']
export type MetricCollection = components['schemas']['MetricCollection']
export type MetricCollectionDefinitionList = components['schemas']['MetricCollectionDefinitionList']
export type OrderingsList = components['schemas']['OrderingsList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type JournalListParams = NonNullable<operations['journal_list']['parameters']['query']>
export type JournalDependentsParams = NonNullable<operations['journal_dependents']['parameters']['query']>
export type JournalNotesParams = NonNullable<operations['journal_listNotes']['parameters']['query']>
export type JournalAllowedDisciplinesParams = NonNullable<operations['journal_getAllowedDisciplines']['parameters']['query']>

type JournalPathParams = operations['journal_get']['parameters']['path']
type JournalDependentsPathParams = operations['journal_dependents']['parameters']['path']
type JournalDisciplineAssociationPathParams = operations['journal_getDisciplineAssociation']['parameters']['path']
type JournalDisciplineSearchPathParams = operations['journal_listDisciplineAssociations']['parameters']['path']
type JournalAllowedDisciplinePathParams = operations['journal_getAllowedDisciplines']['parameters']['path']
type JournalMetricsPathParams = operations['journal_listMetricsFromCollection']['parameters']['path']
type JournalNotesPathParams = operations['journal_listNotes']['parameters']['path']
type JournalKeywordGroupClassificationPathParams =
    operations['journal_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface JournalsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class JournalsService {
    private readonly basePath: string
    private readonly operations = journalsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: JournalsServiceOptions = {}) {
        this.basePath = options.basePath ?? journalsServiceConfig.basePath
    }

    /**
     * Lists all journals
     *
     * Lists all journals in the Pure instance. If you need to filter the journals returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned journals per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /journals/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: JournalListParams, config?: AxiosRequestConfig): Promise<JournalListResult> {
        return invokeOperation<JournalListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for journals
     *
     * Lists journals in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: JournalsQuery, config?: AxiosRequestConfig): Promise<JournalListResult> {
        return invokeOperation<JournalListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get journal
     *
     * Get journal with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired journal
     * @param config Axios request configuration overrides.
     */
    async get(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create journal
     *
     * Create journal
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Journal, config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update journal
     *
     * Update journal with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: JournalPathParams['uuid'], payload: Journal, config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete journal
     *
     * Delete journal with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to a journal
     *
     * Lists all dependents to a journal with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: JournalDependentsPathParams['uuid'],
        params?: JournalDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the journal
     *
     * Get disciplines from the discipline scheme associated with the journal with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired journal
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: JournalDisciplineAssociationPathParams['uuid'],
        disciplineScheme: JournalDisciplineAssociationPathParams['discipline-scheme'],
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
     * Update disciplines from the discipline scheme associated with the journal
     *
     * Update disciplines from the discipline scheme associated with the journal with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: JournalDisciplineAssociationPathParams['uuid'],
        disciplineScheme: JournalDisciplineAssociationPathParams['discipline-scheme'],
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
     * Query operation for disciplines associated with journals
     *
     * Lists disciplines from the discipline scheme associated with journals in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: JournalDisciplineSearchPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for journals
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for journals
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: JournalAllowedDisciplinePathParams['discipline-scheme'],
        params?: JournalAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for journals
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplineSchemes(
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineSchemeListResult> {
        return invokeOperation<DisciplinesDisciplineSchemeListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplineSchemes,
            { config }
        )
    }

    /**
     * Lists metrics with collection id
     *
     * Lists metrics from a specific metrics collection that associated with a journal.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal to get metrics for
     * @param collectionId Path parameter "collection-id" (string, pattern .+). ID of the metrics collection to get metrics for
     * @param config Axios request configuration overrides.
     */
    async listMetricsFromCollection(
        uuid: JournalMetricsPathParams['uuid'],
        collectionId: JournalMetricsPathParams['collection-id'],
        config?: AxiosRequestConfig
    ): Promise<MetricCollection> {
        return invokeOperation<MetricCollection>(this.client, this.basePath, this.operations.listMetricsFromCollection, {
            pathParams: { uuid, 'collection-id': collectionId },
            config
        })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with the journal ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: JournalNotesPathParams['uuid'],
        params?: JournalNotesParams,
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
     * Create note and associate it with a journal
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the journal to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: JournalNotesPathParams['uuid'],
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
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of journals
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
     * A list of allowed countries
     *
     * Get a list of allowed countries that can be used for the 'journal.country' attribute of journals
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
        id: JournalKeywordGroupClassificationPathParams['id'],
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
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of journals
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLinkTypes,
            { config }
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
     * A list of allowed metric collections
     *
     * Get a list of metric collections allowed on journals
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMetricCollections(config?: AxiosRequestConfig): Promise<MetricCollectionDefinitionList> {
        return invokeOperation<MetricCollectionDefinitionList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMetricCollections,
            { config }
        )
    }

    /**
     * A list of allowed journal types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of journal
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
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of journals
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
     * Lists all orderings available to the journal endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
