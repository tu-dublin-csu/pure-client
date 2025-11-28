import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { dataSetsServiceConfig, invokeOperation } from './service-config'

export type DataSet = components['schemas']['DataSet']
export type DataSetListResult = components['schemas']['DataSetListResult']
export type DataSetsQuery = components['schemas']['DataSetsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type UploadedFile = components['schemas']['UploadedFile']

export type DataSetListParams = NonNullable<operations['dataSet_list']['parameters']['query']>
export type DataSetNotesParams = NonNullable<operations['dataSet_listNotes']['parameters']['query']>

type DataSetPathParams = operations['dataSet_get']['parameters']['path']
type DataSetNotesPathParams = operations['dataSet_listNotes']['parameters']['path']
type DataSetFilePathParams = operations['dataSet_getFile']['parameters']['path']
type DataSetCustomFieldPathParams = operations['dataSet_getAllowedCustomDefinedFieldClassifications']['parameters']['path']
type DataSetKeywordGroupPathParams = operations['dataSet_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface DataSetsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class DataSetsService {
    private readonly basePath: string
    private readonly operations = dataSetsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: DataSetsServiceOptions = {}) {
        this.basePath = options.basePath ?? dataSetsServiceConfig.basePath
    }

    async list(params?: DataSetListParams, config?: AxiosRequestConfig): Promise<DataSetListResult> {
        return invokeOperation<DataSetListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: DataSetsQuery, config?: AxiosRequestConfig): Promise<DataSetListResult> {
        return invokeOperation<DataSetListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: DataSetPathParams['uuid'], config?: AxiosRequestConfig): Promise<DataSet> {
        return invokeOperation<DataSet>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: DataSet, config?: AxiosRequestConfig): Promise<DataSet> {
        return invokeOperation<DataSet>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: DataSetPathParams['uuid'], payload: DataSet, config?: AxiosRequestConfig): Promise<DataSet> {
        return invokeOperation<DataSet>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: DataSetPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: DataSetPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: DataSetPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async getFile(
        uuid: DataSetFilePathParams['uuid'],
        fileId: DataSetFilePathParams['fileId'],
        config?: AxiosRequestConfig
    ): Promise<string> {
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
        uuid: DataSetNotesPathParams['uuid'],
        params?: DataSetNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: DataSetNotesPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedIdentifierTypes,
            { config }
        )
    }

    async getAllowedContributorsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedContributorsRoles,
            { config }
        )
    }

    async getAllowedCustomDefinedFieldClassifications(
        propertyName: DataSetCustomFieldPathParams['propertyName'],
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { propertyName },
                config
            }
        )
    }

    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDescriptionTypes,
            { config }
        )
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentLicenses,
            { config }
        )
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDocumentTypes,
            { config }
        )
    }

    async getAllowedDoiAccessTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDoiAccessTypes,
            { config }
        )
    }

    async getAllowedDoiLicenseTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedDoiLicenseTypes,
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

    async getAllowedKeywordGroupConfigurations(
        config?: AxiosRequestConfig
    ): Promise<AllowedKeywordGroupConfigurationList> {
        return invokeOperation<AllowedKeywordGroupConfigurationList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurations,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: DataSetKeywordGroupPathParams['id'],
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

    async getAllowedLegalConditionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLegalConditionTypes,
            { config }
        )
    }

    async getAllowedLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLicenses,
            { config }
        )
    }

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLinkTypes,
            { config }
        )
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLocales,
            { config }
        )
    }

    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
            { config }
        )
    }

    async getAllowedOpenAccessPermissions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedOpenAccessPermissions,
            { config }
        )
    }

    async getAllowedPersonsRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonsRoles,
            { config }
        )
    }

    async getAllowedPhysicalDataTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPhysicalDataTypes,
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
}
