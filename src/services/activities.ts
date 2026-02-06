import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { activitiesServiceConfig, invokeOperation } from './service-config'

export type Activity = components['schemas']['Activity']
export type ActivityListResult = components['schemas']['ActivityListResult']
export type ActivitiesQuery = components['schemas']['ActivitiesQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']
export type WorkflowListResult = components['schemas']['WorkflowListResult']

export type ActivityListParams = NonNullable<operations['activity_list']['parameters']['query']>
export type ActivityNotesParams = NonNullable<operations['activity_listNotes']['parameters']['query']>
export type ActivityAllowedDisciplinesParams = NonNullable<operations['activity_getAllowedDisciplines']['parameters']['query']>

type ActivityPathParams = operations['activity_get']['parameters']['path']
type ActivityNotesPathParams = operations['activity_listNotes']['parameters']['path']
type ActivityCustomFieldPathParams = operations['activity_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type ActivityKeywordGroupPathParams = operations['activity_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type ActivityAllowedDisciplinesPathParams = operations['activity_getAllowedDisciplines']['parameters']['path']
type ActivityFilePathParams = operations['activity_getFile']['parameters']['path']

export interface ActivitiesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ActivitiesService {
    private readonly basePath: string
    private readonly operations = activitiesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ActivitiesServiceOptions = {}) {
        this.basePath = options.basePath ?? activitiesServiceConfig.basePath
    }

    /**
     * Lists all activities
     *
     * Lists all activities in the Pure instance. If you need to filter the activities returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned activities per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /activities/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: ActivityListParams, config?: AxiosRequestConfig): Promise<ActivityListResult> {
        return invokeOperation<ActivityListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for activities
     *
     * Lists activities in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: ActivitiesQuery, config?: AxiosRequestConfig): Promise<ActivityListResult> {
        return invokeOperation<ActivityListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get activity
     *
     * Get activity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired activity
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ActivityPathParams['uuid'], config?: AxiosRequestConfig): Promise<Activity> {
        return invokeOperation<Activity>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create activity
     *
     * Create activity
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Activity, config?: AxiosRequestConfig): Promise<Activity> {
        return invokeOperation<Activity>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update an activity
     *
     * Update an activity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: string, payload: Activity, config?: AxiosRequestConfig): Promise<Activity> {
        return invokeOperation<Activity>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete activity
     *
     * Delete activity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ActivityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: ActivityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: ActivityPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get file from the activity
     *
     * Get file from the activity
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: ActivityFilePathParams['uuid'],
        fileId: ActivityFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific activity
     *
     * Uploads file for the activity
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
     * A list of allowed attendance activity person roles
     *
     * Get a list of allowed roles for persons on attendance activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAttendancePersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAttendancePersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed categories
     *
     * Get a list of allowed categories for activities
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
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of activities
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
     * A list of allowed  consultancy activity person roles
     *
     * Get a list of allowed roles for persons on consultancy activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedConsultancyPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedConsultancyPersonRoles,
            {
                config
            }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the activity
     *
     * Get allowed classifications for the custom-defined field associated with the activity.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: ActivityCustomFieldPathParams['propertyName'],
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
     * A list of allowed degree of recognitions
     *
     * Get a list of allowed degree of recognitions on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDegreeOfRecognitions,
            {
                config
            }
        )
    }

    /**
     * A list of allowed description types
     *
     * Get a list of allowed types for descriptions on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedDescriptionTypes, {
            config
        })
    }

    /**
     * A list of allowed disciplines for a specific discipline scheme
     *
     * Get a list of a allowed disciplines for specific discipline scheme for activities
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for activities
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: ActivityAllowedDisciplinesPathParams['discipline-scheme'],
        params?: ActivityAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for activities
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
     * A list of allowed document licenses
     *
     * Get a list of allowed license types for documents on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentLicenses,
            {
                config
            }
        )
    }

    /**
     * A list of allowed document types
     *
     * Get a list of allowed types for documents on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentTypes,
            {
                config
            }
        )
    }

    /**
     * A list of allowed editorial-work activity person roles
     *
     * Get a list of allowed roles for persons on editorial-work activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedEditorialWorkPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedEditorialWorkPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed examination activity person roles
     *
     * Get a list of allowed roles for persons on examination activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedExaminationPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedExaminationPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed host visitor countries
     *
     * Get a list of allowed countries host visitor activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedHostVisitorCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedHostVisitorCountries,
            {
                config
            }
        )
    }

    /**
     * A list of allowed host-visitor activity person roles
     *
     * Get a list of allowed roles for persons on host visitor activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedHostVisitorPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedHostVisitorPersonRoles,
            {
                config
            }
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
            {
                config
            }
        )
    }

    /**
     * A list of allowed activity indicators
     *
     * Get a list of allowed indicators on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedIndicators(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedIndicators,
            {
                config
            }
        )
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the activities endpoint. These values can be used by the order parameter when listing activities.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
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
        id: ActivityKeywordGroupPathParams['id'],
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
     * Get a list of allowed link types on activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLinkTypes,
            {
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
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, {
            config
        })
    }

    /**
     * A list of allowed membership activity person roles
     *
     * Get a list of allowed roles for persons on membership activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMembershipPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMembershipPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed other activity person roles
     *
     * Get a list of allowed roles for persons on other activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedOtherActivityPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedOtherActivityPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed talk activity person roles
     *
     * Get a list of allowed roles for persons on talk activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTalkPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTalkPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed activity types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    /**
     * A list of allowed visit-other activity person roles
     *
     * Get a list of allowed roles for persons on visit-other activities
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedVisitOtherPersonRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedVisitOtherPersonRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed workflow steps in localized strings
     *
     * Get a list of allowed workflow steps.
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
     * Get disciplines from the discipline scheme associated with the activity
     *
     * Get disciplines from the discipline scheme associated with the activity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired activity
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: ActivityPathParams['uuid'],
        disciplineScheme: ActivityAllowedDisciplinesPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    /**
     * Update disciplines from the discipline scheme associated with the activity
     *
     * Update disciplines from the discipline scheme associated with the activity with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity to update
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
     * Lists notes
     *
     * Lists notes associated with an activity ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: ActivityNotesPathParams['uuid'],
        params?: ActivityNotesParams,
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
     * Create note and associate it with an activity
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the activity to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: ActivityNotesPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }
}
