import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Activity = components['schemas']['Activity']
export type ActivityListResult = components['schemas']['ActivityListResult']
export type ActivitiesQuery = components['schemas']['ActivitiesQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type Note = components['schemas']['Note']
export type OrderingsList = components['schemas']['OrderingsList']

export type ActivityListParams = NonNullable<operations['activity_list']['parameters']['query']>

export interface ActivitiesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/activities'

export class ActivitiesService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ActivitiesServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ActivityListParams, config?: AxiosRequestConfig): Promise<ActivityListResult> {
        return this.client.get<ActivityListResult>(this.basePath, params, config)
    }

    async query(body: ActivitiesQuery, config?: AxiosRequestConfig): Promise<ActivityListResult> {
        return this.client.post<ActivityListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Activity> {
        return this.client.get<Activity>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Activity, config?: AxiosRequestConfig): Promise<Activity> {
        return this.client.put<Activity>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Activity, config?: AxiosRequestConfig): Promise<Activity> {
        return this.client.put<Activity>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async getAllowedCategories(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-categories`, undefined, config)
    }

    async getAllowedDescriptionTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-description-types`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
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

    async listNotes(uuid: string, config?: AxiosRequestConfig): Promise<components['schemas']['NoteListResult']> {
        return this.client.get<components['schemas']['NoteListResult']>(`${this.basePath}/${uuid}/notes`, undefined, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }
}
