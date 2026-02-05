import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { milestonesServiceConfig, invokeOperation } from './service-config'

export type Milestone = components['schemas']['Milestone']
export type MilestoneListResult = components['schemas']['MilestoneListResult']
export type MilestoneQuery = components['schemas']['MilestoneQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type LocalesList = components['schemas']['LocalesList']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type APIStringListResult = components['schemas']['APIStringListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type MilestoneListParams = NonNullable<operations['milestone_list']['parameters']['query']>
export type MilestoneDependentsParams = NonNullable<operations['milestone_dependents']['parameters']['query']>

type MilestonePathParams = operations['milestone_get']['parameters']['path']
type MilestoneFilePathParams = operations['milestone_getFile']['parameters']['path']

export interface MilestonesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class MilestonesService {
    private readonly basePath: string
    private readonly operations = milestonesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: MilestonesServiceOptions = {}) {
        this.basePath = options.basePath ?? milestonesServiceConfig.basePath
    }

    /**
     * Lists all milestones
     *
     * Lists all milestones in the Pure instance. If you need to filter the milestones returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned milestones per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from milestone_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: MilestoneListParams, config?: AxiosRequestConfig): Promise<MilestoneListResult> {
        return invokeOperation<MilestoneListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for milestones
     *
     * Lists milestones in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: MilestoneQuery, config?: AxiosRequestConfig): Promise<MilestoneListResult> {
        return invokeOperation<MilestoneListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get milestone
     *
     * Get milestone with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired milestone
     * @param config Axios request configuration overrides.
     */
    async get(uuid: MilestonePathParams['uuid'], config?: AxiosRequestConfig): Promise<Milestone> {
        return invokeOperation<Milestone>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create milestone
     *
     * Create milestone
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Milestone, config?: AxiosRequestConfig): Promise<Milestone> {
        return invokeOperation<Milestone>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update milestone
     *
     * Update milestone with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the milestone to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: MilestonePathParams['uuid'], payload: Milestone, config?: AxiosRequestConfig): Promise<Milestone> {
        return invokeOperation<Milestone>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete milestone
     *
     * Delete milestone with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the milestone
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: MilestonePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: MilestonePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: MilestonePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * List dependents
     *
     * Lists all dependents to a milestone with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the milestone
     * @param params Optional query parameters: verbose - boolean, default false. Whether to include verbose metadata.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: MilestonePathParams['uuid'],
        params?: MilestoneDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get file
     *
     * Get file from the milestone.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the milestone
     * @param fileId Path parameter "fileId" (string, pattern .+). ID of the file
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: MilestoneFilePathParams['uuid'],
        fileId: MilestoneFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload a file
     *
     * Upload a file to the milestones service.
     *
     * @param body Required request body. File content
     * @param config Axios request configuration overrides.
     */
    async uploadFile(body: string, config?: AxiosRequestConfig): Promise<UploadedFile> {
        return invokeOperation<UploadedFile>(this.client, this.basePath, this.operations.uploadFile, {
            body,
            config
        })
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the milestone endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }

    /**
     * A list of allowed categories
     *
     * Get a list of allowed categories for milestones.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedCategories, {
            config
        })
    }

    /**
     * A list of allowed completion states
     *
     * Get a list of allowed completion states for milestones.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCompletionStates(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCompletionStates,
            {
                config
            }
        )
    }

    /**
     * A list of allowed document types
     *
     * Get a list of allowed types for documents on milestones.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedDocumentTypes, {
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
     * A list of allowed milestone states
     *
     * Get a list of allowed milestone states for milestones.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedMilestoneStates(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedMilestoneStates, {
            config
        })
    }

    /**
     * A list of allowed academic roles for applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicRolesRelatedToApplications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicRolesRelatedToApplications,
            { config }
        )
    }

    /**
     * A list of allowed administrative roles for applications
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdministrativeRolesRelatedToApplications(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedAdministrativeRolesRelatedToApplications,
            { config }
        )
    }

    /**
     * A list of allowed academic roles for awards
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicRolesRelatedToAwards(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedAcademicRolesRelatedToAwards, {
            config
        })
    }

    /**
     * A list of allowed administrative roles for awards
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdministrativeRolesRelatedToAwards(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedAdministrativeRolesRelatedToAwards,
            { config }
        )
    }

    /**
     * A list of allowed academic roles for contracts
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicRolesRelatedToContract(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicRolesRelatedToContract,
            { config }
        )
    }

    /**
     * A list of allowed administrative roles for contracts
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdministrativeRolesRelatedToContract(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedAdministrativeRolesRelatedToContract,
            { config }
        )
    }

    /**
     * A list of allowed academic roles for ethical reviews
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicRolesRelatedToEthicalReview(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicRolesRelatedToEthicalReview,
            { config }
        )
    }

    /**
     * A list of allowed administrative roles for ethical reviews
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdministrativeRolesRelatedToEthicalReview(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedAdministrativeRolesRelatedToEthicalReview,
            { config }
        )
    }

    /**
     * A list of allowed academic roles for projects
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAcademicRolesRelatedToProjects(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicRolesRelatedToProjects,
            { config }
        )
    }

    /**
     * A list of allowed administrative roles for projects
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAdministrativeRolesRelatedToProject(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedAdministrativeRolesRelatedToProject,
            { config }
        )
    }
}
