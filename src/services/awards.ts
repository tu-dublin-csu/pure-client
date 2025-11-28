import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { awardsServiceConfig, invokeOperation } from './service-config'

export type Award = components['schemas']['Award']
export type AwardListResult = components['schemas']['AwardListResult']
export type AwardsQuery = components['schemas']['AwardsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type AwardBudget = components['schemas']['AwardBudget']
export type AwardBudgetResult = components['schemas']['AwardBudgetResult']
export type AwardCluster = components['schemas']['AwardCluster']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']

export type AwardListParams = NonNullable<operations['award_list']['parameters']['query']>
export type AwardDependentsParams = NonNullable<operations['award_dependents']['parameters']['query']>

export interface AwardsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class AwardsService {
    private readonly basePath: string
    private readonly operations = awardsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: AwardsServiceOptions = {}) {
        this.basePath = options.basePath ?? awardsServiceConfig.basePath
    }

    async list(params?: AwardListParams, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return invokeOperation<AwardListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: AwardsQuery, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return invokeOperation<AwardListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: string, payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return invokeOperation<Award>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async getBudgets(uuid: string, config?: AxiosRequestConfig): Promise<AwardBudgetResult> {
        return invokeOperation<AwardBudgetResult>(this.client, this.basePath, this.operations.getBudgets, {
            pathParams: { uuid },
            config
        })
    }

    async getBudget(uuid: string, id: number, config?: AxiosRequestConfig): Promise<AwardBudget> {
        return invokeOperation<AwardBudget>(this.client, this.basePath, this.operations.getBudget, {
            pathParams: { uuid, id },
            config
        })
    }

    async updateBudget(uuid: string, id: number, payload: AwardBudget, config?: AxiosRequestConfig): Promise<AwardBudget> {
        return invokeOperation<AwardBudget>(this.client, this.basePath, this.operations.updateBudget, {
            pathParams: { uuid, id },
            body: payload,
            config
        })
    }

    async getCluster(uuid: string, config?: AxiosRequestConfig): Promise<AwardCluster> {
        return invokeOperation<AwardCluster>(this.client, this.basePath, this.operations.getCluster, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(uuid: string, params?: AwardDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getDisciplineAssociation(uuid: string, disciplineScheme: string, config?: AxiosRequestConfig): Promise<DisciplinesAssociation> {
        return invokeOperation<DisciplinesAssociation>(this.client, this.basePath, this.operations.getDisciplineAssociation, {
            pathParams: { uuid, 'discipline-scheme': disciplineScheme },
            config
        })
    }

    async updateDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
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

    async listNotes(uuid: string, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            config
        })
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return invokeOperation<Note>(this.client, this.basePath, this.operations.createNote, {
            pathParams: { uuid },
            body: note,
            config
        })
    }

    async getAllowedAwardholderRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAwardholderRoles,
            {
                config
            }
        )
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedTypes, {
            config
        })
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }
}
