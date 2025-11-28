import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, personsServiceConfig } from './service-config'

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

export class PersonsService {
    private readonly basePath: string
    private readonly operations = personsServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: PersonsServiceOptions = {}) {
        this.basePath = options.basePath ?? personsServiceConfig.basePath
    }

    async list(params?: PersonListParams, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return invokeOperation<PersonListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async query(body: PersonsQuery, config?: AxiosRequestConfig): Promise<PersonListResult> {
        return invokeOperation<PersonListResult>(this.client, this.basePath, this.operations.query, {
            body,
            config
        })
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: string, payload: Person, config?: AxiosRequestConfig): Promise<Person> {
        return invokeOperation<Person>(this.client, this.basePath, this.operations.update, {
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

    async listDependents(
        uuid: string,
        params?: PersonDependentsParams,
        config?: AxiosRequestConfig
    ): Promise<ContentRefListResult> {
        return invokeOperation<ContentRefListResult>(this.client, this.basePath, this.operations.listDependents, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async getDisciplineAssociation(
        uuid: string,
        disciplineScheme: string,
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

    async listDisciplineAssociations(
        disciplineScheme: string,
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
        disciplineScheme: string,
        params?: PersonAllowedDisciplineParams,
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

    async listNotes(uuid: string, params?: PersonNotesParams, config?: AxiosRequestConfig): Promise<NoteListResult> {
        return invokeOperation<NoteListResult>(this.client, this.basePath, this.operations.listNotes, {
            pathParams: { uuid },
            query: params,
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

    async getHighlightedContent(uuid: string, config?: AxiosRequestConfig): Promise<HighlightedContent> {
        return invokeOperation<HighlightedContent>(
            this.client,
            this.basePath,
            this.operations.getHighlightedContent,
            {
                pathParams: { uuid },
                config
            }
        )
    }

    async updateHighlightedContent(
        uuid: string,
        payload: HighlightedContent,
        config?: AxiosRequestConfig
    ): Promise<HighlightedContent> {
        return invokeOperation<HighlightedContent>(
            this.client,
            this.basePath,
            this.operations.updateHighlightedContent,
            {
                pathParams: { uuid },
                body: payload,
                config
            }
        )
    }

    async listMetricsFromCollection(
        uuid: string,
        collectionId: PersonMetricsPathParams['collection-id'],
        config?: AxiosRequestConfig
    ): Promise<MetricCollection> {
        return invokeOperation<MetricCollection>(
            this.client,
            this.basePath,
            this.operations.listMetricsFromCollection,
            {
                pathParams: { uuid, 'collection-id': collectionId },
                config
            }
        )
    }

    async listSupervisees(uuid: string, config?: AxiosRequestConfig): Promise<PersonSuperviseeAssociationListResult> {
        return invokeOperation<PersonSuperviseeAssociationListResult>(
            this.client,
            this.basePath,
            this.operations.listSupervisees,
            {
                pathParams: { uuid },
                config
            }
        )
    }

    async getAllowedAcademicQualificationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationTypes,
            { config }
        )
    }

    async getAllowedAcademicQualificationsDistinctions(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationsDistinctions,
            { config }
        )
    }

    async getAllowedAcademicQualificationsFieldOfStudies(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAcademicQualificationsFieldOfStudies,
            { config }
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

    async getAllowedAddressTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedAddressTypes,
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

    async getAllowedCustomDefinedFieldClassifications(
        propertyName: string,
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedCustomDefinedFieldClassifications,
            {
                pathParams: { propertyName },
                config
            }
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

    async getAllowedExternalPositionsAppointments(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedExternalPositionsAppointments,
            { config }
        )
    }

    async getAllowedGenders(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedGenders,
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
        id: number,
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

    async getAllowedLeavesOfAbsenceClassifications(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedLeavesOfAbsenceClassifications,
            { config }
        )
    }

    async getAllowedLinkTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(this.client, this.basePath, this.operations.getAllowedLinkTypes, {
            config
        })
    }

    async getAllowedLocales(config?: AxiosRequestConfig): Promise<LocalesList> {
        return invokeOperation<LocalesList>(this.client, this.basePath, this.operations.getAllowedLocales, { config })
    }

    async getAllowedMainResearchAreas(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMainResearchAreas,
            { config }
        )
    }

    async getAllowedMetricCollections(config?: AxiosRequestConfig): Promise<MetricCollectionDefinitionList> {
        return invokeOperation<MetricCollectionDefinitionList>(
            this.client,
            this.basePath,
            this.operations.getAllowedMetricCollections,
            { config }
        )
    }

    async getAllowedNamesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNamesTypes,
            { config }
        )
    }

    async getAllowedNationalities(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedNationalities,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsEmailTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsEmailTypes,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsEmploymentTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsEmploymentTypes,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsJobTitles(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsJobTitles,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsPhoneNumberTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsPhoneNumberTypes,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsSupervisorRoles(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsSupervisorRoles,
            { config }
        )
    }

    async getAllowedPersonOrganizationAssociationsWebAddressTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPersonOrganizationAssociationsWebAddressTypes,
            { config }
        )
    }

    async getAllowedPrivateAddressCountries(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedPrivateAddressCountries,
            { config }
        )
    }

    async getAllowedProfileInformationTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedProfileInformationTypes,
            { config }
        )
    }

    async getAllowedProfilePhotoTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedProfilePhotoTypes,
            { config }
        )
    }

    async getAllowedStaffOrganizationAssociationsContractTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStaffOrganizationAssociationsContractTypes,
            { config }
        )
    }

    async getAllowedStaffOrganizationAssociationsStaffTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStaffOrganizationAssociationsStaffTypes,
            { config }
        )
    }

    async getAllowedStudentOrganizationAssociationsAttendanceStatus(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedStudentOrganizationAssociationsAttendanceStatus,
            { config }
        )
    }

    async getAllowedTitlesTypes(config?: AxiosRequestConfig): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedTitlesTypes,
            { config }
        )
    }

    async getAllowedVisitingScholarAssociationsEmploymentTypes(
        config?: AxiosRequestConfig
    ): Promise<ClassificationRefList> {
        return invokeOperation<ClassificationRefList>(
            this.client,
            this.basePath,
            this.operations.getAllowedVisitingScholarAssociationsEmploymentTypes,
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
