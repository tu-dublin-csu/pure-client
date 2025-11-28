import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, publishersServiceConfig } from './service-config'

export type Publisher = components['schemas']['Publisher']
export type PublisherListResult = components['schemas']['PublisherListResult']
export type PublishersQuery = components['schemas']['PublishersQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type OrderingsList = components['schemas']['OrderingsList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type PublisherListParams = NonNullable<operations['publisher_list']['parameters']['query']>
export type PublisherDependentsParams = NonNullable<operations['publisher_dependents']['parameters']['query']>
export type PublisherNotesParams = NonNullable<operations['publisher_listNotes']['parameters']['query']>
export type PublisherAllowedDisciplinesParams = NonNullable<operations['publisher_getAllowedDisciplines']['parameters']['query']>

type PublisherPathParams = operations['publisher_get']['parameters']['path']
type PublisherDependentsPathParams = operations['publisher_dependents']['parameters']['path']
type PublisherDisciplineAssociationPathParams = operations['publisher_getDisciplineAssociation']['parameters']['path']
type PublisherDisciplineSearchPathParams = operations['publisher_listDisciplineAssociations']['parameters']['path']
type PublisherAllowedDisciplinePathParams = operations['publisher_getAllowedDisciplines']['parameters']['path']
type PublisherNotesPathParams = operations['publisher_listNotes']['parameters']['path']
type PublisherKeywordGroupClassificationPathParams =
    operations['publisher_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface PublishersServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class PublishersService {
    private readonly basePath: string
    private readonly operations = publishersServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PublishersServiceOptions = {}) {
        this.basePath = options.basePath ?? publishersServiceConfig.basePath
    }

    async list(params?: PublisherListParams, config?: AxiosRequestConfig): Promise<PublisherListResult> {
        return invokeOperation<PublisherListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: PublishersQuery, config?: AxiosRequestConfig): Promise<PublisherListResult> {
        return invokeOperation<PublisherListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: Publisher, config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: PublisherPathParams['uuid'], payload: Publisher, config?: AxiosRequestConfig): Promise<Publisher> {
        return invokeOperation<Publisher>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: PublisherPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(
        uuid: PublisherDependentsPathParams['uuid'],
        params?: PublisherDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getDisciplineAssociation(
        uuid: PublisherDisciplineAssociationPathParams['uuid'],
        disciplineScheme: PublisherDisciplineAssociationPathParams['discipline-scheme'],
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.getDisciplineAssociation,
            {
                pathParams: {
                    uuid,
                    'discipline-scheme': disciplineScheme
                },
                config
            }
        )
    }

    async updateDisciplineAssociation(
        uuid: PublisherDisciplineAssociationPathParams['uuid'],
        disciplineScheme: PublisherDisciplineAssociationPathParams['discipline-scheme'],
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(
            this.client,
            this.basePath,
            this.operations.updateDisciplineAssociation,
            {
                pathParams: {
                    uuid,
                    'discipline-scheme': disciplineScheme
                },
                body: payload,
                config
            }
        )
    }

    async listDisciplineAssociations(
        disciplineScheme: PublisherDisciplineSearchPathParams['discipline-scheme'],
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
        disciplineScheme: PublisherAllowedDisciplinePathParams['discipline-scheme'],
        params?: PublisherAllowedDisciplinesParams,
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

    async listNotes(
        uuid: PublisherNotesPathParams['uuid'],
        params?: PublisherNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: PublisherNotesPathParams['uuid'],
        note: Note,
        config?: AxiosRequestConfig
    ): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCountries,
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
        id: PublisherKeywordGroupClassificationPathParams['id'],
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

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
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
