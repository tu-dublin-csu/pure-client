import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Event = components['schemas']['Event']
export type EventListResult = components['schemas']['EventListResult']
export type EventsQuery = components['schemas']['EventsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']

export type EventListParams = NonNullable<operations['event_list']['parameters']['query']>
export type EventNotesParams = NonNullable<operations['event_listNotes']['parameters']['query']>
export type EventAllowedDisciplinesParams = NonNullable<operations['event_getAllowedDisciplines']['parameters']['query']>

export interface EventsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/events'

export class EventsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: EventsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: EventListParams, config?: AxiosRequestConfig): Promise<EventListResult> {
        return this.client.get<EventListResult>(this.basePath, params, config)
    }

    async query(body: EventsQuery, config?: AxiosRequestConfig): Promise<EventListResult> {
        return this.client.post<EventListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Event> {
        return this.client.get<Event>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Event, config?: AxiosRequestConfig): Promise<Event> {
        return this.client.put<Event>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Event, config?: AxiosRequestConfig): Promise<Event> {
        return this.client.put<Event>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async listDisciplineAssociations(
        disciplineScheme: string,
        body: DisciplinesAssociationsQuery,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesAssociationListResult> {
        return this.client.post<DisciplinesAssociationListResult>(
            `${this.basePath}/disciplines/${disciplineScheme}/search`,
            body,
            undefined,
            config
        )
    }

    async getAllowedDisciplines(
        disciplineScheme: string,
        params?: EventAllowedDisciplinesParams,
        config?: AxiosRequestConfig
    ): Promise<DisciplinesDisciplineListResult> {
        return this.client.get<DisciplinesDisciplineListResult>(
            `${this.basePath}/disciplines/${disciplineScheme}/allowed-disciplines`,
            params,
            config
        )
    }

    async getAllowedDisciplineSchemes(config?: AxiosRequestConfig): Promise<DisciplinesDisciplineSchemeListResult> {
        return this.client.get<DisciplinesDisciplineSchemeListResult>(
            `${this.basePath}/disciplines/allowed-discipline-schemes`,
            undefined,
            config
        )
    }

    async listNotes(uuid: string, params?: EventNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
    }

    async getAllowedCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-countries`, undefined, config)
    }

    async getAllowedDegreeOfRecognitions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-degree-of-recognition`, undefined, config)
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

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-link-types`, undefined, config)
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getAllowedSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-subdivision`, undefined, config)
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
