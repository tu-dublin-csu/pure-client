import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
	EquipmentService,
	type Equipment,
	type EquipmentListParams,
	type EquipmentListResult,
	type EquipmentQuery,
	type EquipmentNotesParams,
	type Note,
	type NoteListResult,
	type ClassificationRefList,
	type AllowedKeywordGroupConfigurationList,
	type LocalesList,
	type WorkflowListResult,
	type UploadedFile
} from '../../src/services/equipment'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('EquipmentService', () => {
	let client: jest.Mocked<PureClientLike>
	let service: EquipmentService

	const basePath = '/equipment'

	beforeEach(() => {
		client = {
			get: jest.fn(),
			post: jest.fn(),
			put: jest.fn(),
			delete: jest.fn()
		} as unknown as jest.Mocked<PureClientLike>

		service = new EquipmentService(client)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('lists equipment with params and config', async () => {
		const params = { size: 25 } as EquipmentListParams
		const config: AxiosRequestConfig = { timeout: 1000 }
		const result = { count: 25 } as unknown as EquipmentListResult

		client.get.mockResolvedValueOnce(result)

		expect(await service.list(params, config)).toBe(result)
		expect(client.get).toHaveBeenCalledWith(basePath, params, config)
	})

	it('executes equipment query', async () => {
		const query = { window: { size: 2 } } as unknown as EquipmentQuery
		const response = { count: 2 } as unknown as EquipmentListResult

		client.post.mockResolvedValueOnce(response)

		expect(await service.query(query)).toBe(response)
		expect(client.post).toHaveBeenCalledWith(`${basePath}/search`, query, undefined, undefined)
	})

	it('retrieves, creates, updates and removes equipment', async () => {
		const uuid = 'equipment-uuid'
		const payload = { uuid } as unknown as Equipment

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

	it('locks and unlocks equipment', async () => {
		const uuid = 'lockable-equipment'
		client.post.mockResolvedValue(undefined)

		await service.lock(uuid)
		await service.unlock(uuid)

		expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, undefined)
		expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
	})

	it('handles file operations', async () => {
		const uuid = 'fileful-equipment'
		const fileId = 'file-id'
		const fileContent = 'binary-data'
		const uploadResponse = { id: 'uploaded' } as unknown as UploadedFile
		const config: AxiosRequestConfig = { timeout: 200 }

		client.get.mockResolvedValueOnce(fileContent)
		expect(await service.getFile(uuid, fileId)).toBe(fileContent)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/files/${fileId}`, undefined, undefined)

		client.put.mockResolvedValueOnce(uploadResponse)
		expect(await service.uploadFile('payload')).toBe(uploadResponse)
		expect(client.put).toHaveBeenCalledWith(`${basePath}/file-uploads`, 'payload', undefined, undefined)

		const configWithHeaders: AxiosRequestConfig = { ...config, headers: { Authorization: 'token' } }
		client.put.mockResolvedValueOnce(uploadResponse)
		expect(await service.uploadFile('payload', 'application/json', configWithHeaders)).toBe(uploadResponse)
		expect(client.put).toHaveBeenLastCalledWith(
			`${basePath}/file-uploads`,
			'payload',
			undefined,
			{
				...configWithHeaders,
				headers: {
					...(configWithHeaders.headers as Record<string, unknown>),
					'Content-Type': 'application/json'
				}
			}
		)
		expect(configWithHeaders.headers).toEqual({ Authorization: 'token' })
	})

	it('lists and creates notes', async () => {
		const uuid = 'noteworthy-equipment'
		const params = { size: 3 } as EquipmentNotesParams
		const notes = { items: [] } as unknown as NoteListResult
		const note = { text: 'hello' } as unknown as Note

		client.get.mockResolvedValueOnce(notes)
		expect(await service.listNotes(uuid, params)).toBe(notes)
		expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, params, undefined)

		client.put.mockResolvedValueOnce(note)
		expect(await service.createNote(uuid, note)).toBe(note)
		expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/notes`, note, undefined, undefined)
	})

	it('fetches allowed metadata', async () => {
		const classification = { items: [] } as unknown as ClassificationRefList
		const keywordConfigs = { configurations: [] } as unknown as AllowedKeywordGroupConfigurationList
		const locales = { locales: [] } as unknown as LocalesList
		const workflow = { items: [] } as unknown as WorkflowListResult

		client.get
			.mockResolvedValueOnce(classification) // address countries
			.mockResolvedValueOnce(classification) // address subdivisions
			.mockResolvedValueOnce(classification) // address types
			.mockResolvedValueOnce(classification) // categories
			.mockResolvedValueOnce(classification) // classified identifier types
			.mockResolvedValueOnce(classification) // custom defined field classifications
			.mockResolvedValueOnce(classification) // description types
			.mockResolvedValueOnce(classification) // email types
			.mockResolvedValueOnce(classification) // image types
			.mockResolvedValueOnce(keywordConfigs) // keyword group configurations
			.mockResolvedValueOnce(classification) // keyword group configuration classifications
			.mockResolvedValueOnce(classification) // loan types
			.mockResolvedValueOnce(locales) // locales
			.mockResolvedValueOnce(classification) // persons roles
			.mockResolvedValueOnce(classification) // phone number types
			.mockResolvedValueOnce(classification) // types
			.mockResolvedValueOnce(classification) // web address types
			.mockResolvedValueOnce(workflow) // workflow steps

		expect(await service.getAllowedAddressCountries()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(1, `${basePath}/allowed-address-countries`, undefined, undefined)

		expect(await service.getAllowedAddressSubdivisions()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(2, `${basePath}/allowed-address-subdivision`, undefined, undefined)

		expect(await service.getAllowedAddressTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(3, `${basePath}/allowed-address-types`, undefined, undefined)

		expect(await service.getAllowedCategories()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(4, `${basePath}/allowed-categories`, undefined, undefined)

		expect(await service.getAllowedClassifiedIdentifierTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(5, `${basePath}/allowed-classified-identifier-types`, undefined, undefined)

		expect(await service.getAllowedCustomDefinedFieldClassifications('field')).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(
			6,
			`${basePath}/allowed-custom-defined-field-values/field/classifications`,
			undefined,
			undefined
		)

		expect(await service.getAllowedDescriptionTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(7, `${basePath}/allowed-description-types`, undefined, undefined)

		expect(await service.getAllowedEmailTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(8, `${basePath}/allowed-email-types`, undefined, undefined)

		expect(await service.getAllowedImageTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(9, `${basePath}/allowed-image-types`, undefined, undefined)

		expect(await service.getAllowedKeywordGroupConfigurations()).toBe(keywordConfigs)
		expect(client.get).toHaveBeenNthCalledWith(10, `${basePath}/allowed-keyword-group-configurations`, undefined, undefined)

		expect(await service.getAllowedKeywordGroupConfigurationClassifications(42)).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(
			11,
			`${basePath}/allowed-keyword-group-configurations/42/classifications`,
			undefined,
			undefined
		)

		expect(await service.getAllowedLoanTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(12, `${basePath}/allowed-loan-types`, undefined, undefined)

		expect(await service.getAllowedLocales()).toBe(locales)
		expect(client.get).toHaveBeenNthCalledWith(13, `${basePath}/allowed-locales`, undefined, undefined)

		expect(await service.getAllowedPersonsRoles()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(14, `${basePath}/allowed-persons-roles`, undefined, undefined)

		expect(await service.getAllowedPhoneNumberTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(15, `${basePath}/allowed-phone-number-types`, undefined, undefined)

		expect(await service.getAllowedTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(16, `${basePath}/allowed-types`, undefined, undefined)

		expect(await service.getAllowedWebAddressTypes()).toBe(classification)
		expect(client.get).toHaveBeenNthCalledWith(17, `${basePath}/allowed-web-address-types`, undefined, undefined)

		expect(await service.getAllowedWorkflowSteps()).toBe(workflow)
		expect(client.get).toHaveBeenNthCalledWith(18, `${basePath}/allowed-workflow-steps`, undefined, undefined)
	})

	it('supports custom base path', async () => {
		const customBase = '/custom-equipment'
		const customService = new EquipmentService(client, { basePath: customBase })
		const list = { count: 0 } as unknown as EquipmentListResult

		client.get.mockResolvedValueOnce(list)

		expect(await customService.list()).toBe(list)
		expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
	})
})
