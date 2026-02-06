import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, studentThesesServiceConfig } from './service-config'

export type StudentThesis = components['schemas']['StudentThesis']
export type StudentThesisListResult = components['schemas']['StudentThesisListResult']
export type StudentThesesQuery = components['schemas']['StudentThesesQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList =
    components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type ContentRefListResult = components['schemas']['ContentRefListResult']

export type StudentThesisListParams = NonNullable<
    operations['studentThesis_list']['parameters']['query']
>
export type StudentThesisDependentsParams = NonNullable<
    operations['studentThesis_dependents']['parameters']['query']
>
export type StudentThesisNotesParams = NonNullable<
    operations['studentThesis_listNotes']['parameters']['query']
>

type StudentThesisPathParams = operations['studentThesis_get']['parameters']['path']
type StudentThesisCustomFieldPathParams =
    operations['studentThesis_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type StudentThesisKeywordGroupPathParams =
    operations['studentThesis_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type StudentThesisFilePathParams = operations['studentThesis_getFile']['parameters']['path']

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export interface StudentThesesServiceOptions {
    basePath?: string
}

export class StudentThesesService {
    private readonly basePath: string
    private readonly operations = studentThesesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: StudentThesesServiceOptions = {}) {
        this.basePath = options.basePath ?? studentThesesServiceConfig.basePath
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
     * Lists all  student theses
     *
     * Lists all  student theses in the Pure instance. If you need to filter the student theses returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned student theses per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /student-theses/orderings
     * @param config Axios request configuration overrides.
     */
    async list(
        params?: StudentThesisListParams,
        config?: AxiosRequestConfig
    ): Promise<StudentThesisListResult> {
        return invokeOperation<StudentThesisListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for student theses
     *
     * Lists student theses in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: StudentThesesQuery, config?: AxiosRequestConfig): Promise<StudentThesisListResult> {
        return invokeOperation<StudentThesisListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get student thesis
     *
     * Get student thesis with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired student thesis
     * @param config Axios request configuration overrides.
     */
    async get(uuid: StudentThesisPathParams['uuid'], config?: AxiosRequestConfig): Promise<StudentThesis> {
        return invokeOperation<StudentThesis>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create student thesis
     *
     * Create student thesis
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: StudentThesis, config?: AxiosRequestConfig): Promise<StudentThesis> {
        return invokeOperation<StudentThesis>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update student thesis
     *
     * Update student thesis with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(
        uuid: StudentThesisPathParams['uuid'],
        payload: StudentThesis,
        config?: AxiosRequestConfig
    ): Promise<StudentThesis> {
        return invokeOperation<StudentThesis>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete student thesis
     *
     * Delete student thesis with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: StudentThesisPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis to lock
     * @param config Axios request configuration overrides.
     */
    async lock(uuid: StudentThesisPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis to unlock
     * @param config Axios request configuration overrides.
     */
    async unlock(uuid: StudentThesisPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to a student thesis
     *
     * Lists all dependents to a student thesis with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: StudentThesisPathParams['uuid'],
        params?: StudentThesisDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with a student thesis ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: StudentThesisPathParams['uuid'],
        params?: StudentThesisNotesParams,
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
     * Create note and associate it with a student thesis
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: StudentThesisPathParams['uuid'], note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * Get file from the student thesis
     *
     * Get file from the student thesis
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the student thesis
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: StudentThesisFilePathParams['uuid'],
        fileId: StudentThesisFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific student thesis
     *
     * Uploads file for the student thesis
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
     * A list of allowed contributor countries for student theses
     *
     * Get a list of allowed countries for contributors of student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributorCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributorCountries, config)
    }

    /**
     * A list of allowed contributor roles for student theses
     *
     * Get a list of allowed roles for contributors of student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedContributorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedContributorRoles, config)
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the student thesis
     *
     * Get allowed classifications for the custom-defined field associated with the student theses.
     *
     * @param fieldIdentifer Path parameter "fieldIdentifer" (string). FieldIdentifer for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        fieldIdentifer: StudentThesisCustomFieldPathParams['fieldIdentifer'],
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
     * A list of allowed document embargo reasons
     *
     * Get a list of allowed document embargo reasons that can be used for student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentEmbargoReasons(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedDocumentEmbargoReasons, config)
    }

    /**
     * A list of allowed document license types
     *
     * Get a list of allowed document license types that can be used for student these
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedDocumentLicenses, config)
    }

    /**
     * A list of allowed document types
     *
     * Get a list of allowed document types that can be used for student these
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedDocumentTypes, config)
    }

    /**
     * A list of allowed document version types
     *
     * Get a list of allowed document version types that can be used for student these
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedDocumentVersionTypes, config)
    }

    /**
     * A list of allowed image types
     *
     * Get a list of allowed image types that can be used for the 'images.type' attribute of student thesis
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedImageTypes, config)
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
     * A list of allowed classifications for the specified keyword group
     *
     * Get a list of allowed classifications that can be used when submitting a specified keyword group.
     *
     * @param id Path parameter "id" (integer (int64)). Pure id of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurationClassifications(
        id: StudentThesisKeywordGroupPathParams['id'],
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
     * A list of allowed languages
     *
     * Get a list of allowed languages on student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLanguages(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedLanguages, config)
    }

    /**
     * A list of allowed link types
     *
     * Get a list of allowed link types on student theses
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
     * A list of allowed supervisor roles
     *
     * Get a list of allowed supervisors roles for student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedSupervisorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedSupervisorRoles, config)
    }

    /**
     * A list of allowed student thesis types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of student theses
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.fetchClassification(this.operations.getAllowedTypes, config)
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of student theses
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
     * Lists all orderings available to the student thesis endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }
}
