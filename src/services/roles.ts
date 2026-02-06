import type { AxiosRequestConfig } from 'axios'

import type { components } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, rolesServiceConfig } from './service-config'

export type AssignableRole = components['schemas']['AssignableRole']

export interface RolesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class RolesService {
    private readonly basePath: string
    private readonly operations = rolesServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: RolesServiceOptions = {}) {
        this.basePath = options.basePath ?? rolesServiceConfig.basePath
    }

    /**
     * Lists all assignable roles
     *
     * Lists all assignable roles that are currently available
     *
     * @param config Axios request configuration overrides.
     */
    async list(config?: AxiosRequestConfig): Promise<AssignableRole[]> {
        return invokeOperation<AssignableRole[]>(this.client, this.basePath, this.operations.list, { config })
    }

    /**
     * Returns an assignable role
     *
     * Returns an assignable role if it is currently available
     *
     * @param assignableRoleName Path parameter "assignableRoleName" (string, pattern .+). Get assignable role from assignable role name.
     * @param config Axios request configuration overrides.
     */
    async get(assignableRoleName: string, config?: AxiosRequestConfig): Promise<AssignableRole> {
        return invokeOperation<AssignableRole>(this.client, this.basePath, this.operations.get, {
            pathParams: { assignableRoleName },
            config
        })
    }
}
