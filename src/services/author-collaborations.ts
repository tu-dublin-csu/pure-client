import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

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

export interface AuthorCollaborationsServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/author-collaborations'

export class AuthorCollaborationsService {
	private readonly basePath: string

	constructor(private readonly client: PureClientLike, options: AuthorCollaborationsServiceOptions = {}) {
		this.basePath = options.basePath ?? DEFAULT_BASE_PATH
	}

	async list(params?: AuthorCollaborationListParams, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return this.client.get<AuthorCollaborationListResult>(this.basePath, params, config)
	}

	async query(body: AuthorCollaborationQuery, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return this.client.post<AuthorCollaborationListResult>(`${this.basePath}/search`, body, undefined, config)
	}

	async get(uuid: string, config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return this.client.get<AuthorCollaboration>(`${this.basePath}/${uuid}`, undefined, config)
	}

	async create(payload: AuthorCollaboration, config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return this.client.put<AuthorCollaboration>(this.basePath, payload, undefined, config)
	}

	async update(uuid: string, payload: AuthorCollaboration, config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return this.client.put<AuthorCollaboration>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

	async listNotes(uuid: string, params?: AuthorCollaborationNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
		return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
	}

	async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
		return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
	}

	async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
		return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
	}

	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
	}
}
