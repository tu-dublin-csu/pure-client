import type { AxiosRequestConfig } from 'axios'

import type { components } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type AssignableRole = components['schemas']['AssignableRole']

export interface RolesServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get'>

const DEFAULT_BASE_PATH = '/roles'

export class RolesService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: RolesServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(config?: AxiosRequestConfig): Promise<AssignableRole[]> {
        return this.client.get<AssignableRole[]>(this.basePath, undefined, config)
    }

    async get(assignableRoleName: string, config?: AxiosRequestConfig): Promise<AssignableRole> {
        return this.client.get<AssignableRole>(`${this.basePath}/${assignableRoleName}`, undefined, config)
    }
}
