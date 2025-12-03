import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { equipmentServiceConfig, invokeOperation } from './service-config'

export type Equipment = components['schemas']['Equipment']
export type EquipmentListResult = components['schemas']['EquipmentListResult']
export type EquipmentQuery = components['schemas']['EquipmentQuery']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']

export type EquipmentListParams = NonNullable<operations['equipment_list']['parameters']['query']>
export type EquipmentNotesParams = NonNullable<operations['equipment_listNotes']['parameters']['query']>

type EquipmentPathParams = operations['equipment_get']['parameters']['path']
type EquipmentNotesPathParams = operations['equipment_listNotes']['parameters']['path']
type EquipmentFilePathParams = operations['equipment_getFile']['parameters']['path']
type EquipmentCustomFieldPathParams = operations['equipment_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type EquipmentKeywordGroupPathParams = operations['equipment_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface EquipmentServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class EquipmentService {
	private readonly basePath: string
	private readonly operations = equipmentServiceConfig.operations

	constructor(private readonly client: PureClientLike, options: EquipmentServiceOptions = {}) {
		this.basePath = options.basePath ?? equipmentServiceConfig.basePath
	}

	/**
	 * Lists all equipment
	 *
	 * Lists all equipment in the Pure instance. If you need to filter the equipment returned, see the POST version which supports additional filtering.
	 *
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned equipment per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /equipment/orderings
	 * @param config Axios request configuration overrides.
	 */
	async list(params?: EquipmentListParams, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return invokeOperation<EquipmentListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	/**
	 * Query operation for equipment
	 *
	 * Lists equipment in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
	 *
	 * @param body Required request body. The query to perform
	 * @param config Axios request configuration overrides.
	 */
	async query(body: EquipmentQuery, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return invokeOperation<EquipmentListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	/**
	 * Get equipment
	 *
	 * Get equipment with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired equipment
	 * @param config Axios request configuration overrides.
	 */
	async get(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Create equipment
	 *
	 * Create equipment
	 *
	 * @param payload Required request body. The content to create
	 * @param config Axios request configuration overrides.
	 */
	async create(payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

	/**
	 * Update equipment
	 *
	 * Update equipment with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the equipment to update
	 * @param payload Required request body. The content to update
	 * @param config Axios request configuration overrides.
	 */
	async update(uuid: EquipmentPathParams['uuid'], payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.update, {
			pathParams: { uuid },
			body: payload,
			config
		})
	}

	/**
	 * Delete equipment
	 *
	 * Delete equipment with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the equipment
	 * @param config Axios request configuration overrides.
	 */
	async remove(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async lock(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async unlock(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Get file from the equipment
	 *
	 * Get file from the equipment
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the equipment
	 * @param fileId Path parameter "fileId" (string, pattern .+). File id
	 * @param config Axios request configuration overrides.
	 */
	async getFile(
		uuid: EquipmentFilePathParams['uuid'],
		fileId: EquipmentFilePathParams['fileId'],
		config?: AxiosRequestConfig
	): Promise<string> {
		return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
			pathParams: { uuid, fileId },
			config
		})
	}

	/**
	 * Upload file to a specific equipment
	 *
	 * Uploads file for the equipment
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
	 * Lists notes associated with an equipment ordered by date (nulls last)
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the equipment to get notes for
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
	 * @param config Axios request configuration overrides.
	 */
	async listNotes(
		uuid: EquipmentNotesPathParams['uuid'],
		params?: EquipmentNotesParams,
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
	 * Create note and associate it with the equipment
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the equipment to add note to
	 * @param note Required request body. The note to create
	 * @param config Axios request configuration overrides.
	 */
	async createNote(
		uuid: EquipmentNotesPathParams['uuid'],
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
	 * A list of allowed address countries
	 *
	 * Get a list of allowed countries that can be used for the 'addresses.country' attribute of equipment
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
	 * Get a list of allowed subdivisions that can be used for the 'addresses.subdivisions' attribute of equipment
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
	 * Get a list of allowed address types that can be used for the 'addresses.type' attribute of equipment
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
	 * A list of allowed categories
	 *
	 * Get a list of allowed categories on equipment
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedCategories,
			{ config }
		)
	}

	/**
	 * A list of allowed classified identifier types
	 *
	 * Get a list of allowed classified identifier types that can be used for the 'identifiers.type' attribute of equipment
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
	 * Get allowed classifications for the custom-defined field associated with the equipment
	 *
	 * Get allowed classifications for the custom-defined field associated with the equipment.
	 *
	 * @param propertyName Path parameter "propertyName" (string). PropertyName for the desired custom-defined field
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedCustomDefinedFieldClassifications(
		propertyName: EquipmentCustomFieldPathParams['propertyName'],
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
	 * A list of allowed classifications for the descriptions property
	 *
	 * Get a list of classifications that can be used when submitting a description.
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedDescriptionTypes,
			{ config }
		)
	}

	/**
	 * A list of allowed e-mail types
	 *
	 * Get a list of allowed e-mail types that can be used for the 'emails.type' attribute of equipment
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedEmailTypes,
			{ config }
		)
	}

	/**
	 * A list of allowed image types
	 *
	 * Get a list of allowed image types that can be used for the 'images.type' attribute of equipment
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
		id: EquipmentKeywordGroupPathParams['id'],
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
	 * A list of allowed loan types
	 *
	 * Get a list of allowed loan types that can be used for the 'loan type' attribute of equipment
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedLoanTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedLoanTypes,
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
		return invokeOperation<LocalesList>(
			this.client,
			this.basePath,
			this.operations.getAllowedLocales,
			{ config }
		)
	}

	/**
	 * A list of allowed persons roles
	 *
	 * Get a list of allowed persons roles
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedPersonsRoles,
			{ config }
		)
	}

	/**
	 * A list of allowed phone number types
	 *
	 * Get a list of allowed phone number types that can be used for the 'phoneNumbers.type' attribute of equipment
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
	 * A list of allowed equipment types
	 *
	 * Get a list of allowed types that can be used for the 'type' attribute of equipment
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
	 * Get a list of allowed web address types that can be used for the 'webAddresses.type' attribute of equipment
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
}
