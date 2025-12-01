import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { conceptsServiceConfig, invokeOperation } from './service-config'

export type Concept = components['schemas']['Concept']
export type ConceptListResult = components['schemas']['ConceptListResult']
export type ConceptQuery = components['schemas']['ConceptQuery']
export type LocalesList = components['schemas']['LocalesList']

export type ConceptListParams = NonNullable<operations['concept_list']['parameters']['query']>

type ConceptPathParams = operations['concept_get']['parameters']['path']

export interface ConceptsServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post'>

export class ConceptsService {
	private readonly basePath: string
	private readonly invokeClient: Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>
	private readonly operations = conceptsServiceConfig.operations

	constructor(private readonly client: PureClientLike, options: ConceptsServiceOptions = {}) {
		this.basePath = options.basePath ?? conceptsServiceConfig.basePath
		this.invokeClient = this.client as Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>
	}

	/**
	 * Lists all concept
	 *
	 * Lists all concept in the Pure instance. If you need to filter the concept returned, see the POST version which supports additional filtering.
	 *
	 * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned concept per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /concept/orderings
	 * @param config Axios request configuration overrides.
	 */
	async list(params?: ConceptListParams, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return invokeOperation<ConceptListResult>(this.invokeClient, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	/**
	 * Query operation for concept
	 *
	 * Lists concept in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
	 *
	 * @param body Required request body. The query to perform
	 * @param config Axios request configuration overrides.
	 */
	async query(body: ConceptQuery, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return invokeOperation<ConceptListResult>(this.invokeClient, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	/**
	 * Get concept
	 *
	 * Get concept with specific UUID.
	 *
	 * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired concept
	 * @param config Axios request configuration overrides.
	 */
	async get(uuid: ConceptPathParams['uuid'], config?: AxiosRequestConfig): Promise<Concept> {
		return invokeOperation<Concept>(this.invokeClient, this.basePath, this.operations.get, {
			pathParams: { uuid },
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
		return invokeOperation<LocalesList>(this.invokeClient, this.basePath, this.operations.getAllowedLocales, {
			config
		})
	}
}
