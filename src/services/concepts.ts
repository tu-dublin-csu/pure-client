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

	async list(params?: ConceptListParams, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return invokeOperation<ConceptListResult>(this.invokeClient, this.basePath, this.operations.list, {
			query: params,
			config
		})
	}

	async query(body: ConceptQuery, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return invokeOperation<ConceptListResult>(this.invokeClient, this.basePath, this.operations.query, {
			body,
			config
		})
	}

	async get(uuid: ConceptPathParams['uuid'], config?: AxiosRequestConfig): Promise<Concept> {
		return invokeOperation<Concept>(this.invokeClient, this.basePath, this.operations.get, {
			pathParams: { uuid },
			config
		})
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return invokeOperation<LocalesList>(this.invokeClient, this.basePath, this.operations.getAllowedLocales, {
			config
		})
	}
}
