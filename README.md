# pure-client

A client for the PURE API written in TypeScript/Node

## Usage

```ts
import { PureClient, ThesauriService } from 'pure-client'

const client = new PureClient('https://pure.example.edu', 'api-key')

const thesauriService = new ThesauriService(client)
const thesauri = await thesauriService.list({ size: 10 })

thesauri.items?.forEach(entry => {
	console.log(entry.uuid, entry.name?.text)
})

const thesaurus = await thesauriService.get('thesaurus-uuid')
console.log(thesaurus.description?.text)
```

```ts
import { PureClient, RolesService, PersonsService } from 'pure-client'

const client = new PureClient(process.env.PURE_URL!, process.env.PURE_API_KEY!)

const rolesService = new RolesService(client)
const roles = await rolesService.list()
roles.forEach(role => {
    console.log(role.assignableRoleName, role.title?.text)
})

const personsService = new PersonsService(client)
const people = await personsService.query({
    searchString: 'Doe',
    size: 20,
    order: 'lastName'
})

people.items?.forEach(person => {
    console.log(person.uuid, person.name?.formatted?.text)
})

// Per-call overrides: adjust headers, timeouts, or other Axios options without rebuilding the client
await personsService.create(payload, {
    timeout: 60_000
})
```

## Available services

The following service wrappers are generated from the OpenAPI document and exported from the package:

- `ActivitiesService`
- `ApplicationsService`
- `AuthorCollaborationsService`
- `AwardsService`
- `ClassificationSchemesService`
- `ConceptsService`
- `DataSetsService`
- `EquipmentService`
- `EventsService`
- `ExternalOrganizationsService`
- `ExternalPersonsService`
- `FundingOpportunitiesService`
- `ImpactsService`
- `JournalsService`
- `OrganizationsService`
- `PersonsService`
- `PressMediaService`
- `PrizesService`
- `ProjectsService`
- `PublishersService`
- `ResearchOutputsService`
- `RolesService`
- `StudentThesesService`
- `ThesauriService`
- `UsersService`

### Working with unsupported endpoints

You can also call `PureClient` directly;

```ts
import { PureClient } from 'pure-client'
import type { paths } from 'pure-client/generated'

const client = new PureClient(process.env.PURE_URL!, process.env.PURE_API_KEY!)

type AllowedDocumentLicensesResponse =
	paths['/external-organizations/allowed-document-licenses']['get']['responses']['200']['content']['application/json']

const licenses = await client.get<AllowedDocumentLicensesResponse>(
	'/external-organizations/allowed-document-licenses'
)

licenses.items?.forEach(license => {
	console.log(license.uri, license.name?.text)
})
```

- double-check the verb and payload shape in `src/generated/pure.ts` before invoking an uncovered path
- promote recurring logic into a dedicated service module under `src/services` alongside unit tests when two or more workflows rely on it
- update this README (and any CLI helpers) whenever a new service is added so downstream users see the preferred entry point

## Development

Recommendation is to carry out development in the supplied `.devcontainer` configured environment

### Setup

- clone the repo
- copy `.devcontainer/devcontainer.env.EXAMPLE` to `.devcontainer/devcontainer.env` (or add a `.env`) and populate `PURE_URL` and `PURE_API_KEY` before hitting real instances
- build and start the [devContainer](https://containers.dev/)
- open a terminal in the devContainer and test with `npm run test`
- regenerate OpenAPI types with `npm run types:generate` whenever `openapi/pure.yaml` changes; CI-safe check available via `npm run types:check`
- service layer modules live under `src/services` and are exported via the root `index.ts`

### Update pipeline

- drop the latest Pure OpenAPI document into `openapi/pure.yaml`
- run `npm run types:generate` (orchestrates type generation, post-processing, metadata refresh, and service regeneration with OpenAPI-derived JSDoc)
- this command runs `scripts/generate-client.mjs`, which executes the full sequence: generate types via `openapi-typescript`, patch helpers, rebuild operation metadata, and rebuilds `src/services/service-config.ts`
- if you tweak generator logic only, re-run `npx tsx scripts/build-service-config.ts` to sync the service metadata/docs without touching the spec
- when the OpenAPI specification introduces a brand-new domain (prefix the generator does not recognise), add an entry to `serviceDefinitions` in `scripts/build-service-config.ts` and create the corresponding service wrapper before rerunning the generator; updates to existing services are picked up automatically
- validate locally with `npm run lint` and `npm test`
- review the resulting diff (generated files plus any service wrappers), then commit and publish (tag staging)
