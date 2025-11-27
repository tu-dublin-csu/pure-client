import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

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

const DEFAULT_BASE_PATH = '/awards'

export class AwardsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: AwardsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: AwardListParams, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return this.client.get<AwardListResult>(this.basePath, params, config)
    }

    async query(body: AwardsQuery, config?: AxiosRequestConfig): Promise<AwardListResult> {
        return this.client.post<AwardListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Award> {
        return this.client.get<Award>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return this.client.put<Award>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Award, config?: AxiosRequestConfig): Promise<Award> {
        return this.client.put<Award>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async getBudgets(uuid: string, config?: AxiosRequestConfig): Promise<AwardBudgetResult> {
        return this.client.get<AwardBudgetResult>(`${this.basePath}/${uuid}/budgets`, undefined, config)
    }

    async getBudget(uuid: string, id: number, config?: AxiosRequestConfig): Promise<AwardBudget> {
        return this.client.get<AwardBudget>(`${this.basePath}/${uuid}/budgets/${id}`, undefined, config)
    }

    async updateBudget(uuid: string, id: number, payload: AwardBudget, config?: AxiosRequestConfig): Promise<AwardBudget> {
        return this.client.put<AwardBudget>(`${this.basePath}/${uuid}/budgets/${id}`, payload, undefined, config)
    }

    async getCluster(uuid: string, config?: AxiosRequestConfig): Promise<AwardCluster> {
        return this.client.get<AwardCluster>(`${this.basePath}/${uuid}/cluster`, undefined, config)
    }

    async listDependents(uuid: string, params?: AwardDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
        return this.client.get<ContentRefListResult>(`${this.basePath}/${uuid}/dependents`, params, config)
    }

    async getDisciplineAssociation(uuid: string, disciplineScheme: string, config?: AxiosRequestConfig): Promise<DisciplinesAssociation> {
        return this.client.get<DisciplinesAssociation>(`${this.basePath}/${uuid}/disciplines/${disciplineScheme}`, undefined, config)
    }

    async updateDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
        payload: DisciplinesAssociation,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociation> {
        return this.client.put<DisciplinesAssociation>(`${this.basePath}/${uuid}/disciplines/${disciplineScheme}`, payload, undefined, config)
    }

    async listNotes(uuid: string, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, undefined, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getAllowedAwardholderRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-awardholder-roles`, undefined, config)
    }

    async getAllowedTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-types`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
