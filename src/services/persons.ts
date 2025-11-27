import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type Person = components['schemas']['Person']
export type PersonListResult = components['schemas']['PersonListResult']
export type PersonsQuery = components['schemas']['PersonsQuery']
export type ClassificationRefList = components['schemas']['ClassificationRefList']
export type AllowedKeywordGroupConfigurationList = components['schemas']['AllowedKeywordGroupConfigurationList']
export type DisciplinesAssociation = components['schemas']['DisciplinesAssociation']
export type DisciplinesAssociationListResult = components['schemas']['DisciplinesAssociationListResult']
export type DisciplinesAssociationsQuery = components['schemas']['DisciplinesAssociationsQuery']
export type DisciplinesDisciplineListResult = components['schemas']['DisciplinesDisciplineListResult']
export type DisciplinesDisciplineSchemeListResult = components['schemas']['DisciplinesDisciplineSchemeListResult']
export type MetricCollectionDefinitionList = components['schemas']['MetricCollectionDefinitionList']
export type MetricCollection = components['schemas']['MetricCollection']
export type PersonSuperviseeAssociationListResult = components['schemas']['PersonSuperviseeAssociationListResult']
export type LocalesList = components['schemas']['LocalesList']
export type WorkflowListResult = components['schemas']['WorkflowListResult']
export type HighlightedContent = components['schemas']['HighlightedContent']
export type ContentRefListResult = components['schemas']['ContentRefListResult']
export type Note = components['schemas']['Note']
export type NoteListResult = components['schemas']['NoteListResult']
export type OrderingsList = components['schemas']['OrderingsList']

export type PersonListParams = NonNullable<operations['person_list']['parameters']['query']>
export type PersonDependentsParams = NonNullable<operations['person_dependents']['parameters']['query']>
export type PersonNotesParams = NonNullable<operations['person_listNotes']['parameters']['query']>
export type PersonAllowedDisciplineParams = NonNullable<operations['person_getAllowedDisciplines']['parameters']['query']>
export type PersonMetricsPathParams = operations['person_listMetricsFromCollection']['parameters']['path']

export interface PersonsServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/persons'

export class PersonsService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: PersonsServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: PersonListParams, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return this.client.get<PersonListResult>(this.basePath, params, config)
    }

    async query(body: PersonsQuery, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return this.client.post<PersonListResult>(`${this.basePath}/search`, body, undefined, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Person> {
        return this.client.get<Person>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return this.client.put<Person>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return this.client.put<Person>(`${this.basePath}/${uuid}`, payload, undefined, config)
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

    async listDependents(uuid: string, params?: PersonDependentsParams, config?: AxiosRequestConfig): Promise<ContentRefListResult> {
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
        params?: PersonAllowedDisciplineParams,
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

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }

    async listNotes(uuid: string, params?: PersonNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return this.client.get<NoteListResult>(`${this.basePath}/${uuid}/notes`, params, config)
    }

    async createNote(uuid: string, note: Note, config?: AxiosRequestConfig): Promise<Note> {
        return this.client.put<Note>(`${this.basePath}/${uuid}/notes`, note, undefined, config)
    }

    async getHighlightedContent(uuid: string, config?: AxiosRequestConfig): Promise<HighlightedContent> {
        return this.client.get<HighlightedContent>(`${this.basePath}/${uuid}/highlighted-content`, undefined, config)
    }

    async updateHighlightedContent(
        uuid: string,
        payload: HighlightedContent,
        config?: AxiosRequestConfig
    ): Promise<HighlightedContent> {
        return this.client.put<HighlightedContent>(`${this.basePath}/${uuid}/highlighted-content`, payload, undefined, config)
    }

    async listMetricsFromCollection(
        uuid: string,
        collectionId: PersonMetricsPathParams['collection-id'],
        config?: AxiosRequestConfig
    ): Promise<MetricCollection> {
        return this.client.get<MetricCollection>(`${this.basePath}/${uuid}/metrics/${collectionId}`, undefined, config)
    }

    async listSupervisees(uuid: string, config?: AxiosRequestConfig): Promise<PersonSuperviseeAssociationListResult> {
        return this.client.get<PersonSuperviseeAssociationListResult>(`${this.basePath}/${uuid}/supervisees`, undefined, config)
    }

    async getAllowedAcademicQualificationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-academic-qualification-types`, undefined, config)
    }

    async getAllowedAcademicQualificationsDistinctions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-academic-qualifications-distinctions`, undefined, config)
    }

    async getAllowedAcademicQualificationsFieldOfStudies(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-academic-qualifications-field-of-studies`, undefined, config)
    }

    async getAllowedAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-countries`, undefined, config)
    }

    async getAllowedAddressSubdivisions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-subdivisions`, undefined, config)
    }

    async getAllowedAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-address-types`, undefined, config)
    }

    async getAllowedClassifiedIdentifierTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-classified-identifier-types`, undefined, config)
    }

    async getAllowedCustomDefinedFieldClassifications(
        propertyName: string,
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(
            `${this.basePath}/allowed-custom-defined-field-values/${propertyName}/classifications`,
            undefined,
            config
        )
    }

    async getAllowedDocumentLicenses(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-licenses`, undefined, config)
    }

    async getAllowedDocumentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-document-types`, undefined, config)
    }

    async getAllowedExternalPositionsAppointments(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-external-positions-appointments`, undefined, config)
    }

    async getAllowedGenders(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-genders`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurations(config?: AxiosRequestConfig): Promise<AllowedKeywordGroupConfigurationList> {
        return this.client.get<AllowedKeywordGroupConfigurationList>(`${this.basePath}/allowed-keyword-group-configurations`, undefined, config)
    }

    async getAllowedKeywordGroupConfigurationClassifications(
        id: number,
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-keyword-group-configurations/${id}/classifications`, undefined, config)
    }

    async getAllowedLeavesOfAbsenceClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-leave-of-absense`, undefined, config)
    }

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-link-types`, undefined, config)
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return this.client.get<LocalesList>(`${this.basePath}/allowed-locales`, undefined, config)
    }

    async getAllowedMainResearchAreas(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-main-research-areas`, undefined, config)
    }

    async getAllowedMetricCollections(config?: AxiosRequestConfig): Promise<MetricCollectionDefinitionList> {
        return this.client.get<MetricCollectionDefinitionList>(`${this.basePath}/allowed-metric-collections`, undefined, config)
    }

    async getAllowedNamesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-names-types`, undefined, config)
    }

    async getAllowedNationalities(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-nationalities`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/email-types`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsEmploymentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/employment-types`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsJobTitles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/job-titles`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsPhoneNumberTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/phone-number-types`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsSupervisorRoles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/supervisor-roles`, undefined, config)
    }

    async getAllowedPersonOrganizationAssociationsWebAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-person-organization-associations/web-address-types`, undefined, config)
    }

    async getAllowedPrivateAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-private-address-countries`, undefined, config)
    }

    async getAllowedProfileInformationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-profile-information-types`, undefined, config)
    }

    async getAllowedProfilePhotoTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-profile-photo-types`, undefined, config)
    }

    async getAllowedStaffOrganizationAssociationsContractTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-staff-organization-associations/contract-types`, undefined, config)
    }

    async getAllowedStaffOrganizationAssociationsStaffTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-staff-organization-associations/staff-types`, undefined, config)
    }

    async getAllowedStudentOrganizationAssociationsAttendanceStatus(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-student-organization-associations/attendance-status`, undefined, config)
    }

    async getAllowedTitlesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-titles-types`, undefined, config)
    }

    async getAllowedVisitingScholarAssociationsEmploymentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return this.client.get<ClassificationRefList>(`${this.basePath}/allowed-visiting-scholar-associations/employment-types`, undefined, config)
    }

    async getAllowedWorkflowSteps(config?: AxiosRequestConfig): Promise<WorkflowListResult> {
        return this.client.get<WorkflowListResult>(`${this.basePath}/allowed-workflow-steps`, undefined, config)
    }
}
