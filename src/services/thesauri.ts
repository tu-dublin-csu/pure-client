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

    /**
     * Lists all thesauri
     *
     * Lists all thesauri in the Pure instance. If you need to filter the thesauri returned, see the POST version which supports additional filtering.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned thesauri per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /thesauri/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: ThesaurusListParams, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return invokeOperation<ThesaurusListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Query operation for thesauri
     *
     * Lists thesauri in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.
     *
     * @param body Required request body. The query to perform
     * @param config Axios request configuration overrides.
     */
    async query(body: ThesaurusQuery, config?: AxiosRequestConfig): Promise<ThesaurusListResult> {
        return invokeOperation<ThesaurusListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    /**
     * Get thesaurus
     *
     * Get thesaurus with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired thesaurus
     * @param config Axios request configuration overrides.
     */
    async get(uuid: string, config?: AxiosRequestConfig): Promise<Thesaurus> {
        return invokeOperation<Thesaurus>(this.client, this.basePath, this.operations.get, {
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
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the thesaurus endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
