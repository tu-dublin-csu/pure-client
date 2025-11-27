import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Application = components['schemas']['Application']
export type ApplicationListResult = components['schemas']['ApplicationListResult']
export type ApplicationsQuery = components['schemas']['ApplicationsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type Note = components['schemas']['Note']
export type OrderingsList = components['schemas']['OrderingsList']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type ApplicationBudget = components['schemas']['ApplicationBudget']
export type ApplicationBudgetResult = components['schemas']['ApplicationBudgetResult']
export type ApplicationCluster = components['schemas']['ApplicationCluster']

export type ApplicationListParams = NonNullable<operations['application_list']['parameters']['query']>
export type ApplicationDependentsParams = NonNullable<operations['application_dependents']['parameters']['query']>

export interface ApplicationsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/applications'

export class ApplicationsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: ApplicationsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: ApplicationListParams, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return this.client.get<ApplicationListResult>(this.basePath, params, config)
    }

    async query(body: ApplicationsQuery, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return this.client.post<ApplicationListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Application> {
        return this.client.get<Application>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return this.client.put<Application>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return this.client.put<Application>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async getBudgets(uuid: string, config?: AxiosRequestConfig): Promise<ApplicationBudgetResult> {
        return this.client.get<ApplicationBudgetResult>(`${this.basePath}/${uuid}/budgets`, undefined, config)
    }

    async getBudget(uuid: string, id: number, config?: AxiosRequestConfig): Promise<ApplicationBudget> {
        return this.client.get<ApplicationBudget>(`${this.basePath}/${uuid}/budgets/${id}`, undefined, config)
    }

    async updateBudget(uuid: string, id: number, payload: ApplicationBudget, config?: AxiosRequestConfig): Promise<ApplicationBudget> {
        return this.client.put<ApplicationBudget>(`${this.basePath}/${uuid}/budgets/${id}`, payload, undefined, config)
    }

    async getCluster(uuid: string, config?: AxiosRequestConfig): Promise<ApplicationCluster> {
        return this.client.get<ApplicationCluster>(`${this.basePath}/${uuid}/cluster`, undefined, config)
    }

    async listDependents(uuid: string, params?: ApplicationDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
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

    async getAllowedApplicantRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-applicant-roles`, undefined, config)
    }

    async getAllowedStatuses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-application-statuses`, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }

    async listNotes(uuid: string, config?: AxiosRequestConfig): Promise<components['schemas']['NoteListResult']> {
        return this.client.get<components['schemas']['NoteListResult']>(`${this.basePath}/${uuid}/notes`, undefined, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }
}
