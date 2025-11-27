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
    orderBy: 'name'
    // use orderings: ['name'] if you need explicit ordering fields
})

people.items?.forEach(person => {
    console.log(person.uuid, person.name?.formatted?.text)
})
```

### Working with unsupported endpoints

The OpenAPI definition exposes far more endpoints than the curated service layer. When you need an operation that is not wrapped yet, call `PureClient` directly and lean on the generated OpenAPI types for safety.

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
- add required environment variables e.g. [[see here]](https://containers.dev/) to a `.env` file
- build and start the [devContainer](https://containers.dev/)
- open a terminal in the devContainer and test with `npm run test`
- regenerate OpenAPI types with `npm run types:generate` whenever `openapi/pure.yaml` changes; CI-safe check available via `npm run types:check`
- perform a manual sanity check against a live PURE API with `npm run sanity [domain] [list|get] [arg]` (requires `PURE_URL` and `PURE_API_KEY`; builds `dist/` automatically if missing)
- service layer modules live under `src/services` (e.g. `ActivitiesService`, `ApplicationsService`, `AwardsService`, `AuthorCollaborationsService`, `ConceptsService`, `EquipmentService`, `EventsService`, `DataSetsService`, `FundingOpportunitiesService`, `ImpactsService`, `JournalsService`, `PressMediaService`, `PublishersService`, `RolesService`, `ThesauriService`, `ExternalOrganizationsService`, `ExternalPersonsService`, `OrganizationsService`, `PersonsService`, `PrizesService`, `ProjectsService`, `ResearchOutputsService`, `UsersService`) and can be imported directly or via the root `index.ts`
