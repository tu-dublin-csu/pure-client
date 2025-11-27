import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import {
    UsersService,
    type User,
    type UserListParams,
    type UserListResult,
    type UserRoles,
    type UserResetPasswordParams,
    type OrderingsList
} from '../../src/services/users'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('UsersService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: UsersService

    const basePath = '/users'

    beforeEach(() => {
        client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new UsersService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists and retrieves users', async () => {
        const params = { size: 25 } as UserListParams
        const config: AxiosRequestConfig = { timeout: 1500 }
        const list = { count: 3 } as unknown as UserListResult

        client.get.mockResolvedValueOnce(list)

        expect(await service.list(params, config)).toBe(list)
        expect(client.get).toHaveBeenCalledWith(basePath, params, config)

        const uuid = 'user-uuid'
        const user = { uuid } as unknown as User
        client.get.mockResolvedValueOnce(user)

        expect(await service.get(uuid)).toBe(user)
        expect(client.get).toHaveBeenLastCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('performs CRUD operations', async () => {
        const uuid = 'user-uuid'
        const payload = { uuid } as unknown as User

        client.put.mockResolvedValueOnce(payload)
        expect(await service.create(payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(1, basePath, payload, undefined, undefined)

        client.put.mockResolvedValueOnce(payload)
        expect(await service.update(uuid, payload)).toBe(payload)
        expect(client.put).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}`, payload, undefined, undefined)

        client.delete.mockResolvedValue(undefined)
        await service.remove(uuid)
        expect(client.delete).toHaveBeenCalledWith(`${basePath}/${uuid}`, undefined, undefined)
    })

    it('locks, unlocks, and resets passwords', async () => {
        const uuid = 'secure-user'
        const resetParams = { tokenExpiryHours: 48 } as UserResetPasswordParams
        const config: AxiosRequestConfig = { headers: { Authorization: 'token' } }

        client.post.mockResolvedValue(undefined)

        await service.lock(uuid, config)
        await service.unlock(uuid)
        await service.resetPassword(uuid, resetParams, config)

        expect(client.post).toHaveBeenNthCalledWith(1, `${basePath}/${uuid}/actions/lock`, undefined, undefined, config)
        expect(client.post).toHaveBeenNthCalledWith(2, `${basePath}/${uuid}/actions/unlock`, undefined, undefined, undefined)
        expect(client.post).toHaveBeenNthCalledWith(
            3,
            `${basePath}/${uuid}/actions/reset-password`,
            undefined,
            resetParams,
            config
        )
    })

    it('manages roles', async () => {
        const uuid = 'role-user'
        const roles = { items: [] } as unknown as UserRoles

        client.get.mockResolvedValueOnce(roles)
        expect(await service.listRoles(uuid)).toBe(roles)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${uuid}/roles`, undefined, undefined)

        client.put.mockResolvedValueOnce(roles)
        expect(await service.updateRoles(uuid, roles)).toBe(roles)
        expect(client.put).toHaveBeenCalledWith(`${basePath}/${uuid}/roles`, roles, undefined, undefined)
    })

    it('retrieves orderings', async () => {
        const orderings = { orderings: [] } as unknown as OrderingsList
        client.get.mockResolvedValueOnce(orderings)

        expect(await service.getOrderings()).toBe(orderings)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/orderings`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBase = '/custom-users'
        const customService = new UsersService(client, { basePath: customBase })
        const list = { count: 0 } as unknown as UserListResult

        client.get.mockResolvedValueOnce(list)
        expect(await customService.list()).toBe(list)
        expect(client.get).toHaveBeenCalledWith(customBase, undefined, undefined)
    })
})
