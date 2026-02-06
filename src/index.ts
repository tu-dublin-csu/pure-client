import { PureClient } from './pure-client'

export { PureClient }
export * from './generated'

export { ActivitiesService } from './services/activities'
export type {
	ActivitiesServiceOptions,
	Activity,
	ActivityListParams,
	ActivityListResult,
	ActivitiesQuery,
	DisciplinesAssociation as ActivityDisciplinesAssociation,
	Note as ActivityNote
} from './services/activities'

export { ApplicationsService } from './services/applications'
export type {
	ApplicationsServiceOptions,
	Application,
	ApplicationListParams,
	ApplicationListResult,
	ApplicationsQuery,
	ApplicationBudget,
	ApplicationBudgetResult,
	ApplicationCluster,
	DisciplinesAssociation as ApplicationDisciplinesAssociation,
	Note as ApplicationNote
} from './services/applications'

export { AwardsService } from './services/awards'
export type {
	AwardsServiceOptions,
	Award,
	AwardListParams,
	AwardListResult,
	AwardsQuery,
	AwardBudget,
	AwardBudgetResult,
	AwardCluster,
	MilestoneListResult as AwardMilestoneListResult,
	DisciplinesAssociation as AwardDisciplinesAssociation,
	Note as AwardNote
} from './services/awards'

export { AuthorCollaborationsService } from './services/author-collaborations'
export type {
	AuthorCollaborationsServiceOptions,
	AuthorCollaboration,
	AuthorCollaborationListParams,
	AuthorCollaborationListResult,
	AuthorCollaborationQuery,
	AuthorCollaborationNotesParams,
	Note as AuthorCollaborationNote,
	NoteListResult as AuthorCollaborationNoteListResult,
	LocalesList as AuthorCollaborationLocalesList,
	WorkflowListResult as AuthorCollaborationWorkflowListResult,
	OrderingsList as AuthorCollaborationOrderingsList
} from './services/author-collaborations'

export { ConceptsService } from './services/concepts'
export type {
	ConceptsServiceOptions,
	Concept,
	ConceptListParams,
	ConceptListResult,
	ConceptQuery,
	LocalesList as ConceptLocalesList
} from './services/concepts'

export { EquipmentService } from './services/equipment'
export type {
	EquipmentServiceOptions,
	Equipment,
	EquipmentListParams,
	EquipmentListResult,
	EquipmentQuery,
	EquipmentNotesParams,
	ClassificationRefList as EquipmentClassificationRefList,
	AllowedKeywordGroupConfigurationList as EquipmentAllowedKeywordGroupConfigurationList,
	LocalesList as EquipmentLocalesList,
	WorkflowListResult as EquipmentWorkflowListResult,
	OrderingsList as EquipmentOrderingsList,
	Note as EquipmentNote,
	NoteListResult as EquipmentNoteListResult,
	UploadedFile as EquipmentUploadedFile
} from './services/equipment'

export { EventsService } from './services/events'
export type {
	EventsServiceOptions,
	Event,
	EventListParams,
	EventListResult,
	EventsQuery,
	EventNotesParams,
	EventAllowedDisciplinesParams,
	DisciplinesAssociation as EventDisciplinesAssociation,
	DisciplinesAssociationsQuery as EventDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as EventDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as EventDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as EventDisciplineSchemeListResult,
	ClassificationRefList as EventClassificationRefList,
	AllowedKeywordGroupConfigurationList as EventAllowedKeywordGroupConfigurationList,
	LocalesList as EventLocalesList,
	WorkflowListResult as EventWorkflowListResult,
	OrderingsList as EventOrderingsList,
	Note as EventNote,
	NoteListResult as EventNoteListResult
} from './services/events'

export { EthicalReviewsService } from './services/ethical-reviews'
export type {
	EthicalReviewsServiceOptions,
	EthicalReview,
	EthicalReviewListParams,
	EthicalReviewListResult,
	EthicalReviewQuery,
	EthicalReviewDependentsParams,
	EthicalReviewNotesParams,
	ClassificationRefList as EthicalReviewClassificationRefList,
	AllowedKeywordGroupConfigurationList as EthicalReviewAllowedKeywordGroupConfigurationList,
	LocalesList as EthicalReviewLocalesList,
	WorkflowListResult as EthicalReviewWorkflowListResult,
	OrderingsList as EthicalReviewOrderingsList,
	ContentRefListResult as EthicalReviewContentRefListResult,
	MilestoneListResult as EthicalReviewMilestoneListResult,
	Note as EthicalReviewNote,
	NoteListResult as EthicalReviewNoteListResult,
	UploadedFile as EthicalReviewUploadedFile
} from './services/ethical-reviews'

export { FundingOpportunitiesService } from './services/funding-opportunities'
export type {
	FundingOpportunitiesServiceOptions,
	FundingOpportunity,
	FundingOpportunityListParams,
	FundingOpportunityListResult,
	FundingOpportunitiesQuery,
	FundingOpportunityDependentsParams,
	FundingOpportunityNotesParams,
	ClassificationRefList as FundingOpportunityClassificationRefList,
	AllowedKeywordGroupConfigurationList as FundingOpportunityAllowedKeywordGroupConfigurationList,
	LocalesList as FundingOpportunityLocalesList,
	OrderingsList as FundingOpportunityOrderingsList,
	ContentRefListResult as FundingOpportunityContentRefListResult,
	Note as FundingOpportunityNote,
	NoteListResult as FundingOpportunityNoteListResult,
	UploadedFile as FundingOpportunityUploadedFile
} from './services/funding-opportunities'

export { ImpactsService } from './services/impacts'
export type {
	ImpactsServiceOptions,
	Impact,
	ImpactListParams,
	ImpactListResult,
	ImpactQuery,
	ImpactDependentsParams,
	ImpactNotesParams,
	ImpactAllowedDisciplinesParams,
	DisciplinesAssociation as ImpactDisciplinesAssociation,
	DisciplinesAssociationsQuery as ImpactDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as ImpactDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as ImpactDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as ImpactDisciplineSchemeListResult,
	ClassificationRefList as ImpactClassificationRefList,
	AllowedKeywordGroupConfigurationList as ImpactAllowedKeywordGroupConfigurationList,
	LocalesList as ImpactLocalesList,
	WorkflowListResult as ImpactWorkflowListResult,
	ContentRefListResult as ImpactContentRefListResult,
	Note as ImpactNote,
	NoteListResult as ImpactNoteListResult,
	UploadedFile as ImpactUploadedFile
} from './services/impacts'

export { JournalsService } from './services/journals'
export type {
	JournalsServiceOptions,
	Journal,
	JournalListParams,
	JournalListResult,
	JournalsQuery,
	JournalDependentsParams,
	JournalNotesParams,
	JournalAllowedDisciplinesParams,
	DisciplinesAssociation as JournalDisciplinesAssociation,
	DisciplinesAssociationsQuery as JournalDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as JournalDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as JournalDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as JournalDisciplineSchemeListResult,
	ClassificationRefList as JournalClassificationRefList,
	AllowedKeywordGroupConfigurationList as JournalAllowedKeywordGroupConfigurationList,
	LocalesList as JournalLocalesList,
	WorkflowListResult as JournalWorkflowListResult,
	OrderingsList as JournalOrderingsList,
	MetricCollection as JournalMetricCollection,
	MetricCollectionDefinitionList as JournalMetricCollectionDefinitionList,
	ContentRefListResult as JournalContentRefListResult,
	Note as JournalNote,
	NoteListResult as JournalNoteListResult
} from './services/journals'

export { MilestonesService } from './services/milestones'
export type {
	MilestonesServiceOptions,
	Milestone,
	MilestoneListParams,
	MilestoneListResult,
	MilestoneQuery,
	MilestoneDependentsParams,
	ClassificationRefList as MilestoneClassificationRefList,
	LocalesList as MilestoneLocalesList,
	OrderingsList as MilestoneOrderingsList,
	ContentRefListResult as MilestoneContentRefListResult,
	APIStringListResult as MilestoneAPIStringListResult,
	UploadedFile as MilestoneUploadedFile
} from './services/milestones'

export { PressMediaService } from './services/press-media'
export type {
	PressMediaServiceOptions,
	PressMedia,
	PressMediaListParams,
	PressMediaListResult,
	PressMediaQuery,
	PressMediaNotesParams,
	ClassificationRefList as PressMediaClassificationRefList,
	AllowedKeywordGroupConfigurationList as PressMediaAllowedKeywordGroupConfigurationList,
	LocalesList as PressMediaLocalesList,
	WorkflowListResult as PressMediaWorkflowListResult,
	OrderingsList as PressMediaOrderingsList,
	UploadedFile as PressMediaUploadedFile,
	APIStringListResult as PressMediaAPIStringListResult,
	Note as PressMediaNote,
	NoteListResult as PressMediaNoteListResult
} from './services/press-media'

export { PublishersService } from './services/publishers'
export type {
	PublishersServiceOptions,
	Publisher,
	PublisherListParams,
	PublisherListResult,
	PublishersQuery,
	PublisherDependentsParams,
	PublisherNotesParams,
	PublisherAllowedDisciplinesParams,
	ClassificationRefList as PublisherClassificationRefList,
	AllowedKeywordGroupConfigurationList as PublisherAllowedKeywordGroupConfigurationList,
	LocalesList as PublisherLocalesList,
	WorkflowListResult as PublisherWorkflowListResult,
	OrderingsList as PublisherOrderingsList,
	DisciplinesAssociation as PublisherDisciplinesAssociation,
	DisciplinesAssociationsQuery as PublisherDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as PublisherDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as PublisherDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as PublisherDisciplineSchemeListResult,
	ContentRefListResult as PublisherContentRefListResult,
	Note as PublisherNote,
	NoteListResult as PublisherNoteListResult
} from './services/publishers'

export { RolesService } from './services/roles'
export type { RolesServiceOptions, AssignableRole } from './services/roles'

export { ThesauriService } from './services/thesauri'
export type {
	ThesauriServiceOptions,
	Thesaurus,
	ThesaurusListParams,
	ThesaurusListResult,
	ThesaurusQuery,
	LocalesList as ThesaurusLocalesList,
	OrderingsList as ThesaurusOrderingsList
} from './services/thesauri'

export { PrizesService } from './services/prizes'
export type {
	PrizesServiceOptions,
	Prize,
	PrizeListParams,
	PrizeListResult,
	PrizesQuery,
	PrizeNotesParams,
	PrizeAllowedDisciplinesParams,
	DisciplinesAssociation as PrizeDisciplinesAssociation,
	DisciplinesAssociationsQuery as PrizeDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as PrizeDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as PrizeDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as PrizeDisciplineSchemeListResult,
	ClassificationRefList as PrizeClassificationRefList,
	AllowedKeywordGroupConfigurationList as PrizeAllowedKeywordGroupConfigurationList,
	LocalesList as PrizeLocalesList,
	WorkflowListResult as PrizeWorkflowListResult,
	OrderingsList as PrizeOrderingsList,
	Note as PrizeNote,
	NoteListResult as PrizeNoteListResult,
	UploadedFile as PrizeUploadedFile
} from './services/prizes'

export { DataSetsService } from './services/data-sets'
export type {
	DataSetsServiceOptions,
	DataSet,
	DataSetListParams,
	DataSetListResult,
	DataSetsQuery,
	DataSetNotesParams,
	ClassificationRefList as DataSetClassificationRefList,
	AllowedKeywordGroupConfigurationList as DataSetAllowedKeywordGroupConfigurationList,
	LocalesList as DataSetLocalesList,
	WorkflowListResult as DataSetWorkflowListResult,
	Note as DataSetNote,
	NoteListResult as DataSetNoteListResult,
	UploadedFile as DataSetUploadedFile
} from './services/data-sets'

export { OrganizationsService } from './services/organizations'
export type {
	OrganizationsServiceOptions,
	Organization,
	OrganizationListParams,
	OrganizationListResult,
	OrganizationsQuery,
	OrganizationDependentsParams,
	OrganizationNotesParams,
	OrganizationAllowedDisciplinesParams,
	DisciplinesAssociation as OrganizationDisciplinesAssociation,
	DisciplinesAssociationsQuery as OrganizationDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as OrganizationDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as OrganizationDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as OrganizationDisciplineSchemeListResult,
	ClassificationRefList as OrganizationClassificationRefList,
	AllowedKeywordGroupConfigurationList as OrganizationAllowedKeywordGroupConfigurationList,
	LocalesList as OrganizationLocalesList,
	OrderingsList as OrganizationOrderingsList,
	ContentRefListResult as OrganizationContentRefListResult,
	Note as OrganizationNote,
	NoteListResult as OrganizationNoteListResult,
	UploadedFile as OrganizationUploadedFile
} from './services/organizations'

export { ProjectsService } from './services/projects'
export type {
	ProjectsServiceOptions,
	Project,
	ProjectListParams,
	ProjectListResult,
	ProjectsQuery,
	ProjectDependentsParams,
	ProjectAllowedDisciplinesParams,
	ProjectNotesParams,
	DisciplinesAssociation as ProjectDisciplinesAssociation,
	DisciplinesAssociationsQuery as ProjectDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as ProjectDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as ProjectDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as ProjectDisciplineSchemeListResult,
	ApplicationClusterListResult as ProjectApplicationClusterListResult,
	AwardClusterListResult as ProjectAwardClusterListResult,
	ClassificationRefList as ProjectClassificationRefList,
	AllowedKeywordGroupConfigurationList as ProjectAllowedKeywordGroupConfigurationList,
	AllowedTemplateListResult as ProjectAllowedTemplateListResult,
	LocalesList as ProjectLocalesList,
	WorkflowListResult as ProjectWorkflowListResult,
	OrderingsList as ProjectOrderingsList,
	ContentRefListResult as ProjectContentRefListResult,
	Note as ProjectNote,
	NoteListResult as ProjectNoteListResult
} from './services/projects'

export { ResearchOutputsService } from './services/research-outputs'
export type {
	ResearchOutputsServiceOptions,
	ResearchOutput,
	ResearchOutputListParams,
	ResearchOutputListResult,
	ResearchOutputsQuery
} from './services/research-outputs'

export { PersonsService } from './services/persons'
export type {
	PersonsServiceOptions,
	Person,
	PersonListParams,
	PersonListResult,
	PersonsQuery,
	PersonDependentsParams,
	PersonNotesParams,
	PersonAllowedDisciplineParams,
	DisciplinesAssociation as PersonDisciplinesAssociation,
	DisciplinesAssociationsQuery as PersonDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as PersonDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as PersonDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as PersonDisciplineSchemeListResult,
	ClassificationRefList as PersonClassificationRefList,
	AllowedKeywordGroupConfigurationList as PersonAllowedKeywordGroupConfigurationList,
	MetricCollection as PersonMetricCollection,
	MetricCollectionDefinitionList as PersonMetricCollectionDefinitionList,
	HighlightedContent as PersonHighlightedContent,
	ContentRefListResult as PersonContentRefListResult,
	PersonSuperviseeAssociationListResult,
	LocalesList as PersonLocalesList,
	WorkflowListResult as PersonWorkflowListResult,
	OrderingsList as PersonOrderingsList,
	Note as PersonNote,
	NoteListResult as PersonNoteListResult
} from './services/persons'

export { ExternalPersonsService } from './services/external-persons'
export type {
	ExternalPersonsServiceOptions,
	ExternalPerson,
	ExternalPersonListParams,
	ExternalPersonListResult,
	ExternalPersonsQuery,
	ExternalPersonDependentsParams,
	ExternalPersonNotesParams,
	ExternalPersonAllowedDisciplineParams,
	DisciplinesAssociation as ExternalPersonDisciplinesAssociation,
	DisciplinesAssociationsQuery as ExternalPersonDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as ExternalPersonDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as ExternalPersonDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as ExternalPersonDisciplineSchemeListResult,
	ClassificationRefList as ExternalPersonClassificationRefList,
	AllowedKeywordGroupConfigurationList as ExternalPersonAllowedKeywordGroupConfigurationList,
	LocalesList as ExternalPersonLocalesList,
	WorkflowListResult as ExternalPersonWorkflowListResult,
	OrderingsList as ExternalPersonOrderingsList,
	ContentRefListResult as ExternalPersonContentRefListResult,
	Note as ExternalPersonNote,
	NoteListResult as ExternalPersonNoteListResult,
	UploadedFile as ExternalPersonUploadedFile
} from './services/external-persons'

export { ExternalOrganizationsService } from './services/external-organizations'
export type {
	ExternalOrganizationsServiceOptions,
	ExternalOrganization,
	ExternalOrganizationListParams,
	ExternalOrganizationListResult,
	ExternalOrganizationsQuery,
	ExternalOrganizationRefList,
	ExternalOrganizationList,
	ExternalOrganizationDependentsParams,
	ExternalOrganizationNotesParams,
	ExternalOrganizationAllowedDisciplinesParams,
	DisciplinesAssociation as ExternalOrganizationDisciplinesAssociation,
	DisciplinesAssociationsQuery as ExternalOrganizationDisciplinesAssociationsQuery,
	DisciplinesAssociationListResult as ExternalOrganizationDisciplinesAssociationListResult,
	DisciplinesDisciplineListResult as ExternalOrganizationDisciplinesListResult,
	DisciplinesDisciplineSchemeListResult as ExternalOrganizationDisciplineSchemeListResult,
	ClassificationRefList as ExternalOrganizationClassificationRefList,
	AllowedKeywordGroupConfigurationList as ExternalOrganizationAllowedKeywordGroupConfigurationList,
	LocalesList as ExternalOrganizationLocalesList,
	WorkflowListResult as ExternalOrganizationWorkflowListResult,
	OrderingsList as ExternalOrganizationOrderingsList,
	ContentRefListResult as ExternalOrganizationContentRefListResult,
	Note as ExternalOrganizationNote,
	NoteListResult as ExternalOrganizationNoteListResult,
	UploadedFile as ExternalOrganizationUploadedFile
} from './services/external-organizations'

export { UsersService } from './services/users'
export type {
	UsersServiceOptions,
	User,
	UserListParams,
	UserListResult,
	UserRoles,
	UserResetPasswordParams,
	OrderingsList as UserOrderingsList
} from './services/users'
