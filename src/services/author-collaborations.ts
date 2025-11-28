import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { authorCollaborationsServiceConfig, invokeOperation } from './service-config'

export type AuthorCollaboration = components['schemas']['AuthorCollaboration']
export type AuthorCollaborationListResult = components['schemas']['AuthorCollaborationListResult']
export type AuthorCollaborationQuery = components['schemas']['AuthorCollaborationQuery']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']

export type AuthorCollaborationListParams = NonNullable<operations['authorCollaboration_list']['parameters']['query']>
export type AuthorCollaborationNotesParams = NonNullable<operations['authorCollaborations_listNotes']['parameters']['query']>

type AuthorCollaborationPathParams = operations['authorCollaborations_get']['parameters']['path']
type AuthorCollaborationNotesPathParams = operations['authorCollaborations_listNotes']['parameters']['path']

export interface AuthorCollaborationsServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class AuthorCollaborationsService {
	private readonly basePath: string
	private readonly operations = authorCollaborationsServiceConfig.operations

	constructor(private readonly client: PureClientLike, options: AuthorCollaborationsServiceOptions = {}) {
		this.basePath = options.basePath ?? authorCollaborationsServiceConfig.basePath
	}

	async list(params?: AuthorCollaborationListParams, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return invokeOperation<AuthorCollaborationListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	async query(body: AuthorCollaborationQuery, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return invokeOperation<AuthorCollaborationListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	async get(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return invokeOperation<AuthorCollaboration>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	async create(payload: AuthorCollaboration, config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return invokeOperation<AuthorCollaboration>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

	async update(
		uuid: AuthorCollaborationPathParams['uuid'],
		payload: AuthorCollaboration,
		config?: AxiosRequestConfig
	): Promise<AuthorCollaboration> {
		return invokeOperation<AuthorCollaboration>(this.client, this.basePath, this.operations.update, {
			pathParams: { uuid },
			body: payload,
			config
		})
	}

	async remove(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
			pathParams: { uuid },
			config
		})
	}

	async lock(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
			pathParams: { uuid },
			config
		})
	}

	async unlock(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

	async listNotes(
		uuid: AuthorCollaborationNotesPathParams['uuid'],
		params?: AuthorCollaborationNotesParams,
		config?: AxiosRequestConfig
	): Promise<NoteListResult> {
		return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
			pathParams: { uuid },
			query: params,
			config
		})
	}

	async createNote(
		uuid: AuthorCollaborationNotesPathParams['uuid'],
		note: Note,
		config?: AxiosRequestConfig
	): Promise<Note> {
		return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
			pathParams: { uuid },
			body: note,
			config
		})
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, {
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

	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
			config
		})
	}
}
