import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Concept = components['schemas']['Concept']
export type ConceptListResult = components['schemas']['ConceptListResult']
export type ConceptQuery = components['schemas']['ConceptQuery']
export type LocalesList = components['schemas']['LocalesList']

export type ConceptListParams = NonNullable<operations['concept_list']['parameters']['query']>

export interface ConceptsServiceOptions {
	basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post'>

const DEFAULT_BASE_PATH = '/concepts'

export class ConceptsService {
	private readonly basePath: string

	constructor(private readonly client: PureClientLike, options: ConceptsServiceOptions = {}) {
		this.basePath = options.basePath ?? DEFAULT_BASE_PATH
	}

	async list(params?: ConceptListParams, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return this.client.get<ConceptListResult>(this.basePath, params, config)
	}

	async query(body: ConceptQuery, config?: AxiosRequestConfig): Promise<ConceptListResult> {
		return this.client.post<ConceptListResult>(`${this.basePath}/search`, body, undefined, config)
	}

	async get(uuid: string, config?: AxiosRequestConfig): Promise<Concept> {
		return this.client.get<Concept>(`${this.basePath}/${uuid}`, undefined, config)
	}

	async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
		return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
	}
}
