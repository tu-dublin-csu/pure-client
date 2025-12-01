import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, researchOutputsServiceConfig } from './service-config'

export type ResearchOutput = components['schemas']['ResearchOutput']
export type ResearchOutputListResult = components['schemas']['ResearchOutputListResult']
export type ResearchOutputsQuery = components['schemas']['ResearchOutputsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type OrderingsList = components['schemas']['OrderingsList']
export type AllowedKeywordGroupConfigurationList =
    components['schemas']['AllowedKeywordGroupConfigurationList']
export type AllowedTemplateListResult = components['schemas']['AllowedTemplateListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type LocalesList = components['schemas']['LocalesList']
export type MetricCollection = components['schemas']['MetricCollection']
export type MetricCollectionDefinitionList = components['schemas']['MetricCollectionDefinitionList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type ResearchOutputPeerReviewConfigurationListResult =
    components['schemas']['ResearchOutputPeerReviewConfigurationListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type WorkflowListResult = components['schemas']['WorkflowListResult']

export type ResearchOutputListParams = NonNullable<operations['researchOutput_list']['parameters']['query']>
export type ResearchOutputDependentsParams =
    NonNullable<operations['researchOutput_dependents']['parameters']['query']>
export type ResearchOutputNotesParams =
    NonNullable<operations['researchOutput_listNotes']['parameters']['query']>
export type ResearchOutputAllowedDisciplinesParams =
    NonNullable<operations['researchoutput_getAllowedDisciplines']['parameters']['query']>

type ResearchOutputPathParams = operations['researchOutput_get']['parameters']['path']
type ResearchOutputCustomFieldPathParams =
    operations['researchOutput_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type ResearchOutputKeywordGroupPathParams =
    operations['researchOutput_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type ResearchOutputDisciplineAssociationPathParams =
    operations['researchoutput_getDisciplineAssociation']['parameters']['path']
type ResearchOutputAllowedDisciplinesPathParams =
    operations['researchoutput_getAllowedDisciplines']['parameters']['path']
type ResearchOutputMetricsPathParams =
    operations['researchOutput_listMetricsFromCollection']['parameters']['path']
type ResearchOutputFilePathParams = operations['researchOutput_getFile']['parameters']['path']

export type ResearchOutputGetParams = ResearchOutputPathParams
export type ResearchOutputDeleteParams = ResearchOutputPathParams

export interface ResearchOutputsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ResearchOutputsService {
    private readonly basePath: string
    private readonly operations = researchOutputsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ResearchOutputsServiceOptions = {}) {
        this.basePath = options.basePath ?? researchOutputsServiceConfig.basePath
    }

    private fetchClassification(
        operation: (typeof this.operations)[keyof typeof this.operations],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, operation, {
            config
        })
    }

    /**
     * Lists all research outputs
     *
     * Lists all research outputs in the Pure instance. If you need to filter the research outputs returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned research outputs per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /research-outputs/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: ResearchOutputListParams, config?: AxiosRequestConfig): Promise<ResearchOutputListResult> {
        return invokeOperation<ResearchOutputListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for research outputs
     *
     * Lists research outputs in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: ResearchOutputsQuery, config?: AxiosRequestConfig): Promise<ResearchOutputListResult> {
        return invokeOperation<ResearchOutputListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get research output
     *
     * Get research output with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired research output
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ResearchOutputPathParams['uuid'], config?: AxiosRequestConfig): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create research output
     *
     * Create research output
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: ResearchOutput, config?: AxiosRequestConfig): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update research output
     *
     * Update research output with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(
        uuid: ResearchOutputPathParams['uuid'],
        payload: ResearchOutput,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete research output
     *
     * Delete research output with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ResearchOutputPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to lock
     * @param config Axios request configuration overrides.
     */
    async lock(uuid: ResearchOutputPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to unlock
     * @param config Axios request configuration overrides.
     */
    async unlock(uuid: ResearchOutputPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to a research output
     *
     * Lists all dependents to a research output with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: ResearchOutputPathParams['uuid'],
        params?: ResearchOutputDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplinesfrom the discipline scheme associated with the research output
     *
     * Get disciplines from the discipline scheme associated with the research output with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired research output
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: ResearchOutputDisciplineAssociationPathParams['uuid'],
        disciplineScheme: ResearchOutputDisciplineAssociationPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.getDisciplineAssociation,
            {
                pathParams: { uuid, 'discipline-scheme': disciplineScheme },
                config
            }
        )
    }

    /**
     * Update disciplines from the discipline scheme associated with the research output
     *
     * Update disciplines from the discipline scheme associated with the research output with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: ResearchOutputDisciplineAssociationPathParams['uuid'],
        disciplineScheme: ResearchOutputDisciplineAssociationPathParams['discipline-scheme'],
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
     * Query operation for disciplines associated with research outputs
     *
     * Lists disciplines from the discipline scheme associated with research outputs in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: ResearchOutputDisciplineAssociationPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for research outputs
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for research output
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: ResearchOutputAllowedDisciplinesPathParams['discipline-scheme'],
        params?: ResearchOutputAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplineSchemes(config?: AxiosRequestConfig): Promise<DisciplinesDisciplineSchemeListResult> {
        return invokeOperation<DisciplinesDisciplineSchemeListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplineSchemes,
            {
                config
            }
        )
    }

    /**
     * Lists metrics with collection id
     *
     * Lists metrics from a specific metrics collection that associated with a research output.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to get metrics for
     * @param collectionId Path parameter "collection-id" (string, pattern .+). ID of the metrics collection to get metrics for
     * @param config Axios request configuration overrides.
     */
    async listMetricsFromCollection(
        uuid: ResearchOutputMetricsPathParams['uuid'],
        collectionId: ResearchOutputMetricsPathParams['collection-id'],
        config?: AxiosRequestConfig
    ): Promise<MetricCollection> {
        return invokeOperation<MetricCollection>(
            this.client,
            this.basePath,
            this.operations.listMetricsFromCollection,
            {
                pathParams: { uuid, 'collection-id': collectionId },
                config
            }
        )
    }

    /**
     * Lists notes
     *
     * Lists notes associated with a research output ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: ResearchOutputPathParams['uuid'],
        params?: ResearchOutputNotesParams,
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
     * Create note and associate it with a research output
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: ResearchOutputPathParams['uuid'], note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * A list of allowed access types
     *
     * Get a list of allowed access types for additional files on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdditionalFileAccessTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedAdditionalFileAccessTypes, config)
    }

    /**
     * A list of allowed license types
     *
     * Get a list of allowed license types for additional files on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdditionalFileLicenseTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedAdditionalFileLicenseTypes, config)
    }

    /**
     * A list of allowed article processing charge currencies
     *
     * Get a list of allowed article processing charge currencies on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedArticleProcessingChargeCurrencies(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedArticleProcessingChargeCurrencies, config)
    }

    /**
     * A list of allowed contributor roles for the book anthology subtype
     *
     * Get a list of allowed roles for contributors on the book anthology subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedBookAnthologyContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedBookAnthologyContributorRoles, config)
    }

    /**
     * A list of allowed description types for the book anthology subtype
     *
     * Get a list of allowed description types on the book anthology subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedBookAnthologyDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedBookAnthologyDescriptionTypes, config)
    }

    /**
     * A list of allowed case note sources
     *
     * Get a list of allowed case note sources for select subtypes of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCaseNoteSources(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedCaseNoteSources, config)
    }

    /**
     * A list of allowed categories
     *
     * Get a list of allowed categories on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedCategories, config)
    }

    /**
     * A list of allowed contributor roles for the contribution to book anthology subtype
     *
     * Get a list of allowed roles for contributors on the contribution to book anthology subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToBookAnthologyContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToBookAnthologyContributorRoles, config)
    }

    /**
     * A list of allowed description types for the contribution to book anthology subtype
     *
     * Get a list of allowed description types on the contribution to book anthology subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToBookAnthologyDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToBookAnthologyDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor roles for the contribution to conference subtype
     *
     * Get a list of allowed roles for contributors on the contribution to conference subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToConferenceContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToConferenceContributorRoles, config)
    }

    /**
     * A list of allowed description types for the contribution to conference subtype
     *
     * Get a list of allowed description types on the contribution to conference subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToConferenceDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToConferenceDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor roles for the contribution to journal subtype
     *
     * Get a list of allowed roles for contributors on the contribution to journal subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToJournalContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToJournalContributorRoles, config)
    }

    /**
     * A list of allowed description types for the contribution to journal subtype
     *
     * Get a list of allowed description types on the contribution to journal subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToJournalDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToJournalDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor roles for the contribution to memorandum subtype
     *
     * Get a list of allowed roles for contributors on the contribution to memorandum subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToMemorandumContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToMemorandumContributorRoles, config)
    }

    /**
     * A list of allowed description types for the contribution to memorandum subtype
     *
     * Get a list of allowed description types on the contribution to memorandum subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToMemorandumDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToMemorandumDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor roles for the contribution to periodical subtype
     *
     * Get a list of allowed roles for contributors on the contribution to periodical subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToPeriodicalContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToPeriodicalContributorRoles, config)
    }

    /**
     * A list of allowed description types for the contribution to periodical subtype
     *
     * Get a list of allowed description types on the contribution to periodical subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributionToPeriodicalDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributionToPeriodicalDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor countries
     *
     * Get a list of allowed countries for contributors on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributorCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributorCountries, config)
    }

    /**
     * A list of allowed countries
     *
     * Get a list of allowed countries that can be used for the 'countries' attribute of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedCountries, config)
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the research output
     *
     * Get allowed classifications for the custom-defined field associated with the research output.
     *
     * @param fieldIdentifer Path parameter "fieldIdentifer" (string). FieldIdentifer for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        fieldIdentifer: ResearchOutputCustomFieldPathParams['fieldIdentifer'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { fieldIdentifer },
                config
            }
        )
    }

    /**
     * A list of allowed access types
     *
     * Get a list of allowed access types for electronic versions on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedElectronicVersionAccessTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedElectronicVersionAccessTypes, config)
    }

    /**
     * A list of allowed license types
     *
     * Get a list of allowed license types for electronic versions on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedElectronicVersionLicenseTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedElectronicVersionLicenseTypes, config)
    }

    /**
     * A list of allowed version types
     *
     * Get a list of allowed version types for electronic versions on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedElectronicVersionVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedElectronicVersionVersionTypes, config)
    }

    /**
     * A list of allowed image types
     *
     * Get a list of allowed image types that can be used for the 'images.type' attribute of research output
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedImageTypes, config)
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
        id: ResearchOutputKeywordGroupPathParams['id'],
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
            {
                config
            }
        )
    }

    /**
     * A list of allowed languages
     *
     * Get a list of allowed languages on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLanguages(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedLanguages, config)
    }

    /**
     * A list of allowed link types
     *
     * Get a list of allowed link types on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedLinkTypes, config)
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
     * A list of allowed main research areas
     *
     * Get a list of allowed main research areas on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMainResearchAreas(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedMainResearchAreas, config)
    }

    /**
     * A list of allowed contributor roles for the memorandum subtype
     *
     * Get a list of allowed roles for contributors on the memorandum subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMemorandumContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedMemorandumContributorRoles, config)
    }

    /**
     * A list of allowed description types for the memorandum subtype
     *
     * Get a list of allowed description types on the memorandum subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMemorandumDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedMemorandumDescriptionTypes, config)
    }

    /**
     * A list of allowed metric collections
     *
     * Get a list of metric collections allowed on research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMetricCollections(config?: AxiosRequestConfig): Promise<MetricCollectionDefinitionList> {
        return invokeOperation<MetricCollectionDefinitionList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMetricCollections,
            {
                config
            }
        )
    }

    /**
     * A list of allowed contributor roles for the non-textual subtype
     *
     * Get a list of allowed roles for contributors on the non-textual subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNonTextualContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedNonTextualContributorRoles, config)
    }

    /**
     * A list of allowed description types for the non-textual subtype
     *
     * Get a list of allowed description types on the non-textual subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNonTextualDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedNonTextualDescriptionTypes, config)
    }

    /**
     * A list of allowed contributor roles for the other contribution subtype
     *
     * Get a list of allowed roles for contributors on the other contribution subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedOtherContributionContributorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedOtherContributionContributorRoles, config)
    }

    /**
     * A list of allowed description types for the other contribution subtype
     *
     * Get a list of allowed description types on the other contribution subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedOtherContributionDescriptionTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedOtherContributionDescriptionTypes, config)
    }

    /**
     * A list of allowed output medias
     *
     * Get a list of allowed output medias for the non-textual subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedOutputMedias(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedOutputMedias, config)
    }

    /**
     * A list of allowed contributor roles for the patent subtype
     *
     * Get a list of allowed roles for contributors on the patent subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPatentContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedPatentContributorRoles, config)
    }

    /**
     * A list of allowed description types for the patent subtype
     *
     * Get a list of allowed description types on the patent subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPatentDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedPatentDescriptionTypes, config)
    }

    /**
     * A list of peer review configurations
     *
     * Get a list of peer review configurations that describe the allowed combinations of values for the interrelated fields: type, category, peerReview, and internationalPeerReview
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPeerReviewConfigurations(
        config?: AxiosRequestConfig
    ): Promise<ResearchOutputPeerReviewConfigurationListResult> {
        return invokeOperation<ResearchOutputPeerReviewConfigurationListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedPeerReviewConfigurations,
            {
                config
            }
        )
    }

    /**
     * A list of allowed publication statuses
     *
     * Get a list of allowed publication statuses on research output
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPublicationStatuses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedPublicationStatuses, config)
    }

    /**
     * A list of allowed qualifications
     *
     * Get a list of allowed qualifications for the thesis subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedQualifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedQualifications, config)
    }

    /**
     * A list of allowed supervisor roles
     *
     * Get a list of allowed supervisors roles for the thesis subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedSupervisorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedSupervisorRoles, config)
    }

    /**
     * A list of allowed research output templates
     *
     * Get a list of allowed templates that can be used for research outputs, such as 'ContributionToJournal' or 'BookAnthology'. Some of the templates that exists in the API specification may be disabled for the Pure installation.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTemplates(config?: AxiosRequestConfig): Promise<AllowedTemplateListResult> {
        return invokeOperation<AllowedTemplateListResult>(this.client, this.basePath, this.operations.getAllowedTemplates, {
            config
        })
    }

    /**
     * A list of allowed contributor roles for the thesis subtype
     *
     * Get a list of allowed roles for contributors on the thesis subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedThesisContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedThesisContributorRoles, config)
    }

    /**
     * A list of allowed description types for the thesis subtype
     *
     * Get a list of allowed description types on the thesis subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedThesisDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedThesisDescriptionTypes, config)
    }

    /**
     * A list of allowed research output types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedTypes, config)
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return invokeOperation<WorkflowListResult>(this.client, this.basePath, this.operations.getAllowedWorkflowSteps, {
            config
        })
    }

    /**
     * A list of allowed contributor roles for the working paper subtype
     *
     * Get a list of allowed roles for contributors on the working paper subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkingPaperContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedWorkingPaperContributorRoles, config)
    }

    /**
     * A list of allowed description types for the working paper subtype
     *
     * Get a list of allowed description types on the working paper subtype of research outputs
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkingPaperDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedWorkingPaperDescriptionTypes, config)
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the research output endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }

    /**
     * Get file from the research output
     *
     * Get file from the research output
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the research output
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: ResearchOutputFilePathParams['uuid'],
        fileId: ResearchOutputFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific research output
     *
     * Uploads file for the research output
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
}
