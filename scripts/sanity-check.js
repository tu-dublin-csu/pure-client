#!/usr/bin/env node

import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Light CLI helper to quickly exercise live PURE endpoints using the built client bundle.
const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, '..')
const distEntry = resolve(projectRoot, 'dist/index.js')

await ensureBuildArtifacts()

const {
    PureClient,
    ActivitiesService,
    ApplicationsService,
    AwardsService,
    AuthorCollaborationsService,
    PrizesService,
    EventsService,
    ConceptsService,
    ImpactsService,
    JournalsService,
    PressMediaService,
    PublishersService,
    RolesService,
    ThesauriService,
    EquipmentService,
    FundingOpportunitiesService,
    DataSetsService,
    ExternalPersonsService,
    ExternalOrganizationsService,
    OrganizationsService,
    PersonsService,
    ProjectsService,
    ResearchOutputsService,
    UsersService
} = await import(pathToFileURL(distEntry).href)

async function main() {
    const { domain, command, size, arg } = parseArgs()
    const { PURE_URL: url, PURE_API_KEY: apiKey } = process.env

    if (!url || !apiKey) {
        throw new Error('PURE_URL and PURE_API_KEY environment variables are required for the sanity check')
    }

    const client = new PureClient(url, apiKey, {
        logger: {
            info: (message, context) => console.info(message, context),
            warn: (message, context) => console.warn(message, context),
            error: (message, context) => console.error(message, context)
        }
    })

    const service = createService(domain, client)

    if (command === 'get') {
        if (!arg) {
            throw new Error('Missing UUID argument for the get command')
        }

        const item = await service.get(arg)
        console.log(JSON.stringify(item, null, 2))
        return
    }

    const limit = size ?? 5
    const result = await service.list(size ? { size } : undefined)
    logListResult(domain, result, limit)
}

function parseArgs() {
    const [, , domainArg, commandArg, extraArg] = process.argv

    const domain = normalizeDomain(domainArg)
    const command = commandArg === 'get' ? 'get' : 'list'

    if (command === 'get') {
        return { domain, command, arg: extraArg }
    }

    if (!extraArg) {
        return { domain, command }
    }

    const parsed = Number.parseInt(extraArg, 10)
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`Invalid size argument "${extraArg}". Provide a positive integer.`)
    }

    return { domain, command, size: parsed }
}

function normalizeDomain(input) {
    if (!input) {
        return 'activities'
    }

    const value = input.toLowerCase()

    switch (value) {
        case 'activities':
        case 'activity':
            return 'activities'
        case 'applications':
        case 'application':
            return 'applications'
        case 'awards':
        case 'award':
            return 'awards'
        case 'author-collaborations':
        case 'author_collaborations':
        case 'authorcollaborations':
        case 'author-collaboration':
        case 'authorcollaboration':
            return 'author-collaborations'
        case 'prizes':
        case 'prize':
            return 'prizes'
        case 'events':
        case 'event':
            return 'events'
        case 'concepts':
        case 'concept':
            return 'concepts'
        case 'impacts':
        case 'impact':
            return 'impacts'
        case 'journals':
        case 'journal':
            return 'journals'
        case 'pressmedia':
        case 'press-media':
        case 'press_media':
        case 'press':
            return 'pressmedia'
        case 'publishers':
        case 'publisher':
            return 'publishers'
        case 'roles':
        case 'role':
            return 'roles'
        case 'thesauri':
        case 'thesaurus':
            return 'thesauri'
        case 'equipment':
            return 'equipment'
        case 'funding-opportunities':
        case 'funding_opportunities':
        case 'fundingopportunities':
        case 'funding-opportunity':
        case 'fundingopportunity':
            return 'funding-opportunities'
        case 'data-sets':
        case 'data_sets':
        case 'datasets':
        case 'data-set':
        case 'dataset':
            return 'data-sets'
        case 'external-organizations':
        case 'external_organizations':
        case 'externalorganizations':
        case 'external-organization':
        case 'externalorganization':
            return 'external-organizations'
        case 'organizations':
        case 'organization':
            return 'organizations'
        case 'projects':
        case 'project':
            return 'projects'
        case 'persons':
        case 'person':
            return 'persons'
        case 'external-persons':
        case 'external_persons':
        case 'externalpersons':
        case 'external-person':
        case 'externalperson':
            return 'external-persons'
        case 'research-outputs':
        case 'research_outputs':
        case 'researchoutputs':
        case 'research-output':
        case 'researchoutput':
            return 'research-outputs'
        case 'users':
        case 'user':
            return 'users'
        default:
            throw new Error(
                `Unsupported domain "${input}". Use one of activities | applications | awards | author-collaborations | prizes | events | concepts | equipment | impacts | journals | pressmedia | publishers | roles | thesauri | funding-opportunities | data-sets | external-organizations | external-persons | organizations | persons | projects | research-outputs | users.`
            )
    }
}

function createService(domain, client) {
    switch (domain) {
        case 'activities':
            return new ActivitiesService(client)
        case 'applications':
            return new ApplicationsService(client)
        case 'awards':
            return new AwardsService(client)
        case 'author-collaborations':
            return new AuthorCollaborationsService(client)
        case 'prizes':
            return new PrizesService(client)
        case 'events':
            return new EventsService(client)
        case 'concepts':
            return new ConceptsService(client)
        case 'equipment':
            return new EquipmentService(client)
        case 'impacts':
            return new ImpactsService(client)
        case 'journals':
            return new JournalsService(client)
        case 'pressmedia':
            return new PressMediaService(client)
        case 'publishers':
            return new PublishersService(client)
        case 'roles':
            return new RolesService(client)
        case 'thesauri':
            return new ThesauriService(client)
        case 'funding-opportunities':
            return new FundingOpportunitiesService(client)
        case 'data-sets':
            return new DataSetsService(client)
        case 'external-organizations':
            return new ExternalOrganizationsService(client)
        case 'organizations':
            return new OrganizationsService(client)
        case 'projects':
            return new ProjectsService(client)
        case 'external-persons':
            return new ExternalPersonsService(client)
        case 'persons':
            return new PersonsService(client)
        case 'research-outputs':
            return new ResearchOutputsService(client)
        case 'users':
            return new UsersService(client)
        default:
            throw new Error(`Unsupported domain "${domain}"`)
    }
}

function logListResult(domain, result, limit) {
    if (Array.isArray(result)) {
        console.log(`Fetched ${result.length} ${domain} (reported count: ${result.length})`)

        result.slice(0, limit).forEach((item, index) => {
            const summary = summariseItem(item)
            console.log(`${index + 1}. ${summary}`)
        })

        return
    }

    const list = result && typeof result === 'object' ? result : {}
    const items = Array.isArray(list.items) ? list.items : []
    const total = typeof list.count === 'number' ? list.count : items.length

    console.log(`Fetched ${items.length} ${domain} (reported count: ${total})`)

    items.slice(0, limit).forEach((item, index) => {
        const summary = summariseItem(item)
        console.log(`${index + 1}. ${summary}`)
    })
}

function summariseItem(item) {
    if (!item || typeof item !== 'object') {
        return String(item)
    }

    const uuid = typeof item.uuid === 'string' ? item.uuid : undefined
    const title = extractLabel(item)

    if (uuid && title) {
        return `${uuid} — ${title}`
    }

    if (uuid) {
        return uuid
    }

    if (title) {
        return title
    }

    return JSON.stringify(item, null, 2)
}

function extractLabel(item) {
    const candidates = [
        getLocalizedString(item, 'title'),
        getLocalizedString(item, 'name'),
        typeof item.displayName === 'string' ? item.displayName : undefined,
        typeof item.type === 'string' ? item.type : undefined
    ]

    return candidates.find(value => typeof value === 'string' && value.length > 0)
}

function getLocalizedString(record, key) {
    const value = record[key]

    if (!value || typeof value !== 'object') {
        return undefined
    }

    if (typeof value.text === 'string') {
        return value.text
    }

    const values = value.values

    if (Array.isArray(values)) {
        const firstWithText = values.find(entry => entry && typeof entry.text === 'string')
        return firstWithText ? firstWithText.text : undefined
    }

    return undefined
}

async function ensureBuildArtifacts() {
    if (existsSync(distEntry)) {
        return
    }

    console.log('Build output not found; running "npm run build" to generate dist artifacts...')
    const result = spawnSync('npm', ['run', 'build'], {
        stdio: 'inherit',
        cwd: projectRoot,
        env: process.env
    })

    if (result.status !== 0) {
        console.error('Failed to build the client; aborting sanity check.')
        process.exit(result.status ?? 1)
    }
}

main().catch(error => {
    if (typeof PureClient.isApiError === 'function' && PureClient.isApiError(error)) {
        console.error(`PURE API request failed (${error.status ?? 'unknown'}): ${error.message}`)
        if (error.response?.data) {
            console.error(JSON.stringify(error.response.data, null, 2))
        }
    } else if (error instanceof Error) {
        console.error(error.message)
    } else {
        console.error(error)
    }

    process.exit(1)
})
