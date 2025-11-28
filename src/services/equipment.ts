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

	async list(params?: EquipmentListParams, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return invokeOperation<EquipmentListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	async query(body: EquipmentQuery, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return invokeOperation<EquipmentListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	async get(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	async create(payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

	async update(uuid: EquipmentPathParams['uuid'], payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return invokeOperation<Equipment>(this.client, this.basePath, this.operations.update, {
			pathParams: { uuid },
			body: payload,
			config
		})
	}

	async remove(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
			pathParams: { uuid },
			config
		})
	}

	async lock(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
			pathParams: { uuid },
			config
		})
	}

	async unlock(uuid: EquipmentPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

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

	async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedAddressCountries,
			{ config }
		)
	}

	async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedAddressSubdivisions,
			{ config }
		)
	}

	async getAllowedAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedAddressTypes,
			{ config }
		)
	}

	async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedCategories,
			{ config }
		)
	}

	async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedClassifiedIdentifierTypes,
			{ config }
		)
	}

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

	async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedDescriptionTypes,
			{ config }
		)
	}

	async getAllowedEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedEmailTypes,
			{ config }
		)
	}

	async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedImageTypes,
			{ config }
		)
	}

	async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
		return invokeOperation<AllowedKeywordGroupConfigurationList>(
			this.client,
			this.basePath,
			this.operations.getAllowedKeywordGroupConfigurations,
			{ config }
		)
	}

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

	async getAllowedLoanTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedLoanTypes,
			{ config }
		)
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return invokeOperation<LocalesList>(
			this.client,
			this.basePath,
			this.operations.getAllowedLocales,
			{ config }
		)
	}

	async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedPersonsRoles,
			{ config }
		)
	}

	async getAllowedPhoneNumberTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedPhoneNumberTypes,
			{ config }
		)
	}

	async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedTypes,
			{ config }
		)
	}

	async getAllowedWebAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedWebAddressTypes,
			{ config }
		)
	}

	async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
		return invokeOperation<WorkflowListResult>(
			this.client,
			this.basePath,
			this.operations.getAllowedWorkflowSteps,
			{ config }
		)
	}
}
