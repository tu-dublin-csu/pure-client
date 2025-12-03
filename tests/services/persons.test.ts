import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    PersonsService,
    type Person,
    type PersonListParams,
    type PersonListResult,
    type PersonsQuery,
    type ContentRefListResult,
    type DisciplinesAssociation,
    type DisciplinesAssociationsQuery,
    type DisciplinesAssociationListResult,
    type DisciplinesDisciplineListResult,
    type DisciplinesDisciplineSchemeListResult,
    type OrderingsList,
    type Note,
    type NoteListResult,
    type HighlightedContent,
    type MetricCollection,
    type MetricCollectionDefinitionList,
    type PersonSuperviseeAssociationListResult,
    type ClassificationRefList,
    type AllowedKeywordGroupConfigurationList,
    type LocalesList,
    type WorkflowListResult,
    type PersonDependentsParams,
    type PersonNotesParams,
    type PersonAllowedDisciplineParams,
    type UploadedFile
} from '../../src/services/persons'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('PersonsService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: PersonsService

    const basePath = '/persons'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new PersonsService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists persons and executes queries', async () => {
        const params = { size: 10 } as PersonListParams
        const config: AxiosRequestConfig = { timeout: 1500 }
        const list = { count: 5 } as unknown as PersonListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const query = { window: { size: 2 } } as unknown as PersonsQuery
        const queryResult = { count: 7 } as unknown as PersonListResult

        client.post.mockResolvedValueOnce(queryResult)

        expect(await service.query(query)).toBe(queryResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
    })

    it('performs CRUD operations', async () => {
        const uuid = 'person-uuid'
        const payload = { uuid } as unknown as Person

        client.get.mockResolvedValueOnce(payload)
        expect(await service.get(uuid)).toBe(payload)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.create(payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.update(uuid, payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks and unlocks a person', async () => {
        const uuid = 'lockable-person'
        client.post.mockResolvedValue(undefined)

        await service.lock(uuid)
        await service.unlock(uuid)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
    })

    it('lists dependents', async () => {
        const uuid = 'dependents-person'
        const params = { verbose: true } as PersonDependentsParams
        const dependents = { items: [] } as unknown as ContentRefListResult

        client.get.mockResolvedValueOnce(dependents)

        expect(await service.listDependents(uuid, params)).toBe(dependents)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/dependents`, params, undefined)
    })

    it('manages discipline associations', async () => {
        const uuid = 'discipline-person'
        const scheme = 'scheme'
        const association = { uuid } as unknown as DisciplinesAssociation
        const updated = { uuid, values: [] } as unknown as DisciplinesAssociation
        const query = { window: { size: 1 } } as unknown as DisciplinesAssociationsQuery
        const listResult = { items: [] } as unknown as DisciplinesAssociationListResult
        const allowedDisciplines = { items: [] } as unknown as DisciplinesDisciplineListResult
        const allowedSchemes = { items: [] } as unknown as DisciplinesDisciplineSchemeListResult
        const allowedParams = { size: 25 } as PersonAllowedDisciplineParams

        client.get.mockResolvedValueOnce(association)
        expect(await service.getDisciplineAssociation(uuid, scheme)).toBe(association)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, undefined, undefined)

        client.put.mockResolvedValueOnce(updated)
        expect(await service.updateDisciplineAssociation(uuid, scheme, association)).toBe(updated)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/disciplines/${scheme}`, association, undefined, undefined)

        client.post.mockResolvedValueOnce(listResult)
        expect(await service.listDisciplineAssociations(scheme, query)).toBe(listResult)
        expect(client.post).toHaveBeenCalledWith(`${basePath}/disciplines/${scheme}/search`, query, undefined, undefined)

        client.get.mockResolvedValueOnce(allowedDisciplines)
        expect(await service.getAllowedDisciplines(scheme, allowedParams)).toBe(allowedDisciplines)
        expect(client.get).toHaveBeenCalledWith(
            `${basePath}/disciplines/${scheme}/allowed-disciplines`,
            allowedParams,
            undefined
        )

        client.get.mockResolvedValueOnce(allowedSchemes)
        expect(await service.getAllowedDisciplineSchemes()).toBe(allowedSchemes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/disciplines/allowed-discipline-schemes`, undefined, undefined)
    })

    it('handles notes and highlighted content', async () => {
        const uuid = 'note-person'
        const params = { size: 5 } as PersonNotesParams
        const notes = { items: [] } as unknown as NoteListResult
        const note = { text: 'note' } as unknown as Note
        const highlighted = { items: [] } as unknown as HighlightedContent

        client.get.mockResolvedValueOnce(notes)
        expect(await service.listNotes(uuid, params)).toBe(notes)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

        client.put.mockResolvedValueOnce(note)
        expect(await service.createNote(uuid, note)).toBe(note)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)

        client.get.mockResolvedValueOnce(highlighted)
        expect(await service.getHighlightedContent(uuid)).toBe(highlighted)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/highlighted-content`, undefined, undefined)

        client.put.mockResolvedValueOnce(highlighted)
        expect(await service.updateHighlightedContent(uuid, highlighted)).toBe(highlighted)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/highlighted-content`, highlighted, undefined, undefined)
    })

    it('lists metrics and supervisees', async () => {
        const uuid = 'metrics-person'
        const collectionId = 'collection'
        const metrics = { id: collectionId } as unknown as MetricCollection
        const supervisees = { items: [] } as unknown as PersonSuperviseeAssociationListResult

        client.get.mockResolvedValueOnce(metrics)
        expect(await service.listMetricsFromCollection(uuid, collectionId)).toBe(metrics)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/metrics/${collectionId}`, undefined, undefined)

        client.get.mockResolvedValueOnce(supervisees)
        expect(await service.listSupervisees(uuid)).toBe(supervisees)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/supervisees`, undefined, undefined)
    })

    it('retrieves orderings', async () => {
        const orderings = { orderings: [] } as unknown as OrderingsList
        client.get.mockResolvedValueOnce(orderings)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('fetches classification-based metadata', async () => {
        const classification = { items: [] } as unknown as ClassificationRefList
        client.get.mockResolvedValue(classification)

        expect(await service.getAllowedAcademicQualificationTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-academic-qualification-types`, undefined, undefined)

        expect(await service.getAllowedAcademicQualificationsDistinctions()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-academic-qualifications-distinctions`, undefined, undefined)

        expect(await service.getAllowedAcademicQualificationsFieldOfStudies()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-academic-qualifications-field-of-studies`, undefined, undefined)

        expect(await service.getAllowedAddressCountries()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-address-countries`, undefined, undefined)

        expect(await service.getAllowedAddressSubdivisions()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-address-subdivisions`, undefined, undefined)

        expect(await service.getAllowedAddressTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-address-types`, undefined, undefined)

        expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-classified-identifier-types`, undefined, undefined)

        expect(await service.getAllowedCustomDefinedFieldClassifications('prop')).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-custom-defined-field-values/prop/classifications`,
            undefined,
            undefined
        )

        expect(await service.getAllowedDocumentLicenses()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-licenses`, undefined, undefined)

        expect(await service.getAllowedDocumentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-document-types`, undefined, undefined)

        expect(await service.getAllowedExternalPositionsAppointments()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-external-positions-appointments`, undefined, undefined)

        expect(await service.getAllowedGenders()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-genders`, undefined, undefined)

        expect(await service.getAllowedLeavesOfAbsenceClassifications()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-leave-of-absense`, undefined, undefined)

        expect(await service.getAllowedLinkTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-link-types`, undefined, undefined)

        expect(await service.getAllowedMainResearchAreas()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-main-research-areas`, undefined, undefined)

        expect(await service.getAllowedNamesTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-names-types`, undefined, undefined)

        expect(await service.getAllowedNationalities()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-nationalities`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsEmailTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/email-types`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsEmploymentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/employment-types`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsJobTitles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/job-titles`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsPhoneNumberTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/phone-number-types`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsSupervisorRoles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/supervisor-roles`, undefined, undefined)

        expect(await service.getAllowedPersonOrganizationAssociationsWebAddressTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-person-organization-associations/web-address-types`, undefined, undefined)

        expect(await service.getAllowedPrivateAddressCountries()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-private-address-countries`, undefined, undefined)

        expect(await service.getAllowedProfileInformationTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-profile-information-types`, undefined, undefined)

        expect(await service.getAllowedProfilePhotoTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-profile-photo-types`, undefined, undefined)

        expect(await service.getAllowedStaffOrganizationAssociationsContractTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-staff-organization-associations/contract-types`, undefined, undefined)

        expect(await service.getAllowedStaffOrganizationAssociationsStaffTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-staff-organization-associations/staff-types`, undefined, undefined)

        expect(await service.getAllowedStudentOrganizationAssociationsAttendanceStatus()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-student-organization-associations/attendance-status`, undefined, undefined)

        expect(await service.getAllowedStudentAssociationsEmploymentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-student-organization-associations-employment-types`,
            undefined,
            undefined
        )

        expect(await service.getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-student-organization-associations-country-of-domicile-types`,
            undefined,
            undefined
        )

        expect(await service.getAllowedStudentOrganizationAssociationsGetStudentNationalities()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-student-organization-associations-nationality-types`,
            undefined,
            undefined
        )

        expect(await service.getAllowedStudentOrganizationAssociationsStudentTypeDescriptions()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(
            `${basePath}/allowed-student-organization-associations-type-description-types`,
            undefined,
            undefined
        )

        expect(await service.getAllowedTitlesTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-titles-types`, undefined, undefined)

        expect(await service.getAllowedVisitingScholarAssociationsEmploymentTypes()).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-visiting-scholar-associations/employment-types`, undefined, undefined)
    })

    it('retrieves keyword, locale, metric and workflow metadata', async () => {
        const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
        const classification = { items: [] } as unknown as ClassificationRefList
        const locales = { locales: [] } as unknown as LocalesList
        const metrics = { items: [] } as unknown as MetricCollectionDefinitionList
        const workflow = { items: [] } as unknown as WorkflowListResult

        client.get.mockResolvedValueOnce(keywordConfigs)
        expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

        client.get.mockResolvedValueOnce(classification)
        expect(await service.getAllowedKeywordGroupConfigurationClassifications(99)).toBe(classification)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-keyword-group-configurations/99/classifications`, undefined, undefined)

        client.get.mockResolvedValueOnce(locales)
        expect(await service.getAllowedLocales()).toBe(locales)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-locales`, undefined, undefined)

        client.get.mockResolvedValueOnce(metrics)
        expect(await service.getAllowedMetricCollections()).toBe(metrics)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-metric-collections`, undefined, undefined)

        client.get.mockResolvedValueOnce(workflow)
        expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/allowed-workflow-steps`, undefined, undefined)
    })

    it('fetches and uploads files', async () => {
        const file = 'binary'
        const uploaded = { id: 'file-id' } as unknown as UploadedFile

        client.get.mockResolvedValueOnce(file)
        client.put.mockResolvedValueOnce(uploaded)

        expect(await service.getFile('uuid', 'file')).toBe(file)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/uuid/files/file`, undefined, undefined)

        expect(await service.uploadFile('payload', 'text/plain', { timeout: 1 })).toBe(uploaded)
        expect(client.put).toHaveBeenCalledWith(
            `${basePath}/file-uploads`,
            'payload',
            undefined,
            expect.objectContaining({
                headers: expect.objectContaining({ 'Content-Type': 'text/plain' }),
                timeout: 1
            })
        )
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-persons'
        const customService = new PersonsService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as PersonListResult

        client.get.mockResolvedValueOnce(list)
        await customService.list()

        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
