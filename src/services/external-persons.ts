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

	async list(params?: ExternalPersonListParams, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
		return invokeOperation<ExternalPersonListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	async query(body: ExternalPersonsQuery, config?: AxiosRequestConfig): Promise<ExternalPersonListResult> {
		return invokeOperation<ExternalPersonListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	async get(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<ExternalPerson> {
		return invokeOperation<ExternalPerson>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	async create(payload: ExternalPerson, config?: AxiosRequestConfig): Promise<ExternalPerson> {
		return invokeOperation<ExternalPerson>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

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

	async remove(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
			pathParams: { uuid },
			config
		})
	}

	async lock(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
			pathParams: { uuid },
			config
		})
	}

	async unlock(uuid: ExternalPersonPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

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

	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
	}

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

	async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedClassifiedIdentifierTypes,
			{ config }
		)
	}

	async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedCountries, {
			config
		})
	}

	async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(
			this.client,
			this.basePath,
			this.operations.getAllowedImageTypes,
			{ config }
		)
	}

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

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
	}

	async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
		return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
			config
		})
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
