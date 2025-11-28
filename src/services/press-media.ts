import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, pressMediaServiceConfig } from './service-config'

export type PressMedia = components['schemas']['PressMedia']
export type PressMediaListResult = components['schemas']['PressMediaListResult']
export type PressMediaQuery = components['schemas']['PressMediaQuery']
export type OrderingsList = components['schemas']['OrderingsList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type UploadedFile = components['schemas']['UploadedFile']
export type APIStringListResult = components['schemas']['APIStringListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type PressMediaListParams = NonNullable<operations['pressmedia_list']['parameters']['query']>
export type PressMediaNotesParams = NonNullable<operations['pressmedia_listNotes']['parameters']['query']>

type PressMediaPathParams = operations['pressmedia_get']['parameters']['path']
type PressMediaFilePathParams = operations['pressmedia_getFile']['parameters']['path']
type PressMediaCustomFieldPathParams = operations['pressmedia_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type PressMediaKeywordGroupPathParams = operations['pressmedia_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface PressMediaServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PressMediaService {
    private readonly basePath: string
    private readonly operations = pressMediaServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PressMediaServiceOptions = {}) {
        this.basePath = options.basePath ?? pressMediaServiceConfig.basePath
    }

    async list(params?: PressMediaListParams, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return invokeOperation<PressMediaListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: PressMediaQuery, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return invokeOperation<PressMediaListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: PressMediaPathParams['uuid'], payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return invokeOperation<PressMedia>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: PressMediaPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async getFile(uuid: PressMediaFilePathParams['uuid'], fileId: PressMediaFilePathParams['fileId'], config?: AxiosRequestConfig): Promise<string> {
        return invokeOperation<string>(this.client, this.basePath, this.operations.getFile, {
            pathParams: { uuid, fileId },
            config
        })
    }

    async uploadFile(file: string, contentType?: string, config?: AxiosRequestConfig): Promise<UploadedFile> {
        const uploadConfig = contentType
            ? {
                  ...config,
                  headers: {
                      ...(config?.headers ?? {}),
                      'Content-Type': contentType
                  }
              }
            : config

        return invokeOperation<UploadedFile>(this.client, this.basePath, this.operations.uploadFile, {
            body: file,
            config: uploadConfig
        })
    }

    async listNotes(
        uuid: PressMediaPathParams['uuid'],
        params?: PressMediaNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: PressMediaPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
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

    async getAllowedCustomDefinedFieldClassifications(
        fieldIdentifier: PressMediaCustomFieldPathParams['fieldIdentifer'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        // API spec exposes the misspelled token `fieldIdentifer` for this path parameter.
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { fieldIdentifer: fieldIdentifier },
                config
            }
        )
    }

    async getAllowedDescriptionsTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDescriptionsTypes,
            { config }
        )
    }

    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedImageTypes,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return invokeOperation<AllowedKeywordGroupConfigurationList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurations,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: PressMediaKeywordGroupPathParams['id'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurationClassifications,
            {
                pathParams: { id },
                config
            }
        )
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    async getAllowedMediaCoverageTypes(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return invokeOperation<APIStringListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoverageTypes,
            { config }
        )
    }

    async getAllowedMediaCoveragesCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesCountries,
            { config }
        )
    }

    async getAllowedMediaCoveragesDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesDegreeOfRecognitions,
            { config }
        )
    }

    async getAllowedMediaCoveragesMediaTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesMediaTypes,
            { config }
        )
    }

    async getAllowedMediaCoveragesPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesPersonsRoles,
            { config }
        )
    }

    async getAllowedMediaCoveragesSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMediaCoveragesSubdivisions,
            { config }
        )
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTypes,
            { config }
        )
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return invokeOperation<WorkflowListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedWorkflowSteps,
            { config }
        )
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
