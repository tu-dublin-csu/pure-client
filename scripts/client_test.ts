import 'dotenv/config'

import { PureClient, PersonsService, RolesService, ThesauriService } from '../src'

type Listable = {
	list: (params?: unknown) => Promise<unknown>
}

type Gettable = {
	get?: (identifier: string) => Promise<unknown>
}

type ServiceInstance = Listable & Gettable

type ServiceFactory = (client: PureClient) => ServiceInstance

const SERVICE_FACTORIES: Record<string, ServiceFactory> = {
	persons: client => new PersonsService(client),
	roles: client => new RolesService(client),
	thesauri: client => new ThesauriService(client)
}

type Command = 'list' | 'get'

interface ParsedArgs {
	domain: keyof typeof SERVICE_FACTORIES
	command: Command
	arg?: string
}

async function main() {
	const args = parseArgs(process.argv)
	const client = createClientFromEnv()
	const service = SERVICE_FACTORIES[args.domain](client)

	if (args.command === 'get') {
		if (!service.get) {
			throw new Error(`The ${args.domain} service does not implement a get() method.`)
		}

		const result = await service.get(args.arg as string)
		logResult(result)
		return
	}

	const params = args.arg ? parseListArg(args.arg) : undefined
	const result = await service.list(params)
	logResult(result)
}

function parseArgs(argv: string[]): ParsedArgs {
	const [, , domainArg, commandArg, rawArg] = argv

	if (!domainArg) {
		throw new Error(`Missing domain argument. Supported: ${Object.keys(SERVICE_FACTORIES).join(', ')}`)
	}

	const domain = normalizeDomain(domainArg)
	const command: Command = commandArg === 'get' ? 'get' : 'list'

	if (command === 'get' && !rawArg) {
		throw new Error('Missing identifier argument for get command.')
	}

	return { domain, command, arg: rawArg }
}

function normalizeDomain(input: string): keyof typeof SERVICE_FACTORIES {
	const value = input.toLowerCase()

	switch (value) {
		case 'person':
		case 'persons':
			return 'persons'
		case 'role':
		case 'roles':
			return 'roles'
		case 'thesaurus':
		case 'thesauri':
			return 'thesauri'
		default:
			throw new Error(
				`Unsupported domain "${input}". Supported domains: ${Object.keys(SERVICE_FACTORIES).join(', ')}`
			)
	}
}

function createClientFromEnv(): PureClient {
	const { PURE_URL: url, PURE_API_KEY: apiKey } = process.env

	if (!url || !apiKey) {
		throw new Error('PURE_URL and PURE_API_KEY environment variables are required to run client tests.')
	}

	return new PureClient(url, apiKey, {
		logger: {
			info: (message, context) => console.info(message, context),
			warn: (message, context) => console.warn(message, context),
			error: (message, context) => console.error(message, context)
		}
	})
}

function parseListArg(value: string): unknown {
	const trimmed = value.trim()

	if (!trimmed) {
		return undefined
	}

	if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
		return JSON.parse(trimmed)
	}

	const numeric = Number.parseInt(trimmed, 10)

	if (Number.isFinite(numeric)) {
		return { size: numeric }
	}

	return trimmed
}

function logResult(result: unknown) {
	console.log(JSON.stringify(result, null, 2))
}

main().catch(error => {
	console.error(error instanceof Error ? error.message : error)
	process.exit(1)
})
