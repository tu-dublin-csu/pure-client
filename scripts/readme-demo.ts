import {
    PureClient,
    RolesService,
    PersonsService,
    ThesauriService,
    OrganizationsService,
    AwardsService
} from '../src'
import type { paths } from '../src/generated/pure'

const pureUrl = process.env.PURE_URL
const pureApiKey = process.env.PURE_API_KEY

function ensurePureEnv(): { url: string; apiKey: string } {
    if (!pureUrl || !pureApiKey) {
        throw new Error('Set PURE_URL and PURE_API_KEY before running this script')
    }

    return { url: pureUrl, apiKey: pureApiKey }
}

const { url: resolvedPureUrl, apiKey: resolvedPureApiKey } = ensurePureEnv()

async function main() {
    console.log(`Connecting to PURE at ${resolvedPureUrl}`)

    const client = new PureClient(resolvedPureUrl, resolvedPureApiKey)
    const rolesService = new RolesService(client)
    const personsService = new PersonsService(client)
    const thesauriService = new ThesauriService(client)
    const organizationsService = new OrganizationsService(client)
    const awardsService = new AwardsService(client)

    await runExample('RolesService.list', () => showRoles(rolesService))
    await runExample('PersonsService.list', () => showPersonsList(personsService))
    await runExample('PersonsService.query', () => showPersonsQuery(personsService))
    await runExample('ThesauriService list/get', () => showThesauri(thesauriService))
    await runExample('Direct PureClient (unsupported endpoint)', () => showUnsupportedEndpoint(client))
    await runExample('Person → Organization → Awards chain', () =>
        showPersonOrganizationAwardChain(personsService, organizationsService, awardsService)
    )
}

async function runExample(label: string, fn: () => Promise<void>) {
    console.log(`\n# ${label}`)
    try {
        await fn()
    } catch (error) {
        if (PureClient.isApiError(error)) {
            console.error('PURE API error', error.status, error.message)
            if (error.response?.data) {
                console.error(JSON.stringify(error.response.data, null, 2))
            }
        } else {
            console.error('Unexpected error', error)
        }
    }
}

async function showRoles(rolesService: RolesService) {
    const roles = await rolesService.list()

    if (!roles.length) {
        console.log('No roles returned by the API')
        return
    }

    roles.slice(0, 5).forEach(role => {
        console.log(`Role: ${role.assignableRoleName} (${role.title?.text ?? 'no title'})`)
    })
}

async function showPersonsList(personsService: PersonsService) {
    const people = await personsService.list({ size: 5 })

    if (!people.items?.length) {
        console.log('No persons returned by the API')
        return
    }

    people.items.forEach(person => {
        console.log(`Person (list): ${formatSimplePersonName(person)}`)
    })
}

async function showPersonsQuery(personsService: PersonsService) {
    const searchString = process.env.DEMO_PERSON_QUERY?.trim() || 'Doe'
    const result = await personsService.query({ searchString, size: 5 })

    if (!result.items?.length) {
        console.log(`No people matched the search string "${searchString}"`)
        return
    }

    result.items.forEach(person => {
        console.log(`Person (query): ${formatSimplePersonName(person)}`)
    })
}

async function showThesauri(thesauriService: ThesauriService) {
    const thesauri = await thesauriService.list({ size: 3 })

    if (!thesauri.items?.length) {
        console.log('No thesauri available in this installation')
        return
    }

    for (const entry of thesauri.items) {
        console.log(`Thesaurus: ${entry.uuid} ${entry.name?.text ?? ''}`.trim())

        if (entry.uuid) {
            const detailed = await thesauriService.get(entry.uuid)
            console.log(`  -> Description: ${detailed.description?.text ?? 'n/a'}`)
        }
    }
}

async function showUnsupportedEndpoint(client: PureClient) {
    type AllowedDocumentLicensesResponse =
        paths['/external-organizations/allowed-document-licenses']['get']['responses']['200']['content']['application/json']

    const licenses = await client.get<AllowedDocumentLicensesResponse>(
        '/external-organizations/allowed-document-licenses'
    )

    const classifications = (licenses?.classifications ?? []).filter(
        (classification): classification is NonNullable<typeof classification> => classification !== null
    )

    if (!classifications.length) {
        console.log('No document licenses returned by the API')
        return
    }

    classifications.slice(0, 5).forEach(classification => {
        const label = formatLocalized(classification.term) ?? 'no display name'
        console.log(`License: ${classification.uri ?? 'unknown'} (${label})`)
    })
}

async function showPersonOrganizationAwardChain(
    personsService: PersonsService,
    organizationsService: OrganizationsService,
    awardsService: AwardsService
) {
    const personWindow = Number(process.env.DEMO_PERSON_WINDOW ?? 10)
    const list = await personsService.list({ size: personWindow })
    const candidates = (list.items ?? []).filter(
        (item): item is NonNullable<typeof item> => Boolean(item?.uuid)
    )

    if (!candidates.length) {
        console.log('No persons returned by the API')
        return
    }

    for (const candidate of candidates) {
        if (!candidate?.uuid) {
            continue
        }

        const person = await personsService.get(candidate.uuid)
        const staffAssociations = (person.staffOrganizationAssociations ?? []).filter(
            (assoc): assoc is NonNullable<typeof assoc> =>
                Boolean((assoc as { organization?: { uuid?: string | null } | null })?.organization?.uuid)
        )

        if (!staffAssociations.length) {
            continue
        }

        console.log(`Selected person: ${formatPersonName(person)} (${person.uuid})`)

        for (const association of staffAssociations.slice(0, Number(process.env.DEMO_MAX_ORGS ?? 2))) {
            const associationDetails = association as {
                organization?: { uuid?: string | null }
                primaryAssociation?: boolean | null
            }
            const orgRef = associationDetails.organization

            if (!orgRef?.uuid) {
                continue
            }

            const primaryLabel = associationDetails.primaryAssociation ? 'primary' : 'secondary'
            console.log(
                `  → Staff association (${primaryLabel}): ${formatRefLabel(orgRef)} (${orgRef.uuid})`
            )

            const organization = await organizationsService.get(orgRef.uuid)
            console.log(`     Organization name: ${formatLocalized(organization.name) ?? 'n/a'}`)

            const dependents = await organizationsService.listDependents(orgRef.uuid, { verbose: true })
            const awardRefs = (dependents.items ?? []).filter(
                (ref): ref is NonNullable<typeof ref> => ref?.systemName === 'Award' && Boolean(ref?.uuid)
            )

            if (!awardRefs.length) {
                console.log('     No awards registered against this organization')
                continue
            }

            for (const awardRef of awardRefs.slice(0, Number(process.env.DEMO_MAX_AWARDS ?? 3))) {
                if (!awardRef.uuid) {
                    continue
                }

                const award = await awardsService.get(awardRef.uuid)
                console.log(
                    `     → Award: ${formatLocalized(award.title) ?? 'Untitled award'} (${awardRef.uuid})`
                )
            }
        }

        return
    }

    console.log('No staff organization associations found in the sampled persons')
}

type PersonNameLike = {
    name?: {
        firstName?: string | null
        lastName?: string | null
    } | null
    uuid?: string | null
}

function formatSimplePersonName(person: PersonNameLike): string {
    const firstName = person.name?.firstName?.trim() ?? ''
    const lastName = person.name?.lastName?.trim() ?? ''
    const fullName = `${firstName} ${lastName}`.trim()
    return fullName || person.uuid || 'Unknown person'
}

function formatPersonName(person: Awaited<ReturnType<PersonsService['get']>>): string {
    return formatSimplePersonName(person)
}

function formatRefLabel(ref: { uuid?: string | null }): string {
    return ref.uuid ?? 'Unnamed organization'
}

type LocalizedLike = { text?: string | null } | Record<string, string | null> | null | undefined

function formatLocalized(value: LocalizedLike): string | undefined {
    if (!value) {
        return undefined
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        if ('text' in value) {
            const textual = value as { text?: string | null }
            return textual.text ?? undefined
        }

        const values = Object.values(value as Record<string, string | null>).filter(
            (entry): entry is string => typeof entry === 'string' && entry.length > 0
        )
        return values[0]
    }

    return undefined
}

main().catch(error => {
    if (PureClient.isApiError(error)) {
        console.error('PURE API error', error.status, error.message)
        if (error.response?.data) {
            console.error(JSON.stringify(error.response.data, null, 2))
        }
    } else {
        console.error('Unexpected error', error)
    }
    process.exit(1)
})
