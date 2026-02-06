import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { applicationsServiceConfig, invokeOperation } from './service-config'

export type Application = components['schemas']['Application']
export type ApplicationListResult = components['schemas']['ApplicationListResult']
export type ApplicationsQuery = components['schemas']['ApplicationsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type AllowedTemplateListResult = components['schemas']['AllowedTemplateListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type ApplicationBudget = components['schemas']['ApplicationBudget']
export type ApplicationBudgetResult = components['schemas']['ApplicationBudgetResult']
export type ApplicationCluster = components['schemas']['ApplicationCluster']
export type UploadedFile = components['schemas']['UploadedFile']
export type WorkflowListResult = components['schemas']['WorkflowListResult']

export type ApplicationListParams = NonNullable<operations['application_list']['parameters']['query']>
export type ApplicationDependentsParams = NonNullable<operations['application_dependents']['parameters']['query']>
export type ApplicationNotesParams = NonNullable<operations['application_listNotes']['parameters']['query']>
export type ApplicationAllowedDisciplinesParams = NonNullable<operations['application_getAllowedDisciplines']['parameters']['query']>

type ApplicationPathParams = operations['application_get']['parameters']['path']
type ApplicationNotesPathParams = operations['application_listNotes']['parameters']['path']
type ApplicationCustomFieldPathParams = operations['application_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type ApplicationKeywordGroupPathParams = operations['application_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type ApplicationAllowedDisciplinesPathParams = operations['application_getAllowedDisciplines']['parameters']['path']
type ApplicationFilePathParams = operations['application_getFile']['parameters']['path']

export interface ApplicationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ApplicationsService {
    private readonly basePath: string
    private readonly operations = applicationsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ApplicationsServiceOptions = {}) {
        this.basePath = options.basePath ?? applicationsServiceConfig.basePath
    }

    /**
     * Lists all applications
     *
     * Lists all applications in the Pure instance. If you need to filter the applications returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned applications per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from application_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: ApplicationListParams, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return invokeOperation<ApplicationListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for applications
     *
     * Lists applications in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: ApplicationsQuery, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return invokeOperation<ApplicationListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get application
     *
     * Get application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired application
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create application
     *
     * Create application
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update application
     *
     * Update application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: ApplicationPathParams['uuid'], payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete application
     *
     * Delete application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get the budgets for the application
     *
     * Get the budgets for the application with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param config Axios request configuration overrides.
     */
    async getBudgets(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<ApplicationBudgetResult> {
        return invokeOperation<ApplicationBudgetResult>(this.client, this.basePath, this.operations.getBudgets, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get a specific budget for the application
     *
     * Get a specific budget for the application with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param id Path parameter "id" (integer (int64)). ID of the budget
     * @param config Axios request configuration overrides.
     */
    async getBudget(uuid: ApplicationPathParams['uuid'], id: number, config?: AxiosRequestConfig): Promise<ApplicationBudget> {
        return invokeOperation<ApplicationBudget>(this.client, this.basePath, this.operations.getBudget, {
            pathParams: { uuid, id },
            config
        })
    }

    /**
     * Update budget for an application
     *
     * Update budget for an application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application with the budget
     * @param id Path parameter "id" (integer (int64)). ID of the budget to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async updateBudget(
        uuid: ApplicationPathParams['uuid'],
        id: number,
        payload: ApplicationBudget,
        config?: AxiosRequestConfig
    ): Promise<ApplicationBudget> {
        return invokeOperation<ApplicationBudget>(this.client, this.basePath, this.operations.updateBudget, {
            pathParams: { uuid, id },
            body: payload,
            config
        })
    }

    /**
     * Get the application cluster for the application
     *
     * Get the application cluster for the application with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param config Axios request configuration overrides.
     */
    async getCluster(uuid: ApplicationPathParams['uuid'], config?: AxiosRequestConfig): Promise<ApplicationCluster> {
        return invokeOperation<ApplicationCluster>(this.client, this.basePath, this.operations.getCluster, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to an application
     *
     * Lists all dependents to an application with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. Use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: ApplicationPathParams['uuid'],
        params?: ApplicationDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the application
     *
     * Get disciplines from the discipline scheme associated with the application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired application
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: ApplicationPathParams['uuid'],
        disciplineScheme: ApplicationAllowedDisciplinesPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    /**
     * Update disciplines from the discipline scheme associated with the application
     *
     * Update disciplines from the discipline scheme associated with the application with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: ApplicationPathParams['uuid'],
        disciplineScheme: ApplicationAllowedDisciplinesPathParams['discipline-scheme'],
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
     * A list of allowed applicant roles
     *
     * Get a list of allowed applicant roles on applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedApplicantRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedApplicantRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed account classifications
     *
     * Get a list of allowed account classifications for application budgets
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedBudgetAccountClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedBudgetAccountClassifications,
            {
                config
            }
        )
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of applications
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
     * A list of allowed collaborators types
     *
     * Get a list of allowed collaborator types on applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCollaboratorTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCollaboratorTypes,
            {
                config
            }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the application
     *
     * Get allowed classifications for the custom-defined field associated with the application.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: ApplicationCustomFieldPathParams['propertyName'],
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
     * Get a list of allowed description types on applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDescriptionTypes,
            {
                config
            }
        )
    }

    /**
     * A list of allowed disciplines for a specific discipline scheme
     *
     * Get a list of a allowed disciplines for specific discipline scheme for applications
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for application
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: ApplicationAllowedDisciplinesPathParams['discipline-scheme'],
        params?: ApplicationAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for applications
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
     * A list of allowed document licenses
     *
     * Get a list of allowed document licenses for applications
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
     * Get a list of allowed document types on applications
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
     * A list of allowed document version types
     *
     * Get a list of allowed document version types for applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentVersionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentVersionTypes,
            {
                config
            }
        )
    }

    /**
     * A list of allowed fundings classifications
     *
     * Get a list of allowed funding classifications for fundings on applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedFundingClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedFundingClassifications,
            {
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
     * A list of allowed classifications for the specified keyword group
     *
     * Get a list of allowed classifications that can be used when submitting a specified keyword group.
     *
     * @param id Path parameter "id" (integer (int64)). Pure id of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurationClassifications(
        id: ApplicationKeywordGroupPathParams['id'],
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
     * Get a list of allowed link types for applications
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
     * A list of allowed nature types
     *
     * Get a list of allowed nature types for applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
            {
                config
            }
        )
    }

    /**
     * A list of allowed application statuses
     *
     * Get a list of allowed application statuses that can be used for the 'applicationStatuses.status' attribute of applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedStatuses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedStatuses, {
            config
        })
    }

    /**
     * A list of allowed application templates
     *
     * Get a list of allowed templates that can be used for applications. Some of the templates that exists in the API specification may be disabled for the Pure installation.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTemplates(config?: AxiosRequestConfig): Promise<AllowedTemplateListResult> {
        return invokeOperation<AllowedTemplateListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedTemplates,
            {
                config
            }
        )
    }

    /**
     * A list of allowed application types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of applications
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
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return invokeOperation<WorkflowListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedWorkflowSteps,
            {
                config
            }
        )
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the application endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }

    /**
     * Get file from the application
     *
     * Get file from the application
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: ApplicationFilePathParams['uuid'],
        fileId: ApplicationFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific application
     *
     * Uploads file for the application
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
     * Lists notes associated with an application ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: ApplicationNotesPathParams['uuid'],
        params?: ApplicationNotesParams,
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
     * Create note and associate it with the application
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the application to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: ApplicationNotesPathParams['uuid'],
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
