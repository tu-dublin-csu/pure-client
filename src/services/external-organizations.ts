import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { externalOrganizationsServiceConfig, invokeOperation } from './service-config'

export type ExternalOrganization = components['schemas']['ExternalOrganization']
export type ExternalOrganizationListResult = components['schemas']['ExternalOrganizationListResult']
export type ExternalOrganizationsQuery = components['schemas']['ExternalOrganizationsQuery']
export type ExternalOrganizationRefList = components['schemas']['ExternalOrganizationRefList']
export type ExternalOrganizationList = components['schemas']['ExternalOrganizationList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type UploadedFile = components['schemas']['UploadedFile']

export type ExternalOrganizationListParams = NonNullable<operations['externalOrganization_list']['parameters']['query']>
export type ExternalOrganizationDependentsParams = NonNullable<operations['externalOrganization_dependents']['parameters']['query']>
export type ExternalOrganizationNotesParams = NonNullable<operations['externalOrganization_listNotes']['parameters']['query']>
export type ExternalOrganizationAllowedDisciplinesParams = NonNullable<operations['externalOrganization_getAllowedDisciplines']['parameters']['query']>

type ExternalOrganizationPathParams = operations['externalOrganization_get']['parameters']['path']
type ExternalOrganizationDependentsPathParams = operations['externalOrganization_dependents']['parameters']['path']
type ExternalOrganizationDisciplinePathParams = operations['externalOrganization_getDisciplineAssociation']['parameters']['path']
type ExternalOrganizationDisciplineListPathParams = operations['externalOrganization_listDisciplineAssociations']['parameters']['path']
type ExternalOrganizationAllowedDisciplinePathParams = operations['externalOrganization_getAllowedDisciplines']['parameters']['path']
type ExternalOrganizationFilePathParams = operations['externalOrganization_getFile']['parameters']['path']
type ExternalOrganizationKeywordGroupPathParams = operations['externalOrganization_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface ExternalOrganizationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class ExternalOrganizationsService {
    private readonly basePath: string
    private readonly operations = externalOrganizationsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ExternalOrganizationsServiceOptions = {}) {
        this.basePath = options.basePath ?? externalOrganizationsServiceConfig.basePath
    }

    async list(
        params?: ExternalOrganizationListParams,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(
        body: ExternalOrganizationsQuery,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: ExternalOrganization, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(
        uuid: ExternalOrganizationPathParams['uuid'],
        payload: ExternalOrganization,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: ExternalOrganizationPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(
        uuid: ExternalOrganizationDependentsPathParams['uuid'],
        params?: ExternalOrganizationDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getDisciplineAssociation(
        uuid: ExternalOrganizationDisciplinePathParams['uuid'],
        disciplineScheme: ExternalOrganizationDisciplinePathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.getDisciplineAssociation,
            {
                pathParams: { uuid, 'discipline-scheme': disciplineScheme },
                config
            }
        )
    }

    async updateDisciplineAssociation(
        uuid: ExternalOrganizationDisciplinePathParams['uuid'],
        disciplineScheme: ExternalOrganizationDisciplinePathParams['discipline-scheme'],
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.updateDisciplineAssociation,
            {
                pathParams: { uuid, 'discipline-scheme': disciplineScheme },
                body: payload,
                config
            }
        )
    }

    async listDisciplineAssociations(
        disciplineScheme: ExternalOrganizationDisciplineListPathParams['discipline-scheme'],
        body: DisciplinesAssociationsQuery,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociationListResult> {
        return invokeOperation<DisciplinesAssociationListResult>(
            this.client,
            this.basePath,
            this.operations.listDisciplineAssociations,
            {
                pathParams: { 'discipline-scheme': disciplineScheme },
                body,
                config
            }
        )
    }

    async getAllowedDisciplines(
        disciplineScheme: ExternalOrganizationAllowedDisciplinePathParams['discipline-scheme'],
        params?: ExternalOrganizationAllowedDisciplinesParams,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineListResult> {
        return invokeOperation<DisciplinesDisciplineListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplines,
            {
                pathParams: { 'discipline-scheme': disciplineScheme },
                query: params,
                config
            }
        )
    }

    async getAllowedDisciplineSchemes(config?: AxiosRequestConfig): Promise<DisciplinesDisciplineSchemeListResult> {
        return invokeOperation<DisciplinesDisciplineSchemeListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplineSchemes,
            { config }
        )
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }

    async listNotes(
        uuid: ExternalOrganizationPathParams['uuid'],
        params?: ExternalOrganizationNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: ExternalOrganizationPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    async getFile(
        uuid: ExternalOrganizationFilePathParams['uuid'],
        fileId: ExternalOrganizationFilePathParams['fileId'],
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

    async merge(refs: ExternalOrganizationRefList, config?: AxiosRequestConfig): Promise<ExternalOrganization> {
        return invokeOperation<ExternalOrganization>(this.client, this.basePath, this.operations.merge, {
            body: refs,
            config
        })
    }

    async previewDeduplication(
        organizations: ExternalOrganizationList,
        config?: AxiosRequestConfig
    ): Promise<ExternalOrganizationListResult> {
        return invokeOperation<ExternalOrganizationListResult>(
            this.client,
            this.basePath,
            this.operations.previewDeduplication,
            {
                body: organizations,
                config
            }
        )
    }

    async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressCountries,
            { config }
        )
    }

    async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressSubdivisions,
            { config }
        )
    }

    async getAllowedClassifiedImageTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedImageTypes,
            { config }
        )
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedClassifiedIdentifierTypes,
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

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return invokeOperation<AllowedKeywordGroupConfigurationList>(
            this.client,
            this.basePath,
            this.operations.getAllowedKeywordGroupConfigurations,
            { config }
        )
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: ExternalOrganizationKeywordGroupPathParams['id'],
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

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLinkTypes,
            { config }
        )
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    async getAllowedNatureTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNatureTypes,
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
