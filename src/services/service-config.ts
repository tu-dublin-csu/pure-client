import type { AxiosRequestConfig } from 'axios'

import type { operations } from '../generated/pure'
import { getOperationMetadata } from '../generated/operation-map'
import type { PureClient } from '../pure-client'

export type OperationId = keyof operations

export interface ServiceOperationConfig {
    readonly operationId: OperationId
    /**
     * @description Short summary sourced from the OpenAPI document.
     */
    readonly summary?: string
    /**
     * @description Detailed description sourced from the OpenAPI document.
     */
    readonly description?: string
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
            operationId: 'activity_create',
            summary: 'Create activity',
            description: 'Create activity'
        },
        createNote: {
            operationId: 'activity_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an activity',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'activity_get',
            summary: 'Get activity',
            description: 'Get activity with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAttendancePersonRoles: {
            operationId: 'activity_getAllowedAttendancePersonRoles',
            summary: 'A list of allowed attendance activity person roles',
            description: 'Get a list of allowed roles for persons on attendance activities',
            path: '/allowed-attendance-person-roles'
        },
        getAllowedCategories: {
            operationId: 'activity_getAllowedCategories',
            summary: 'A list of allowed categories',
            description: 'Get a list of allowed categories for activities',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'activity_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of activities',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedConsultancyPersonRoles: {
            operationId: 'activity_getAllowedConsultancyPersonRoles',
            summary: 'A list of allowed  consultancy activity person roles',
            description: 'Get a list of allowed roles for persons on consultancy activities',
            path: '/allowed-consultancy-person-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'activity_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the activity',
            description: 'Get allowed classifications for the custom-defined field associated with the activity.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDegreeOfRecognitions: {
            operationId: 'activity_getAllowedDegreeOfRecognitions',
            summary: 'A list of allowed degree of recognitions',
            description: 'Get a list of allowed degree of recognitions on activities',
            path: '/allowed-degree-of-recognitions'
        },
        getAllowedDescriptionTypes: {
            operationId: 'activity_getAllowedDescriptionTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of allowed types for descriptions on activities',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'activity_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for activities',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'activity_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for activities',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'activity_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed license types for documents on activities',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'activity_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on activities',
            path: '/allowed-document-types'
        },
        getAllowedEditorialWorkPersonRoles: {
            operationId: 'activity_getAllowedEditorialWorkPersonRoles',
            summary: 'A list of allowed editorial-work activity person roles',
            description: 'Get a list of allowed roles for persons on editorial-work activities',
            path: '/allowed-editorial-work-person-roles'
        },
        getAllowedExaminationPersonRoles: {
            operationId: 'activity_getAllowedExaminationPersonRoles',
            summary: 'A list of allowed examination activity person roles',
            description: 'Get a list of allowed roles for persons on examination activities',
            path: '/allowed-examination-person-roles'
        },
        getAllowedHostVisitorCountries: {
            operationId: 'activity_getAllowedHostVisitorCountries',
            summary: 'A list of allowed host visitor countries',
            description: 'Get a list of allowed countries host visitor activities',
            path: '/allowed-host-visitor-countries'
        },
        getAllowedHostVisitorPersonRoles: {
            operationId: 'activity_getAllowedHostVisitorPersonRoles',
            summary: 'A list of allowed host-visitor activity person roles',
            description: 'Get a list of allowed roles for persons on host visitor activities',
            path: '/allowed-host-visitor-person-roles'
        },
        getAllowedImageTypes: {
            operationId: 'activity_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of activities',
            path: '/allowed-image-types'
        },
        getAllowedIndicators: {
            operationId: 'activity_getAllowedIndicators',
            summary: 'A list of allowed activity indicators',
            description: 'Get a list of allowed indicators on activities',
            path: '/allowed-indicators'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'activity_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'activity_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'activity_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types on activities',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'activity_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMembershipPersonRoles: {
            operationId: 'activity_getAllowedMembershipPersonRoles',
            summary: 'A list of allowed membership activity person roles',
            description: 'Get a list of allowed roles for persons on membership activities',
            path: '/allowed-membership-person-roles'
        },
        getAllowedOtherActivityPersonRoles: {
            operationId: 'activity_getAllowedOtherActivityPersonRoles',
            summary: 'A list of allowed other activity person roles',
            description: 'Get a list of allowed roles for persons on other activities',
            path: '/allowed-other-activity-person-roles'
        },
        getAllowedTalkPersonRoles: {
            operationId: 'activity_getAllowedTalkPersonRoles',
            summary: 'A list of allowed talk activity person roles',
            description: 'Get a list of allowed roles for persons on talk activities',
            path: '/allowed-talk-person-roles'
        },
        getAllowedTypes: {
            operationId: 'activity_getAllowedTypes',
            summary: 'A list of allowed activity types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of activities',
            path: '/allowed-types'
        },
        getAllowedVisitOtherPersonRoles: {
            operationId: 'activity_getAllowedVisitOtherPersonRoles',
            summary: 'A list of allowed visit-other activity person roles',
            description: 'Get a list of allowed roles for persons on visit-other activities',
            path: '/allowed-visit-other-person-roles'
        },
        getAllowedWorkflowSteps: {
            operationId: 'activity_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps in localized strings',
            description: 'Get a list of allowed workflow steps.',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'activity_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the activity',
            description: 'Get disciplines from the discipline scheme associated with the activity with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'activity_getFile',
            summary: 'Get file from the activity',
            description: 'Get file from the activity',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'activity_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the activities endpoint. These values can be used by the order parameter when listing activities.',
            path: '/orderings'
        },
        list: {
            operationId: 'activity_list',
            summary: 'Lists all activities',
            description: 'Lists all activities in the Pure instance. If you need to filter the activities returned, see the POST version which supports additional filtering.'
        },
        listDisciplineAssociations: {
            operationId: 'activity_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with activities',
            description: 'Lists disciplines from the discipline scheme associated with activities in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'activity_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an activity ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'activity_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'activity_query',
            summary: 'Query operation for activities',
            description: 'Lists activities in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'activity_delete',
            summary: 'Delete activity',
            description: 'Delete activity with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'activity_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'activity_update',
            summary: 'Update an activity',
            description: 'Update an activity with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'activity_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the activity',
            description: 'Update disciplines from the discipline scheme associated with the activity with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'activity_fileUploads',
            summary: 'Upload file to a specific activity',
            description: 'Uploads file for the activity',
            path: '/file-uploads'
        }
    }
}

export const authorCollaborationsServiceConfig: ServiceConfig = {
    basePath: '/author-collaborations',
    operations: {
        create: {
            operationId: 'authorCollaboration_create',
            summary: 'Create author collaboration',
            description: 'Create author collaboration'
        },
        createNote: {
            operationId: 'authorCollaborations_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a author collaboration',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'authorCollaborations_get',
            summary: 'Get author collaboration',
            description: 'Get author collaboration with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            operationId: 'authorCollaborations_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedWorkflowSteps: {
            operationId: 'authorCollaborations_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of author collaboration',
            path: '/allowed-workflow-steps'
        },
        getOrderings: {
            operationId: 'authorCollaborations_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the author collaboration endpoint. These values can be used by the order parameter when listing author collaborations.',
            path: '/orderings'
        },
        list: {
            operationId: 'authorCollaboration_list',
            summary: 'Lists all  author collaborations',
            description: 'Lists all  author collaborations in the Pure instance. If you need to filter the author collaborations returned, see the POST version which supports additional filtering.'
        },
        listNotes: {
            operationId: 'authorCollaborations_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a author collaboration ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'authorCollaborations_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'authorCollaborations_query',
            summary: 'Query operation for author-collaborations',
            description: 'Lists author-collaborations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'authorCollaboration_delete',
            summary: 'Delete author collaboration',
            description: 'Delete author collaboration with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'authorCollaborations_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'authorCollaboration_update',
            summary: 'Update author collaboration',
            description: 'Update author collaboration with specific UUID.',
            path: '/{uuid}'
        }
    }
}

export const applicationsServiceConfig: ServiceConfig = {
    basePath: '/applications',
    operations: {
        create: {
            operationId: 'application_create',
            summary: 'Create application',
            description: 'Create application'
        },
        createNote: {
            operationId: 'application_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with the application',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'application_get',
            summary: 'Get application',
            description: 'Get application with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedApplicantRoles: {
            operationId: 'application_getAllowedApplicantRoles',
            summary: 'A list of allowed applicant roles',
            description: 'Get a list of allowed applicant roles on applications',
            path: '/allowed-applicant-roles'
        },
        getAllowedBudgetAccountClassifications: {
            operationId: 'application_getAllowedBudgetAccountClassifications',
            summary: 'A list of allowed account classifications',
            description: 'Get a list of allowed account classifications for application budgets',
            path: '/allowed-budget-account-classifications'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'application_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of applications',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            operationId: 'application_getAllowedCollaboratorTypes',
            summary: 'A list of allowed collaborators types',
            description: 'Get a list of allowed collaborator types on applications',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'application_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the application',
            description: 'Get allowed classifications for the custom-defined field associated with the application.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'application_getAllowedDescriptionTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of allowed description types on applications',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'application_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for applications',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'application_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for applications',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'application_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed document licenses for applications',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'application_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed document types on applications',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            operationId: 'application_getAllowedDocumentVersionTypes',
            summary: 'A list of allowed document version types',
            description: 'Get a list of allowed document version types for applications',
            path: '/allowed-document-version-types'
        },
        getAllowedFundingClassifications: {
            operationId: 'application_getAllowedFundingClassifications',
            summary: 'A list of allowed fundings classifications',
            description: 'Get a list of allowed funding classifications for fundings on applications',
            path: '/allowed-funding-classifications'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'application_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'application_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'application_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types for applications',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'application_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'application_getAllowedNatureTypes',
            summary: 'A list of allowed nature types',
            description: 'Get a list of allowed nature types for applications',
            path: '/allowed-nature-types'
        },
        getAllowedStatuses: {
            operationId: 'application_getAllowedApplicationStatuses',
            summary: 'A list of allowed application statuses',
            description: 'Get a list of allowed application statuses that can be used for the \'applicationStatuses.status\' attribute of applications',
            path: '/allowed-application-statuses'
        },
        getAllowedTemplates: {
            operationId: 'application_getAllowedTemplates',
            summary: 'A list of allowed application templates',
            description: 'Get a list of allowed templates that can be used for applications. Some of the templates that exists in the API specification may be disabled for the Pure installation.',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            operationId: 'application_getAllowedTypes',
            summary: 'A list of allowed application types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of applications',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'application_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of applications',
            path: '/allowed-workflow-steps'
        },
        getBudget: {
            operationId: 'application_getBudget',
            summary: 'Get a specific budget for the application',
            description: 'Get a specific budget for the application with the specified UUID.',
            path: '/{uuid}/budgets/{id}'
        },
        getBudgets: {
            operationId: 'application_getBudgets',
            summary: 'Get the budgets for the application',
            description: 'Get the budgets for the application with the specified UUID.',
            path: '/{uuid}/budgets'
        },
        getCluster: {
            operationId: 'application_getCluster',
            summary: 'Get the application cluster for the application',
            description: 'Get the application cluster for the application with the specified UUID.',
            path: '/{uuid}/cluster'
        },
        getDisciplineAssociation: {
            operationId: 'application_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the application',
            description: 'Get disciplines from the discipline scheme associated with the application with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'application_getFile',
            summary: 'Get file from the application',
            description: 'Get file from the application',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'application_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the application endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'application_list',
            summary: 'Lists all applications',
            description: 'Lists all applications in the Pure instance. If you need to filter the applications returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'application_dependents',
            summary: 'Lists all dependents to an application',
            description: 'Lists all dependents to an application with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'application_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with applications',
            description: 'Lists disciplines from the discipline scheme associated with applications in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'application_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an application ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'application_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'application_query',
            summary: 'Query operation for applications',
            description: 'Lists applications in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'application_delete',
            summary: 'Delete application',
            description: 'Delete application with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'application_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'application_update',
            summary: 'Update application',
            description: 'Update application with specific UUID.',
            path: '/{uuid}'
        },
        updateBudget: {
            operationId: 'application_updateBudget',
            summary: 'Update budget for an application',
            description: 'Update budget for an application with specific UUID.',
            path: '/{uuid}/budgets/{id}'
        },
        updateDisciplineAssociation: {
            operationId: 'application_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the application',
            description: 'Update disciplines from the discipline scheme associated with the application with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'application_fileUploads',
            summary: 'Upload file to a specific application',
            description: 'Uploads file for the application',
            path: '/file-uploads'
        }
    }
}

export const awardsServiceConfig: ServiceConfig = {
    basePath: '/awards',
    operations: {
        create: {
            operationId: 'award_create',
            summary: 'Create award',
            description: 'Create award'
        },
        createNote: {
            operationId: 'award_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with the award',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'award_get',
            summary: 'Get award',
            description: 'Get award with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAwardholderRoles: {
            operationId: 'award_getAllowedAwardHolderRoles',
            summary: 'A list of allowed award holder roles',
            description: 'Get a list of allowed roles for award holders on awards',
            path: '/allowed-awardholder-roles'
        },
        getAllowedBudgetAccountClassifications: {
            operationId: 'award_getAllowedBudgetAccountClassifications',
            summary: 'A list of allowed account classifications',
            description: 'Get a list of allowed account classifications for award budgets',
            path: '/allowed-budget-account-classifications'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'award_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of awards',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            operationId: 'award_getAllowedCollaboratorTypes',
            summary: 'A list of allowed collaborator types',
            description: 'Get a list of allowed types for collaborators on awards',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'award_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the award',
            description: 'Get allowed classifications for the custom-defined field associated with the award.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'award_getAllowedDescriptionTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of allowed types for descriptions on awards',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'award_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for awards',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'award_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for awards',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'award_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed document licenses for awards',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'award_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on awards',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            operationId: 'award_getAllowedDocumentVersionTypes',
            summary: 'A list of allowed document version types',
            description: 'Get a list of allowed version types for documents on awards',
            path: '/allowed-document-version-types'
        },
        getAllowedFundingClassifications: {
            operationId: 'award_getAllowedFundingClassifications',
            summary: 'A list of allowed funding classifications',
            description: 'Get a list of allowed funding classifications for fundings on awards',
            path: '/allowed-funding-classifications'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'award_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'award_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'award_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of awards',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'award_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'award_getAllowedNatureTypes',
            summary: 'A list of allowed nature types',
            description: 'Get a list of allowed nature types for awards',
            path: '/allowed-nature-types'
        },
        getAllowedTemplates: {
            operationId: 'award_getAllowedTemplates',
            summary: 'A list of allowed award templates',
            description: 'Get a list of allowed templates that can be used for awards. Some of the templates that exists in the API specification may be disabled for the Pure installation.',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            operationId: 'award_getAllowedTypes',
            summary: 'A list of allowed award types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of awards',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'award_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of awards',
            path: '/allowed-workflow-steps'
        },
        getBudget: {
            operationId: 'award_getBudget',
            summary: 'Get a specific budget for the award',
            description: 'Get a specific budget for the award with the specified UUID.',
            path: '/{uuid}/budgets/{id}'
        },
        getBudgets: {
            operationId: 'award_getBudgets',
            summary: 'Get the budgets for the award',
            description: 'Get the budgets for the award with the specified UUID.',
            path: '/{uuid}/budgets'
        },
        getCluster: {
            operationId: 'award_getCluster',
            summary: 'Get the award cluster for the award',
            description: 'Get the award cluster for the award with the specified UUID.',
            path: '/{uuid}/cluster'
        },
        getMilestones: {
            operationId: 'award_getMilestones',
            summary: 'Get milestones for the award',
            description: 'Get milestones for the award with the specified UUID.',
            path: '/{uuid}/milestones'
        },
        getDisciplineAssociation: {
            operationId: 'award_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the award',
            description: 'Get disciplines from the discipline scheme associated with the award with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'award_getFile',
            summary: 'Get file from the award',
            description: 'Get file from the award',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'award_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the award endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'award_list',
            summary: 'Lists all awards',
            description: 'Lists all awards in the Pure instance. If you need to filter the awards returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'award_dependents',
            summary: 'Lists all dependents to an award',
            description: 'Lists all dependents to an award with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'award_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with awards',
            description: 'Lists disciplines from the discipline scheme associated with awards in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'award_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an award ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'award_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'award_query',
            summary: 'Query operation for awards',
            description: 'Lists awards in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'award_delete',
            summary: 'Delete award',
            description: 'Delete award with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'award_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'award_update',
            summary: 'Update award',
            description: 'Update award with specific UUID.',
            path: '/{uuid}'
        },
        updateBudget: {
            operationId: 'award_updateBudget',
            summary: 'Update budget for an award',
            description: 'Update budget for an award with specific UUID.',
            path: '/{uuid}/budgets/{id}'
        },
        updateDisciplineAssociation: {
            operationId: 'award_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the award',
            description: 'Update disciplines from the discipline scheme associated with the award with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'award_fileUploads',
            summary: 'Upload file to a specific award',
            description: 'Uploads file for the award',
            path: '/file-uploads'
        }
    }
}

export const classificationSchemesServiceConfig: ServiceConfig = {
    basePath: '/classification-schemes',
    operations: {
        create: {
            operationId: 'classificationScheme_create',
            summary: 'Create classification scheme',
            description: 'Create classification scheme'
        },
        get: {
            operationId: 'classificationScheme_get',
            summary: 'Get classification scheme',
            description: 'Get classification scheme with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAssociatedSchemesClassifications: {
            operationId: 'classificationScheme_getAllowedAssociatedSchemesClassifications',
            summary: 'A list of allowed associated schemes classifications',
            description: 'Get a list of allowed types of associated classification schemes that can be used for the getAssociatedSchemes.classification attribute on classification scheme',
            path: '/allowed-associated-schemes'
        },
        getAllowedLocales: {
            operationId: 'classificationScheme_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities. Example usage: Terms of contained classifications must be defined in all these locales.',
            path: '/allowed-locales'
        },
        getAllowedTypeClassifications: {
            operationId: 'classificationScheme_getAllowedTypeClassifications',
            summary: 'A list of allowed types of classification schemes',
            description: 'Get a list of allowed types that can be used for the \'typeClassification\' attribute of classification scheme',
            path: '/allowed-type-classifications'
        },
        list: {
            operationId: 'classificationScheme_list',
            summary: 'Lists all classification schemes',
            description: 'Lists all classification schemes in the Pure instance.'
        },
        lock: {
            operationId: 'classificationScheme_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        remove: {
            operationId: 'classificationScheme_delete',
            summary: 'Delete classification scheme',
            description: 'Delete classification scheme with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'classificationScheme_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'classificationScheme_update',
            summary: 'Update classification scheme',
            description: 'Update classification scheme with specific UUID. Note: terms of all containedClassifications must be defined in all UI locales.',
            path: '/{uuid}'
        }
    }
}

export const conceptsServiceConfig: ServiceConfig = {
    basePath: '/concepts',
    operations: {
        get: {
            operationId: 'concept_get',
            summary: 'Get concept',
            description: 'Get concept with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            operationId: 'concept_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        list: {
            operationId: 'concept_list',
            summary: 'Lists all concept',
            description: 'Lists all concept in the Pure instance. If you need to filter the concept returned, see the POST version which supports additional filtering.'
        },
        query: {
            operationId: 'concept_query',
            summary: 'Query operation for concept',
            description: 'Lists concept in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        }
    }
}

export const dataSetsServiceConfig: ServiceConfig = {
    basePath: '/data-sets',
    operations: {
        create: {
            operationId: 'dataSet_create',
            summary: 'Create data set',
            description: 'Create data set'
        },
        createNote: {
            operationId: 'dataSet_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a data set',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'dataSet_get',
            summary: 'Get data set',
            description: 'Get data set with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'dataSet_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of data sets',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedContributorsRoles: {
            operationId: 'dataSet_getAllowedContributorsRoles',
            summary: 'A list of allowed contributors roles',
            description: 'Get a list of allowed contributors roles that can be used for the \'contributor.role\' attribute of the data set.',
            path: '/allowed-contributors-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'dataSet_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the data set',
            description: 'Get allowed classifications for the custom-defined field associated with the data set.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'dataSet_getAllowedDescriptionTypes',
            summary: 'A list of allowed classifications for the descriptions property',
            description: 'Get a list of classifications that can be used when submitting a description.',
            path: '/allowed-description-types'
        },
        getAllowedDocumentLicenses: {
            operationId: 'dataSet_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed license types that can be used for the \'documents.license\' attribute of data sets',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'dataSet_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed license types that can be used for the \'documents.type\' attribute of data sets',
            path: '/allowed-document-types'
        },
        getAllowedDoiAccessTypes: {
            operationId: 'dataSet_getAllowedDoiAccessTypes',
            summary: 'A list of allowed access types for DOI',
            description: 'Get a list of allowed DOI access types on data sets',
            path: '/allowed-doi-access-types'
        },
        getAllowedDoiLicenseTypes: {
            operationId: 'dataSet_getAllowedDoiLicenseTypes',
            summary: 'A list of allowed license types for DOI',
            description: 'Get a list of allowed DOI license types on data sets',
            path: '/allowed-doi-license-types'
        },
        getAllowedImageTypes: {
            operationId: 'dataSet_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of the data set.',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'dataSet_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'dataSet_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLegalConditionTypes: {
            operationId: 'dataSet_getAllowedLegalConditionsTypes',
            summary: 'A list of allowed legal condition types',
            description: 'Get a list of allowed types for legal condition on data sets',
            path: '/allowed-legal-condition-types'
        },
        getAllowedLicenses: {
            operationId: 'dataSet_getAllowedLicenses',
            summary: 'A list of allowed licenses',
            description: 'Get a list of allowed licenses on data sets',
            path: '/allowed-licenses'
        },
        getAllowedLinkTypes: {
            operationId: 'dataSet_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of data sets',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'dataSet_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'dataSet_getAllowedNatureTypes',
            summary: 'A list of allowed nature types',
            description: 'Get a list of allowed nature types for data sets.',
            path: '/allowed-nature-types'
        },
        getAllowedOpenAccessPermissions: {
            operationId: 'dataSet_getAllowedOpenAccessPermissions',
            summary: 'A list of allowed open access permissions',
            description: 'Get a list of allowed open access permissions on data sets',
            path: '/allowed-open-access-permissions'
        },
        getAllowedPersonsRoles: {
            operationId: 'dataSet_getAllowedPersonsRoles',
            summary: 'A list of allowed person roles',
            description: 'Get a list of allowed person roles that can be used for the \'persons.role\' attribute of the data set.',
            path: '/allowed-persons-roles'
        },
        getAllowedPhysicalDataTypes: {
            operationId: 'dataSet_getAllowedPhysicalDataTypes',
            summary: 'A list of allowed physical data types',
            description: 'Get a list of allowed types for physical data on data sets',
            path: '/allowed-physical-data-types'
        },
        getAllowedTypes: {
            operationId: 'dataSet_getAllowedTypes',
            summary: 'A list of allowed classifications for the type property',
            description: 'Get a list of classifications that can be used when submitting a type.',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'dataSet_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of data sets',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            operationId: 'dataSet_getFile',
            summary: 'Get file from the data set',
            description: 'Get file from the data set',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            operationId: 'dataSet_list',
            summary: 'Lists all data sets',
            description: 'Lists all data sets in the Pure instance. If you need to filter the data sets returned, see the POST version which supports additional filtering.'
        },
        listNotes: {
            operationId: 'dataSet_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an data set ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'dataSet_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'dataSet_query',
            summary: 'Query operation for data sets',
            description: 'Lists data sets in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'dataSet_delete',
            summary: 'Delete data set',
            description: 'Delete data set with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'dataSet_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'dataSet_update',
            summary: 'Update data set',
            description: 'Update data set with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'dataSet_fileUploads',
            summary: 'Upload file to a specific data set',
            description: 'Uploads file for the data set',
            path: '/file-uploads'
        }
    }
}

export const equipmentServiceConfig: ServiceConfig = {
    basePath: '/equipment',
    operations: {
        create: {
            operationId: 'equipment_create',
            summary: 'Create equipment',
            description: 'Create equipment'
        },
        createNote: {
            operationId: 'equipment_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with the equipment',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'equipment_get',
            summary: 'Get equipment',
            description: 'Get equipment with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            operationId: 'equipment_getAllowedAddressCountries',
            summary: 'A list of allowed address countries',
            description: 'Get a list of allowed countries that can be used for the \'addresses.country\' attribute of equipment',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            operationId: 'equipment_getAllowedAddressSubdivisions',
            summary: 'A list of allowed address subdivisions',
            description: 'Get a list of allowed subdivisions that can be used for the \'addresses.subdivisions\' attribute of equipment',
            path: '/allowed-address-subdivision'
        },
        getAllowedAddressTypes: {
            operationId: 'equipment_getAllowedAddressTypes',
            summary: 'A list of allowed address types',
            description: 'Get a list of allowed address types that can be used for the \'addresses.type\' attribute of equipment',
            path: '/allowed-address-types'
        },
        getAllowedCategories: {
            operationId: 'equipment_getAllowedCategories',
            summary: 'A list of allowed categories',
            description: 'Get a list of allowed categories on equipment',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'equipment_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of equipment',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'equipment_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the equipment',
            description: 'Get allowed classifications for the custom-defined field associated with the equipment.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'equipment_getAllowedDescriptionTypes',
            summary: 'A list of allowed classifications for the descriptions property',
            description: 'Get a list of classifications that can be used when submitting a description.',
            path: '/allowed-description-types'
        },
        getAllowedEmailTypes: {
            operationId: 'equipment_getAllowedEmailTypes',
            summary: 'A list of allowed e-mail types',
            description: 'Get a list of allowed e-mail types that can be used for the \'emails.type\' attribute of equipment',
            path: '/allowed-email-types'
        },
        getAllowedImageTypes: {
            operationId: 'equipment_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of equipment',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'equipment_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'equipment_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLoanTypes: {
            operationId: 'equipment_getAllowedLoanTypes',
            summary: 'A list of allowed loan types',
            description: 'Get a list of allowed loan types that can be used for the \'loan type\' attribute of equipment',
            path: '/allowed-loan-types'
        },
        getAllowedLocales: {
            operationId: 'equipment_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedPersonsRoles: {
            operationId: 'equipment_getAllowedPersonsRoles',
            summary: 'A list of allowed persons roles',
            description: 'Get a list of allowed persons roles',
            path: '/allowed-persons-roles'
        },
        getAllowedPhoneNumberTypes: {
            operationId: 'equipment_getAllowedPhoneNumberTypes',
            summary: 'A list of allowed phone number types',
            description: 'Get a list of allowed phone number types that can be used for the \'phoneNumbers.type\' attribute of equipment',
            path: '/allowed-phone-number-types'
        },
        getAllowedTypes: {
            operationId: 'equipment_getAllowedTypes',
            summary: 'A list of allowed equipment types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of equipment',
            path: '/allowed-types'
        },
        getAllowedWebAddressTypes: {
            operationId: 'equipment_getAllowedWebAddressTypes',
            summary: 'A list of allowed web address types',
            description: 'Get a list of allowed web address types that can be used for the \'webAddresses.type\' attribute of equipment',
            path: '/allowed-web-address-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'equipment_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps in localized strings',
            description: 'Get a list of allowed workflow steps.',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            operationId: 'equipment_getFile',
            summary: 'Get file from the equipment',
            description: 'Get file from the equipment',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            operationId: 'equipment_list',
            summary: 'Lists all equipment',
            description: 'Lists all equipment in the Pure instance. If you need to filter the equipment returned, see the POST version which supports additional filtering.'
        },
        listNotes: {
            operationId: 'equipment_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an equipment ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'equipment_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'equipment_query',
            summary: 'Query operation for equipment',
            description: 'Lists equipment in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'equipment_delete',
            summary: 'Delete equipment',
            description: 'Delete equipment with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'equipment_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'equipment_update',
            summary: 'Update equipment',
            description: 'Update equipment with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'equipment_fileUploads',
            summary: 'Upload file to a specific equipment',
            description: 'Uploads file for the equipment',
            path: '/file-uploads'
        }
    }
}

export const eventsServiceConfig: ServiceConfig = {
    basePath: '/events',
    operations: {
        create: {
            operationId: 'event_create',
            summary: 'Create event',
            description: 'Create event'
        },
        createNote: {
            operationId: 'event_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an event',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'event_get',
            summary: 'Get event',
            description: 'Get event with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'event_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of events',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            operationId: 'event_getAllowedCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries that can be used for the \'country\' attribute of events',
            path: '/allowed-countries'
        },
        getAllowedDegreeOfRecognitions: {
            operationId: 'event_getAllowedDegreeOfRecognitions',
            summary: 'A list of allowed degree of recognitions',
            description: 'Get a list of allowed degree of recognitions that can be used for the \'degreeOfRecognition\' attribute of events',
            path: '/allowed-degree-of-recognition'
        },
        getAllowedDisciplines: {
            operationId: 'event_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for events',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'event_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for events',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'event_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'event_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'event_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of events',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'event_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedSubdivisions: {
            operationId: 'event_getAllowedSubdivisions',
            summary: 'A list of allowed subdivisions',
            description: 'Get a list of allowed subdivisions can be used for the \'subdivision\' attribute of events',
            path: '/allowed-subdivision'
        },
        getAllowedTypes: {
            operationId: 'event_getAllowedTypes',
            summary: 'A list of allowed event types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of events',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'event_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of events',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'event_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the event',
            description: 'Get disciplines from the discipline scheme  associated with the event with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            operationId: 'event_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the event endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'event_list',
            summary: 'Lists all events',
            description: 'Lists all events in the Pure instance. If you need to filter the events returned, see the POST version which supports additional filtering.'
        },
        listDisciplineAssociations: {
            operationId: 'event_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with events',
            description: 'Lists disciplines from the discipline scheme associated with events in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'event_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an event ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'event_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'events_query',
            summary: 'Query operation for events',
            description: 'Lists events in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'event_delete',
            summary: 'Delete event',
            description: 'Delete event with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'event_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'event_update',
            summary: 'Update event',
            description: 'Update event with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'event_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the event',
            description: 'Update disciplines from the discipline scheme associated with the event with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const externalOrganizationsServiceConfig: ServiceConfig = {
    basePath: '/external-organizations',
    operations: {
        create: {
            operationId: 'externalOrganization_create',
            summary: 'Create external organization',
            description: 'Create external organization'
        },
        createNote: {
            operationId: 'externalOrganization_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an external organization',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'externalOrganization_get',
            summary: 'Get external organization',
            description: 'Get external organization with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            operationId: 'externalOrganization_getAllowedAddressCountries',
            summary: 'A list of allowed address countries',
            description: 'Get a list of allowed countries that can be used for the \'address.country\' attribute of external organizations',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            operationId: 'externalOrganization_getAllowedAddressSubdivisions',
            summary: 'A list of allowed address subdivisions',
            description: 'Get a list of allowed subdivisions that can be used for the \'address.subdivisions\' attribute of external organizations',
            path: '/allowed-address-subdivision'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'externalOrganization_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of external organizations',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedClassifiedImageTypes: {
            operationId: 'externalOrganization_getAllowedClassifiedImageTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified image types that can be used for the \'images.type\' attribute of external organizations',
            path: '/allowed-classified-file-types'
        },
        getAllowedDisciplines: {
            operationId: 'externalOrganization_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for external organizations',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'externalOrganization_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for external organizations',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'externalOrganization_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed document licenses that can be used for the \'documents.license\' attribute of external organizations',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'externalOrganization_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed document types that can be used for the \'documents.type\' attribute of external organizations',
            path: '/allowed-document-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'externalOrganization_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'externalOrganization_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'externalOrganization_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of external organizations',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'externalOrganization_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'externalOrganization_getAllowedNatureTypes',
            summary: 'A list of allowed nature types',
            description: 'Get a list of allowed nature types that can be used for the \'natureTypes\' attribute of external organizations',
            path: '/allowed-nature-types'
        },
        getAllowedTypes: {
            operationId: 'externalOrganization_getAllowedTypes',
            summary: 'A list of allowed external organization types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of external organizations',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'externalOrganization_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of external organizations',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'externalOrganization_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the external organization',
            description: 'Get disciplines from the discipline scheme associated with the external organization with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'externalOrganization_getFile',
            summary: 'Get file from the external organization',
            description: 'Get file from the external organization',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'externalOrganization_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the external organization endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'externalOrganization_list',
            summary: 'Lists all external organizations',
            description: 'Lists all external organizations in the Pure instance. If you need to filter the external organizations returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'externalOrganization_dependents',
            summary: 'Lists all dependents to the external organization',
            description: 'Lists all dependents to the external organization with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'externalOrganization_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with external organizations',
            description: 'Lists disciplines from the discipline scheme associated with external organizations in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'externalOrganization_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an external organization ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'externalOrganization_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        merge: {
            operationId: 'externalOrganization_merge',
            summary: 'Merge external organizations',
            description: 'Merge a list of external organizations together. Note that this operation is irreversible',
            path: '/merge'
        },
        previewDeduplication: {
            operationId: 'externalOrganization_previewDeduplication',
            summary: 'Preview deduplication of external organizations',
            description: 'Runs through a list external organizations and returns the deduplicated and merged organizations. The operation does not touch the Pure database',
            path: '/preview-deduplication'
        },
        query: {
            operationId: 'externalOrganization_query',
            summary: 'Query operation for external organizations',
            description: 'Lists external organizations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'externalOrganization_delete',
            summary: 'Delete external organization',
            description: 'Delete external organization with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'externalOrganization_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'externalOrganization_update',
            summary: 'Update external organization',
            description: 'Update external organization with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'externalOrganization_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the external organization',
            description: 'Update disciplines from the discipline scheme associated with the external organization with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'externalOrganization_fileUploads',
            summary: 'Upload file to a specific external organization',
            description: 'Uploads file for the external organization',
            path: '/file-uploads'
        }
    }
}

export const externalPersonsServiceConfig: ServiceConfig = {
    basePath: '/external-persons',
    operations: {
        create: {
            operationId: 'externalPerson_create',
            summary: 'Create external person',
            description: 'Create external person'
        },
        createNote: {
            operationId: 'externalPerson_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an external person',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'externalPerson_get',
            summary: 'Get external person',
            description: 'Get external person with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'externalPerson_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of external persons',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            operationId: 'externalPerson_getAllowedCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries that can be used for the \'countries\' attribute of external persons',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            operationId: 'getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for external persons',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'externalPerson_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for external persons',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedImageTypes: {
            operationId: 'externalPerson_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of external persons',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'externalPerson_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'externalPerson_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            operationId: 'externalPerson_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedTypes: {
            operationId: 'externalPerson_getAllowedTypes',
            summary: 'A list of allowed external person types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of external persons',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'externalPerson_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of external persons',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'externalPerson_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the external person',
            description: 'Get disciplines from the discipline scheme associated with the external person with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'externalPerson_getFile',
            summary: 'Get file from the external person',
            description: 'Get file from the external person',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'externalPerson_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the external person endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'externalPerson_list',
            summary: 'Lists all external persons',
            description: 'Lists all external persons in the Pure instance. If you need to filter the external persons returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'externalPerson_dependents',
            summary: 'Lists all dependents to a external person',
            description: 'Lists all dependents to a external person with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'externalPerson_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with external persons',
            description: 'Lists disciplines from the discipline scheme associated with external persons in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'externalPerson_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an external person ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'externalPerson_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'externalPerson_query',
            summary: 'Query operation for external persons',
            description: 'Lists external persons in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'externalPerson_delete',
            summary: 'Delete external person',
            description: 'Delete external person with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'externalPerson_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'externalPerson_update',
            summary: 'Update external persons',
            description: 'Update external persons with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'externalPerson_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the external person',
            description: 'Update disciplines from the discipline scheme associated with the external person with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'externalPerson_fileUploads',
            summary: 'Upload file to a specific external person',
            description: 'Uploads file for the external person',
            path: '/file-uploads'
        }
    }
}

export const fundingOpportunitiesServiceConfig: ServiceConfig = {
    basePath: '/funding-opportunities',
    operations: {
        create: {
            operationId: 'fundingOpportunity_create',
            summary: 'Create funding opportunity',
            description: 'Create funding opportunity'
        },
        createNote: {
            operationId: 'fundingOpportunity_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a funding opportunity',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'fundingOpportunity_get',
            summary: 'Get funding opportunity',
            description: 'Get funding opportunity with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAcademicDegreeEligibilityTypes: {
            operationId: 'fundingOpportunity_getAllowedAcademicDegreeEligibilityTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of funding opportunity',
            path: '/allowed-classified-academic-degree-eligibility-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'fundingOpportunity_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the funding opportunity',
            description: 'Get allowed classifications for the custom-defined field associated with the funding opportunity.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDocumentLicenses: {
            operationId: 'fundingOpportunity_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed document licenses for funding opportunity',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'fundingOpportunity_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed license types that can be used for the \'documents.type\' attribute of funding opportunity',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            operationId: 'fundingOpportunity_getAllowedDocumentVersionTypes',
            summary: 'A list of allowed document version types',
            description: 'Get a list of allowed version types for documents on funding opportunity',
            path: '/allowed-document-version-types'
        },
        getAllowedEligibilityTypes: {
            operationId: 'fundingOpportunity_getAllowedEligibilityTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of funding opportunity',
            path: '/allowed-classified-eligibility-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'fundingOpportunity_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'fundingOpportunity_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            operationId: 'fundingOpportunity_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'fundingOpportunity_getAllowedNatureTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of funding opportunity',
            path: '/allowed-nature-types'
        },
        getAllowedTypes: {
            operationId: 'fundingOpportunity_getAllowedTypes',
            summary: 'A list of allowed classifications for the type property',
            description: 'Get a list of classifications that can be used when submitting a type.',
            path: '/allowed-types'
        },
        getFile: {
            operationId: 'fundingOpportunity_getFile',
            summary: 'Get file from the funding opportunity',
            description: 'Get file from the funding opportunity',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'fundingOpportunity_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the funding opportunities endpoint. These values can be used by the order parameter when listing funding opportunities.',
            path: '/orderings'
        },
        list: {
            operationId: 'fundingOpportunity_list',
            summary: 'Lists all funding opportunities',
            description: 'Lists all funding opportunities in the Pure instance. If you need to filter the funding opportunities returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'fundingOpportunity_dependents',
            summary: 'Lists all dependents to a funding opportunity',
            description: 'Lists all dependents to a funding opportunity with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listNotes: {
            operationId: 'fundingOpportunity_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a funding opportunity ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'fundingOpportunity_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'fundingOpportunity_query',
            summary: 'Query operation for funding opportunities',
            description: 'Lists funding opportunities in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'fundingOpportunity_delete',
            summary: 'Delete funding opportunity',
            description: 'Delete funding opportunity with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'fundingOpportunity_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'fundingOpportunity_update',
            summary: 'Update funding opportunity',
            description: 'Update funding opportunity with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'fundingOpportunity_fileUploads',
            summary: 'Upload file to a specific funding opportunity',
            description: 'Uploads file for the funding opportunity',
            path: '/file-uploads'
        }
    }
}

export const impactsServiceConfig: ServiceConfig = {
    basePath: '/impacts',
    operations: {
        create: {
            operationId: 'impact_create',
            summary: 'Create impact',
            description: 'Create impact'
        },
        createNote: {
            operationId: 'impact_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with the impact',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'impact_get',
            summary: 'Get impact',
            description: 'Get impact with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'impact_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of impact',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'impact_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the impact',
            description: 'Get allowed classifications for the custom-defined field associated with the impact.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'impact_getAllowedDescriptionTypes',
            summary: 'A list of allowed classifications for the descriptions property',
            description: 'Get a list of classifications that can be used when submitting a description.',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'impact_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for impacts',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'impact_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for impacts',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'impact_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed license types that can be used for the \'documents.license\' attribute of impacts',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'impact_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed license types that can be used for the \'documents.type\' attribute of impacts',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            operationId: 'impact_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of impact',
            path: '/allowed-image-types'
        },
        getAllowedImpactCategories: {
            operationId: 'impact_getAllowedImpactCategories',
            summary: 'A list of allowed impact categories',
            description: 'Get a list of allowed categories for impacts',
            path: '/allowed-impact-categories'
        },
        getAllowedImpactEvidenceIndicators: {
            operationId: 'impact_getAllowedImpactEvidenceIndicators',
            summary: 'A list of allowed impact evidence indicators',
            description: 'Get a list of allowed indicators for impact evidence',
            path: '/allowed-impact-evidence-indicators'
        },
        getAllowedImpactLevels: {
            operationId: 'impact_getAllowedImpactLevels',
            summary: 'A list of allowed impact levels',
            description: 'Get a list of levels for impact',
            path: '/allowed-impact-levels'
        },
        getAllowedImpactStatus: {
            operationId: 'impact_getAllowedImpactStatus',
            summary: 'A list of allowed impact types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of impact',
            path: '/allowed-impact-status'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'impact_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'impact_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'impact_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of impacts',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'impact_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedPersonsCountries: {
            operationId: 'impact_getAllowedPersonsCountries',
            summary: 'A list of allowed impact persons countries',
            description: 'Get a list of countries for impact persons',
            path: '/allowed-persons-countries'
        },
        getAllowedPersonsRoles: {
            operationId: 'impact_getAllowedPersonsRoles',
            summary: 'A list of allowed persons roles',
            description: 'Get a list of allowed persons roles',
            path: '/allowed-persons-roles'
        },
        getAllowedTypes: {
            operationId: 'impact_getAllowedTypes',
            summary: 'A list of allowed impact types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of impact',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'impact_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps in localized strings',
            description: 'Get a list of allowed workflow steps.',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'impact_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the impact',
            description: 'Get disciplines from the discipline scheme associated with the impact with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'impact_getFile',
            summary: 'Get file from the impact',
            description: 'Get file from the impact',
            path: '/{uuid}/files/{fileId}'
        },
        list: {
            operationId: 'impact_list',
            summary: 'Lists all impacts',
            description: 'Lists all impacts in the Pure instance. If you need to filter the impact returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'impact_dependents',
            summary: 'Lists all dependents to an impact',
            description: 'Lists all dependents to an impact with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'impact_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with impacts',
            description: 'Lists disciplines from the discipline scheme associated with impacts in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'impact_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an impact ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'impact_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'impact_query',
            summary: 'Query operation for impact',
            description: 'Lists impact in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'impact_delete',
            summary: 'Delete impact',
            description: 'Delete impact with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'impact_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'impact_update',
            summary: 'Update impact',
            description: 'Update impact with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'impact_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the impact',
            description: 'Update disciplines from the discipline scheme associated with the impact with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'impact_fileUploads',
            summary: 'Upload file to a specific impact',
            description: 'Uploads file for the impact',
            path: '/file-uploads'
        }
    }
}

export const journalsServiceConfig: ServiceConfig = {
    basePath: '/journals',
    operations: {
        create: {
            operationId: 'journal_create',
            summary: 'Create journal',
            description: 'Create journal'
        },
        createNote: {
            operationId: 'journal_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a journal',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'journal_get',
            summary: 'Get journal',
            description: 'Get journal with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'journal_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of journals',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCountries: {
            operationId: 'journal_getAllowedCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries that can be used for the \'journal.country\' attribute of journals',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            operationId: 'journal_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for journals',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'journal_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for journals',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'journal_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'journal_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'journal_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of journals',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'journal_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMetricCollections: {
            operationId: 'journal_getAllowedMetricCollections',
            summary: 'A list of allowed metric collections',
            description: 'Get a list of metric collections allowed on journals',
            path: '/allowed-metric-collections'
        },
        getAllowedTypes: {
            operationId: 'journal_getAllowedTypes',
            summary: 'A list of allowed journal types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of journal',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'journal_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of journals',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'journal_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the journal',
            description: 'Get disciplines from the discipline scheme associated with the journal with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            operationId: 'journal_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the journal endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'journal_list',
            summary: 'Lists all journals',
            description: 'Lists all journals in the Pure instance. If you need to filter the journals returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'journal_dependents',
            summary: 'Lists all dependents to a journal',
            description: 'Lists all dependents to a journal with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'journal_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with journals',
            description: 'Lists disciplines from the discipline scheme associated with journals in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            operationId: 'journal_listMetricsFromCollection',
            summary: 'Lists metrics with collection id',
            description: 'Lists metrics from a specific metrics collection that associated with a journal.',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            operationId: 'journal_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with the journal ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'journal_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'journal_query',
            summary: 'Query operation for journals',
            description: 'Lists journals in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'journal_delete',
            summary: 'Delete journal',
            description: 'Delete journal with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'journal_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'journal_update',
            summary: 'Update journal',
            description: 'Update journal with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'journal_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the journal',
            description: 'Update disciplines from the discipline scheme associated with the journal with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const organizationsServiceConfig: ServiceConfig = {
    basePath: '/organizations',
    operations: {
        create: {
            operationId: 'organization_create',
            summary: 'Create organization',
            description: 'Create organization'
        },
        createNote: {
            operationId: 'organization_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an organization',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'organization_get',
            summary: 'Get organization',
            description: 'Get organization with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAddressCountries: {
            operationId: 'organization_getAllowedAddressCountries',
            summary: 'A list of allowed address countries',
            description: 'Get a list of allowed countries that can be used for the \'addresses.country\' attribute of organizations',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            operationId: 'organization_getAllowedAddressSubdivisions',
            summary: 'A list of allowed address subdivisions',
            description: 'Get a list of allowed subdivisions that can be used for the \'addresses.subdivisions\' attribute of organizations',
            path: '/allowed-address-subdivision'
        },
        getAllowedAddressTypes: {
            operationId: 'organization_getAllowedAddressTypes',
            summary: 'A list of allowed address types',
            description: 'Get a list of allowed address types that can be used for the \'addresses.type\' attribute of organizations',
            path: '/allowed-address-types'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'organization_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of organizations',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedClassifiedImageTypes: {
            operationId: 'organization_getAllowedClassifiedImageTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified photo types that can be used for the \'photos.type\' attribute of organizations',
            path: '/allowed-classified-file-types'
        },
        getAllowedCostCenters: {
            operationId: 'organization_getAllowedCostCenters',
            summary: 'A list of allowed cost centers',
            description: 'Get a list of allowed cost centers that can be used for the \'costCenters\' attribute of organizations',
            path: '/allowed-cost-centers'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'organization_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the organization',
            description: 'Get allowed classifications for the custom-defined field associated with the organization.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDisciplines: {
            operationId: 'organization_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for organizations',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'organization_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for organizations',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedEmailTypes: {
            operationId: 'organization_getAllowedEmailTypes',
            summary: 'A list of allowed e-mail types',
            description: 'Get a list of allowed e-mail types that can be used for the \'emails.type\' attribute of organizations',
            path: '/allowed-email-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'organization_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'organization_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'organization_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types on organizations',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'organization_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            operationId: 'organization_getAllowedMainResearchAreas',
            summary: 'A list of allowed main research areas',
            description: 'Get a list of allowed main research areas on organizations',
            path: '/allowed-main-research-areas'
        },
        getAllowedNameVariantTypes: {
            operationId: 'organization_getAllowedNameVariantTypes',
            summary: 'A list of allowed name variant types',
            description: 'Get a list of allowed name variant types that can be used for the \'nameVariants.type\' attribute of organizations',
            path: '/allowed-name-variant-types'
        },
        getAllowedPhoneNumberTypes: {
            operationId: 'organization_getAllowedPhoneNumberTypes',
            summary: 'A list of allowed phone number types',
            description: 'Get a list of allowed phone number types that can be used for the \'phoneNumbers.type\' attribute of organizations',
            path: '/allowed-phone-number-types'
        },
        getAllowedPhotoTypes: {
            operationId: 'organization_getAllowedPhotoTypes',
            summary: 'A list of allowed photo types',
            description: 'Get a list of allowed photo types that can be used for the \'photos.type\' attribute of organizations',
            path: '/allowed-photo-types'
        },
        getAllowedProfileInformationTypes: {
            operationId: 'organization_getAllowedProfileInformationTypes',
            summary: 'A list of allowed profile information types',
            description: 'Get a list of allowed profile information types that can be used for the \'profileInformations.type\' attribute of organizations',
            path: '/allowed-profile-information-types'
        },
        getAllowedTypes: {
            operationId: 'organization_getAllowedTypes',
            summary: 'A list of allowed organization types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of organizations',
            path: '/allowed-types'
        },
        getAllowedWebAddressTypes: {
            operationId: 'organization_getAllowedWebAddressTypes',
            summary: 'A list of allowed web address types',
            description: 'Get a list of allowed web address types that can be used for the \'webAddresses.type\' attribute of organizations',
            path: '/allowed-web-address-types'
        },
        getDisciplineAssociation: {
            operationId: 'organization_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the organization',
            description: 'Get disciplines from the discipline scheme associated with the organization with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'organization_getFile',
            summary: 'Get file from the organization',
            description: 'Get file from the organization',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'organization_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the organization endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'organization_list',
            summary: 'Lists all organizations',
            description: 'Lists all organizations in the Pure instance. If you need to filter the organizations returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'organization_dependents',
            summary: 'Lists all dependents to the organization',
            description: 'Lists all dependents to the organization with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'organization_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with organizations',
            description: 'Lists disciplines from the discipline scheme associated with organizations in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'organization_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an organization ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'organization_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'organization_query',
            summary: 'Query operation for organizations',
            description: 'Lists organizations in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'organization_delete',
            summary: 'Delete organization',
            description: 'Delete organization with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'organization_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'organization_update',
            summary: 'Update organization',
            description: 'Update organization with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'organization_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the organization',
            description: 'Update disciplines from the discipline scheme associated with the organization with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'organization_fileUploads',
            summary: 'Upload file to a specific organization',
            description: 'Uploads file for the organization',
            path: '/file-uploads'
        }
    }
}

export const personsServiceConfig: ServiceConfig = {
    basePath: '/persons',
    operations: {
        create: {
            operationId: 'person_create',
            summary: 'Create person',
            description: 'Create person'
        },
        createNote: {
            operationId: 'person_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a person',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'person_get',
            summary: 'Get person',
            description: 'Get person with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAcademicQualificationsDistinctions: {
            operationId: 'person_getAllowedAcademicQualificationsDistinctions',
            summary: 'A list of the allowed values for education distinction',
            description: 'Get a list of classifications that can be used for the \'academicQualifications.distinction\' attribute of persons',
            path: '/allowed-academic-qualifications-distinctions'
        },
        getAllowedAcademicQualificationsFieldOfStudies: {
            operationId: 'person_getAllowedAcademicQualificationsFieldOfStudies',
            summary: 'A list of the allowed values for field of study',
            description: 'Get a list of classifications that can be used for the \'academicQualifications.fieldOfStudy\' attribute of persons',
            path: '/allowed-academic-qualifications-field-of-studies'
        },
        getAllowedAcademicQualificationTypes: {
            operationId: 'person_getAllowedAcademicQualificationsTypes',
            summary: 'A list of allowed academic qualification types for persons',
            description: 'Get a list of allowed academic qualification types for persons',
            path: '/allowed-academic-qualification-types'
        },
        getAllowedAddressCountries: {
            operationId: 'person_getAllowedAddressCountries',
            summary: 'A list of allowed address countries',
            description: 'Get a list of allowed countries that can be used for the \'addresses.country\' attribute of persons',
            path: '/allowed-address-countries'
        },
        getAllowedAddressSubdivisions: {
            operationId: 'person_getAllowedAddressSubdivisions',
            summary: 'A list of allowed subdivisions',
            description: 'Get a list of allowed subdivisions can be used for the \'subdivision\' attribute of person organization associations',
            path: '/allowed-address-subdivisions'
        },
        getAllowedAddressTypes: {
            operationId: 'person_getAllowedAddressTypes',
            summary: 'A list of allowed address types',
            description: 'Get a list of allowed address types that can be used for the \'addresses.type\' attribute of persons',
            path: '/allowed-address-types'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'person_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of persons',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'person_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the person',
            description: 'Get allowed classifications for the custom-defined field associated with the person.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDisciplines: {
            operationId: 'person_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for persons',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'person_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for persons',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'person_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed licenses for documents on persons',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'person_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on persons',
            path: '/allowed-document-types'
        },
        getAllowedExternalPositionsAppointments: {
            operationId: 'person_getAllowedExternalPositionsAppointments',
            summary: 'A list of the allowed values for appointments',
            description: 'Get a list of classifications that can be used for the \'externalPositions.appointment\' attribute of persons',
            path: '/allowed-external-positions-appointments'
        },
        getAllowedGenders: {
            operationId: 'person_getAllowedGenders',
            summary: 'A list of allowed classifications for the gender property',
            description: 'Get a list of classifications that can be used when submitting the person gender property.',
            path: '/allowed-genders'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'person_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'person_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLeavesOfAbsenceClassifications: {
            operationId: 'person_getAllowedLeavesOfAbsenceClassifications',
            summary: 'A list of allowed classifications for the leave of absence property',
            description: 'Get a list of classifications that can be used when submitting the leaveOfAbsence property.',
            path: '/allowed-leave-of-absense'
        },
        getAllowedLinkTypes: {
            operationId: 'person_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of persons',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'person_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            operationId: 'person_getAllowedMainResearchAreas',
            summary: 'A list of allowed main research areas',
            description: 'Get a list of allowed main research areas associated with the person',
            path: '/allowed-main-research-areas'
        },
        getAllowedMetricCollections: {
            operationId: 'person_getAllowedMetricCollections',
            summary: 'A list of allowed metric collections',
            description: 'Get a list of metric collections allowed on persons',
            path: '/allowed-metric-collections'
        },
        getAllowedNamesTypes: {
            operationId: 'person_getAllowedNamesTypes',
            summary: 'A list of allowed classifications for classified names',
            description: 'Get a list of allowed classifications that can be used when submitting a classified name.',
            path: '/allowed-names-types'
        },
        getAllowedNationalities: {
            operationId: 'person_getAllowedNationalities',
            summary: 'A list of allowed classifications for the nationalities property',
            description: 'Get a list of classifications that can be used when submitting the nationality property.',
            path: '/allowed-nationalities'
        },
        getAllowedPersonOrganizationAssociationsEmailTypes: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsEmailTypes',
            summary: 'A list of allowed email types',
            description: 'Get a list of allowed email types for person organization associations on persons',
            path: '/allowed-person-organization-associations/email-types'
        },
        getAllowedPersonOrganizationAssociationsEmploymentTypes: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsEmploymentTypes',
            summary: 'A list of allowed employment types',
            description: 'Get a list of allowed employment types for person organization associations on persons',
            path: '/allowed-person-organization-associations/employment-types'
        },
        getAllowedPersonOrganizationAssociationsJobTitles: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsJobTitles',
            summary: 'A list of allowed job titles',
            description: 'Get a list of allowed job titles for person organization associations on persons',
            path: '/allowed-person-organization-associations/job-titles'
        },
        getAllowedPersonOrganizationAssociationsPhoneNumberTypes: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsPhoneNumberTypes',
            summary: 'A list of allowed phone number types',
            description: 'Get a list of allowed phone numbers types for person organization associations on persons',
            path: '/allowed-person-organization-associations/phone-number-types'
        },
        getAllowedPersonOrganizationAssociationsSupervisorRoles: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsSupervisorRoles',
            summary: 'A list of allowed supervisor roles',
            description: 'Get a list of allowed supervisor roles for person organization associations on persons',
            path: '/allowed-person-organization-associations/supervisor-roles'
        },
        getAllowedPersonOrganizationAssociationsWebAddressTypes: {
            operationId: 'person_getAllowedPersonOrganizationAssociationsWebAddressTypes',
            summary: 'A list of allowed web address types',
            description: 'Get a list of allowed web address types for person organization associations on persons',
            path: '/allowed-person-organization-associations/web-address-types'
        },
        getAllowedPrivateAddressCountries: {
            operationId: 'person_getAllowedPrivateAddressCountries',
            summary: 'A list of allowed country classifications for private address',
            description: 'Get a list of allowed country classifications for private address on persons',
            path: '/allowed-private-address-countries'
        },
        getAllowedProfileInformationTypes: {
            operationId: 'person_getAllowedProfileInformationTypes',
            summary: 'A list of allowed classifications for the profile information property',
            description: 'Get a list of classifications that can be used when submitting an entry in profile information.',
            path: '/allowed-profile-information-types'
        },
        getAllowedProfilePhotoTypes: {
            operationId: 'person_getAllowedProfilePhotoTypes',
            summary: 'A list of allowed photo types',
            description: 'Get a list of allowed photo types that can be used for the \'profilePhotos.type\' attribute of persons',
            path: '/allowed-profile-photo-types'
        },
        getAllowedStaffOrganizationAssociationsContractTypes: {
            operationId: 'person_getAllowedStaffOrganizationAssociationsContractTypes',
            summary: 'A list of allowed contract types',
            description: 'Get a list of allowed contract types for staff organization associations on persons',
            path: '/allowed-staff-organization-associations/contract-types'
        },
        getAllowedStaffOrganizationAssociationsStaffTypes: {
            operationId: 'person_getAllowedStaffOrganizationAssociationsStaffTypes',
            summary: 'A list of allowed staff types',
            description: 'Get a list of allowed staff types for staff organization associations on persons',
            path: '/allowed-staff-organization-associations/staff-types'
        },
        getAllowedStudentAssociationsEmploymentTypes: {
            operationId: 'person_getAllowedStudentAssociationsEmploymentTypes',
            summary: 'A list of allowed employment types',
            description: 'Get a list of allowed employment types for student organization associations on persons',
            path: '/allowed-student-organization-associations-employment-types'
        },
        getAllowedStudentOrganizationAssociationsAttendanceStatus: {
            operationId: 'person_getAllowedStudentOrganizationAssociationsAttendanceStatus',
            summary: 'A list of allowed student attendance status types',
            description: 'Get a list of allowed student attendance status types for student organization associations on persons',
            path: '/allowed-student-organization-associations/attendance-status'
        },
        getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles: {
            operationId: 'person_getAllowedStudentOrganizationAssociationsGetStudentCountryOfDomiciles',
            summary: 'A list of allowed student country of domicile types',
            description: 'Get a list of allowed student country of domicile types for student organization associations on persons',
            path: '/allowed-student-organization-associations-country-of-domicile-types'
        },
        getAllowedStudentOrganizationAssociationsGetStudentNationalities: {
            operationId: 'person_getAllowedStudentOrganizationAssociationsGetStudentNationalities',
            summary: 'A list of allowed student nationality types',
            description: 'Get a list of allowed student nationality types for student organization associations on persons',
            path: '/allowed-student-organization-associations-nationality-types'
        },
        getAllowedStudentOrganizationAssociationsStudentTypeDescriptions: {
            operationId: 'person_getAllowedStudentOrganizationAssociationsStudentTypeDescriptions',
            summary: 'A list of allowed student type description types',
            description: 'Get a list of allowed student type description types for student organization associations on persons',
            path: '/allowed-student-organization-associations-type-description-types'
        },
        getAllowedTitlesTypes: {
            operationId: 'person_getAllowedTitlesTypes',
            summary: 'A list of allowed classifications for the titles property',
            description: 'Get a list of classifications that can be used when submitting a title.',
            path: '/allowed-titles-types'
        },
        getAllowedVisitingScholarAssociationsEmploymentTypes: {
            operationId: 'person_getAllowedVisitingScholarAssociationsEmploymentTypes',
            summary: 'A list of allowed employment types',
            description: 'Get a list of allowed employment types for visiting scholar organization associations on persons',
            path: '/allowed-visiting-scholar-associations/employment-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'person_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of persons',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'person_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the person',
            description: 'Get disciplines from the discipline scheme associated with the person with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'person_getFile',
            summary: 'Get file from the person',
            description: 'Get file from the person',
            path: '/{uuid}/files/{fileId}'
        },
        getHighlightedContent: {
            operationId: 'person_getHighlightedContent',
            summary: 'Get highlighted content',
            description: 'Get highlighted content for the person with the specific UUID. Highlights are only available for editorial types',
            path: '/{uuid}/highlighted-content'
        },
        getOrderings: {
            operationId: 'person_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the person endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'person_list',
            summary: 'Lists all persons',
            description: 'Lists all persons in the Pure instance. If you need to filter the persons returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'person_dependents',
            summary: 'Lists all dependents to the person',
            description: 'Lists all dependents to the person with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'person_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with persons',
            description: 'Lists disciplines from the discipline scheme associated with persons in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            operationId: 'person_listMetricsFromCollection',
            summary: 'Lists metrics with collection id',
            description: 'Lists metrics from a specific metrics collection that associated with a person.',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            operationId: 'person_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an person ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        listSupervisees: {
            operationId: 'person_supervisee',
            summary: 'person supervisees',
            description: 'Find supervisees of a person by their specific UUID.',
            path: '/{uuid}/supervisees'
        },
        lock: {
            operationId: 'person_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'person_query',
            summary: 'Query operation for persons',
            description: 'Lists persons in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'person_delete',
            summary: 'Delete person',
            description: 'Delete person with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'person_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'person_update',
            summary: 'Update person',
            description: 'Update person with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'person_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the person',
            description: 'Update disciplines from the discipline scheme associated with the person with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        updateHighlightedContent: {
            operationId: 'person_updateHighlightedContent',
            summary: 'Update highlighted content',
            description: 'Update highlighted content references. Add an empty array of references for a content type to not highlight any items of this type. Types that are not present will be ignored. Highlights can only be updated for editorial types',
            path: '/{uuid}/highlighted-content'
        },
        uploadFile: {
            operationId: 'person_fileUploads',
            summary: 'Upload file to a specific person',
            description: 'Uploads file for the person',
            path: '/file-uploads'
        }
    }
}

export const pressMediaServiceConfig: ServiceConfig = {
    basePath: '/pressmedia',
    operations: {
        create: {
            operationId: 'pressmedia_create',
            summary: 'Create Press/Media content',
            description: 'Create Press/Media content in the Pure instance.'
        },
        createNote: {
            operationId: 'pressmedia_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a piece of Press/Media',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'pressmedia_get',
            summary: 'Get specific Press/Media',
            description: 'Get Press/Media with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedCategories: {
            operationId: 'pressmedia_getAllowedCategories',
            summary: 'A list of allowed categories',
            description: 'Get a list of allowed categories on Press/Media content',
            path: '/allowed-categories'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'pressmedia_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the Press/Media',
            description: 'Get allowed classifications for the custom-defined field associated with the Press/Media.',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDescriptionsTypes: {
            operationId: 'pressmedia_getAllowedDescriptionsTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of classifications that can be used when submitting a description.',
            path: '/allowed-descriptions-types'
        },
        getAllowedImageTypes: {
            operationId: 'pressmedia_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of activities',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'pressmedia_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'pressmedia_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            operationId: 'pressmedia_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMediaCoveragesCountries: {
            operationId: 'pressMedia_getAllowedMediaCoveragesCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries for media coverages on Press/Media',
            path: '/allowed-media-coverages-countries'
        },
        getAllowedMediaCoveragesDegreeOfRecognitions: {
            operationId: 'pressMedia_getAllowedMediaCoveragesDegreeOfRecognitions',
            summary: 'A list the degrees of recognition allowed on Press/Media',
            description: 'Get a list of degrees of recognition that are allowed to be used for the attribute \'mediaCoverage.degreeOfRecognition\' on Press/Media.',
            path: '/allowed-media-coverages-degree-of-recognitions'
        },
        getAllowedMediaCoveragesMediaTypes: {
            operationId: 'pressmedia_getAllowedMediaCoveragesMediaTypes',
            summary: 'A list of allowed media types',
            description: 'Get a list of allowed types that can be used for the \'mediaType\' attribute of media coverages on Press/Media',
            path: '/allowed-media-coverages-media-types'
        },
        getAllowedMediaCoveragesPersonsRoles: {
            operationId: 'pressMedia_getAllowedMediaCoveragesPersonsRoles',
            summary: 'A list of allowed person roles',
            description: 'Get a list of allowed person roles that can be used for the \'persons.role\' attribute of the Press/Media media coverage.',
            path: '/allowed-media-coverages-persons-roles'
        },
        getAllowedMediaCoveragesSubdivisions: {
            operationId: 'pressMedia_getAllowedMediaCoveragesSubdivisions',
            summary: 'A list of allowed subdivisions',
            description: 'Get a list of allowed subdivisions for media coverages on Press/Media',
            path: '/allowed-media-coverages-subdivisions'
        },
        getAllowedMediaCoverageTypes: {
            operationId: 'pressmedia_getAllowedMediaCoverageTypes',
            summary: 'A list of allowed media coverage types',
            description: 'Get a list of allowed types that can be used for the \'mediaCoverageType\' attribute of media coverages on Press/Media',
            path: '/allowed-media-coverage-types'
        },
        getAllowedTypes: {
            operationId: 'pressmedia_getAllowedTypes',
            summary: 'A list of allowed Press/Media types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of Press/Media',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'pressmedia_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of Press/Media content',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            operationId: 'pressmedia_getFile',
            summary: 'Get file related to Press/Media',
            description: 'Get file related to Press/Media',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'pressmedia_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the Press/Media endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'pressmedia_list',
            summary: 'List all Press/Media content',
            description: 'List all Press/Media content in the Pure instance. If you need to filter which content is returned returned, see the POST version which supports additional filtering.'
        },
        listNotes: {
            operationId: 'pressmedia_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a specific Press/Media ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'pressmedia_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'pressmedia_query',
            summary: 'Query operation for Press/Media content',
            description: 'Lists Press/Media content in the Pure instance that matches the provided query. similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'pressmedia_delete',
            summary: 'Delete specific Press/Media',
            description: 'Delete Press/Media content with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'pressmedia_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'pressmedia_update',
            summary: 'Update Press/Media',
            description: 'Update Press/Media with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'pressmedia_fileUploads',
            summary: 'Upload file to a specific Press/Media',
            description: 'Uploads file for the Press/Media with the specified UUID.',
            path: '/file-uploads'
        }
    }
}

export const prizesServiceConfig: ServiceConfig = {
    basePath: '/prizes',
    operations: {
        create: {
            operationId: 'prize_create',
            summary: 'Create prize',
            description: 'Create prize'
        },
        createNote: {
            operationId: 'prize_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a prize',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'prize_get',
            summary: 'Get prize',
            description: 'Get prize with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedCategories: {
            operationId: 'prize_getAllowedCategories',
            summary: 'A list of allowed classifications for the category property',
            description: 'Get a list of classifications that can be used when submitting a category.',
            path: '/allowed-categories'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'prize_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of prizes',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'prize_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the prize',
            description: 'Get allowed classifications for the custom-defined field associated with the prize.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDegreeOfRecognitions: {
            operationId: 'prize_getAllowedDegreeOfRecognitions',
            summary: 'A list of allowed classifications for the degree of recognition',
            description: 'Get a list of classifications that can be used when submitting a degree of recognition.',
            path: '/allowed-degree-of-recognitions'
        },
        getAllowedDescriptionTypes: {
            operationId: 'prize_getAllowedDescriptionsTypes',
            summary: 'A list of allowed classifications for the descriptions property',
            description: 'Get a list of classifications that can be used when submitting a description.',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'prize_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for prizes',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'prize_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list of allowed discipline schemes for prizes',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'prize_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed license types that can be used for the \'documents.license\' attribute of prizes',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'prize_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed license types that can be used for the \'documents.type\' attribute of prizes',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            operationId: 'prize_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of the prize.',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'prize_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'prize_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'prize_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of prizes',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'prize_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedReceiversOfPrizeRoles: {
            operationId: 'prize_getAllowedReceiversOfPrizeRoles',
            summary: 'A list of allowed receiver of prize roles',
            description: 'Get a list of allowed receiver of prize roles that can be used for the \'receiversOfPrize.role\' attribute of the prize.',
            path: '/allowed-receivers-of-prize-roles'
        },
        getAllowedTypes: {
            operationId: 'prize_getAllowedTypes',
            summary: 'A list of allowed classifications for the type property',
            description: 'Get a list of classifications that can be used when submitting a type.',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'prize_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of prizes',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'prize_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the prize',
            description: 'Get disciplines from the discipline scheme associated with the prize with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'prize_getFile',
            summary: 'Get file from the prize',
            description: 'Get file from the prize',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'prize_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the prizes endpoint. These values can be used by the order parameter when listing prizes.',
            path: '/orderings'
        },
        list: {
            operationId: 'prize_list',
            summary: 'Lists all prizes',
            description: 'Lists all prizes in the Pure instance. If you need to filter the prizes returned, see the POST version which supports additional filtering.'
        },
        listDisciplineAssociations: {
            operationId: 'prize_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with prizes',
            description: 'Lists disciplines from the discipline scheme associated with prizes in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'prize_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a prize ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'prize_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'prize_query',
            summary: 'Query operation for prizes',
            description: 'Lists prizes in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'prize_delete',
            summary: 'Delete prize',
            description: 'Delete prize with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'prize_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'prize_update',
            summary: 'Update prize',
            description: 'Update prize with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'prize_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the prize',
            description: 'Update disciplines from the discipline scheme associated with the prize with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'prize_fileUploads',
            summary: 'Upload file for a specific prize',
            description: 'Uploads file for the prize',
            path: '/file-uploads'
        }
    }
}

export const projectsServiceConfig: ServiceConfig = {
    basePath: '/projects',
    operations: {
        create: {
            operationId: 'project_create',
            summary: 'Create project',
            description: 'Create project'
        },
        createNote: {
            operationId: 'project_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with the project',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'project_get',
            summary: 'Get project',
            description: 'Get project with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'project_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of projects',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCollaboratorTypes: {
            operationId: 'project_getAllowedCollaboratorTypes',
            summary: 'A list of allowed collaborator types',
            description: 'Get a list of allowed types for collaborators on projects',
            path: '/allowed-collaborator-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'project_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the project',
            description: 'Get allowed classifications for the custom-defined field associated with the project.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'project_getAllowedDescriptionTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of allowed types for descriptions on projects',
            path: '/allowed-description-types'
        },
        getAllowedDisciplines: {
            operationId: 'project_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for projects',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'project_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for projects',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedDocumentLicenses: {
            operationId: 'project_getAllowedDocumentLicenses',
            summary: 'A list of allowed document licenses',
            description: 'Get a list of allowed document licenses for projects',
            path: '/allowed-document-licenses'
        },
        getAllowedDocumentTypes: {
            operationId: 'project_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on projects',
            path: '/allowed-document-types'
        },
        getAllowedImageTypes: {
            operationId: 'project_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of projects',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'project_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'project_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'project_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types that can be used for the \'links.linkType\' attribute of projects',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'project_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedNatureTypes: {
            operationId: 'project_getAllowedNatureTypes',
            summary: 'A list of allowed nature types',
            description: 'Get a list of allowed nature types for projects',
            path: '/allowed-nature-types'
        },
        getAllowedParticipantRoles: {
            operationId: 'project_getAllowedParticipantRoles',
            summary: 'A list of allowed participant roles',
            description: 'Get a list of allowed roles for participant on projects',
            path: '/allowed-participant-roles'
        },
        getAllowedProjectRelationTypes: {
            operationId: 'project_getAllowedProjectRelationTypes',
            summary: 'A list of allowed project relation types',
            description: 'Get a list of allowed project relation types on projects',
            path: '/allowed-project-relation-types'
        },
        getAllowedTemplates: {
            operationId: 'project_getAllowedTemplates',
            summary: 'A list of allowed project templates',
            description: 'Get a list of allowed templates that can be used for projects. Some of the templates that exists in the API specification may be disabled for the Pure installation.',
            path: '/allowed-templates'
        },
        getAllowedTypes: {
            operationId: 'project_getAllowedTypes',
            summary: 'A list of allowed project types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of projects',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'project_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of projects',
            path: '/allowed-workflow-steps'
        },
        getApplicationClusters: {
            operationId: 'project_getApplicationClusters',
            summary: 'Get the application clusters for the project',
            description: 'Get the application clusters for the project with the specified UUID.',
            path: '/{uuid}/application-clusters'
        },
        getAwardClusters: {
            operationId: 'project_getAwardClusters',
            summary: 'Get the award clusters for the project',
            description: 'Get the award clusters for the project with the specified UUID.',
            path: '/{uuid}/award-clusters'
        },
        getDisciplineAssociation: {
            operationId: 'project_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the project',
            description: 'Get disciplines from the discipline scheme associated with the project with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'project_getFile',
            summary: 'Get file from the project',
            description: 'Get file from the project',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'project_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the project endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'project_list',
            summary: 'Lists all projects',
            description: 'Lists all projects in the Pure instance. If you need to filter the projects returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'project_dependents',
            summary: 'Lists all dependents to an project',
            description: 'Lists all dependents to an project with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'project_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with projects',
            description: 'Lists disciplines from the discipline scheme associated with projects in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'project_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an project ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'project_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'project_query',
            summary: 'Query operation for projects',
            description: 'Lists projects in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'project_delete',
            summary: 'Delete project',
            description: 'Delete project with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'project_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'project_update',
            summary: 'Update project',
            description: 'Update project with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'project_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the project',
            description: 'Update disciplines from the discipline scheme associated with the project with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'project_fileUploads',
            summary: 'Upload file to a specific project',
            description: 'Uploads file for the project',
            path: '/file-uploads'
        }
    }
}

export const publishersServiceConfig: ServiceConfig = {
    basePath: '/publishers',
    operations: {
        create: {
            operationId: 'publisher_create',
            summary: 'Create publisher',
            description: 'Create publisher'
        },
        createNote: {
            operationId: 'publisher_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a publisher',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'publisher_get',
            summary: 'Get publisher',
            description: 'Get publisher with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedCountries: {
            operationId: 'publishers_getAllowedCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries that can be used for the \'countries\' attribute of publishers',
            path: '/allowed-countries'
        },
        getAllowedDisciplines: {
            operationId: 'publisher_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for publishers',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'publisher_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for publishers',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'publisher_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'publisher_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLocales: {
            operationId: 'publisher_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedTypes: {
            operationId: 'publisher_getAllowedTypes',
            summary: 'A list of allowed publisher types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of publishers',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'publisher_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of publishers',
            path: '/allowed-workflow-steps'
        },
        getDisciplineAssociation: {
            operationId: 'publisher_getDisciplineAssociation',
            summary: 'Get disciplines from the discipline scheme associated with the publisher',
            description: 'Get disciplines from the discipline scheme associated with the publisher with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getOrderings: {
            operationId: 'publisher_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the publisher endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'publisher_list',
            summary: 'Lists all publishers',
            description: 'Lists all publishers in the Pure instance. If you need to filter the publishers returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'publisher_dependents',
            summary: 'Lists all dependents to a publisher',
            description: 'Lists all dependents to a publisher with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'publisher_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with publishers',
            description: 'Lists disciplines from the discipline scheme associated with publishers in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listNotes: {
            operationId: 'publisher_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a publisher ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'publisher_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'publisher_query',
            summary: 'Query operation for publishers',
            description: 'Lists publishers in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'publisher_delete',
            summary: 'Delete publisher',
            description: 'Delete publisher with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'publisher_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'publisher_update',
            summary: 'Update publishers',
            description: 'Update publishers with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'publisher_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the publisher',
            description: 'Update disciplines from the discipline scheme associated with the publisher with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }
    }
}

export const researchOutputsServiceConfig: ServiceConfig = {
    basePath: '/research-outputs',
    operations: {
        create: {
            operationId: 'researchOutput_create',
            summary: 'Create research output',
            description: 'Create research output'
        },
        createNote: {
            operationId: 'researchOutput_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a research output',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'researchOutput_get',
            summary: 'Get research output',
            description: 'Get research output with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAdditionalFileAccessTypes: {
            operationId: 'researchoutput_getAllowedAdditionalFileAccessTypes',
            summary: 'A list of allowed access types',
            description: 'Get a list of allowed access types for additional files on research outputs',
            path: '/allowed-additional-file-access-types'
        },
        getAllowedAdditionalFileLicenseTypes: {
            operationId: 'researchoutput_getAllowedAdditionalFileLicenseTypes',
            summary: 'A list of allowed license types',
            description: 'Get a list of allowed license types for additional files on research outputs',
            path: '/allowed-additional-file-license-types'
        },
        getAllowedArticleProcessingChargeCurrencies: {
            operationId: 'researchoutput_getAllowedArticleProcessingChargeCurrencies',
            summary: 'A list of allowed article processing charge currencies',
            description: 'Get a list of allowed article processing charge currencies on research outputs',
            path: '/allowed-article-processing-charge-currencies'
        },
        getAllowedBookAnthologyContributorRoles: {
            operationId: 'researchoutput_getAllowedBookAnthologyContributorRoles',
            summary: 'A list of allowed contributor roles for the book anthology subtype',
            description: 'Get a list of allowed roles for contributors on the book anthology subtype of research outputs',
            path: '/allowed-book-anthology-contributor-roles'
        },
        getAllowedBookAnthologyDescriptionTypes: {
            operationId: 'researchoutput_getAllowedBookAnthologyDescriptionTypes',
            summary: 'A list of allowed description types for the book anthology subtype',
            description: 'Get a list of allowed description types on the book anthology subtype of research outputs',
            path: '/allowed-book-anthology-description-types'
        },
        getAllowedCaseNoteSources: {
            operationId: 'researchoutput_getAllowedCaseNoteSources',
            summary: 'A list of allowed case note sources',
            description: 'Get a list of allowed case note sources for select subtypes of research outputs',
            path: '/allowed-case-note-sources'
        },
        getAllowedCategories: {
            operationId: 'researchoutput_getAllowedCategories',
            summary: 'A list of allowed categories',
            description: 'Get a list of allowed categories on research outputs',
            path: '/allowed-categories'
        },
        getAllowedContributionToBookAnthologyContributorRoles: {
            operationId: 'researchoutput_getAllowedContributionToBookAnthologyContributorRoles',
            summary: 'A list of allowed contributor roles for the contribution to book anthology subtype',
            description: 'Get a list of allowed roles for contributors on the contribution to book anthology subtype of research outputs',
            path: '/allowed-contribution-to-book-anthology-contributor-roles'
        },
        getAllowedContributionToBookAnthologyDescriptionTypes: {
            operationId: 'researchoutput_getAllowedContributionToBookAnthologyDescriptionTypes',
            summary: 'A list of allowed description types for the contribution to book anthology subtype',
            description: 'Get a list of allowed description types on the contribution to book anthology subtype of research outputs',
            path: '/allowed-contribution-to-book-anthology-description-types'
        },
        getAllowedContributionToConferenceContributorRoles: {
            operationId: 'researchoutput_getAllowedContributionToConferenceContributorRoles',
            summary: 'A list of allowed contributor roles for the contribution to conference subtype',
            description: 'Get a list of allowed roles for contributors on the contribution to conference subtype of research outputs',
            path: '/allowed-contribution-to-conference-contributor-roles'
        },
        getAllowedContributionToConferenceDescriptionTypes: {
            operationId: 'researchoutput_getAllowedContributionToConferenceDescriptionTypes',
            summary: 'A list of allowed description types for the contribution to conference subtype',
            description: 'Get a list of allowed description types on the contribution to conference subtype of research outputs',
            path: '/allowed-contribution-to-conference-description-types'
        },
        getAllowedContributionToJournalContributorRoles: {
            operationId: 'researchoutput_getAllowedContributionToJournalContributorRoles',
            summary: 'A list of allowed contributor roles for the contribution to journal subtype',
            description: 'Get a list of allowed roles for contributors on the contribution to journal subtype of research outputs',
            path: '/allowed-contribution-to-journal-contributor-roles'
        },
        getAllowedContributionToJournalDescriptionTypes: {
            operationId: 'researchoutput_getAllowedContributionToJournalDescriptionTypes',
            summary: 'A list of allowed description types for the contribution to journal subtype',
            description: 'Get a list of allowed description types on the contribution to journal subtype of research outputs',
            path: '/allowed-contribution-to-journal-description-types'
        },
        getAllowedContributionToMemorandumContributorRoles: {
            operationId: 'researchoutput_getAllowedContributionToMemorandumContributorRoles',
            summary: 'A list of allowed contributor roles for the contribution to memorandum subtype',
            description: 'Get a list of allowed roles for contributors on the contribution to memorandum subtype of research outputs',
            path: '/allowed-contribution-to-memorandum-contributor-roles'
        },
        getAllowedContributionToMemorandumDescriptionTypes: {
            operationId: 'researchoutput_getAllowedContributionToMemorandumDescriptionTypes',
            summary: 'A list of allowed description types for the contribution to memorandum subtype',
            description: 'Get a list of allowed description types on the contribution to memorandum subtype of research outputs',
            path: '/allowed-contribution-to-memorandum-description-types'
        },
        getAllowedContributionToPeriodicalContributorRoles: {
            operationId: 'researchoutput_getAllowedContributionToPeriodicalContributorRoles',
            summary: 'A list of allowed contributor roles for the contribution to periodical subtype',
            description: 'Get a list of allowed roles for contributors on the contribution to periodical subtype of research outputs',
            path: '/allowed-contribution-to-periodical-contributor-roles'
        },
        getAllowedContributionToPeriodicalDescriptionTypes: {
            operationId: 'researchoutput_getAllowedContributionToPeriodicalDescriptionTypes',
            summary: 'A list of allowed description types for the contribution to periodical subtype',
            description: 'Get a list of allowed description types on the contribution to periodical subtype of research outputs',
            path: '/allowed-contribution-to-periodical-description-types'
        },
        getAllowedContributorCountries: {
            operationId: 'researchoutput_getAllowedContributorCountries',
            summary: 'A list of allowed contributor countries',
            description: 'Get a list of allowed countries for contributors on research outputs',
            path: '/allowed-contributor-countries'
        },
        getAllowedCountries: {
            operationId: 'researchOutput_getAllowedCountries',
            summary: 'A list of allowed countries',
            description: 'Get a list of allowed countries that can be used for the \'countries\' attribute of research outputs',
            path: '/allowed-countries'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'researchOutput_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the research output',
            description: 'Get allowed classifications for the custom-defined field associated with the research output.',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDisciplines: {
            operationId: 'researchoutput_getAllowedDisciplines',
            summary: 'A list of allowed disciplines for a specific discipline scheme',
            description: 'Get a list of a allowed disciplines for specific discipline scheme for research outputs',
            path: '/disciplines/{discipline-scheme}/allowed-disciplines'
        },
        getAllowedDisciplineSchemes: {
            operationId: 'researchoutput_getAllowedDisciplineSchemes',
            summary: 'A list of allowed discipline schemes',
            description: 'Get a list fo a allowed discipline schemes for research outputs',
            path: '/disciplines/allowed-discipline-schemes'
        },
        getAllowedElectronicVersionAccessTypes: {
            operationId: 'researchoutput_getAllowedElectronicVersionAccessTypes',
            summary: 'A list of allowed access types',
            description: 'Get a list of allowed access types for electronic versions on research outputs',
            path: '/allowed-electronic-version-access-types'
        },
        getAllowedElectronicVersionLicenseTypes: {
            operationId: 'researchoutput_getAllowedElectronicVersionLicenseTypes',
            summary: 'A list of allowed license types',
            description: 'Get a list of allowed license types for electronic versions on research outputs',
            path: '/allowed-electronic-version-license-types'
        },
        getAllowedElectronicVersionVersionTypes: {
            operationId: 'researchoutput_getAllowedElectronicVersionVersionTypes',
            summary: 'A list of allowed version types',
            description: 'Get a list of allowed version types for electronic versions on research outputs',
            path: '/allowed-electronic-version-version-types'
        },
        getAllowedImageTypes: {
            operationId: 'researchOutput_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of research output',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'researchOutput_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'researchOutput_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLanguages: {
            operationId: 'researchoutput_getAllowedLanguages',
            summary: 'A list of allowed languages',
            description: 'Get a list of allowed languages on research outputs',
            path: '/allowed-languages'
        },
        getAllowedLinkTypes: {
            operationId: 'researchoutput_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types on research outputs',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'researchOutput_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMainResearchAreas: {
            operationId: 'researchoutput_getAllowedMainResearchAreas',
            summary: 'A list of allowed main research areas',
            description: 'Get a list of allowed main research areas on research outputs',
            path: '/allowed-main-research-areas'
        },
        getAllowedMemorandumContributorRoles: {
            operationId: 'researchoutput_getAllowedMemorandumContributorRoles',
            summary: 'A list of allowed contributor roles for the memorandum subtype',
            description: 'Get a list of allowed roles for contributors on the memorandum subtype of research outputs',
            path: '/allowed-memorandum-contributor-roles'
        },
        getAllowedMemorandumDescriptionTypes: {
            operationId: 'researchoutput_getAllowedMemorandumDescriptionTypes',
            summary: 'A list of allowed description types for the memorandum subtype',
            description: 'Get a list of allowed description types on the memorandum subtype of research outputs',
            path: '/allowed-memorandum-description-types'
        },
        getAllowedMetricCollections: {
            operationId: 'researchoutput_getAllowedMetricCollections',
            summary: 'A list of allowed metric collections',
            description: 'Get a list of metric collections allowed on research outputs',
            path: '/allowed-metric-collections'
        },
        getAllowedNonTextualContributorRoles: {
            operationId: 'researchoutput_getAllowedNonTextualContributorRoles',
            summary: 'A list of allowed contributor roles for the non-textual subtype',
            description: 'Get a list of allowed roles for contributors on the non-textual subtype of research outputs',
            path: '/allowed-non-textual-contributor-roles'
        },
        getAllowedNonTextualDescriptionTypes: {
            operationId: 'researchoutput_getAllowedNonTextualDescriptionTypes',
            summary: 'A list of allowed description types for the non-textual subtype',
            description: 'Get a list of allowed description types on the non-textual subtype of research outputs',
            path: '/allowed-non-textual-description-types'
        },
        getAllowedOtherContributionContributorRoles: {
            operationId: 'researchoutput_getAllowedOtherContributionContributorRoles',
            summary: 'A list of allowed contributor roles for the other contribution subtype',
            description: 'Get a list of allowed roles for contributors on the other contribution subtype of research outputs',
            path: '/allowed-other-contribution-contributor-roles'
        },
        getAllowedOtherContributionDescriptionTypes: {
            operationId: 'researchoutput_getAllowedOtherContributionDescriptionTypes',
            summary: 'A list of allowed description types for the other contribution subtype',
            description: 'Get a list of allowed description types on the other contribution subtype of research outputs',
            path: '/allowed-other-contribution-description-types'
        },
        getAllowedOutputMedias: {
            operationId: 'researchoutput_getAllowedOutputMedias',
            summary: 'A list of allowed output medias',
            description: 'Get a list of allowed output medias for the non-textual subtype of research outputs',
            path: '/allowed-output-medias'
        },
        getAllowedPatentContributorRoles: {
            operationId: 'researchoutput_getAllowedPatentContributorRoles',
            summary: 'A list of allowed contributor roles for the patent subtype',
            description: 'Get a list of allowed roles for contributors on the patent subtype of research outputs',
            path: '/allowed-patent-contributor-roles'
        },
        getAllowedPatentDescriptionTypes: {
            operationId: 'researchoutput_getAllowedPatentDescriptionTypes',
            summary: 'A list of allowed description types for the patent subtype',
            description: 'Get a list of allowed description types on the patent subtype of research outputs',
            path: '/allowed-patent-description-types'
        },
        getAllowedPeerReviewConfigurations: {
            operationId: 'researchOutput_getAllowedPeerReviewConfigurations',
            summary: 'A list of peer review configurations',
            description: 'Get a list of peer review configurations that describe the allowed combinations of values for the interrelated fields: type, category, peerReview, and internationalPeerReview',
            path: '/allowed-peer-review-configurations'
        },
        getAllowedPublicationStatuses: {
            operationId: 'researchoutput_getAllowedPublicationStatuses',
            summary: 'A list of allowed publication statuses',
            description: 'Get a list of allowed publication statuses on research output',
            path: '/allowed-publication-statuses'
        },
        getAllowedQualifications: {
            operationId: 'researchoutput_getAllowedQualifications',
            summary: 'A list of allowed qualifications',
            description: 'Get a list of allowed qualifications for the thesis subtype of research outputs',
            path: '/allowed-qualifications'
        },
        getAllowedSupervisorRoles: {
            operationId: 'researchoutput_getAllowedSupervisorRoles',
            summary: 'A list of allowed supervisor roles',
            description: 'Get a list of allowed supervisors roles for the thesis subtype of research outputs',
            path: '/allowed-supervisor-roles'
        },
        getAllowedTemplates: {
            operationId: 'researchOutput_getAllowedTemplates',
            summary: 'A list of allowed research output templates',
            description: 'Get a list of allowed templates that can be used for research outputs, such as \'ContributionToJournal\' or \'BookAnthology\'. Some of the templates that exists in the API specification may be disabled for the Pure installation.',
            path: '/allowed-templates'
        },
        getAllowedThesisContributorRoles: {
            operationId: 'researchoutput_getAllowedThesisContributorRoles',
            summary: 'A list of allowed contributor roles for the thesis subtype',
            description: 'Get a list of allowed roles for contributors on the thesis subtype of research outputs',
            path: '/allowed-thesis-contributor-roles'
        },
        getAllowedThesisDescriptionTypes: {
            operationId: 'researchoutput_getAllowedThesisDescriptionTypes',
            summary: 'A list of allowed description types for the thesis subtype',
            description: 'Get a list of allowed description types on the thesis subtype of research outputs',
            path: '/allowed-thesis-description-types'
        },
        getAllowedTypes: {
            operationId: 'researchOutput_getAllowedTypes',
            summary: 'A list of allowed research output types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of research outputs',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'researchOutput_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of research outputs',
            path: '/allowed-workflow-steps'
        },
        getAllowedWorkingPaperContributorRoles: {
            operationId: 'researchoutput_getAllowedWorkingPaperContributorRoles',
            summary: 'A list of allowed contributor roles for the working paper subtype',
            description: 'Get a list of allowed roles for contributors on the working paper subtype of research outputs',
            path: '/allowed-working-paper-contributor-roles'
        },
        getAllowedWorkingPaperDescriptionTypes: {
            operationId: 'researchoutput_getAllowedWorkingPaperDescriptionTypes',
            summary: 'A list of allowed description types for the working paper subtype',
            description: 'Get a list of allowed description types on the working paper subtype of research outputs',
            path: '/allowed-working-paper-description-types'
        },
        getDisciplineAssociation: {
            operationId: 'researchoutput_getDisciplineAssociation',
            summary: 'Get disciplinesfrom the discipline scheme associated with the research output',
            description: 'Get disciplines from the discipline scheme associated with the research output with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        getFile: {
            operationId: 'researchOutput_getFile',
            summary: 'Get file from the research output',
            description: 'Get file from the research output',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'researchOutput_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the research output endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'researchOutput_list',
            summary: 'Lists all research outputs',
            description: 'Lists all research outputs in the Pure instance. If you need to filter the research outputs returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'researchOutput_dependents',
            summary: 'Lists all dependents to a research output',
            description: 'Lists all dependents to a research output with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listDisciplineAssociations: {
            operationId: 'researchOutput_listDisciplineAssociations',
            summary: 'Query operation for disciplines associated with research outputs',
            description: 'Lists disciplines from the discipline scheme associated with research outputs in the Pure instance that matches the provided query.',
            path: '/disciplines/{discipline-scheme}/search'
        },
        listMetricsFromCollection: {
            operationId: 'researchOutput_listMetricsFromCollection',
            summary: 'Lists metrics with collection id',
            description: 'Lists metrics from a specific metrics collection that associated with a research output.',
            path: '/{uuid}/metrics/{collection-id}'
        },
        listNotes: {
            operationId: 'researchOutput_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a research output ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'researchOutput_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'researchOutput_query',
            summary: 'Query operation for research outputs',
            description: 'Lists research outputs in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'researchOutput_delete',
            summary: 'Delete research output',
            description: 'Delete research output with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'researchOutput_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'researchOutput_update',
            summary: 'Update research output',
            description: 'Update research output with specific UUID.',
            path: '/{uuid}'
        },
        updateDisciplineAssociation: {
            operationId: 'researchOutput_putDisciplineAssociation',
            summary: 'Update disciplines from the discipline scheme associated with the research output',
            description: 'Update disciplines from the discipline scheme associated with the research output with specific UUID.',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        },
        uploadFile: {
            operationId: 'researchOutput_fileUploads',
            summary: 'Upload file to a specific research output',
            description: 'Uploads file for the research output',
            path: '/file-uploads'
        }
    }
}

export const rolesServiceConfig: ServiceConfig = {
    basePath: '/roles',
    operations: {
        get: {
            operationId: 'role_get_assignable_role',
            summary: 'Returns an assignable role',
            description: 'Returns an assignable role if it is currently available',
            path: '/{assignableRoleName}'
        },
        list: {
            operationId: 'role_get_assignable_roles',
            summary: 'Lists all assignable roles',
            description: 'Lists all assignable roles that are currently available'
        }
    }
}

export const studentThesesServiceConfig: ServiceConfig = {
    basePath: '/student-theses',
    operations: {
        create: {
            operationId: 'studentThesis_create',
            summary: 'Create student thesis',
            description: 'Create student thesis'
        },
        createNote: {
            operationId: 'studentThesis_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with a student thesis',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'studentThesis_get',
            summary: 'Get student thesis',
            description: 'Get student thesis with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedContributorCountries: {
            operationId: 'studentthesis_getAllowedContributorCountries',
            summary: 'A list of allowed contributor countries for student theses',
            description: 'Get a list of allowed countries for contributors of student theses',
            path: '/allowed-contributor-countries'
        },
        getAllowedContributorRoles: {
            operationId: 'studentthesis_getAllowedContributorRoles',
            summary: 'A list of allowed contributor roles for student theses',
            description: 'Get a list of allowed roles for contributors of student theses',
            path: '/allowed-contributor-roles'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'studentThesis_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the student thesis',
            description: 'Get allowed classifications for the custom-defined field associated with the student theses.',
            path: '/allowed-custom-defined-field-values/{fieldIdentifer}/classifications'
        },
        getAllowedDocumentEmbargoReasons: {
            operationId: 'studentThesis_getAllowedDocumentEmbargoReasons',
            summary: 'A list of allowed document embargo reasons',
            description: 'Get a list of allowed document embargo reasons that can be used for student theses',
            path: '/allowed-document-embargo-reasons'
        },
        getAllowedDocumentLicenses: {
            operationId: 'studentThesis_getAllowedDocumentLicenses',
            summary: 'A list of allowed document license types',
            description: 'Get a list of allowed document license types that can be used for student these',
            path: '/allowed-document-license-types'
        },
        getAllowedDocumentTypes: {
            operationId: 'studentThesis_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed document types that can be used for student these',
            path: '/allowed-document-types'
        },
        getAllowedDocumentVersionTypes: {
            operationId: 'studentThesis_getAllowedDocumentVersionTypes',
            summary: 'A list of allowed document version types',
            description: 'Get a list of allowed document version types that can be used for student these',
            path: '/allowed-document-version-types'
        },
        getAllowedImageTypes: {
            operationId: 'studentThesis_getAllowedImageTypes',
            summary: 'A list of allowed image types',
            description: 'Get a list of allowed image types that can be used for the \'images.type\' attribute of student thesis',
            path: '/allowed-image-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'studentThesis_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'studentThesis_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLanguages: {
            operationId: 'studentthesis_getAllowedLanguages',
            summary: 'A list of allowed languages',
            description: 'Get a list of allowed languages on student theses',
            path: '/allowed-languages'
        },
        getAllowedLinkTypes: {
            operationId: 'studentthesis_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types on student theses',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'studentThesis_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedSupervisorRoles: {
            operationId: 'studentthesis_getAllowedSupervisorRoles',
            summary: 'A list of allowed supervisor roles',
            description: 'Get a list of allowed supervisors roles for student theses',
            path: '/allowed-supervisor-roles'
        },
        getAllowedTypes: {
            operationId: 'studentThesis_getAllowedTypes',
            summary: 'A list of allowed student thesis types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of student theses',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'studentThesis_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of student theses',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            operationId: 'studentThesis_getFile',
            summary: 'Get file from the student thesis',
            description: 'Get file from the student thesis',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'studentThesis_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the student thesis endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'studentThesis_list',
            summary: 'Lists all  student theses',
            description: 'Lists all  student theses in the Pure instance. If you need to filter the student theses returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'studentThesis_dependents',
            summary: 'Lists all dependents to a student thesis',
            description: 'Lists all dependents to a student thesis with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listNotes: {
            operationId: 'studentThesis_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with a student thesis ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'studentThesis_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'studentThesis_query',
            summary: 'Query operation for student theses',
            description: 'Lists student theses in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'studentThesis_delete',
            summary: 'Delete student thesis',
            description: 'Delete student thesis with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'studentThesis_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'studentThesis_update',
            summary: 'Update student thesis',
            description: 'Update student thesis with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'studentThesis_fileUploads',
            summary: 'Upload file to a specific student thesis',
            description: 'Uploads file for the student thesis',
            path: '/file-uploads'
        }
    }
}

export const thesauriServiceConfig: ServiceConfig = {
    basePath: '/thesauri',
    operations: {
        get: {
            operationId: 'thesaurus_get',
            summary: 'Get thesaurus',
            description: 'Get thesaurus with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedLocales: {
            operationId: 'thesaurus_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getOrderings: {
            operationId: 'thesaurus_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the thesaurus endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'thesaurus_list',
            summary: 'Lists all thesauri',
            description: 'Lists all thesauri in the Pure instance. If you need to filter the thesauri returned, see the POST version which supports additional filtering.'
        },
        query: {
            operationId: 'thesaurus_query',
            summary: 'Query operation for thesauri',
            description: 'Lists thesauri in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        }
    }
}

export const usersServiceConfig: ServiceConfig = {
    basePath: '/users',
    operations: {
        create: {
            operationId: 'user_create',
            summary: 'Create user',
            description: 'Create user'
        },
        get: {
            operationId: 'user_get',
            summary: 'Get user',
            description: 'Get user with specific UUID.',
            path: '/{uuid}'
        },
        getOrderings: {
            operationId: 'user_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the user endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'user_list',
            summary: 'Lists all users',
            description: 'Lists all users in the Pure instance.'
        },
        listRoles: {
            operationId: 'user_get_roles_for_user',
            summary: 'Lists all roles of a user',
            description: 'Lists all roles of a user',
            path: '/{uuid}/roles'
        },
        lock: {
            operationId: 'user_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        remove: {
            operationId: 'user_delete',
            summary: 'Delete user',
            description: 'Delete user with specific UUID.',
            path: '/{uuid}'
        },
        resetPassword: {
            operationId: 'user_resetPassword',
            summary: 'Reset user password',
            description: 'Resets the user\'s password. Reset password email will be sent to the user\'s email. The token expiry hour defaults to 24 hours.',
            path: '/{uuid}/actions/reset-password'
        },
        unlock: {
            operationId: 'user_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'user_update',
            summary: 'Update user',
            description: 'Update user with specific UUID.',
            path: '/{uuid}'
        },
        updateRoles: {
            operationId: 'user_update_roles_for_user',
            summary: 'Updates roles',
            description: 'Applies the supplied roles to a user. Roles not in the request will be removed from user',
            path: '/{uuid}/roles'
        }
    }
}

export const ethicalReviewsServiceConfig: ServiceConfig = {
    basePath: '/ethical-reviews',
    operations: {
        create: {
            operationId: 'ethicalReview_create',
            summary: 'Create ethical review',
            description: 'Create ethical review'
        },
        createNote: {
            operationId: 'ethicalReview_createNote',
            summary: 'Create note',
            description: 'Create note and associate it with an ethical review',
            path: '/{uuid}/notes'
        },
        get: {
            operationId: 'ethicalReview_get',
            summary: 'Get ethical review',
            description: 'Get ethical review with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedClassifiedIdentifierTypes: {
            operationId: 'ethicalReview_getAllowedClassifiedIdentifierTypes',
            summary: 'A list of allowed classified identifier types',
            description: 'Get a list of allowed classified identifier types that can be used for the \'identifiers.type\' attribute of ethical reviews',
            path: '/allowed-classified-identifier-types'
        },
        getAllowedCustomDefinedFieldClassifications: {
            operationId: 'ethicalReview_getAllowedCustomDefinedFieldClassifications',
            summary: 'Get allowed classifications for the custom-defined field associated with the ethical review',
            description: 'Get allowed classifications for the custom-defined field associated with the ethical review.',
            path: '/allowed-custom-defined-field-values/{propertyName}/classifications'
        },
        getAllowedDescriptionTypes: {
            operationId: 'ethicalReview_getAllowedDescriptionTypes',
            summary: 'A list of allowed description types',
            description: 'Get a list of allowed types for descriptions on ethical reviews',
            path: '/allowed-description-types'
        },
        getAllowedDocumentTypes: {
            operationId: 'ethicalReview_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on ethical reviews',
            path: '/allowed-document-types'
        },
        getAllowedKeywordGroupConfigurationClassifications: {
            operationId: 'ethicalReview_getAllowedKeywordGroupConfigurationClassifications',
            summary: 'A list of allowed classifications for the specified keyword group',
            description: 'Get a list of allowed classifications that can be used when submitting a specified keyword group.',
            path: '/allowed-keyword-group-configurations/{id}/classifications'
        },
        getAllowedKeywordGroupConfigurations: {
            operationId: 'ethicalReview_getAllowedKeywordGroupConfigurations',
            summary: 'A list of keyword group configurations',
            description: 'Get a list of allowed keyword group configurations that can be used when submitting keyword groups.',
            path: '/allowed-keyword-group-configurations'
        },
        getAllowedLinkTypes: {
            operationId: 'ethicalReview_getAllowedLinkTypes',
            summary: 'A list of allowed link types',
            description: 'Get a list of allowed link types on ethical reviews',
            path: '/allowed-link-types'
        },
        getAllowedLocales: {
            operationId: 'ethicalReview_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedPersonsRoles: {
            operationId: 'ethicalReview_getAllowedPersonsRoles',
            summary: 'A list of allowed person roles',
            description: 'Get a list of allowed roles for persons on ethical reviews',
            path: '/allowed-persons-roles'
        },
        getAllowedTypes: {
            operationId: 'ethicalReview_getAllowedTypes',
            summary: 'A list of allowed ethical review types',
            description: 'Get a list of allowed types that can be used for the \'type\' attribute of ethical reviews',
            path: '/allowed-types'
        },
        getAllowedWorkflowSteps: {
            operationId: 'ethicalReview_getAllowedWorkflowSteps',
            summary: 'A list of allowed workflow steps',
            description: 'Get a list of allowed workflow steps that can be used for the \'workflow\' attribute of ethical reviews',
            path: '/allowed-workflow-steps'
        },
        getFile: {
            operationId: 'ethicalReview_getFile',
            summary: 'Get file from the ethical review',
            description: 'Get file from the ethical review',
            path: '/{uuid}/files/{fileId}'
        },
        getMilestones: {
            operationId: 'ethicalReview_getMilestones',
            summary: 'Get milestones for the ethical review',
            description: 'Get milestones for the ethical review with the specified UUID.',
            path: '/{uuid}/milestones'
        },
        getOrderings: {
            operationId: 'ethicalReview_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the ethical review endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'ethicalReview_list',
            summary: 'Lists all ethical reviews',
            description: 'Lists all ethical reviews in the Pure instance. If you need to filter the ethical reviews returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'ethicalReview_dependents',
            summary: 'Lists all dependents to an ethical review',
            description: 'Lists all dependents to an ethical review with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        listNotes: {
            operationId: 'ethicalReview_listNotes',
            summary: 'Lists notes',
            description: 'Lists notes associated with an ethical review ordered by date (nulls last)',
            path: '/{uuid}/notes'
        },
        lock: {
            operationId: 'ethicalReview_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'ethicalReview_query',
            summary: 'Query operation for ethical reviews',
            description: 'Lists ethical reviews in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'ethicalReview_delete',
            summary: 'Delete ethical review',
            description: 'Delete ethical review with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'ethicalReview_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'ethicalReview_update',
            summary: 'Update ethical review',
            description: 'Update ethical review with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'ethicalReview_fileUploads',
            summary: 'File upload endpoint',
            description: 'Uploads a file for use in ethical reviews',
            path: '/file-uploads'
        }
    }
}

export const milestonesServiceConfig: ServiceConfig = {
    basePath: '/milestones',
    operations: {
        create: {
            operationId: 'milestone_create',
            summary: 'Create milestone',
            description: 'Create milestone'
        },
        get: {
            operationId: 'milestone_get',
            summary: 'Get milestone',
            description: 'Get milestone with specific UUID.',
            path: '/{uuid}'
        },
        getAllowedAcademicRolesRelatedToApplications: {
            operationId: 'milestone_getAllowedAcademicRolesRelatedToApplications',
            summary: 'A list of allowed academic roles related to applications',
            description: 'Get a list of allowed academic roles related to applications.',
            path: '/application/allowed-academic-roles'
        },
        getAllowedAdministrativeRolesRelatedToApplications: {
            operationId: 'milestone_getAllowedAdministrativeRolesRelatedToApplications',
            summary: 'A list of allowed administrative roles related to applications',
            description: 'Get a list of allowed administrative roles related to applications.',
            path: '/application/allowed-administrative-roles'
        },
        getAllowedAcademicRolesRelatedToAwards: {
            operationId: 'milestone_getAllowedAcademicRolesRelatedToAwards',
            summary: 'A list of allowed academic roles related to awards',
            description: 'Get a list of allowed academic roles related to awards.',
            path: '/award/allowed-academic-roles'
        },
        getAllowedAdministrativeRolesRelatedToAwards: {
            operationId: 'milestone_getAllowedAdministrativeRolesRelatedToAwards',
            summary: 'A list of allowed administrative roles related to awards',
            description: 'Get a list of allowed administrative roles related to awards.',
            path: '/award/allowed-administrative-roles'
        },
        getAllowedAcademicRolesRelatedToContract: {
            operationId: 'milestone_getAllowedAcademicRolesRelatedToContract',
            summary: 'A list of allowed academic roles related to contracts',
            description: 'Get a list of allowed academic roles related to contracts.',
            path: '/contract/allowed-academic-roles'
        },
        getAllowedAdministrativeRolesRelatedToContract: {
            operationId: 'milestone_getAllowedAdministrativeRolesRelatedToContract',
            summary: 'A list of allowed administrative roles related to contracts',
            description: 'Get a list of allowed administrative roles related to contracts.',
            path: '/contract/allowed-administrative-roles'
        },
        getAllowedAcademicRolesRelatedToEthicalReview: {
            operationId: 'milestone_getAllowedAcademicRolesRelatedToEthicalReview',
            summary: 'A list of allowed academic roles related to ethical reviews',
            description: 'Get a list of allowed academic roles related to ethical reviews.',
            path: '/ethical-review/allowed-academic-roles'
        },
        getAllowedAdministrativeRolesRelatedToEthicalReview: {
            operationId: 'milestone_getAllowedAdministrativeRolesRelatedToEthicalReview',
            summary: 'A list of allowed administrative roles related to ethical reviews',
            description: 'Get a list of allowed administrative roles related to ethical reviews.',
            path: '/ethical-review/allowed-administrative-roles'
        },
        getAllowedAcademicRolesRelatedToProjects: {
            operationId: 'milestone_getAllowedAcademicRolesRelatedToProjects',
            summary: 'A list of allowed academic roles related to projects',
            description: 'Get a list of allowed academic roles related to projects.',
            path: '/project/allowed-academic-roles'
        },
        getAllowedAdministrativeRolesRelatedToProject: {
            operationId: 'milestone_getAllowedAdministrativeRolesRelatedToProject',
            summary: 'A list of allowed administrative roles related to projects',
            description: 'Get a list of allowed administrative roles related to projects.',
            path: '/project/allowed-administrative-roles'
        },
        getAllowedCategories: {
            operationId: 'milestone_getAllowedCategories',
            summary: 'A list of allowed categories',
            description: 'Get a list of allowed categories for milestones',
            path: '/allowed-categories'
        },
        getAllowedCompletionStates: {
            operationId: 'milestone_getAllowedCompletionStates',
            summary: 'A list of allowed completion states',
            description: 'Get a list of allowed completion states for milestones',
            path: '/allowed-completion-states'
        },
        getAllowedDocumentTypes: {
            operationId: 'milestone_getAllowedDocumentTypes',
            summary: 'A list of allowed document types',
            description: 'Get a list of allowed types for documents on milestones',
            path: '/allowed-document-types'
        },
        getAllowedLocales: {
            operationId: 'milestone_getAllowedLocales',
            summary: 'A list of allowed locales in localized strings',
            description: 'Get a list of allowed locales that can be used when submitting localized string entities.',
            path: '/allowed-locales'
        },
        getAllowedMilestoneStates: {
            operationId: 'milestone_getAllowedMilestoneStates',
            summary: 'A list of allowed milestone states',
            description: 'Get a list of allowed milestone states for milestones',
            path: '/allowed-milestone-states'
        },
        getFile: {
            operationId: 'milestone_getFile',
            summary: 'Get file from the milestone',
            description: 'Get file from the milestone',
            path: '/{uuid}/files/{fileId}'
        },
        getOrderings: {
            operationId: 'milestone_getOrderings',
            summary: 'Lists available orderings',
            description: 'Lists all orderings available to the milestone endpoint. These values can be used by the order parameter.',
            path: '/orderings'
        },
        list: {
            operationId: 'milestone_list',
            summary: 'Lists all milestones',
            description: 'Lists all milestones in the Pure instance. If you need to filter the milestones returned, see the POST version which supports additional filtering.'
        },
        listDependents: {
            operationId: 'milestone_dependents',
            summary: 'Lists all dependents to a milestone',
            description: 'Lists all dependents to a milestone with the specified UUID. If the user does not have access to view all the dependent content, an authorization error will be thrown.',
            path: '/{uuid}/dependents'
        },
        lock: {
            operationId: 'milestone_lock',
            summary: 'Lock the content',
            description: 'Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/lock'
        },
        query: {
            operationId: 'milestone_query',
            summary: 'Query operation for milestones',
            description: 'Lists milestones in the Pure instance that matches the provided query, similar to the GET version, instead of using parameters to alter the response, an JSON document is posted with the request. The JSON document contains fields for all the parameters available for the GET version, but also additional filtering options.',
            path: '/search'
        },
        remove: {
            operationId: 'milestone_delete',
            summary: 'Delete milestone',
            description: 'Delete milestone with specific UUID.',
            path: '/{uuid}'
        },
        unlock: {
            operationId: 'milestone_unlock',
            summary: 'Unlock the content',
            description: 'Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.',
            path: '/{uuid}/actions/unlock'
        },
        update: {
            operationId: 'milestone_update',
            summary: 'Update milestone',
            description: 'Update milestone with specific UUID.',
            path: '/{uuid}'
        },
        uploadFile: {
            operationId: 'milestone_fileUploads',
            summary: 'File upload endpoint',
            description: 'Uploads a file for use in milestones',
            path: '/file-uploads'
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
    ethicalReviews: ethicalReviewsServiceConfig,
    externalOrganizations: externalOrganizationsServiceConfig,
    externalPersons: externalPersonsServiceConfig,
    fundingOpportunities: fundingOpportunitiesServiceConfig,
    impacts: impactsServiceConfig,
    journals: journalsServiceConfig,
    milestones: milestonesServiceConfig,
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

export function resolveOperationPath(basePath: string, relativePath: string | undefined, params: PathParams = {}): string {
    const template = relativePath ?? ""
    const resolvedPath = template.replace(/{([^}]+)}/g, (_, token) => {
        if (!(token in params)) {
            throw new Error(`Missing required path parameter "${token}"`)
        }

        const value = params[token]
        return encodeURIComponent(String(value))
    })

    if (!template) {
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
    const metadata = getOperationMetadata(operation.operationId)
    const resolvedBasePath = basePath || metadata.basePath
    const relativePath = operation.path ?? metadata.path
    const path = resolveOperationPath(resolvedBasePath, relativePath, pathParams)

    switch (metadata.method) {
        case 'get':
            return client.get(path, query, config) as Promise<TResponse>
        case 'post':
            return client.post(path, body, query, config) as Promise<TResponse>
        case 'put':
            return client.put(path, body, query, config) as Promise<TResponse>
        case 'delete':
            return client.delete(path, query, config) as Promise<TResponse>
        default:
            throw new Error(`Unsupported HTTP method ${metadata.method}`)
    }
}
