import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

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

export interface EquipmentServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/equipment'

export class EquipmentService {
	private readonly basePath: string

	constructor(private readonly client: PureClientLike, options: EquipmentServiceOptions = {}) {
		this.basePath = options.basePath ?? DEFAULT_BASE_PATH
	}

	async list(params?: EquipmentListParams, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return this.client.get<EquipmentListResult>(this.basePath, params, config)
	}

	async query(body: EquipmentQuery, config?: AxiosRequestConfig): Promise<EquipmentListResult> {
		return this.client.post<EquipmentListResult>(`${this.basePath}/search`, body, undefined, config)
	}

	async get(uuid: string, config?: AxiosRequestConfig): Promise<Equipment> {
		return this.client.get<Equipment>(`${this.basePath}/${uuid}`, undefined, config)
	}

	async create(payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return this.client.put<Equipment>(this.basePath, payload, undefined, config)
	}

	async update(uuid: string, payload: Equipment, config?: AxiosRequestConfig): Promise<Equipment> {
		return this.client.put<Equipment>(`${this.basePath}/${uuid}`, payload, undefined, config)
	}

	async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
		await this.client.delete<void>(`${this.basePath}/${uuid}`, undefined, config)
	}

	async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
		await this.client.post<void>(`${this.basePath}/${uuid}/actions/lock`, undefined, undefined, config)
	}

	async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
		await this.client.post<void>(`${this.basePath}/${uuid}/actions/unlock`, undefined, undefined, config)
	}

	async getFile(uuid: string, fileId: string, config?: AxiosRequestConfig): Promise<string> {
		return this.client.get<string>(`${this.basePath}/${uuid}/files/${fileId}`, undefined, config)
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

		return this.client.put<UploadedFile>(`${this.basePath}/file-uploads`, file, undefined, uploadConfig)
	}

	async listNotes(uuid: string, params?: EquipmentNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
		return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
	}

	async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
		return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
	}

	async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-countries`, undefined, config)
	}

	async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-subdivision`, undefined, config)
	}

	async getAllowedAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-types`, undefined, config)
	}

	async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-categories`, undefined, config)
	}

	async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
	}

	async getAllowedCustomDefinedFieldClassifications(propertyName: string, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(
			`${this.basePath}/allowed-custom-defined-field-values/${propertyName}/classifications`,
			undefined,
			config
		)
	}

	async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-description-types`, undefined, config)
	}

	async getAllowedEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-email-types`, undefined, config)
	}

	async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-image-types`, undefined, config)
	}

	async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
		return this.client.get<AllowedKeywordGroupConfigurationList>(`${this.basePath}/allowed-keyword-group-configurations`, undefined, config)
	}

	async getAllowedKeywordGroupConfigurationClassifications(id: number, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(
			`${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`,
			undefined,
			config
		)
	}

	async getAllowedLoanTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-loan-types`, undefined, config)
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
	}

	async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-persons-roles`, undefined, config)
	}

	async getAllowedPhoneNumberTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-phone-number-types`, undefined, config)
	}

	async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
	}

	async getAllowedWebAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-web-address-types`, undefined, config)
	}

	async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
		return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
	}

	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
	}
}
