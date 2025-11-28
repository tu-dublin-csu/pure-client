import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, thesauriServiceConfig } from './service-config'

export type Thesaurus = components['schemas']['Thesaurus']
export type ThesaurusListResult = components['schemas']['ThesaurusListResult']
export type ThesaurusQuery = components['schemas']['ThesaurusQuery']
export type LocalesList = components['schemas']['LocalesList']
export type OrderingsList = components['schemas']['OrderingsList']

export type ThesaurusListParams = NonNullable<operations['thesaurus_list']['parameters']['query']>

export interface ThesauriServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ThesauriService {
    private readonly basePath: string
    private readonly operations = thesauriServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ThesauriServiceOptions = {}) {
        this.basePath = options.basePath ?? thesauriServiceConfig.basePath
    }

    async list(params?: ThesaurusListParams, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return invokeOperation<ThesaurusListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: ThesaurusQuery, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return invokeOperation<ThesaurusListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Thesaurus> {
        return invokeOperation<Thesaurus>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
