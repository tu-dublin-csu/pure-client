import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { applicationsServiceConfig, invokeOperation } from './service-config'

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

export class ApplicationsService {
    private readonly basePath: string
    private readonly operations = applicationsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: ApplicationsServiceOptions = {}) {
        this.basePath = options.basePath ?? applicationsServiceConfig.basePath
    }

    async list(params?: ApplicationListParams, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return invokeOperation<ApplicationListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: ApplicationsQuery, config?: AxiosRequestConfig): Promise<ApplicationListResult> {
        return invokeOperation<ApplicationListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: string, payload: Application, config?: AxiosRequestConfig): Promise<Application> {
        return invokeOperation<Application>(this.client, this.basePath, this.operations.update, {
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

    async getBudgets(uuid: string, config?: AxiosRequestConfig): Promise<ApplicationBudgetResult> {
        return invokeOperation<ApplicationBudgetResult>(this.client, this.basePath, this.operations.getBudgets, {
            pathParams: { uuid },
            config
        })
    }

    async getBudget(uuid: string, id: number, config?: AxiosRequestConfig): Promise<ApplicationBudget> {
        return invokeOperation<ApplicationBudget>(this.client, this.basePath, this.operations.getBudget, {
            pathParams: { uuid, id },
            config
        })
    }

    async updateBudget(uuid: string, id: number, payload: ApplicationBudget, config?: AxiosRequestConfig): Promise<ApplicationBudget> {
        return invokeOperation<ApplicationBudget>(this.client, this.basePath, this.operations.updateBudget, {
            pathParams: { uuid, id },
            body: payload,
            config
        })
    }

    async getCluster(uuid: string, config?: AxiosRequestConfig): Promise<ApplicationCluster> {
        return invokeOperation<ApplicationCluster>(this.client, this.basePath, this.operations.getCluster, {
            pathParams: { uuid },
            config
        })
    }

    async listDependents(uuid: string, params?: ApplicationDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
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

    async getAllowedApplicantRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedApplicantRoles, {
            config
        })
    }

    async getAllowedStatuses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedStatuses, {
            config
        })
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, {
            config
        })
    }

    async listNotes(uuid: string, config?: AxiosRequestConfig): Promise<components['schemas']['NoteListResult']> {
        return invokeOperation<components['schemas']['NoteListResult']>(this.client, this.basePath, this.operations.listNotes, {
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
}
