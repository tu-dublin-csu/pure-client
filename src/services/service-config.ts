import type { AxiosRequestConfig } from 'axios'

import type { operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type OperationId = keyof operations

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface ServiceOperationConfig {
    readonly method: HttpMethod
    readonly operationId: OperationId
    /**
     * @description Relative path (from the service base path). Use template parameters e.g. `/items/{id}` when needed.
     */
    readonly path?: string
}

export interface ServiceConfig {
    readonly basePath: string
    readonly operations: Record<string, ServiceOperationConfig>
}

export const activitiesServiceConfig: ServiceConfig = {
    basePath: '/activities',
    operations: {
        create: {
            method: 'put',
            operationId: 'activity_create'
        },
        createNote: {
            method: 'put',
            operationId: 'activity_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'activity_get',
            path: '/{uuid}'
        },
        getAllowedAttendancePersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedAttendancePersonRoles',
            path: '/allowed-attendance-person-roles'
        },
        getAllowedCategories: {
            method: 'get',
            operationId: 'activity_getAllowedCategories',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'activity_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedConsultancyPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedConsultancyPersonRoles',
            path: '/allowed-consultancy-person-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'activity_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDegreeOfRecognitions: {
            method: 'get',
            operationId: 'activity_getAllowedDegreeOfRecognitions',
            path: '/allowed-degree-of-recognitions'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'activity_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'activity_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'activity_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'activity_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'activity_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedEditorialWorkPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedEditorialWorkPersonRoles',
            path: '/allowed-editorial-work-person-roles'
        },
        getAllowedExaminationPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedExaminationPersonRoles',
            path: '/allowed-examination-person-roles'
        },
        getAllowedHostVisitorCountries: {
            method: 'get',
            operationId: 'activity_getAllowedHostVisitorCountries',
            path: '/allowed-host-visitor-countries'
        },
        getAllowedHostVisitorPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedHostVisitorPersonRoles',
            path: '/allowed-host-visitor-person-roles'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'activity_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedIndicators: {
            method: 'get',
            operationId: 'activity_getAllowedIndicators',
            path: '/allowed-indicators'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'activity_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'activity_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'activity_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'activity_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMembershipPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedMembershipPersonRoles',
            path: '/allowed-membership-person-roles'
        },
        getAllowedOtherActivityPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedOtherActivityPersonRoles',
            path: '/allowed-other-activity-person-roles'
        },
        getAllowedTalkPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedTalkPersonRoles',
            path: '/allowed-talk-person-roles'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'activity_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedVisitOtherPersonRoles: {
            method: 'get',
            operationId: 'activity_getAllowedVisitOtherPersonRoles',
            path: '/allowed-visit-other-person-roles'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'activity_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'activity_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'activity_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'activity_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'activity_list'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'activity_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'activity_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'activity_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'activity_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'activity_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'activity_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'activity_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'activity_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'activity_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const authorCollaborationsServiceConfig: ServiceConfig = {
    basePath: '/author-collaborations',
    operations: {
        create: {
            method: 'put',
            operationId: 'authorCollaboration_create'
        },
        createNote: {
            method: 'put',
            operationId: 'authorCollaborations_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'authorCollaborations_get',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'authorCollaborations_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'authorCollaborations_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getOrderings: {
            method: 'get',
            operationId: 'authorCollaborations_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'authorCollaboration_list'
        },
        listNotes: {
            method: 'get',
            operationId: 'authorCollaborations_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'authorCollaborations_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'authorCollaborations_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'authorCollaboration_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'authorCollaborations_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'authorCollaboration_update',
            path: '/{uuid}'
        }
    }
}

export const applicationsServiceConfig: ServiceConfig = {
    basePath: '/applications',
    operations: {
        create: {
            method: 'put',
            operationId: 'application_create'
        },
        createNote: {
            method: 'put',
            operationId: 'application_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'application_get',
            path: '/{uuid}'
        },
        getAllowedApplicantRoles: {
            method: 'get',
            operationId: 'application_getAllowedApplicantRoles',
            path: '/allowed-applicant-roles'
        },
        getAllowedBudgetAccountClassifications: {
            method: 'get',
            operationId: 'application_getAllowedBudgetAccountClassifications',
            path: '/allowed-budget-account-classifications'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'application_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            method: 'get',
            operationId: 'application_getAllowedCollaboratorTypes',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'application_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'application_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'application_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'application_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'application_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'application_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            method: 'get',
            operationId: 'application_getAllowedDocumentVersionTypes',
            path: '/allowed-document-version-types'
        },
        getAllowedFundingClassifications: {
            method: 'get',
            operationId: 'application_getAllowedFundingClassifications',
            path: '/allowed-funding-classifications'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'application_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'application_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'application_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'application_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'application_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedStatuses: {
            method: 'get',
            operationId: 'application_getAllowedApplicationStatuses',
            path: '/allowed-application-statuses'
        },
        getAllowedTemplates: {
            method: 'get',
            operationId: 'application_getAllowedTemplates',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'application_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'application_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getBudget: {
            method: 'get',
            operationId: 'application_getBudget',
            path: '/{uuid}/budgets/{id}'
        },
        getBudgets: {
            method: 'get',
            operationId: 'application_getBudgets',
            path: '/{uuid}/budgets'
        },
        getCluster: {
            method: 'get',
            operationId: 'application_getCluster',
            path: '/{uuid}/cluster'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'application_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'application_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'application_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'application_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'application_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'application_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'application_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'application_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'application_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'application_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'application_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'application_update',
            path: '/{uuid}'
        },
        updateBudget: {
            method: 'put',
            operationId: 'application_updateBudget',
            path: '/{uuid}/budgets/{id}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'application_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'application_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const awardsServiceConfig: ServiceConfig = {
    basePath: '/awards',
    operations: {
        create: {
            method: 'put',
            operationId: 'award_create'
        },
        createNote: {
            method: 'put',
            operationId: 'award_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'award_get',
            path: '/{uuid}'
        },
        getAllowedAwardholderRoles: {
            method: 'get',
            operationId: 'award_getAllowedAwardHolderRoles',
            path: '/allowed-awardholder-roles'
        },
        getAllowedBudgetAccountClassifications: {
            method: 'get',
            operationId: 'award_getAllowedBudgetAccountClassifications',
            path: '/allowed-budget-account-classifications'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'award_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            method: 'get',
            operationId: 'award_getAllowedCollaboratorTypes',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'award_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'award_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'award_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'award_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'award_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'award_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            method: 'get',
            operationId: 'award_getAllowedDocumentVersionTypes',
            path: '/allowed-document-version-types'
        },
        getAllowedFundingClassifications: {
            method: 'get',
            operationId: 'award_getAllowedFundingClassifications',
            path: '/allowed-funding-classifications'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'award_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'award_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'award_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'award_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'award_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedTemplates: {
            method: 'get',
            operationId: 'award_getAllowedTemplates',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'award_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'award_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getBudget: {
            method: 'get',
            operationId: 'award_getBudget',
            path: '/{uuid}/budgets/{id}'
        },
        getBudgets: {
            method: 'get',
            operationId: 'award_getBudgets',
            path: '/{uuid}/budgets'
        },
        getCluster: {
            method: 'get',
            operationId: 'award_getCluster',
            path: '/{uuid}/cluster'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'award_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'award_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'award_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'award_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'award_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'award_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'award_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'award_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'award_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'award_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'award_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'award_update',
            path: '/{uuid}'
        },
        updateBudget: {
            method: 'put',
            operationId: 'award_updateBudget',
            path: '/{uuid}/budgets/{id}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'award_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'award_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const classificationSchemesServiceConfig: ServiceConfig = {
    basePath: '/classification-schemes',
    operations: {
        create: {
            method: 'put',
            operationId: 'classificationScheme_create'
        },
        get: {
            method: 'get',
            operationId: 'classificationScheme_get',
            path: '/{uuid}'
        },
        getAllowedAssociatedSchemesClassifications: {
            method: 'get',
            operationId: 'classificationScheme_getAllowedAssociatedSchemesClassifications',
            path: '/allowed-associated-schemes'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'classificationScheme_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedTypeClassifications: {
            method: 'get',
            operationId: 'classificationScheme_getAllowedTypeClassifications',
            path: '/allowed-type-classifications'
        },
        list: {
            method: 'get',
            operationId: 'classificationScheme_list'
        },
        lock: {
            method: 'post',
            operationId: 'classificationScheme_lock',
            path: '/{uuid}/actions/lock'
        },
        remove: {
            method: 'delete',
            operationId: 'classificationScheme_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'classificationScheme_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'classificationScheme_update',
            path: '/{uuid}'
        }
    }
}

export const conceptsServiceConfig: ServiceConfig = {
    basePath: '/concepts',
    operations: {
        get: {
            method: 'get',
            operationId: 'concept_get',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'concept_getAllowedLocales',
            path: '/allowed-locales'
        },
        list: {
            method: 'get',
            operationId: 'concept_list'
        },
        query: {
            method: 'post',
            operationId: 'concept_query',
            path: '/search'
        }
    }
}

export const dataSetsServiceConfig: ServiceConfig = {
    basePath: '/data-sets',
    operations: {
        create: {
            method: 'put',
            operationId: 'dataSet_create'
        },
        createNote: {
            method: 'put',
            operationId: 'dataSet_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'dataSet_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedContributorsRoles: {
            method: 'get',
            operationId: 'dataSet_getAllowedContributorsRoles',
            path: '/allowed-contributors-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'dataSet_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'dataSet_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedDoiAccessTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedDoiAccessTypes',
            path: '/allowed-doi-access-types'
        },
        getAllowedDoiLicenseTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedDoiLicenseTypes',
            path: '/allowed-doi-license-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'dataSet_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'dataSet_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLegalConditionTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedLegalConditionsTypes',
            path: '/allowed-legal-condition-types'
        },
        getAllowedLicenses: {
            method: 'get',
            operationId: 'dataSet_getAllowedLicenses',
            path: '/allowed-licenses'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'dataSet_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedOpenAccessPermissions: {
            method: 'get',
            operationId: 'dataSet_getAllowedOpenAccessPermissions',
            path: '/allowed-open-access-permissions'
        },
        getAllowedPersonsRoles: {
            method: 'get',
            operationId: 'dataSet_getAllowedPersonsRoles',
            path: '/allowed-persons-roles'
        },
        getAllowedPhysicalDataTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedPhysicalDataTypes',
            path: '/allowed-physical-data-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'dataSet_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'dataSet_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            method: 'get',
            operationId: 'dataSet_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            method: 'get',
            operationId: 'dataSet_list'
        },
        listNotes: {
            method: 'get',
            operationId: 'dataSet_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'dataSet_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'dataSet_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'dataSet_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'dataSet_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'dataSet_update',
            path: '/{uuid}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'dataSet_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const equipmentServiceConfig: ServiceConfig = {
    basePath: '/equipment',
    operations: {
        create: {
            method: 'put',
            operationId: 'equipment_create'
        },
        createNote: {
            method: 'put',
            operationId: 'equipment_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'equipment_get',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            method: 'get',
            operationId: 'equipment_getAllowedAddressCountries',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            method: 'get',
            operationId: 'equipment_getAllowedAddressSubdivisions',
            path: '/allowed-address-subdivision'
        },
        getAllowedAddressTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedAddressTypes',
            path: '/allowed-address-types'
        },
        getAllowedCategories: {
            method: 'get',
            operationId: 'equipment_getAllowedCategories',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'equipment_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedEmailTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedEmailTypes',
            path: '/allowed-email-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'equipment_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'equipment_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLoanTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedLoanTypes',
            path: '/allowed-loan-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'equipment_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedPersonsRoles: {
            method: 'get',
            operationId: 'equipment_getAllowedPersonsRoles',
            path: '/allowed-persons-roles'
        },
        getAllowedPhoneNumberTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedPhoneNumberTypes',
            path: '/allowed-phone-number-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWebAddressTypes: {
            method: 'get',
            operationId: 'equipment_getAllowedWebAddressTypes',
            path: '/allowed-web-address-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'equipment_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            method: 'get',
            operationId: 'equipment_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            method: 'get',
            operationId: 'equipment_list'
        },
        listNotes: {
            method: 'get',
            operationId: 'equipment_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'equipment_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'equipment_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'equipment_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'equipment_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'equipment_update',
            path: '/{uuid}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'equipment_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const eventsServiceConfig: ServiceConfig = {
    basePath: '/events',
    operations: {
        create: {
            method: 'put',
            operationId: 'event_create'
        },
        createNote: {
            method: 'put',
            operationId: 'event_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'event_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'event_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            method: 'get',
            operationId: 'event_getAllowedCountries',
            path: '/allowed-countries'
        },
        getAllowedDegreeOfRecognitions: {
            method: 'get',
            operationId: 'event_getAllowedDegreeOfRecognitions',
            path: '/allowed-degree-of-recognition'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'event_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'event_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'event_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'event_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'event_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'event_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedSubdivisions: {
            method: 'get',
            operationId: 'event_getAllowedSubdivisions',
            path: '/allowed-subdivision'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'event_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'event_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'event_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'event_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'event_list'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'event_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'event_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'event_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'events_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'event_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'event_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'event_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'event_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const externalOrganizationsServiceConfig: ServiceConfig = {
    basePath: '/external-organizations',
    operations: {
        create: {
            method: 'put',
            operationId: 'externalOrganization_create'
        },
        createNote: {
            method: 'put',
            operationId: 'externalOrganization_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'externalOrganization_get',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedAddressCountries',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedAddressSubdivisions',
            path: '/allowed-address-subdivision'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedClassifiedImageTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedClassifiedImageTypes',
            path: '/allowed-classified-file-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'externalOrganization_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'externalOrganization_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'externalOrganization_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'externalOrganization_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'externalOrganization_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'externalOrganization_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'externalOrganization_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'externalOrganization_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'externalOrganization_lock',
            path: '/{uuid}/actions/lock'
        },
        merge: {
            method: 'post',
            operationId: 'externalOrganization_merge',
            path: '/merge'
        },
        previewDeduplication: {
            method: 'post',
            operationId: 'externalOrganization_previewDeduplication',
            path: '/preview-deduplication'
        },
        query: {
            method: 'post',
            operationId: 'externalOrganization_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'externalOrganization_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'externalOrganization_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'externalOrganization_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'externalOrganization_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'externalOrganization_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const externalPersonsServiceConfig: ServiceConfig = {
    basePath: '/external-persons',
    operations: {
        create: {
            method: 'put',
            operationId: 'externalPerson_create'
        },
        createNote: {
            method: 'put',
            operationId: 'externalPerson_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'externalPerson_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'externalPerson_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            method: 'get',
            operationId: 'externalPerson_getAllowedCountries',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'externalPerson_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'externalPerson_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'externalPerson_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'externalPerson_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'externalPerson_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'externalPerson_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'externalPerson_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'externalPerson_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'externalPerson_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'externalPerson_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'externalPerson_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'externalPerson_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'externalPerson_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'externalPerson_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'externalPerson_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'externalPerson_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'externalPerson_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'externalPerson_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'externalPerson_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'externalPerson_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'externalPerson_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const fundingOpportunitiesServiceConfig: ServiceConfig = {
    basePath: '/funding-opportunities',
    operations: {
        create: {
            method: 'put',
            operationId: 'fundingOpportunity_create'
        },
        createNote: {
            method: 'put',
            operationId: 'fundingOpportunity_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'fundingOpportunity_get',
            path: '/{uuid}'
        },
        getAllowedAcademicDegreeEligibilityTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedAcademicDegreeEligibilityTypes',
            path: '/allowed-classified-academic-degree-eligibility-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedDocumentVersionTypes',
            path: '/allowed-document-version-types'
        },
        getAllowedEligibilityTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedEligibilityTypes',
            path: '/allowed-classified-eligibility-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'fundingOpportunity_getAllowedTypes',
            path: '/allowed-types'
        },
        getFile: {
            method: 'get',
            operationId: 'fundingOpportunity_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'fundingOpportunity_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'fundingOpportunity_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'fundingOpportunity_dependents',
            path: '/{uuid}/dependents'
        },
        listNotes: {
            method: 'get',
            operationId: 'fundingOpportunity_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'fundingOpportunity_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'fundingOpportunity_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'fundingOpportunity_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'fundingOpportunity_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'fundingOpportunity_update',
            path: '/{uuid}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'fundingOpportunity_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const impactsServiceConfig: ServiceConfig = {
    basePath: '/impacts',
    operations: {
        create: {
            method: 'put',
            operationId: 'impact_create'
        },
        createNote: {
            method: 'put',
            operationId: 'impact_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'impact_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'impact_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'impact_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'impact_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'impact_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'impact_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'impact_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'impact_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'impact_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedImpactCategories: {
            method: 'get',
            operationId: 'impact_getAllowedImpactCategories',
            path: '/allowed-impact-categories'
        },
        getAllowedImpactEvidenceIndicators: {
            method: 'get',
            operationId: 'impact_getAllowedImpactEvidenceIndicators',
            path: '/allowed-impact-evidence-indicators'
        },
        getAllowedImpactLevels: {
            method: 'get',
            operationId: 'impact_getAllowedImpactLevels',
            path: '/allowed-impact-levels'
        },
        getAllowedImpactStatus: {
            method: 'get',
            operationId: 'impact_getAllowedImpactStatus',
            path: '/allowed-impact-status'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'impact_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'impact_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'impact_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'impact_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedPersonsCountries: {
            method: 'get',
            operationId: 'impact_getAllowedPersonsCountries',
            path: '/allowed-persons-countries'
        },
        getAllowedPersonsRoles: {
            method: 'get',
            operationId: 'impact_getAllowedPersonsRoles',
            path: '/allowed-persons-roles'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'impact_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'impact_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'impact_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'impact_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            method: 'get',
            operationId: 'impact_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'impact_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'impact_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'impact_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'impact_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'impact_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'impact_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'impact_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'impact_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'impact_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'impact_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const journalsServiceConfig: ServiceConfig = {
    basePath: '/journals',
    operations: {
        create: {
            method: 'put',
            operationId: 'journal_create'
        },
        createNote: {
            method: 'put',
            operationId: 'journal_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'journal_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'journal_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            method: 'get',
            operationId: 'journal_getAllowedCountries',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'journal_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'journal_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'journal_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'journal_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'journal_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'journal_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMetricCollections: {
            method: 'get',
            operationId: 'journal_getAllowedMetricCollections',
            path: '/allowed-metric-collections'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'journal_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'journal_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'journal_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'journal_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'journal_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'journal_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'journal_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            method: 'get',
            operationId: 'journal_listMetricsFromCollection',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            method: 'get',
            operationId: 'journal_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'journal_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'journal_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'journal_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'journal_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'journal_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'journal_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const organizationsServiceConfig: ServiceConfig = {
    basePath: '/organizations',
    operations: {
        create: {
            method: 'put',
            operationId: 'organization_create'
        },
        createNote: {
            method: 'put',
            operationId: 'organization_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'organization_get',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            method: 'get',
            operationId: 'organization_getAllowedAddressCountries',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            method: 'get',
            operationId: 'organization_getAllowedAddressSubdivisions',
            path: '/allowed-address-subdivision'
        },
        getAllowedAddressTypes: {
            method: 'get',
            operationId: 'organization_getAllowedAddressTypes',
            path: '/allowed-address-types'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'organization_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedClassifiedImageTypes: {
            method: 'get',
            operationId: 'organization_getAllowedClassifiedImageTypes',
            path: '/allowed-classified-file-types'
        },
        getAllowedCostCenters: {
            method: 'get',
            operationId: 'organization_getAllowedCostCenters',
            path: '/allowed-cost-centers'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'organization_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'organization_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'organization_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedEmailTypes: {
            method: 'get',
            operationId: 'organization_getAllowedEmailTypes',
            path: '/allowed-email-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'organization_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'organization_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'organization_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'organization_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            method: 'get',
            operationId: 'organization_getAllowedMainResearchAreas',
            path: '/allowed-main-research-areas'
        },
        getAllowedNameVariantTypes: {
            method: 'get',
            operationId: 'organization_getAllowedNameVariantTypes',
            path: '/allowed-name-variant-types'
        },
        getAllowedPhoneNumberTypes: {
            method: 'get',
            operationId: 'organization_getAllowedPhoneNumberTypes',
            path: '/allowed-phone-number-types'
        },
        getAllowedPhotoTypes: {
            method: 'get',
            operationId: 'organization_getAllowedPhotoTypes',
            path: '/allowed-photo-types'
        },
        getAllowedProfileInformationTypes: {
            method: 'get',
            operationId: 'organization_getAllowedProfileInformationTypes',
            path: '/allowed-profile-information-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'organization_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWebAddressTypes: {
            method: 'get',
            operationId: 'organization_getAllowedWebAddressTypes',
            path: '/allowed-web-address-types'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'organization_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'organization_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'organization_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'organization_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'organization_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'organization_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'organization_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'organization_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'organization_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'organization_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'organization_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'organization_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'organization_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'organization_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const personsServiceConfig: ServiceConfig = {
    basePath: '/persons',
    operations: {
        create: {
            method: 'put',
            operationId: 'person_create'
        },
        createNote: {
            method: 'put',
            operationId: 'person_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'person_get',
            path: '/{uuid}'
        },
        getAllowedAcademicQualificationsDistinctions: {
            method: 'get',
            operationId: 'person_getAllowedAcademicQualificationsDistinctions',
            path: '/allowed-academic-qualifications-distinctions'
        },
        getAllowedAcademicQualificationsFieldOfStudies: {
            method: 'get',
            operationId: 'person_getAllowedAcademicQualificationsFieldOfStudies',
            path: '/allowed-academic-qualifications-field-of-studies'
        },
        getAllowedAcademicQualificationTypes: {
            method: 'get',
            operationId: 'person_getAllowedAcademicQualificationsTypes',
            path: '/allowed-academic-qualification-types'
        },
        getAllowedAddressCountries: {
            method: 'get',
            operationId: 'person_getAllowedAddressCountries',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            method: 'get',
            operationId: 'person_getAllowedAddressSubdivisions',
            path: '/allowed-address-subdivisions'
        },
        getAllowedAddressTypes: {
            method: 'get',
            operationId: 'person_getAllowedAddressTypes',
            path: '/allowed-address-types'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'person_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'person_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'person_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'person_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'person_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'person_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedExternalPositionsAppointments: {
            method: 'get',
            operationId: 'person_getAllowedExternalPositionsAppointments',
            path: '/allowed-external-positions-appointments'
        },
        getAllowedGenders: {
            method: 'get',
            operationId: 'person_getAllowedGenders',
            path: '/allowed-genders'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'person_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'person_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLeavesOfAbsenceClassifications: {
            method: 'get',
            operationId: 'person_getAllowedLeavesOfAbsenceClassifications',
            path: '/allowed-leave-of-absense'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'person_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'person_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            method: 'get',
            operationId: 'person_getAllowedMainResearchAreas',
            path: '/allowed-main-research-areas'
        },
        getAllowedMetricCollections: {
            method: 'get',
            operationId: 'person_getAllowedMetricCollections',
            path: '/allowed-metric-collections'
        },
        getAllowedNamesTypes: {
            method: 'get',
            operationId: 'person_getAllowedNamesTypes',
            path: '/allowed-names-types'
        },
        getAllowedNationalities: {
            method: 'get',
            operationId: 'person_getAllowedNationalities',
            path: '/allowed-nationalities'
        },
        getAllowedPersonOrganizationAssociationsEmailTypes: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsEmailTypes',
            path: '/allowed-person-organization-associations/email-types'
        },
        getAllowedPersonOrganizationAssociationsEmploymentTypes: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsEmploymentTypes',
            path: '/allowed-person-organization-associations/employment-types'
        },
        getAllowedPersonOrganizationAssociationsJobTitles: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsJobTitles',
            path: '/allowed-person-organization-associations/job-titles'
        },
        getAllowedPersonOrganizationAssociationsPhoneNumberTypes: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsPhoneNumberTypes',
            path: '/allowed-person-organization-associations/phone-number-types'
        },
        getAllowedPersonOrganizationAssociationsSupervisorRoles: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsSupervisorRoles',
            path: '/allowed-person-organization-associations/supervisor-roles'
        },
        getAllowedPersonOrganizationAssociationsWebAddressTypes: {
            method: 'get',
            operationId: 'person_getAllowedPersonOrganizationAssociationsWebAddressTypes',
            path: '/allowed-person-organization-associations/web-address-types'
        },
        getAllowedPrivateAddressCountries: {
            method: 'get',
            operationId: 'person_getAllowedPrivateAddressCountries',
            path: '/allowed-private-address-countries'
        },
        getAllowedProfileInformationTypes: {
            method: 'get',
            operationId: 'person_getAllowedProfileInformationTypes',
            path: '/allowed-profile-information-types'
        },
        getAllowedProfilePhotoTypes: {
            method: 'get',
            operationId: 'person_getAllowedProfilePhotoTypes',
            path: '/allowed-profile-photo-types'
        },
        getAllowedStaffOrganizationAssociationsContractTypes: {
            method: 'get',
            operationId: 'person_getAllowedStaffOrganizationAssociationsContractTypes',
            path: '/allowed-staff-organization-associations/contract-types'
        },
        getAllowedStaffOrganizationAssociationsStaffTypes: {
            method: 'get',
            operationId: 'person_getAllowedStaffOrganizationAssociationsStaffTypes',
            path: '/allowed-staff-organization-associations/staff-types'
        },
        getAllowedStudentAssociationsEmploymentTypes: {
            method: 'get',
            operationId: 'person_getAllowedStudentAssociationsEmploymentTypes',
            path: '/allowed-student-organization-associations-employment-types'
        },
        getAllowedStudentOrganizationAssociationsAttendanceStatus: {
            method: 'get',
            operationId: 'person_getAllowedStudentOrganizationAssociationsAttendanceStatus',
            path: '/allowed-student-organization-associations/attendance-status'
        },
        getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles: {
            method: 'get',
            operationId: 'person_getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles',
            path: '/allowed-student-organization-associations-country-of-domicile-types'
        },
        getAllowedStudentOrganizationAssociationsGetStudentNationalities: {
            method: 'get',
            operationId: 'person_getAllowedStudentOrganizationAssociationsGetStudentNationalities',
            path: '/allowed-student-organization-associations-nationality-types'
        },
        getAllowedStudentOrganizationAssociationsStudentTypeDescriptions: {
            method: 'get',
            operationId: 'person_getAllowedStudentOrganizationAssociationsStudentTypeDescriptions',
            path: '/allowed-student-organization-associations-type-description-types'
        },
        getAllowedTitlesTypes: {
            method: 'get',
            operationId: 'person_getAllowedTitlesTypes',
            path: '/allowed-titles-types'
        },
        getAllowedVisitingScholarAssociationsEmploymentTypes: {
            method: 'get',
            operationId: 'person_getAllowedVisitingScholarAssociationsEmploymentTypes',
            path: '/allowed-visiting-scholar-associations/employment-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'person_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'person_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'person_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getHighlightedContent: {
            method: 'get',
            operationId: 'person_getHighlightedContent',
            path: '/{uuid}/highlighted-content'
        },
        getOrderings: {
            method: 'get',
            operationId: 'person_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'person_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'person_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'person_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            method: 'get',
            operationId: 'person_listMetricsFromCollection',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            method: 'get',
            operationId: 'person_listNotes',
            path: '/{uuid}/notes'
        },
        listSupervisees: {
            method: 'get',
            operationId: 'person_supervisee',
            path: '/{uuid}/supervisees'
        },
        lock: {
            method: 'post',
            operationId: 'person_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'person_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'person_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'person_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'person_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'person_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        updateHighlightedContent: {
            method: 'put',
            operationId: 'person_updateHighlightedContent',
            path: '/{uuid}/highlighted-content'
        },
        uploadFile: {
            method: 'put',
            operationId: 'person_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const pressMediaServiceConfig: ServiceConfig = {
    basePath: '/pressmedia',
    operations: {
        create: {
            method: 'put',
            operationId: 'pressmedia_create'
        },
        createNote: {
            method: 'put',
            operationId: 'pressmedia_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'pressmedia_get',
            path: '/{uuid}'
        },
        getAllowedCategories: {
            method: 'get',
            operationId: 'pressmedia_getAllowedCategories',
            path: '/allowed-categories'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'pressmedia_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDescriptionsTypes: {
            method: 'get',
            operationId: 'pressmedia_getAllowedDescriptionsTypes',
            path: '/allowed-descriptions-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'pressmedia_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'pressmedia_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'pressmedia_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'pressmedia_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMediaCoveragesCountries: {
            method: 'get',
            operationId: 'pressMedia_getAllowedMediaCoveragesCountries',
            path: '/allowed-media-coverages-countries'
        },
        getAllowedMediaCoveragesDegreeOfRecognitions: {
            method: 'get',
            operationId: 'pressMedia_getAllowedMediaCoveragesDegreeOfRecognitions',
            path: '/allowed-media-coverages-degree-of-recognitions'
        },
        getAllowedMediaCoveragesMediaTypes: {
            method: 'get',
            operationId: 'pressmedia_getAllowedMediaCoveragesMediaTypes',
            path: '/allowed-media-coverages-media-types'
        },
        getAllowedMediaCoveragesPersonsRoles: {
            method: 'get',
            operationId: 'pressMedia_getAllowedMediaCoveragesPersonsRoles',
            path: '/allowed-media-coverages-persons-roles'
        },
        getAllowedMediaCoveragesSubdivisions: {
            method: 'get',
            operationId: 'pressMedia_getAllowedMediaCoveragesSubdivisions',
            path: '/allowed-media-coverages-subdivisions'
        },
        getAllowedMediaCoverageTypes: {
            method: 'get',
            operationId: 'pressmedia_getAllowedMediaCoverageTypes',
            path: '/allowed-media-coverage-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'pressmedia_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'pressmedia_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            method: 'get',
            operationId: 'pressmedia_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'pressmedia_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'pressmedia_list'
        },
        listNotes: {
            method: 'get',
            operationId: 'pressmedia_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'pressmedia_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'pressmedia_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'pressmedia_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'pressmedia_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'pressmedia_update',
            path: '/{uuid}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'pressmedia_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const prizesServiceConfig: ServiceConfig = {
    basePath: '/prizes',
    operations: {
        create: {
            method: 'put',
            operationId: 'prize_create'
        },
        createNote: {
            method: 'put',
            operationId: 'prize_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'prize_get',
            path: '/{uuid}'
        },
        getAllowedCategories: {
            method: 'get',
            operationId: 'prize_getAllowedCategories',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'prize_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'prize_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDegreeOfRecognitions: {
            method: 'get',
            operationId: 'prize_getAllowedDegreeOfRecognitions',
            path: '/allowed-degree-of-recognitions'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'prize_getAllowedDescriptionsTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'prize_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'prize_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'prize_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'prize_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'prize_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'prize_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'prize_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'prize_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'prize_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedReceiversOfPrizeRoles: {
            method: 'get',
            operationId: 'prize_getAllowedReceiversOfPrizeRoles',
            path: '/allowed-receivers-of-prize-roles'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'prize_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'prize_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'prize_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'prize_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'prize_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'prize_list'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'prize_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'prize_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'prize_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'prize_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'prize_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'prize_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'prize_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'prize_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'prize_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const projectsServiceConfig: ServiceConfig = {
    basePath: '/projects',
    operations: {
        create: {
            method: 'put',
            operationId: 'project_create'
        },
        createNote: {
            method: 'put',
            operationId: 'project_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'project_get',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            method: 'get',
            operationId: 'project_getAllowedClassifiedIdentifierTypes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            method: 'get',
            operationId: 'project_getAllowedCollaboratorTypes',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'project_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            method: 'get',
            operationId: 'project_getAllowedDescriptionTypes',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'project_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'project_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'project_getAllowedDocumentLicenses',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'project_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'project_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'project_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'project_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'project_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'project_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            method: 'get',
            operationId: 'project_getAllowedNatureTypes',
            path: '/allowed-nature-types'
        },
        getAllowedParticipantRoles: {
            method: 'get',
            operationId: 'project_getAllowedParticipantRoles',
            path: '/allowed-participant-roles'
        },
        getAllowedProjectRelationTypes: {
            method: 'get',
            operationId: 'project_getAllowedProjectRelationTypes',
            path: '/allowed-project-relation-types'
        },
        getAllowedTemplates: {
            method: 'get',
            operationId: 'project_getAllowedTemplates',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'project_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'project_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getApplicationClusters: {
            method: 'get',
            operationId: 'project_getApplicationClusters',
            path: '/{uuid}/application-clusters'
        },
        getAwardClusters: {
            method: 'get',
            operationId: 'project_getAwardClusters',
            path: '/{uuid}/award-clusters'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'project_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'project_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'project_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'project_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'project_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'project_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'project_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'project_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'project_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'project_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'project_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'project_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'project_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'project_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const publishersServiceConfig: ServiceConfig = {
    basePath: '/publishers',
    operations: {
        create: {
            method: 'put',
            operationId: 'publisher_create'
        },
        createNote: {
            method: 'put',
            operationId: 'publisher_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'publisher_get',
            path: '/{uuid}'
        },
        getAllowedCountries: {
            method: 'get',
            operationId: 'publishers_getAllowedCountries',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'publisher_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'publisher_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'publisher_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'publisher_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'publisher_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'publisher_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'publisher_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'publisher_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'publisher_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'publisher_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'publisher_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'publisher_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            method: 'get',
            operationId: 'publisher_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'publisher_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'publisher_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'publisher_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'publisher_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'publisher_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'publisher_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const researchOutputsServiceConfig: ServiceConfig = {
    basePath: '/research-outputs',
    operations: {
        create: {
            method: 'put',
            operationId: 'researchOutput_create'
        },
        createNote: {
            method: 'put',
            operationId: 'researchOutput_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'researchOutput_get',
            path: '/{uuid}'
        },
        getAllowedAdditionalFileAccessTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedAdditionalFileAccessTypes',
            path: '/allowed-additional-file-access-types'
        },
        getAllowedAdditionalFileLicenseTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedAdditionalFileLicenseTypes',
            path: '/allowed-additional-file-license-types'
        },
        getAllowedArticleProcessingChargeCurrencies: {
            method: 'get',
            operationId: 'researchoutput_getAllowedArticleProcessingChargeCurrencies',
            path: '/allowed-article-processing-charge-currencies'
        },
        getAllowedBookAnthologyContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedBookAnthologyContributorRoles',
            path: '/allowed-book-anthology-contributor-roles'
        },
        getAllowedBookAnthologyDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedBookAnthologyDescriptionTypes',
            path: '/allowed-book-anthology-description-types'
        },
        getAllowedCaseNoteSources: {
            method: 'get',
            operationId: 'researchoutput_getAllowedCaseNoteSources',
            path: '/allowed-case-note-sources'
        },
        getAllowedCategories: {
            method: 'get',
            operationId: 'researchoutput_getAllowedCategories',
            path: '/allowed-categories'
        },
        getAllowedContributionToBookAnthologyContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToBookAnthologyContributorRoles',
            path: '/allowed-contribution-to-book-anthology-contributor-roles'
        },
        getAllowedContributionToBookAnthologyDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToBookAnthologyDescriptionTypes',
            path: '/allowed-contribution-to-book-anthology-description-types'
        },
        getAllowedContributionToConferenceContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToConferenceContributorRoles',
            path: '/allowed-contribution-to-conference-contributor-roles'
        },
        getAllowedContributionToConferenceDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToConferenceDescriptionTypes',
            path: '/allowed-contribution-to-conference-description-types'
        },
        getAllowedContributionToJournalContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToJournalContributorRoles',
            path: '/allowed-contribution-to-journal-contributor-roles'
        },
        getAllowedContributionToJournalDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToJournalDescriptionTypes',
            path: '/allowed-contribution-to-journal-description-types'
        },
        getAllowedContributionToMemorandumContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToMemorandumContributorRoles',
            path: '/allowed-contribution-to-memorandum-contributor-roles'
        },
        getAllowedContributionToMemorandumDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToMemorandumDescriptionTypes',
            path: '/allowed-contribution-to-memorandum-description-types'
        },
        getAllowedContributionToPeriodicalContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToPeriodicalContributorRoles',
            path: '/allowed-contribution-to-periodical-contributor-roles'
        },
        getAllowedContributionToPeriodicalDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributionToPeriodicalDescriptionTypes',
            path: '/allowed-contribution-to-periodical-description-types'
        },
        getAllowedContributorCountries: {
            method: 'get',
            operationId: 'researchoutput_getAllowedContributorCountries',
            path: '/allowed-contributor-countries'
        },
        getAllowedCountries: {
            method: 'get',
            operationId: 'researchOutput_getAllowedCountries',
            path: '/allowed-countries'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'researchOutput_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDisciplines: {
            method: 'get',
            operationId: 'researchoutput_getAllowedDisciplines',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedDisciplineSchemes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedElectronicVersionAccessTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedElectronicVersionAccessTypes',
            path: '/allowed-electronic-version-access-types'
        },
        getAllowedElectronicVersionLicenseTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedElectronicVersionLicenseTypes',
            path: '/allowed-electronic-version-license-types'
        },
        getAllowedElectronicVersionVersionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedElectronicVersionVersionTypes',
            path: '/allowed-electronic-version-version-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'researchOutput_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'researchOutput_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'researchOutput_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLanguages: {
            method: 'get',
            operationId: 'researchoutput_getAllowedLanguages',
            path: '/allowed-languages'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'researchOutput_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            method: 'get',
            operationId: 'researchoutput_getAllowedMainResearchAreas',
            path: '/allowed-main-research-areas'
        },
        getAllowedMemorandumContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedMemorandumContributorRoles',
            path: '/allowed-memorandum-contributor-roles'
        },
        getAllowedMemorandumDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedMemorandumDescriptionTypes',
            path: '/allowed-memorandum-description-types'
        },
        getAllowedMetricCollections: {
            method: 'get',
            operationId: 'researchoutput_getAllowedMetricCollections',
            path: '/allowed-metric-collections'
        },
        getAllowedNonTextualContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedNonTextualContributorRoles',
            path: '/allowed-non-textual-contributor-roles'
        },
        getAllowedNonTextualDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedNonTextualDescriptionTypes',
            path: '/allowed-non-textual-description-types'
        },
        getAllowedOtherContributionContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedOtherContributionContributorRoles',
            path: '/allowed-other-contribution-contributor-roles'
        },
        getAllowedOtherContributionDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedOtherContributionDescriptionTypes',
            path: '/allowed-other-contribution-description-types'
        },
        getAllowedOutputMedias: {
            method: 'get',
            operationId: 'researchoutput_getAllowedOutputMedias',
            path: '/allowed-output-medias'
        },
        getAllowedPatentContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedPatentContributorRoles',
            path: '/allowed-patent-contributor-roles'
        },
        getAllowedPatentDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedPatentDescriptionTypes',
            path: '/allowed-patent-description-types'
        },
        getAllowedPeerReviewConfigurations: {
            method: 'get',
            operationId: 'researchOutput_getAllowedPeerReviewConfigurations',
            path: '/allowed-peer-review-configurations'
        },
        getAllowedPublicationStatuses: {
            method: 'get',
            operationId: 'researchoutput_getAllowedPublicationStatuses',
            path: '/allowed-publication-statuses'
        },
        getAllowedQualifications: {
            method: 'get',
            operationId: 'researchoutput_getAllowedQualifications',
            path: '/allowed-qualifications'
        },
        getAllowedSupervisorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedSupervisorRoles',
            path: '/allowed-supervisor-roles'
        },
        getAllowedTemplates: {
            method: 'get',
            operationId: 'researchOutput_getAllowedTemplates',
            path: '/allowed-templates'
        },
        getAllowedThesisContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedThesisContributorRoles',
            path: '/allowed-thesis-contributor-roles'
        },
        getAllowedThesisDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedThesisDescriptionTypes',
            path: '/allowed-thesis-description-types'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'researchOutput_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'researchOutput_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getAllowedWorkingPaperContributorRoles: {
            method: 'get',
            operationId: 'researchoutput_getAllowedWorkingPaperContributorRoles',
            path: '/allowed-working-paper-contributor-roles'
        },
        getAllowedWorkingPaperDescriptionTypes: {
            method: 'get',
            operationId: 'researchoutput_getAllowedWorkingPaperDescriptionTypes',
            path: '/allowed-working-paper-description-types'
        },
        getDisciplineAssociation: {
            method: 'get',
            operationId: 'researchoutput_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            method: 'get',
            operationId: 'researchOutput_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'researchOutput_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'researchOutput_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'researchOutput_dependents',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            method: 'post',
            operationId: 'researchOutput_listDisciplineAssociations',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            method: 'get',
            operationId: 'researchOutput_listMetricsFromCollection',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            method: 'get',
            operationId: 'researchOutput_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'researchOutput_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'researchOutput_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'researchOutput_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'researchOutput_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'researchOutput_update',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            method: 'put',
            operationId: 'researchOutput_putDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'researchOutput_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const rolesServiceConfig: ServiceConfig = {
    basePath: '/roles',
    operations: {
        get: {
            method: 'get',
            operationId: 'role_get_assignable_role',
            path: '/{assignableRoleName}'
        },
        list: {
            method: 'get',
            operationId: 'role_get_assignable_roles'
        }
    }
}

export const studentThesesServiceConfig: ServiceConfig = {
    basePath: '/student-theses',
    operations: {
        create: {
            method: 'put',
            operationId: 'studentThesis_create'
        },
        createNote: {
            method: 'put',
            operationId: 'studentThesis_createNote',
            path: '/{uuid}/notes'
        },
        get: {
            method: 'get',
            operationId: 'studentThesis_get',
            path: '/{uuid}'
        },
        getAllowedContributorCountries: {
            method: 'get',
            operationId: 'studentthesis_getAllowedContributorCountries',
            path: '/allowed-contributor-countries'
        },
        getAllowedContributorRoles: {
            method: 'get',
            operationId: 'studentthesis_getAllowedContributorRoles',
            path: '/allowed-contributor-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            method: 'get',
            operationId: 'studentThesis_getAllowedCustomDefinedFieldClassifications',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDocumentEmbargoReasons: {
            method: 'get',
            operationId: 'studentThesis_getAllowedDocumentEmbargoReasons',
            path: '/allowed-document-embargo-reasons'
        },
        getAllowedDocumentLicenses: {
            method: 'get',
            operationId: 'studentThesis_getAllowedDocumentLicenses',
            path: '/allowed-document-license-types'
        },
        getAllowedDocumentTypes: {
            method: 'get',
            operationId: 'studentThesis_getAllowedDocumentTypes',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            method: 'get',
            operationId: 'studentThesis_getAllowedDocumentVersionTypes',
            path: '/allowed-document-version-types'
        },
        getAllowedImageTypes: {
            method: 'get',
            operationId: 'studentThesis_getAllowedImageTypes',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            method: 'get',
            operationId: 'studentThesis_getAllowedKeywordGroupConfigurationClassifications',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            method: 'get',
            operationId: 'studentThesis_getAllowedKeywordGroupConfigurations',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLanguages: {
            method: 'get',
            operationId: 'studentthesis_getAllowedLanguages',
            path: '/allowed-languages'
        },
        getAllowedLinkTypes: {
            method: 'get',
            operationId: 'studentthesis_getAllowedLinkTypes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'studentThesis_getAllowedLocales',
            path: '/allowed-locales'
        },
        getAllowedSupervisorRoles: {
            method: 'get',
            operationId: 'studentthesis_getAllowedSupervisorRoles',
            path: '/allowed-supervisor-roles'
        },
        getAllowedTypes: {
            method: 'get',
            operationId: 'studentThesis_getAllowedTypes',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            method: 'get',
            operationId: 'studentThesis_getAllowedWorkflowSteps',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            method: 'get',
            operationId: 'studentThesis_getFile',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'studentThesis_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'studentThesis_list'
        },
        listDependents: {
            method: 'get',
            operationId: 'studentThesis_dependents',
            path: '/{uuid}/dependents'
        },
        listNotes: {
            method: 'get',
            operationId: 'studentThesis_listNotes',
            path: '/{uuid}/notes'
        },
        lock: {
            method: 'post',
            operationId: 'studentThesis_lock',
            path: '/{uuid}/actions/lock'
        },
        query: {
            method: 'post',
            operationId: 'studentThesis_query',
            path: '/search'
        },
        remove: {
            method: 'delete',
            operationId: 'studentThesis_delete',
            path: '/{uuid}'
        },
        unlock: {
            method: 'post',
            operationId: 'studentThesis_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'studentThesis_update',
            path: '/{uuid}'
        },
        uploadFile: {
            method: 'put',
            operationId: 'studentThesis_fileUploads',
            path: '/file-uploads'
        }
    }
}

export const thesauriServiceConfig: ServiceConfig = {
    basePath: '/thesauri',
    operations: {
        get: {
            method: 'get',
            operationId: 'thesaurus_get',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            method: 'get',
            operationId: 'thesaurus_getAllowedLocales',
            path: '/allowed-locales'
        },
        getOrderings: {
            method: 'get',
            operationId: 'thesaurus_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'thesaurus_list'
        },
        query: {
            method: 'post',
            operationId: 'thesaurus_query',
            path: '/search'
        }
    }
}

export const usersServiceConfig: ServiceConfig = {
    basePath: '/users',
    operations: {
        create: {
            method: 'put',
            operationId: 'user_create'
        },
        get: {
            method: 'get',
            operationId: 'user_get',
            path: '/{uuid}'
        },
        getOrderings: {
            method: 'get',
            operationId: 'user_getOrderings',
            path: '/orderings'
        },
        list: {
            method: 'get',
            operationId: 'user_list'
        },
        listRoles: {
            method: 'get',
            operationId: 'user_get_roles_for_user',
            path: '/{uuid}/roles'
        },
        lock: {
            method: 'post',
            operationId: 'user_lock',
            path: '/{uuid}/actions/lock'
        },
        remove: {
            method: 'delete',
            operationId: 'user_delete',
            path: '/{uuid}'
        },
        resetPassword: {
            method: 'post',
            operationId: 'user_resetPassword',
            path: '/{uuid}/actions/reset-password'
        },
        unlock: {
            method: 'post',
            operationId: 'user_unlock',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            method: 'put',
            operationId: 'user_update',
            path: '/{uuid}'
        },
        updateRoles: {
            method: 'put',
            operationId: 'user_update_roles_for_user',
            path: '/{uuid}/roles'
        }
    }
}

export const serviceConfigRegistry = {
    activities: activitiesServiceConfig,
    authorCollaborations: authorCollaborationsServiceConfig,
    applications: applicationsServiceConfig,
    awards: awardsServiceConfig,
    classificationSchemes: classificationSchemesServiceConfig,
    concepts: conceptsServiceConfig,
    dataSets: dataSetsServiceConfig,
    equipment: equipmentServiceConfig,
    events: eventsServiceConfig,
    externalOrganizations: externalOrganizationsServiceConfig,
    externalPersons: externalPersonsServiceConfig,
    fundingOpportunities: fundingOpportunitiesServiceConfig,
    impacts: impactsServiceConfig,
    journals: journalsServiceConfig,
    organizations: organizationsServiceConfig,
    persons: personsServiceConfig,
    pressMedia: pressMediaServiceConfig,
    prizes: prizesServiceConfig,
    projects: projectsServiceConfig,
    publishers: publishersServiceConfig,
    researchOutputs: researchOutputsServiceConfig,
    roles: rolesServiceConfig,
    studentTheses: studentThesesServiceConfig,
    thesauri: thesauriServiceConfig,
    users: usersServiceConfig
} as const

export type ServiceName = keyof typeof serviceConfigRegistry

export type PathParams = Record<string, string | number | boolean>

export interface InvokeOperationArgs {
    readonly pathParams?: PathParams
    readonly query?: Record<string, unknown>
    readonly body?: unknown
    readonly config?: AxiosRequestConfig
}

type PureClientLike = Pick<PureClient, 
    'get'
    | 'post'
    | 'put'
    | 'delete'
>

export function resolveOperationPath(basePath: string, operation: ServiceOperationConfig, params: PathParams = {}): string {
    const relativePath = operation.path ?? ""
    const resolvedPath = relativePath.replace(/{([^}]+)}/g, (_, token) => {
        if (!(token in params)) {
            throw new Error(`Missing required path parameter "${token}"`)
        }

        const value = params[token]
        return encodeURIComponent(String(value))
    })

    if (!relativePath) {
        return basePath
    }

    return `${basePath}${resolvedPath}`
}

export async function invokeOperation<TResponse>(
    client: PureClientLike,
    basePath: string,
    operation: ServiceOperationConfig,
    args: InvokeOperationArgs = {}
): Promise<TResponse> {
    const { pathParams, query, body, config } = args
    const path = resolveOperationPath(basePath, operation, pathParams)

    switch (operation.method) {
        case 'get':
            return client.get(path, query, config) as Promise<TResponse>
        case 'post':
            return client.post(path, body, query, config) as Promise<TResponse>
        case 'put':
            return client.put(path, body, query, config) as Promise<TResponse>
        case 'delete':
            return client.delete(path, query, config) as Promise<TResponse>
        default:
            throw new Error(`Unsupported HTTP method ${operation.method}`)
    }
}
