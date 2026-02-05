import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { awardsServiceConfig, invokeOperation } from './service-config'

export type Award = components['schemas']['Award']
export type AwardListResult = components['schemas']['AwardListResult']
export type AwardsQuery = components['schemas']['AwardsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type AllowedTemplateListResult = components['schemas']['AllowedTemplateListResult']
export type LocalesList = components['schemas']['LocalesList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type AwardBudget = components['schemas']['AwardBudget']
export type AwardBudgetResult = components['schemas']['AwardBudgetResult']
export type AwardCluster = components['schemas']['AwardCluster']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type MilestoneListResult = components['schemas']['MilestoneListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type AwardNotesParams = NonNullable<operations['award_listNotes']['parameters']['query']>
export type AwardAllowedDisciplinesParams = NonNullable<operations['award_getAllowedDisciplines']['parameters']['query']>

export type AwardListParams = NonNullable<operations['award_list']['parameters']['query']>
export type AwardDependentsParams = NonNullable<operations['award_dependents']['parameters']['query']>

type AwardPathParams = operations['award_get']['parameters']['path']
type AwardDisciplinePathParams = operations['award_getAllowedDisciplines']['parameters']['path']
type AwardKeywordGroupPathParams = operations['award_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type AwardCustomFieldPathParams = operations['award_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type AwardFilePathParams = operations['award_getFile']['parameters']['path']

export interface AwardsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class AwardsService {
    private readonly basePath: string
    private readonly operations = awardsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: AwardsServiceOptions = {}) {
        this.basePath = options.basePath ?? awardsServiceConfig.basePath
    }

    /**
     * Lists all awards
     *
     * Lists all awards in the Pure instance. If you need to filter the awards returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned awards per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from award_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: AwardListParams, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return invokeOperation<AwardListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for awards
     *
     * Lists awards in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: AwardsQuery, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return invokeOperation<AwardListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get award
     *
     * Get award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired award
     * @param config Axios request configuration overrides.
     */
    async get(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create award
     *
     * Create award
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update award
     *
     * Update award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: AwardPathParams['uuid'], payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete award
     *
     * Delete award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get the budgets for the award
     *
     * Get the budgets for the award with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param config Axios request configuration overrides.
     */
    async getBudgets(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<AwardBudgetResult> {
        return invokeOperation<AwardBudgetResult>(this.client, this.basePath, this.operations.getBudgets, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get a specific budget for the award
     *
     * Get a specific budget for the award with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param id Path parameter "id" (integer (int64)). ID of the budget
     * @param config Axios request configuration overrides.
     */
    async getBudget(uuid: AwardPathParams['uuid'], id: number, config?: AxiosRequestConfig): Promise<AwardBudget> {
        return invokeOperation<AwardBudget>(this.client, this.basePath, this.operations.getBudget, {
            pathParams: { uuid, id },
            config
        })
    }

    /**
     * Update budget for an award
     *
     * Update budget for an award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award with the budget
     * @param id Path parameter "id" (integer (int64)). ID of the budget to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async updateBudget(
        uuid: AwardPathParams['uuid'],
        id: number,
        payload: AwardBudget,
        config?: AxiosRequestConfig
    ): Promise<AwardBudget> {
        return invokeOperation<AwardBudget>(this.client, this.basePath, this.operations.updateBudget, {
            pathParams: { uuid, id },
            body: payload,
            config
        })
    }

    /**
     * Get the award cluster for the award
     *
     * Get the award cluster for the award with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param config Axios request configuration overrides.
     */
    async getCluster(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<AwardCluster> {
        return invokeOperation<AwardCluster>(this.client, this.basePath, this.operations.getCluster, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Get milestones for the award
     *
     * Get milestones for the award with the specified UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param config Axios request configuration overrides.
     */
    async getMilestones(uuid: AwardPathParams['uuid'], config?: AxiosRequestConfig): Promise<MilestoneListResult> {
        return invokeOperation<MilestoneListResult>(this.client, this.basePath, this.operations.getMilestones, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to an award
     *
     * Lists all dependents to an award with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. Use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: AwardPathParams['uuid'],
        params?: AwardDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the award
     *
     * Get disciplines from the discipline scheme associated with the award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired award
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: AwardPathParams['uuid'],
        disciplineScheme: AwardDisciplinePathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    /**
     * Update disciplines from the discipline scheme associated with the award
     *
     * Update disciplines from the discipline scheme associated with the award with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: AwardPathParams['uuid'],
        disciplineScheme: AwardDisciplinePathParams['discipline-scheme'],
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
     * Lists notes associated with an award ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(uuid: AwardPathParams['uuid'], params?: AwardNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Create note
     *
     * Create note and associate it with the award
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: AwardPathParams['uuid'], note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * A list of allowed award holder roles
     *
     * Get a list of allowed roles for award holders on awards
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAwardholderRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAwardholderRoles,
            {
                config
            }
        )
    }

    /**
     * A list of allowed account classifications
     *
     * Get a list of allowed account classifications for award budgets
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
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of awards
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
     * Get a list of allowed types for collaborators on awards
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
     * Get allowed classifications for the custom-defined field associated with the award
     *
     * Get allowed classifications for the custom-defined field associated with the award.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: AwardCustomFieldPathParams['propertyName'],
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
     * Get a list of allowed types for descriptions on awards
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
     * Get a list of a allowed disciplines for specific discipline scheme for awards
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for award
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: AwardDisciplinePathParams['discipline-scheme'],
        params?: AwardAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for awards
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
     * Get a list of allowed document licenses for awards
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
     * Get a list of allowed types for documents on awards
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
     * Get a list of allowed version types for documents on awards
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
     * A list of allowed funding classifications
     *
     * Get a list of allowed funding classifications for fundings on awards
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
     * A list of allowed classifications for the specified keyword group
     *
     * Get a list of allowed classifications that can be used when submitting a specified keyword group.
     *
     * @param id Path parameter "id" (integer (int64)). Pure id of the keyword group configuration
     * @param config Axios request configuration overrides.
     */
    async getAllowedKeywordGroupConfigurationClassifications(
        id: AwardKeywordGroupPathParams['id'],
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
     * A list of allowed link types
     *
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of awards
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
     * Get a list of allowed nature types for awards
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
     * A list of allowed award types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of awards
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    /**
     * A list of allowed award templates
     *
     * Get a list of allowed templates that can be used for awards. Some of the templates that exists in the API specification may be disabled for the Pure installation.
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
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of awards
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
     * Lists all orderings available to the award endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }

    /**
     * Get file from the award
     *
     * Get file from the award
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the award
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: AwardFilePathParams['uuid'],
        fileId: AwardFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific award
     *
     * Uploads file for the award
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
