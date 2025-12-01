import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, projectsServiceConfig } from './service-config'

export type Project = components['schemas']['Project']
export type ProjectListResult = components['schemas']['ProjectListResult']
export type ProjectsQuery = components['schemas']['ProjectsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type AllowedTemplateListResult = components['schemas']['AllowedTemplateListResult']
export type ApplicationClusterListResult = components['schemas']['ApplicationClusterListResult']
export type AwardClusterListResult = components['schemas']['AwardClusterListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type ProjectListParams = NonNullable<operations['project_list']['parameters']['query']>
export type ProjectDependentsParams = NonNullable<operations['project_dependents']['parameters']['query']>
export type ProjectNotesParams = NonNullable<operations['project_listNotes']['parameters']['query']>
export type ProjectAllowedDisciplinesParams = NonNullable<operations['project_getAllowedDisciplines']['parameters']['query']>
type ProjectPathParams = operations['project_get']['parameters']['path']
type ProjectAllowedDisciplinesPathParams = operations['project_getAllowedDisciplines']['parameters']['path']
type ProjectCustomFieldPathParams = operations['project_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type ProjectKeywordGroupPathParams = operations['project_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type ProjectFilePathParams = operations['project_getFile']['parameters']['path']

export interface ProjectsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ProjectsService {
    private readonly basePath: string
    private readonly operations = projectsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ProjectsServiceOptions = {}) {
        this.basePath = options.basePath ?? projectsServiceConfig.basePath
    }

    /**
     * Lists all projects
     *
     * Lists all projects in the Pure instance. If you need to filter the projects returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned projects per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from project_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: ProjectListParams, config?: AxiosRequestConfig): Promise<ProjectListResult> {
        return invokeOperation<ProjectListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for projects
     *
     * Lists projects in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: ProjectsQuery, config?: AxiosRequestConfig): Promise<ProjectListResult> {
        return invokeOperation<ProjectListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get project
     *
     * Get project with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired project
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ProjectPathParams['uuid'], config?: AxiosRequestConfig): Promise<Project> {
        return invokeOperation<Project>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create project
     *
     * Create project
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Project, config?: AxiosRequestConfig): Promise<Project> {
        return invokeOperation<Project>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update project
     *
     * Update project with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: ProjectPathParams['uuid'], payload: Project, config?: AxiosRequestConfig): Promise<Project> {
        return invokeOperation<Project>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete project
     *
     * Delete project with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ProjectPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: ProjectPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: ProjectPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get the application clusters for the project
     *
     * Get the application clusters for the project with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project
     * @param config Axios request configuration overrides.
     */
    async getApplicationClusters(
        uuid: ProjectPathParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<ApplicationClusterListResult> {
        return invokeOperation<ApplicationClusterListResult>(
            this.client,
            this.basePath,
            this.operations.getApplicationClusters,
            {
                pathParams: { uuid },
                config
            }
        )
    }

    /**
     * Get the award clusters for the project
     *
     * Get the award clusters for the project with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project
     * @param config Axios request configuration overrides.
     */
    async getAwardClusters(uuid: ProjectPathParams['uuid'], config?: AxiosRequestConfig): Promise<AwardClusterListResult> {
        return invokeOperation<AwardClusterListResult>(this.client, this.basePath, this.operations.getAwardClusters, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to an project
     *
     * Lists all dependents to an project with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. Use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: ProjectPathParams['uuid'],
        params?: ProjectDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the project
     *
     * Get disciplines from the discipline scheme associated with the project with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired project
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: ProjectPathParams['uuid'],
        disciplineScheme: ProjectAllowedDisciplinesPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    /**
     * Update disciplines from the discipline scheme associated with the project
     *
     * Update disciplines from the discipline scheme associated with the project with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: ProjectPathParams['uuid'],
        disciplineScheme: ProjectAllowedDisciplinesPathParams['discipline-scheme'],
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
     * Query operation for disciplines associated with projects
     *
     * Lists disciplines from the discipline scheme associated with projects in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: ProjectAllowedDisciplinesPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for projects
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for project
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: ProjectAllowedDisciplinesPathParams['discipline-scheme'],
        params?: ProjectAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for projects
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
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of projects
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
     * A list of allowed collaborator types
     *
     * Get a list of allowed types for collaborators on projects
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
     * Get allowed classifications for the custom-defined field associated with the project
     *
     * Get allowed classifications for the custom-defined field associated with the project.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: ProjectCustomFieldPathParams['propertyName'],
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
     * Get a list of allowed types for descriptions on projects
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
     * A list of allowed document licenses
     *
     * Get a list of allowed document licenses for projects
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
     * Get a list of allowed types for documents on projects
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
     * A list of allowed image types
     *
     * Get a list of allowed image types that can be used for the 'images.type' attribute of projects
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
     * @param id Path parameter "id" (integer (int64)). Pure id of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurationClassifications(
        id: ProjectKeywordGroupPathParams['id'],
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
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of projects
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
     * A list of allowed nature types
     *
     * Get a list of allowed nature types for projects
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
     * A list of allowed participant roles
     *
     * Get a list of allowed roles for participant on projects
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedParticipantRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedParticipantRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed project relation types
     *
     * Get a list of allowed project relation types on projects
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedProjectRelationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedProjectRelationTypes,
            {
                config
            }
        )
    }

    /**
     * A list of allowed project templates
     *
     * Get a list of allowed templates that can be used for projects. Some of the templates that exists in the API specification may be disabled for the Pure installation.
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
     * A list of allowed project types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of projects
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
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of projects
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
     * Lists all orderings available to the project endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with an project ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: ProjectPathParams['uuid'],
        params?: ProjectNotesParams,
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
     * Create note and associate it with the project
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: ProjectPathParams['uuid'], note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * Get file from the project
     *
     * Get file from the project
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the project
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: ProjectFilePathParams['uuid'],
        fileId: ProjectFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific project
     *
     * Uploads file for the project
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
