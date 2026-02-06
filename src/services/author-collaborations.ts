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

	/**
	 * Lists all  author collaborations
	 *
	 * Lists all  author collaborations in the Pure instance. If you need to filter the author collaborations returned, see the POST version which supports additional filtering.
	 *
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned author collaborations per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /author-collaborations/orderings
	 * @param config Axios request configuration overrides.
	 */
	async list(params?: AuthorCollaborationListParams, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return invokeOperation<AuthorCollaborationListResult>(this.client, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	/**
	 * Query operation for author-collaborations
	 *
	 * Lists author-collaborations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
	 *
	 * @param body Required request body. The query to perform
	 * @param config Axios request configuration overrides.
	 */
	async query(body: AuthorCollaborationQuery, config?: AxiosRequestConfig): Promise<AuthorCollaborationListResult> {
		return invokeOperation<AuthorCollaborationListResult>(this.client, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	/**
	 * Get author collaboration
	 *
	 * Get author collaboration with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired author collaboration
	 * @param config Axios request configuration overrides.
	 */
	async get(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return invokeOperation<AuthorCollaboration>(this.client, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Create author collaboration
	 *
	 * Create author collaboration
	 *
	 * @param payload Required request body. The content to create
	 * @param config Axios request configuration overrides.
	 */
	async create(payload: AuthorCollaboration, config?: AxiosRequestConfig): Promise<AuthorCollaboration> {
		return invokeOperation<AuthorCollaboration>(this.client, this.basePath, this.operations.create, {
			body: payload,
			config
		})
	}

	/**
	 * Update author collaboration
	 *
	 * Update author collaboration with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the author collaboration to update
	 * @param payload Required request body. The content to update
	 * @param config Axios request configuration overrides.
	 */
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

	/**
	 * Delete author collaboration
	 *
	 * Delete author collaboration with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the author collaboration
	 * @param config Axios request configuration overrides.
	 */
	async remove(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async lock(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
	async unlock(uuid: AuthorCollaborationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
		await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
			pathParams: { uuid },
			config
		})
	}

	/**
	 * Lists notes
	 *
	 * Lists notes associated with a author collaboration ordered by date (nulls last)
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the author collaboration to get notes for
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned notes per request; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start
	 * @param config Axios request configuration overrides.
	 */
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

	/**
	 * Create note
	 *
	 * Create note and associate it with a author collaboration
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the author collaboration to add note to
	 * @param note Required request body. The note to create
	 * @param config Axios request configuration overrides.
	 */
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
	 * A list of allowed workflow steps
	 *
	 * Get a list of allowed workflow steps that can be used for the 'workflow' attribute of author collaboration
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

	/**
	 * Lists available orderings
	 *
	 * Lists all orderings available to the author collaboration endpoint. These values can be used by the order parameter when listing author collaborations.
	 *
	 * @param config Axios request configuration overrides.
	 */
	async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
		return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
			config
		})
	}
}
