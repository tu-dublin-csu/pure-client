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

    async list(config?: AxiosRequestConfig): Promise<AssignableRole[]> {
        return invokeOperation<AssignableRole[]>(this.client, this.basePath, this.operations.list, { config })
    }

    async get(assignableRoleName: string, config?: AxiosRequestConfig): Promise<AssignableRole> {
        return invokeOperation<AssignableRole>(this.client, this.basePath, this.operations.get, {
            pathParams: { assignableRoleName },
            config
        })
    }
}
