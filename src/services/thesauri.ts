import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Thesaurus = components['schemas']['Thesaurus']
export type ThesaurusListResult = components['schemas']['ThesaurusListResult']
export type ThesaurusQuery = components['schemas']['ThesaurusQuery']
export type LocalesList = components['schemas']['LocalesList']
export type OrderingsList = components['schemas']['OrderingsList']

export type ThesaurusListParams = NonNullable<operations['thesaurus_list']['parameters']['query']>

export interface ThesauriServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post'>

const DEFAULT_BASE_PATH = '/thesauri'

export class ThesauriService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ThesauriServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ThesaurusListParams, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return this.client.get<ThesaurusListResult>(this.basePath, params, config)
    }

    async query(body: ThesaurusQuery, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return this.client.post<ThesaurusListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Thesaurus> {
        return this.client.get<Thesaurus>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
