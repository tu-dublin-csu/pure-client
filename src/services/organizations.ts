import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, organizationsServiceConfig } from './service-config'

export type Organization = components['schemas']['Organization']
export type OrganizationListResult = components['schemas']['OrganizationListResult']
export type OrganizationsQuery = components['schemas']['OrganizationsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
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

export type OrganizationListParams = NonNullable<operations['organization_list']['parameters']['query']>
export type OrganizationDependentsParams = NonNullable<operations['organization_dependents']['parameters']['query']>
export type OrganizationNotesParams = NonNullable<operations['organization_listNotes']['parameters']['query']>
export type OrganizationAllowedDisciplinesParams = NonNullable<operations['organization_getAllowedDisciplines']['parameters']['query']>

export interface OrganizationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class OrganizationsService {
    private readonly basePath: string
    private readonly operations = organizationsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: OrganizationsServiceOptions = {}) {
        this.basePath = options.basePath ?? organizationsServiceConfig.basePath
    }

    /**
     * Lists all organizations
     *
     * Lists all organizations in the Pure instance. If you need to filter the organizations returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned organizations per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /organizations/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: OrganizationListParams, config?: AxiosRequestConfig): Promise<OrganizationListResult> {
        return invokeOperation<OrganizationListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for organizations
     *
     * Lists organizations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: OrganizationsQuery, config?: AxiosRequestConfig): Promise<OrganizationListResult> {
        return invokeOperation<OrganizationListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get organization
     *
     * Get organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired organization
     * @param config Axios request configuration overrides.
     */
    async get(uuid: string, config?: AxiosRequestConfig): Promise<Organization> {
        return invokeOperation<Organization>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create organization
     *
     * Create organization
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: Organization, config?: AxiosRequestConfig): Promise<Organization> {
        return invokeOperation<Organization>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update organization
     *
     * Update organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: string, payload: Organization, config?: AxiosRequestConfig): Promise<Organization> {
        return invokeOperation<Organization>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete organization
     *
     * Delete organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lists all dependents to the organization
     *
     * Lists all dependents to the organization with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization
     * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
     * @param config Axios request configuration overrides.
     */
    async listDependents(
        uuid: string,
        params?: OrganizationDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Get disciplines from the discipline scheme associated with the organization
     *
     * Get disciplines from the discipline scheme associated with the organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired organization
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param config Axios request configuration overrides.
     */
    async getDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
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
     * Update disciplines from the discipline scheme associated with the organization
     *
     * Update disciplines from the discipline scheme associated with the organization with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization to update
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
     * Query operation for disciplines associated with organizations
     *
     * Lists disciplines from the discipline scheme associated with organizations in the Pure instance that matches the provided query.
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async listDisciplineAssociations(
        disciplineScheme: string,
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
     * Get a list of a allowed disciplines for specific discipline scheme for organizations
     *
     * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for organizations
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async getAllowedDisciplines(
        disciplineScheme: string,
        params?: OrganizationAllowedDisciplinesParams,
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
     * Get a list fo a allowed discipline schemes for organizations
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
     * Lists all orderings available to the organization endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }

    /**
     * Lists notes
     *
     * Lists notes associated with an organization ordered by date (nulls last)
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization to get notes for
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
     * @param config Axios request configuration overrides.
     */
    async listNotes(uuid: string, params?: OrganizationNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    /**
     * Create note
     *
     * Create note and associate it with an organization
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization to add note to
     * @param note Required request body. The note to create
     * @param config Axios request configuration overrides.
     */
    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    /**
     * Get file from the organization
     *
     * Get file from the organization
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the organization
     * @param fileId Path parameter "fileId" (string, pattern .+). Id of the file
     * @param config Axios request configuration overrides.
     */
    async getFile(uuid: string, fileId: string, config?: AxiosRequestConfig): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    /**
     * Upload file to a specific organization
     *
     * Uploads file for the organization
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
     * A list of allowed address countries
     *
     * Get a list of allowed countries that can be used for the 'addresses.country' attribute of organizations
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
     * Get a list of allowed subdivisions that can be used for the 'addresses.subdivisions' attribute of organizations
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
     * Get a list of allowed address types that can be used for the 'addresses.type' attribute of organizations
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
     * Get a list of allowed classified photo types that can be used for the 'photos.type' attribute of organizations
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
     * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of organizations
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
     * A list of allowed cost centers
     *
     * Get a list of allowed cost centers that can be used for the 'costCenters' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedCostCenters(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCostCenters,
            { config }
        )
    }

    /**
     * Get allowed classifications for the custom-defined field associated with the organization
     *
     * Get allowed classifications for the custom-defined field associated with the organization.
     *
     * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
     * @param config Axios request configuration overrides.
     */
    async getAllowedCustomDefinedFieldClassifications(
        propertyName: string,
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
     * A list of allowed e-mail types
     *
     * Get a list of allowed e-mail types that can be used for the 'emails.type' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedEmailTypes, {
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
        id: number,
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
     * Get a list of allowed link types on organizations
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
     * Get a list of allowed main research areas on organizations
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
     * A list of allowed name variant types
     *
     * Get a list of allowed name variant types that can be used for the 'nameVariants.type' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedNameVariantTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNameVariantTypes,
            { config }
        )
    }

    /**
     * A list of allowed phone number types
     *
     * Get a list of allowed phone number types that can be used for the 'phoneNumbers.type' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPhoneNumberTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPhoneNumberTypes,
            { config }
        )
    }

    /**
     * A list of allowed photo types
     *
     * Get a list of allowed photo types that can be used for the 'photos.type' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedPhotoTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPhotoTypes,
            { config }
        )
    }

    /**
     * A list of allowed profile information types
     *
     * Get a list of allowed profile information types that can be used for the 'profileInformations.type' attribute of organizations
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
     * A list of allowed organization types
     *
     * Get a list of allowed types that can be used for the 'type' attribute of organizations
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
     * A list of allowed web address types
     *
     * Get a list of allowed web address types that can be used for the 'webAddresses.type' attribute of organizations
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedWebAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedWebAddressTypes,
            { config }
        )
    }
}
