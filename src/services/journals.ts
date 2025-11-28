import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, journalsServiceConfig } from './service-config'

export type Journal = components['schemas']['Journal']
export type JournalListResult = components['schemas']['JournalListResult']
export type JournalsQuery = components['schemas']['JournalsQuery']
export type MetricCollection = components['schemas']['MetricCollection']
export type MetricCollectionDefinitionList = components['schemas']['MetricCollectionDefinitionList']
export type OrderingsList = components['schemas']['OrderingsList']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']

export type JournalListParams = NonNullable<operations['journal_list']['parameters']['query']>
export type JournalDependentsParams = NonNullable<operations['journal_dependents']['parameters']['query']>
export type JournalNotesParams = NonNullable<operations['journal_listNotes']['parameters']['query']>
export type JournalAllowedDisciplinesParams = NonNullable<operations['journal_getAllowedDisciplines']['parameters']['query']>

type JournalPathParams = operations['journal_get']['parameters']['path']
type JournalDependentsPathParams = operations['journal_dependents']['parameters']['path']
type JournalDisciplineAssociationPathParams = operations['journal_getDisciplineAssociation']['parameters']['path']
type JournalDisciplineSearchPathParams = operations['journal_listDisciplineAssociations']['parameters']['path']
type JournalAllowedDisciplinePathParams = operations['journal_getAllowedDisciplines']['parameters']['path']
type JournalMetricsPathParams = operations['journal_listMetricsFromCollection']['parameters']['path']
type JournalNotesPathParams = operations['journal_listNotes']['parameters']['path']
type JournalKeywordGroupClassificationPathParams =
    operations['journal_getAllowedKeywordGroupConfigurationClassifications']['parameters']['path']

export interface JournalsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class JournalsService {
    private readonly basePath: string
    private readonly operations = journalsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: JournalsServiceOptions = {}) {
        this.basePath = options.basePath ?? journalsServiceConfig.basePath
    }

    async list(params?: JournalListParams, config?: AxiosRequestConfig): Promise<JournalListResult> {
        return invokeOperation<JournalListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: JournalsQuery, config?: AxiosRequestConfig): Promise<JournalListResult> {
        return invokeOperation<JournalListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: Journal, config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: JournalPathParams['uuid'], payload: Journal, config?: AxiosRequestConfig): Promise<Journal> {
        return invokeOperation<Journal>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: JournalPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(
        uuid: JournalDependentsPathParams['uuid'],
        params?: JournalDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getDisciplineAssociation(
        uuid: JournalDisciplineAssociationPathParams['uuid'],
        disciplineScheme: JournalDisciplineAssociationPathParams['discipline-scheme'],
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
        uuid: JournalDisciplineAssociationPathParams['uuid'],
        disciplineScheme: JournalDisciplineAssociationPathParams['discipline-scheme'],
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
        disciplineScheme: JournalDisciplineSearchPathParams['discipline-scheme'],
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
        disciplineScheme: JournalAllowedDisciplinePathParams['discipline-scheme'],
        params?: JournalAllowedDisciplinesParams,
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

    async getAllowedDisciplineSchemes(
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineSchemeListResult> {
        return invokeOperation<DisciplinesDisciplineSchemeListResult>(
            this.client,
            this.basePath,
            this.operations.getAllowedDisciplineSchemes,
            { config }
        )
    }

    async listMetricsFromCollection(
        uuid: JournalMetricsPathParams['uuid'],
        collectionId: JournalMetricsPathParams['collection-id'],
        config?: AxiosRequestConfig
    ): Promise<MetricCollection> {
        return invokeOperation<MetricCollection>(this.client, this.basePath, this.operations.listMetricsFromCollection, {
            pathParams: { uuid, 'collection-id': collectionId },
            config
        })
    }

    async listNotes(
        uuid: JournalNotesPathParams['uuid'],
        params?: JournalNotesParams,
        config?: AxiosRequestConfig
    ): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async createNote(
        uuid: JournalNotesPathParams['uuid'],
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
        id: JournalKeywordGroupClassificationPathParams['id'],
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

    async getAllowedMetricCollections(config?: AxiosRequestConfig): Promise<MetricCollectionDefinitionList> {
        return invokeOperation<MetricCollectionDefinitionList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMetricCollections,
            { config }
        )
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
