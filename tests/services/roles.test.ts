import type { AxiosRequestConfig } from 'axios'

import { PureClient } from '../../src/pure-client'
import { RolesService, type AssignableRole } from '../../src/services/roles'

type PureClientLike = Pick<PureClient, 'get'>

describe('RolesService', () => {
    let client: jest.Mocked<PureClientLike>
    let service: RolesService

    const basePath = '/roles'

    beforeEach(() => {
        client = {
            get: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        service = new RolesService(client)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('lists assignable roles with optional config', async () => {
        const config: AxiosRequestConfig = { timeout: 250 }
        const roles = [{ assignableRoleName: 'PureUser' }] as unknown as AssignableRole[]

        client.get.mockResolvedValueOnce(roles)

        expect(await service.list(config)).toBe(roles)
        expect(client.get).toHaveBeenCalledWith(basePath, undefined, config)
    })

    it('retrieves a specific assignable role', async () => {
        const assignableRoleName = 'PureAdministrator'
        const role = { assignableRoleName } as unknown as AssignableRole

        client.get.mockResolvedValueOnce(role)

        expect(await service.get(assignableRoleName)).toBe(role)
        expect(client.get).toHaveBeenCalledWith(`${basePath}/${assignableRoleName}`, undefined, undefined)
    })

    it('supports custom base path', async () => {
        const customBasePath = '/custom-roles'
        const customService = new RolesService(client, { basePath: customBasePath })
        const roles = [] as unknown as AssignableRole[]

        client.get.mockResolvedValueOnce(roles)

        expect(await customService.list()).toBe(roles)
        expect(client.get).toHaveBeenCalledWith(customBasePath, undefined, undefined)
    })
})
