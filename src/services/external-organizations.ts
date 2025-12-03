import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { externalOrganizationsServiceConfig, invokeOperation } from './service-config'

export type ExternalOrganization = components['schemas']['ExternalOrganization']
export type ExternalOrganizationListResult = components['schemas']['ExternalOrganizationListResult']
export type ExternalOrganizationsQuery = components['schemas']['ExternalOrganizationsQuery']
export type ExternalOrganizationRefList = components['schemas']['ExternalOrganizationRefList']
export type ExternalOrganizationList = components['schemas']['ExternalOrganizationList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']

export type ExternalOrganizationListParams = NonNullable<operations['externalOrganization_list']['parameters']['query']>
export type ExternalOrganizationDependentsParams = NonNullable<operations['externalOrganization_dependents']['parameters']['query']>
export type ExternalOrganizationNotesParams = NonNullable<operations['externalOrganization_listNotes']['parameters']['query']>
export type ExternalOrganizationAllowedDisciplinesParams = NonNullable<operations['externalOrganization_getAllowedDisciplines']['parameters']['query']>

type ExternalOrganizationPathParams = operations['externalOrganization_get']['parameters']['path']
type ExternalOrganizationDependentsPathParams = operations['externalOrganization_dependents']['parameters']['path']
type ExternalOrganizationDisciplinePathParams = operations['externalOrganization_getDisciplineAssociation']['parameters']['path']
type ExternalOrganizationDisciplineListPathParams = operations['externalOrganization_listDisciplineAssociations']['parameters']['path']
type ExternalOrganizationAllowedDisciplinePathParams = operations['externalOrganization_getAllowedDisciplines']['parameters']['path']
type ExternalOrganizationFilePathParams = operations['externalOrganization_getFile']['parameters']['path']
type ExternalOrganizationKeywordGroupPathParams = operations['externalOrganization_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface ExternalOrganizationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ExternalOrganizationsService {
    private readonly basePath: string
    private readonly operations = externalOrganizationsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ExternalOrganizationsServiceOptions = {}) {
        this.basePath = options.basePath ?? externalOrganizationsServiceConfig.basePath
    }

    /**
     * Lists all external organizations
     *
     * Lists all external organizations in the Pure instance. If you need to filter the external organizations returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned external organizations per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /external-organizations/orderings
     * @param config Axios request configuration overrides.
     */
    async list(
        params?: ExternalOrganizationListParams,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for external organizations
     *
     * Lists external organizations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(
        body: ExternalOrganizationsQuery,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get external organization
     *
     * Get external organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired external organization
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create external organization
     *
     * Create external organization
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: ExternalOrganization, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update external organization
     *
     * Update external organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(
        uuid: ExternalOrganizationPathParams['uuid'],
        payload: ExternalOrganization,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete external organization
     *
     * Delete external organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to the external organization
     *
     * Lists all dependents to the external organization with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization to update
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: ExternalOrganizationDependentsPathParams['uuid'],
        params?: ExternalOrganizationDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the external organization
     *
     * Get disciplines from the discipline scheme associated with the external organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired external organization
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: ExternalOrganizationDisciplinePathParams['uuid'],
        disciplineScheme: ExternalOrganizationDisciplinePathParams['discipline-scheme'],
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
     * Update disciplines from the discipline scheme associated with the external organization
     *
     * Update disciplines from the discipline scheme associated with the external organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization to update
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param payload Required request body. The disciplines association to create
     * @param config Axios request configuration overrides.
     */
    async updateDisciplineAssociation(
        uuid: ExternalOrganizationDisciplinePathParams['uuid'],
        disciplineScheme: ExternalOrganizationDisciplinePathParams['discipline-scheme'],
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
     * Query operation for disciplines associated with external organizations
     *
     * Lists disciplines from the discipline scheme associated with external organizations in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: ExternalOrganizationDisciplineListPathParams['discipline-scheme'],
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
     * Get a list of a allowed disciplines for specific discipline scheme for external organizations
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for external organizations
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: ExternalOrganizationAllowedDisciplinePathParams['discipline-scheme'],
        params?: ExternalOrganizationAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for external organizations
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
     * Lists all orderings available to the external organization endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with an external organization ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(
        uuid: ExternalOrganizationPathParams['uuid'],
        params?: ExternalOrganizationNotesParams,
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
     * Create note and associate it with an external organization
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(
        uuid: ExternalOrganizationPathParams['uuid'],
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
     * Get file from the external organization
     *
     * Get file from the external organization
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external organization
     * @param fileId Path parameter "fileId" (string, pattern .+). File id
     * @param config Axios request configuration overrides.
     */
    async getFile(
        uuid: ExternalOrganizationFilePathParams['uuid'],
        fileId: ExternalOrganizationFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific external organization
     *
     * Uploads file for the external organization
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
     * Merge external organizations
     *
     * Merge a list of external organizations together. Note that this operation is irreversible
     *
     * @param refs Required request body. References to the entities to merge. The first will be the target. All additional entities will be merged into the target.
     * @param config Axios request configuration overrides.
     */
    async merge(refs: ExternalOrganizationRefList, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.merge, {
            body: refs,
            config
        })
    }

    /**
     * Preview deduplication of external organizations
     *
     * Runs through a list external organizations and returns the deduplicated and merged organizations. The operation does not touch the Pure database
     *
     * @param organizations Required request body. The content to deduplicate. The data do not need to exist in the database.
     * @param config Axios request configuration overrides.
     */
    async previewDeduplication(
        organizations: ExternalOrganizationList,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(
            this.client,
            this.basePath,
            this.operations.previewDeduplication,
            {
                body: organizations,
                config
            }
        )
    }

    /**
     * A list of allowed address countries
     *
     * Get a list of allowed countries that can be used for the 'address.country' attribute of external organizations
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
     * A list of allowed address subdivisions
     *
     * Get a list of allowed subdivisions that can be used for the 'address.subdivisions' attribute of external organizations
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
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified image types that can be used for the 'images.type' attribute of external organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedClassifiedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedImageTypes,
            { config }
        )
    }

    /**
     * A list of allowed classified identifier types
     *
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of external organizations
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
     * A list of allowed document licenses
     *
     * Get a list of allowed document licenses that can be used for the 'documents.license' attribute of external organizations
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
     * Get a list of allowed document types that can be used for the 'documents.type' attribute of external organizations
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
        id: ExternalOrganizationKeywordGroupPathParams['id'],
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
     * Get a list of allowed link types that can be used for the 'links.linkType' attribute of external organizations
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
     * A list of allowed nature types
     *
     * Get a list of allowed nature types that can be used for the 'natureTypes' attribute of external organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
            { config }
        )
    }

    /**
     * A list of allowed external organization types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of external organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTypes,
            { config }
        )
    }

    /**
     * A list of allowed workflow steps
     *
     * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of external organizations
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
}
