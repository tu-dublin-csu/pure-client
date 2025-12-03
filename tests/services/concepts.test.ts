import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
	ConceptsService,
	type Concept,
	type ConceptListParams,
	type ConceptListResult,
	type ConceptQuery,
	type LocalesList
} from '../../src/services/concepts'

type PureClientLike = Pick<PureClient, 'get' | 'post'>

describe('ConceptsService', () => {
	let client: jest.Mocked<PureClientLike>
	let service: ConceptsService

	const basePath = '/concepts'

	beforeEach(() => {
		client = {
			get: jest.fn(),
			post: jest.fn()
		} as unknown as jest.Mocked<PureClientLike>

		service = new ConceptsService(client)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('lists concepts with params and config', async () => {
		const params = { size: 10 } as ConceptListParams
		const config: AxiosRequestConfig = { timeout: 1000 }
		const result = { count: 1 } as unknown as ConceptListResult

		client.get.mockResolvedValueOnce(result)

		expect(await service.list(params, config)).toBe(result)
		expect(client.get).toHaveBeenCalledWith(basePath, params, config)
	})

	it('executes concepts query', async () => {
		const query = { window: { size: 2 } } as unknown as ConceptQuery
		const response = { count: 2 } as unknown as ConceptListResult

		client.post.mockResolvedValueOnce(response)

		expect(await service.query(query)).toBe(response)
		expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
	})

	it('retrieves a concept', async () => {
		const uuid = 'concept-uuid'
		const concept = { uuid } as unknown as Concept

		client.get.mockResolvedValueOnce(concept)

		expect(await service.get(uuid)).toBe(concept)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
	})

	it('fetches allowed locales', async () => {
		const locales = { locales: [] } as unknown as LocalesList

		client.get.mockResolvedValueOnce(locales)

		expect(await service.getAllowedLocales()).toBe(locales)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/allowed-locales`, undefined, undefined)
	})

	it('supports custom base path', async () => {
		const customBasePath = '/custom-concepts'
		const customService = new ConceptsService(client, { basePath: customBasePath })
		const list = { count: 0 } as unknown as ConceptListResult

		client.get.mockResolvedValueOnce(list)

		expect(await customService.list()).toBe(list)
		expect(client.get).toHaveBeenCalledWith(customBasePath, undefined, undefined)
	})
})
