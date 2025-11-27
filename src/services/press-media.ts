import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

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

export interface PressMediaServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/pressmedia'

export class PressMediaService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: PressMediaServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: PressMediaListParams, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return this.client.get<PressMediaListResult>(this.basePath, params, config)
    }

    async query(body: PressMediaQuery, config?: AxiosRequestConfig): Promise<PressMediaListResult> {
        return this.client.post<PressMediaListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<PressMedia> {
        return this.client.get<PressMedia>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return this.client.put<PressMedia>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: PressMedia, config?: AxiosRequestConfig): Promise<PressMedia> {
        return this.client.put<PressMedia>(`${this.basePath}/${uuid}`, payload, undefined, config)
    }

    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.delete<void>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/lock`, undefined, undefined, config)
    }

    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/unlock`, undefined, undefined, config)
    }

    async getFile(uuid: string, fileId: string, config?: AxiosRequestConfig): Promise<string> {
        return this.client.get<string>(`${this.basePath}/${uuid}/files/${fileId}`, undefined, config)
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

        return this.client.put<UploadedFile>(`${this.basePath}/file-uploads`, file, undefined, uploadConfig)
    }

    async listNotes(uuid: string, params?: PressMediaNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-categories`, undefined, config)
    }

    async getAllowedCustomDefinedFieldClassifications(fieldIdentifier: string, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-custom-defined-field-values/${fieldIdentifier}/classifications`,
            undefined,
            config
        )
    }

    async getAllowedDescriptionsTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-descriptions-types`, undefined, config)
    }

    async getAllowedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-image-types`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return this.client.get<AllowedKeywordGroupConfigurationList>(`${this.basePath}/allowed-keyword-group-configurations`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurationClassifications(id: number, config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`,
            undefined,
            config
        )
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getAllowedMediaCoverageTypes(config?: AxiosRequestConfig): Promise<APIStringListResult> {
        return this.client.get<APIStringListResult>(`${this.basePath}/allowed-media-coverage-types`, undefined, config)
    }

    async getAllowedMediaCoveragesCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-media-coverages-countries`, undefined, config)
    }

    async getAllowedMediaCoveragesDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-media-coverages-degree-of-recognitions`,
            undefined,
            config
        )
    }

    async getAllowedMediaCoveragesMediaTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-media-coverages-media-types`, undefined, config)
    }

    async getAllowedMediaCoveragesPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-media-coverages-persons-roles`, undefined, config)
    }

    async getAllowedMediaCoveragesSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-media-coverages-subdivisions`, undefined, config)
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
