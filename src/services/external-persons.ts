import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { externalPersonsServiceConfig, invokeOperation } from './service-config'

export type ExternalPerson = components['schemas']['ExternalPerson']
export type ExternalPersonListResult = components['schemas']['ExternalPersonListResult']
export type ExternalPersonsQuery = components['schemas']['ExternalPersonsQuery']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type ExternalPersonListParams = NonNullable<operations['externalPerson_list']['parameters']['query']>
export type ExternalPersonDependentsParams = NonNullable<operations['externalPerson_dependents']['parameters']['query']>
export type ExternalPersonNotesParams = NonNullable<operations['externalPerson_listNotes']['parameters']['query']>
export type ExternalPersonAllowedDisciplineParams = NonNullable<operations['getAllowedDisciplines']['parameters']['query']>

type ExternalPersonPathParams = operations['externalPerson_get']['parameters']['path']
type ExternalPersonDependentsPathParams = operations['externalPerson_dependents']['parameters']['path']
type ExternalPersonDisciplineAssociationPathParams =
	operations['externalPerson_getDisciplineAssociation']['parameters']['path']
type ExternalPersonDisciplineSearchPathParams =
	operations['externalPerson_listDisciplineAssociations']['parameters']['path']
type ExternalPersonAllowedDisciplinePathParams = operations['getAllowedDisciplines']['parameters']['path']
type ExternalPersonKeywordGroupClassificationPathParams =
	operations['externalPerson_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']
type ExternalPersonFilePathParams = operations['externalPerson_getFile']['parameters']['path']
type ExternalPersonNotesPathParams = operations['externalPerson_listNotes']['parameters']['path']

export interface ExternalPersonsServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ExternalPersonsService {
	private readonly basePath: string
	private readonly operations = externalPersonsServiceConfig.operations

	constructor(private readonly client: PureClientLike, options: ExternalPersonsServiceOptions = {}) {
		this.basePath = options.basePath ?? externalPersonsServiceConfig.basePath
	}

	/**
	 * Lists all external persons
	 *
	 * Lists all external persons in the Pure instance. If you need to filter the external persons returned, see the POST version which supports additional filtering.
	 *
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned external persons per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /external-persons/orderings
	 * @param config Axios request configuration overrides.
	 */
	async list(params?: ExternalPersonListParams, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
		return invokeOperation<ExternalPersonListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	/**
	 * Query operation for external persons
	 *
	 * Lists external persons in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
	 *
	 * @param body Required request body. The query to perform
	 * @param config Axios request configuration overrides.
	 */
	async query(body: ExternalPersonsQuery, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
		return invokeOperation<ExternalPersonListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	/**
	 * Get external person
	 *
	 * Get external person with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired external person
	 * @param config Axios request configuration overrides.
	 */
	async get(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<ExternalPerson> {
		return invokeOperation<ExternalPerson>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Create external person
	 *
	 * Create external person
	 *
	 * @param payload Required request body. The content to create
	 * @param config Axios request configuration overrides.
	 */
	async create(payload: ExternalPerson, config?: AxiosRequestConfig): Promise<ExternalPerson> {
		return invokeOperation<ExternalPerson>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

	/**
	 * Update external persons
	 *
	 * Update external persons with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person to update
	 * @param payload Required request body. The content to update
	 * @param config Axios request configuration overrides.
	 */
	async update(
		uuid: ExternalPersonPathParams['uuid'],
		payload: ExternalPerson,
		config?: AxiosRequestConfig
	): Promise<ExternalPerson> {
		return invokeOperation<ExternalPerson>(this.client, this.basePath, this.operations.update, {
			pathParams: { uuid },
			body: payload,
			config
		})
	}

	/**
	 * Delete external person
	 *
	 * Delete external person with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person
	 * @param config Axios request configuration overrides.
	 */
	async remove(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async lock(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async unlock(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Lists all dependents to a external person
	 *
	 * Lists all dependents to a external person with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person
	 * @param params Optional query parameters: verbose - boolean, default false. Default: false. Setting this to true will add links and names to the output but will also have an impact on performance. use with caution.
	 * @param config Axios request configuration overrides.
	 */
	async listDependents(
		uuid: ExternalPersonDependentsPathParams['uuid'],
		params?: ExternalPersonDependentsParams,
		config?: AxiosRequestConfig
	): Promise<ContentRefListResult> {
		return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
			pathParams: { uuid },
			query: params,
			config
		})
	}

	/**
	 * Get disciplines from the discipline scheme associated with the external person
	 *
	 * Get disciplines from the discipline scheme associated with the external person with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired external person
	 * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
	 * @param config Axios request configuration overrides.
	 */
	async getDisciplineAssociation(
		uuid: ExternalPersonDisciplineAssociationPathParams['uuid'],
		disciplineScheme: ExternalPersonDisciplineAssociationPathParams['discipline-scheme'],
		config?: AxiosRequestConfig
	): Promise<DisciplinesAssociation> {
		return invokeOperation<DisciplinesAssociation>(
			this.client,
			this.basePath,
			this.operations.getDisciplineAssociation,
			{
				pathParams: {
					uuid,
					'discipline-scheme': disciplineScheme
				},
				config
			}
		)
	}

	/**
	 * Update disciplines from the discipline scheme associated with the external person
	 *
	 * Update disciplines from the discipline scheme associated with the external person with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person to update
	 * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
	 * @param payload Required request body. The disciplines association to create
	 * @param config Axios request configuration overrides.
	 */
	async updateDisciplineAssociation(
		uuid: ExternalPersonDisciplineAssociationPathParams['uuid'],
		disciplineScheme: ExternalPersonDisciplineAssociationPathParams['discipline-scheme'],
		payload: DisciplinesAssociation,
		config?: AxiosRequestConfig
	): Promise<DisciplinesAssociation> {
		return invokeOperation<DisciplinesAssociation>(
			this.client,
			this.basePath,
			this.operations.updateDisciplineAssociation,
			{
				pathParams: {
					uuid,
					'discipline-scheme': disciplineScheme
				},
				body: payload,
				config
			}
		)
	}

	/**
	 * Query operation for disciplines associated with external persons
	 *
	 * Lists disciplines from the discipline scheme associated with external persons in the Pure instance that matches the provided query.
	 *
	 * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme
	 * @param body Required request body. The query to perform
	 * @param config Axios request configuration overrides.
	 */
	async listDisciplineAssociations(
		disciplineScheme: ExternalPersonDisciplineSearchPathParams['discipline-scheme'],
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
	 * Get a list of a allowed disciplines for specific discipline scheme for external persons
	 *
	 * @param disciplineScheme Path parameter "discipline-scheme" (string). Identifier for the discipline scheme for external persons
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned disciplines per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedDisciplines(
		disciplineScheme: ExternalPersonAllowedDisciplinePathParams['discipline-scheme'],
		params?: ExternalPersonAllowedDisciplineParams,
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
	 * Get a list fo a allowed discipline schemes for external persons
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedDisciplineSchemes(
		config?: AxiosRequestConfig
	): Promise<DisciplinesDisciplineSchemeListResult> {
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
	 * Lists all orderings available to the external person endpoint. These values can be used by the order parameter.
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
	}

	/**
	 * Lists notes
	 *
	 * Lists notes associated with an external person ordered by date (nulls last)
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person to get notes for
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
	 * @param config Axios request configuration overrides.
	 */
	async listNotes(
		uuid: ExternalPersonNotesPathParams['uuid'],
		params?: ExternalPersonNotesParams,
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
	 * Create note and associate it with an external person
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person to add note to
	 * @param note Required request body. The note to create
	 * @param config Axios request configuration overrides.
	 */
	async createNote(
		uuid: ExternalPersonNotesPathParams['uuid'],
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
	 * Get file from the external person
	 *
	 * Get file from the external person
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the external person
	 * @param fileId Path parameter "fileId" (string, pattern .+). File id
	 * @param config Axios request configuration overrides.
	 */
	async getFile(
		uuid: ExternalPersonFilePathParams['uuid'],
		fileId: ExternalPersonFilePathParams['fileId'],
		config?: AxiosRequestConfig
	): Promise<string> {
		return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
			pathParams: { uuid, fileId },
			config
		})
	}

	/**
	 * Upload file to a specific external person
	 *
	 * Uploads file for the external person
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
	 * A list of allowed classified identifier types
	 *
	 * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of external persons
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
	 * A list of allowed countries
	 *
	 * Get a list of allowed countries that can be used for the 'countries' attribute of external persons
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedCountries, {
			config
		})
	}

	/**
	 * A list of allowed image types
	 *
	 * Get a list of allowed image types that can be used for the 'images.type' attribute of external persons
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedImageTypes,
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
	async getAllowedKeywordGroupConfigurations(
		config?: AxiosRequestConfig
	): Promise<AllowedKeywordGroupConfigurationList> {
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
		id: ExternalPersonKeywordGroupClassificationPathParams['id'],
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
	 * A list of allowed external person types
	 *
	 * Get a list of allowed types that can be used for the 'type' attribute of external persons
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
	 * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of external persons
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
