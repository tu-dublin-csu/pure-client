import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
	AuthorCollaborationsService,
	type AuthorCollaboration,
	type AuthorCollaborationListParams,
	type AuthorCollaborationListResult,
	type AuthorCollaborationQuery,
	type AuthorCollaborationNotesParams,
	type Note,
	type NoteListResult,
	type LocalesList,
	type WorkflowListResult,
	type OrderingsList
} from '../../src/services/author-collaborations'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('AuthorCollaborationsService', () => {
	let client: jest.Mocked<PureClientLike>
	let service: AuthorCollaborationsService

	const basePath = '/author-collaborations'

	beforeEach(() => {
		client = {
			get: jest.fn(),
			post: jest.fn(),
			put: jest.fn(),
			delete: jest.fn()
		} as unknown as jest.Mocked<PureClientLike>

		service = new AuthorCollaborationsService(client)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('lists author collaborations with params and config', async () => {
		const params = { size: 10 } as AuthorCollaborationListParams
		const config: AxiosRequestConfig = { timeout: 200 }
		const list = { count: 2 } as unknown as AuthorCollaborationListResult

		client.get.mockResolvedValueOnce(list)

		expect(await service.list(params, config)).toBe(list)
		expect(client.get).toHaveBeenCalledWith(basePath, params, config)
	})

	it('executes author collaboration query', async () => {
		const query = { window: { size: 3 } } as unknown as AuthorCollaborationQuery
		const result = { count: 3 } as unknown as AuthorCollaborationListResult

		client.post.mockResolvedValueOnce(result)

		expect(await service.query(query)).toBe(result)
		expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
	})

	it('retrieves, creates, updates and removes an author collaboration', async () => {
		const uuid = 'author-collab-uuid'
		const payload = { uuid } as unknown as AuthorCollaboration

		client.get.mockResolvedValueOnce(payload)
		expect(await service.get(uuid)).toBe(payload)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)

		client.put.mockResolvedValueOnce(payload)
		expect(await service.create(payload)).toBe(payload)
		expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)

		client.put.mockResolvedValueOnce(payload)
		expect(await service.update(uuid, payload)).toBe(payload)
		expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)

		client.delete.mockResolvedValueOnce(undefined)
		await service.remove(uuid)
		expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
	})

	it('locks and unlocks an author collaboration', async () => {
		const uuid = 'lockable'
		client.post.mockResolvedValue(undefined)

		await service.lock(uuid)
		await service.unlock(uuid)

		expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
		expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
	})

	it('lists and creates notes', async () => {
		const uuid = 'noteworthy'
		const params = { size: 5 } as AuthorCollaborationNotesParams
		const notes = { items: [] } as unknown as NoteListResult
		const note = { text: 'note' } as unknown as Note

		client.get.mockResolvedValueOnce(notes)
		expect(await service.listNotes(uuid, params)).toBe(notes)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

		client.put.mockResolvedValueOnce(note)
		expect(await service.createNote(uuid, note)).toBe(note)
		expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
	})

	it('fetches allowed metadata', async () => {
		const locales = { locales: [] } as unknown as LocalesList
		const workflow = { items: [] } as unknown as WorkflowListResult
		const orderings = { orderings: [] } as unknown as OrderingsList

		client.get
			.mockResolvedValueOnce(locales)
			.mockResolvedValueOnce(workflow)
			.mockResolvedValueOnce(orderings)

		expect(await service.getAllowedLocales()).toBe(locales)
		expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-locales`, undefined, undefined)

		expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
		expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-workflow-steps`, undefined, undefined)

		expect(await service.getOrderings()).toBe(orderings)
		expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/orderings`, undefined, undefined)
	})

	it('supports custom base path', async () => {
		const customBase = '/custom-author-collabs'
		const customService = new AuthorCollaborationsService(client, { basePath: customBase })
		const list = { count: 0 } as unknown as AuthorCollaborationListResult

		client.get.mockResolvedValueOnce(list)

		expect(await customService.list()).toBe(list)
		expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
	})
})
