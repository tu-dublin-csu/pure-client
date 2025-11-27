import type { AxiosRequestConfig } from 'axios'

import type { components, paths } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type ResearchOutput = components['schemas']['ResearchOutput']
export type ResearchOutputListResult = components['schemas']['ResearchOutputListResult']
export type ResearchOutputsQuery = components['schemas']['ResearchOutputsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type OrderingsList = components['schemas']['OrderingsList']

export type ResearchOutputListParams = NonNullable<
    paths['/research-outputs']['get']['parameters']['query']
>

export type ResearchOutputGetParams = NonNullable<
    paths['/research-outputs/{uuid}']['get']['parameters']['path']
>

export type ResearchOutputDeleteParams = ResearchOutputGetParams

export interface ResearchOutputsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/research-outputs'

export class ResearchOutputsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ResearchOutputsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(
        params?: ResearchOutputListParams,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutputListResult> {
        return this.client.get<ResearchOutputListResult>(this.basePath, params, config)
    }

    async query(
        body: ResearchOutputsQuery,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutputListResult> {
        return this.client.post<ResearchOutputListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(
        uuid: ResearchOutputGetParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return this.client.get<ResearchOutput>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(
        payload: ResearchOutput,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return this.client.put<ResearchOutput>(this.basePath, payload, undefined, config)
    }

    async update(
        uuid: ResearchOutputGetParams['uuid'],
        payload: ResearchOutput,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return this.client.put<ResearchOutput>(`${this.basePath}/${uuid}`, payload, undefined, config)
    }

    async remove(
        uuid: ResearchOutputDeleteParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<void> {
        await this.client.delete<void>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-categories`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
