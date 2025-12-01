import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, personsServiceConfig } from './service-config'

export type Person = components['schemas']['Person']
export type PersonListResult = components['schemas']['PersonListResult']
export type PersonsQuery = components['schemas']['PersonsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type MetricCollectionDefinitionList = components['schemas']['MetricCollectionDefinitionList']
export type MetricCollection = components['schemas']['MetricCollection']
export type PersonSuperviseeAssociationListResult = components['schemas']['PersonSuperviseeAssociationListResult']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type HighlightedContent = components['schemas']['HighlightedContent']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']

export type PersonListParams = NonNullable<operations['person_list']['parameters']['query']>
export type PersonDependentsParams = NonNullable<operations['person_dependents']['parameters']['query']>
export type PersonNotesParams = NonNullable<operations['person_listNotes']['parameters']['query']>
export type PersonAllowedDisciplineParams = NonNullable<operations['person_getAllowedDisciplines']['parameters']['query']>
export type PersonMetricsPathParams = operations['person_listMetricsFromCollection']['parameters']['path']
type PersonPathParams = operations['person_get']['parameters']['path']
type PersonCustomFieldPathParams = operations['person_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type PersonKeywordGroupPathParams = operations['person_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type PersonAllowedDisciplinesPathParams = operations['person_getAllowedDisciplines']['parameters']['path']
type PersonFilePathParams = operations['person_getFile']['parameters']['path']

export interface PersonsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PersonsService {
    private readonly basePath: string
    private readonly operations = personsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PersonsServiceOptions = {}) {
        this.basePath = options.basePath ?? personsServiceConfig.basePath
    }

    /**
     * Lists all persons
     *
     * Lists all persons in the Pure instance. If you need to filter the persons returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned persons per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /persons/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: PersonListParams, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return invokeOperation<PersonListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for persons
     *
     * Lists persons in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: PersonsQuery, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return invokeOperation<PersonListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get person
     *
     * Get person with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired person
     * @param config Axios request configuration overrides.
     */
    async get(uuid: PersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create person
     *
     * Create person
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update person
     *
     * Update person with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: PersonPathParams['uuid'], payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete person
     *
     * Delete person with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: PersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: PersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: PersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to the person
     *
     * Lists all dependents to the person with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. Use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: PersonPathParams['uuid'],
        params?: PersonDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the person
     *
     * Get disciplines from the discipline scheme associated with the person with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired person
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: PersonPathParams['uuid'],
        disciplineScheme: PersonAllowedDisciplinesPathParams['discipline-scheme'],
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
     * Update disciplines from the discipline scheme associated with the person
     *
     * Update disciplines from the discipline scheme associated with the person with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: PersonPathParams['uuid'],
        disciplineScheme: PersonAllowedDisciplinesPathParams['discipline-scheme'],
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
     * Query operation for disciplines associated with persons
     *
     * Lists disciplines from the discipline scheme associated with persons in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: PersonAllowedDisciplinesPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for persons
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for persons
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: PersonAllowedDisciplinesPathParams['discipline-scheme'],
        params?: PersonAllowedDisciplineParams,
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
     * Get a list fo a allowed discipline schemes for persons
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
     * Lists available orderings
     *
     * Lists all orderings available to the person endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with an person ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: PersonPathParams['uuid'],
        params?: PersonNotesParams,
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
     * Create note and associate it with a person
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: PersonPathParams['uuid'], note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * Get highlighted content
     *
     * Get highlighted content for the person with the specific UUID. Highlights are only available for editorial types
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the owner (person) of the highlighted content
     * @param config Axios request configuration overrides.
     */
    async getHighlightedContent(uuid: PersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<HighlightedContent> {
        return invokeOperation<HighlightedContent>(
            this.client,
            this.basePath,
            this.operations.getHighlightedContent,
            {
                pathParams: { uuid },
                config
            }
        )
    }

    /**
     * Update highlighted content
     *
     * Update highlighted content references. Add an empty array of references for a content type to not highlight any items of this type. Types that are not present will be ignored. Highlights can only be updated for editorial types
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to update highlighted content for
     * @param payload Required request body. The highlighted content references to set on the person
     * @param config Axios request configuration overrides.
     */
    async updateHighlightedContent(
        uuid: PersonPathParams['uuid'],
        payload: HighlightedContent,
        config?: AxiosRequestConfig
    ): Promise<HighlightedContent> {
        return invokeOperation<HighlightedContent>(
            this.client,
            this.basePath,
            this.operations.updateHighlightedContent,
            {
                pathParams: { uuid },
                body: payload,
                config
            }
        )
    }

    /**
     * Lists metrics with collection id
     *
     * Lists metrics from a specific metrics collection that associated with a person.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person to get metrics for
     * @param collectionId Path parameter "collection-id" (string, pattern .+). ID of the metrics collection to get metrics for
     * @param config Axios request configuration overrides.
     */
    async listMetricsFromCollection(
        uuid: PersonPathParams['uuid'],
        collectionId: PersonMetricsPathParams['collection-id'],
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
     * person supervisees
     *
     * Find supervisees of a person by their specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person
     * @param config Axios request configuration overrides.
     */
    async listSupervisees(
        uuid: PersonPathParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<PersonSuperviseeAssociationListResult> {
        return invokeOperation<PersonSuperviseeAssociationListResult>(
            this.client,
            this.basePath,
            this.operations.listSupervisees,
            {
                pathParams: { uuid },
                config
            }
        )
    }

    /**
     * A list of allowed academic qualification types for persons
     *
     * Get a list of allowed academic qualification types for persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicQualificationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationTypes,
            { config }
        )
    }

    /**
     * A list of the allowed values for education distinction
     *
     * Get a list of classifications that can be used for the 'academicQualifications.distinction' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicQualificationsDistinctions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationsDistinctions,
            { config }
        )
    }

    /**
     * A list of the allowed values for field of study
     *
     * Get a list of classifications that can be used for the 'academicQualifications.fieldOfStudy' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicQualificationsFieldOfStudies(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationsFieldOfStudies,
            { config }
        )
    }

    /**
     * A list of allowed address countries
     *
     * Get a list of allowed countries that can be used for the 'addresses.country' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressCountries,
            { config }
        )
    }

    /**
     * A list of allowed subdivisions
     *
     * Get a list of allowed subdivisions can be used for the 'subdivision' attribute of person organization associations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressSubdivisions,
            { config }
        )
    }

    /**
     * A list of allowed address types
     *
     * Get a list of allowed address types that can be used for the 'addresses.type' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressTypes,
            { config }
        )
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of persons
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
     * Get allowed classifications for the custom-defined field associated with the person
     *
     * Get allowed classifications for the custom-defined field associated with the person.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: PersonCustomFieldPathParams['propertyName'],
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
     * Get a list of allowed licenses for documents on persons
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
     * Get a list of allowed types for documents on persons
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
     * A list of the allowed values for appointments
     *
     * Get a list of classifications that can be used for the 'externalPositions.appointment' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedExternalPositionsAppointments(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedExternalPositionsAppointments,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the gender property
     *
     * Get a list of classifications that can be used when submitting the person gender property.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedGenders(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedGenders,
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
        id: PersonKeywordGroupPathParams['id'],
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
     * A list of allowed classifications for the leave of absence property
     *
     * Get a list of classifications that can be used when submitting the leaveOfAbsence property.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLeavesOfAbsenceClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLeavesOfAbsenceClassifications,
            { config }
        )
    }

    /**
     * A list of allowed link types
     *
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of persons
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
     * A list of allowed main research areas
     *
     * Get a list of allowed main research areas associated with the person
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMainResearchAreas(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMainResearchAreas,
            { config }
        )
    }

    /**
     * A list of allowed metric collections
     *
     * Get a list of metric collections allowed on persons
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
     * A list of allowed classifications for classified names
     *
     * Get a list of allowed classifications that can be used when submitting a classified name.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNamesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNamesTypes,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the nationalities property
     *
     * Get a list of classifications that can be used when submitting the nationality property.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNationalities(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNationalities,
            { config }
        )
    }

    /**
     * A list of allowed email types
     *
     * Get a list of allowed email types for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsEmailTypes,
            { config }
        )
    }

    /**
     * A list of allowed employment types
     *
     * Get a list of allowed employment types for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsEmploymentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsEmploymentTypes,
            { config }
        )
    }

    /**
     * A list of allowed job titles
     *
     * Get a list of allowed job titles for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsJobTitles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsJobTitles,
            { config }
        )
    }

    /**
     * A list of allowed phone number types
     *
     * Get a list of allowed phone numbers types for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsPhoneNumberTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsPhoneNumberTypes,
            { config }
        )
    }

    /**
     * A list of allowed supervisor roles
     *
     * Get a list of allowed supervisor roles for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsSupervisorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsSupervisorRoles,
            { config }
        )
    }

    /**
     * A list of allowed web address types
     *
     * Get a list of allowed web address types for person organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPersonOrganizationAssociationsWebAddressTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsWebAddressTypes,
            { config }
        )
    }

    /**
     * A list of allowed country classifications for private address
     *
     * Get a list of allowed country classifications for private address on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPrivateAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPrivateAddressCountries,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the profile information property
     *
     * Get a list of classifications that can be used when submitting an entry in profile information.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedProfileInformationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedProfileInformationTypes,
            { config }
        )
    }

    /**
     * A list of allowed photo types
     *
     * Get a list of allowed photo types that can be used for the 'profilePhotos.type' attribute of persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedProfilePhotoTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedProfilePhotoTypes,
            { config }
        )
    }

    /**
     * A list of allowed contract types
     *
     * Get a list of allowed contract types for staff organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStaffOrganizationAssociationsContractTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStaffOrganizationAssociationsContractTypes,
            { config }
        )
    }

    /**
     * A list of allowed staff types
     *
     * Get a list of allowed staff types for staff organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStaffOrganizationAssociationsStaffTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStaffOrganizationAssociationsStaffTypes,
            { config }
        )
    }

    /**
     * A list of allowed student attendance status types
     *
     * Get a list of allowed student attendance status types for student organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStudentOrganizationAssociationsAttendanceStatus(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentOrganizationAssociationsAttendanceStatus,
            { config }
        )
    }

    /**
     * A list of allowed employment types
     *
     * Get a list of allowed employment types for student organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStudentAssociationsEmploymentTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentAssociationsEmploymentTypes,
            { config }
        )
    }

    /**
     * A list of allowed student country of domicile types
     *
     * Get a list of allowed student country of domicile types for student organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles,
            { config }
        )
    }

    /**
     * A list of allowed student nationality types
     *
     * Get a list of allowed student nationality types for student organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStudentOrganizationAssociationsGetStudentNationalities(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentOrganizationAssociationsGetStudentNationalities,
            { config }
        )
    }

    /**
     * A list of allowed student type description types
     *
     * Get a list of allowed student type description types for student organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStudentOrganizationAssociationsStudentTypeDescriptions(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentOrganizationAssociationsStudentTypeDescriptions,
            { config }
        )
    }

    /**
     * A list of allowed classifications for the titles property
     *
     * Get a list of classifications that can be used when submitting a title.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTitlesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTitlesTypes,
            { config }
        )
    }

    /**
     * A list of allowed employment types
     *
     * Get a list of allowed employment types for visiting scholar organization associations on persons
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedVisitingScholarAssociationsEmploymentTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedVisitingScholarAssociationsEmploymentTypes,
            { config }
        )
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of persons
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
     * Get file from the person
     *
     * Get file from the person
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the person
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: PersonFilePathParams['uuid'],
        fileId: PersonFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific person
     *
     * Uploads file for the person
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
