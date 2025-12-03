import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { classificationSchemesServiceConfig, invokeOperation } from './service-config'

export type ClassificationScheme = components['schemas']['ClassificationScheme']
export type ClassificationSchemeList = components['schemas']['ClassificationSchemeList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type LocalesList = components['schemas']['LocalesList']

export type ClassificationSchemeListParams = NonNullable<
    operations['classificationScheme_list']['parameters']['query']
>

type ClassificationSchemePathParams = operations['classificationScheme_get']['parameters']['path']

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export interface ClassificationSchemesServiceOptions {
    basePath?: string
}

export class ClassificationSchemesService {
    private readonly basePath: string
    private readonly operations = classificationSchemesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ClassificationSchemesServiceOptions = {}) {
        this.basePath = options.basePath ?? classificationSchemesServiceConfig.basePath
    }

    /**
     * Lists all classification schemes
     *
     * Lists all classification schemes in the Pure instance.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned classification schemes per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from classificationSchemes_getOrderings
     * @param config Axios request configuration overrides.
     */
    async list(
        params?: ClassificationSchemeListParams,
        config?: AxiosRequestConfig
    ): Promise<ClassificationSchemeList> {
        return invokeOperation<ClassificationSchemeList>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Get classification scheme
     *
     * Get classification scheme with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the desired classification scheme
     * @param config Axios request configuration overrides.
     */
    async get(uuid: ClassificationSchemePathParams['uuid'], config?: AxiosRequestConfig): Promise<ClassificationScheme> {
        return invokeOperation<ClassificationScheme>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create classification scheme
     *
     * Create classification scheme
     *
     * @param payload Required request body. The content to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: ClassificationScheme, config?: AxiosRequestConfig): Promise<ClassificationScheme> {
        return invokeOperation<ClassificationScheme>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update classification scheme
     *
     * Update classification scheme with specific UUID. Note: terms of all containedClassifications must be defined in all UI locales.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the classification scheme to update. Note: terms of all containedClassifications must be defined in all UI locales.
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(
        uuid: ClassificationSchemePathParams['uuid'],
        payload: ClassificationScheme,
        config?: AxiosRequestConfig
    ): Promise<ClassificationScheme> {
        return invokeOperation<ClassificationScheme>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete classification scheme
     *
     * Delete classification scheme with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the classification scheme
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: ClassificationSchemePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async lock(uuid: ClassificationSchemePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
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
    async unlock(uuid: ClassificationSchemePathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * A list of allowed associated schemes classifications
     *
     * Get a list of allowed types of associated classification schemes that can be used for the getAssociatedSchemes.classification attribute on classification scheme
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedAssociatedSchemesClassifications(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAssociatedSchemesClassifications,
            {
                config
            }
        )
    }

    /**
     * A list of allowed locales in localized strings
     *
     * Get a list of allowed locales that can be used when submitting localized string entities. Example usage: Terms of contained classifications must be defined in all these locales.
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, {
            config
        })
    }

    /**
     * A list of allowed types of classification schemes
     *
     * Get a list of allowed types that can be used for the 'typeClassification' attribute of classification scheme
     *
     * @param config Axios request configuration overrides.
     */
    async getAllowedTypeClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTypeClassifications,
            {
                config
            }
        )
    }
}
