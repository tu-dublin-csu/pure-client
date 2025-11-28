import type { AxiosRequestConfig } from 'axios'

import type { components, paths } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, researchOutputsServiceConfig } from './service-config'

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

export class ResearchOutputsService {
    private readonly basePath: string
    private readonly operations = researchOutputsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ResearchOutputsServiceOptions = {}) {
        this.basePath = options.basePath ?? researchOutputsServiceConfig.basePath
    }

    async list(
        params?: ResearchOutputListParams,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutputListResult> {
        return invokeOperation<ResearchOutputListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(
        body: ResearchOutputsQuery,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutputListResult> {
        return invokeOperation<ResearchOutputListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(
        uuid: ResearchOutputGetParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(
        payload: ResearchOutput,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(
        uuid: ResearchOutputGetParams['uuid'],
        payload: ResearchOutput,
        config?: AxiosRequestConfig
    ): Promise<ResearchOutput> {
        return invokeOperation<ResearchOutput>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(
        uuid: ResearchOutputDeleteParams['uuid'],
        config?: AxiosRequestConfig
    ): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCategories,
            { config }
        )
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
