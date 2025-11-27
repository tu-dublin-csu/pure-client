import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

export type User = components['schemas']['User']
export type UserListResult = components['schemas']['UserListResult']
export type UserRoles = components['schemas']['UserRoles']
export type OrderingsList = components['schemas']['OrderingsList']

export type UserListParams = NonNullable<operations['user_list']['parameters']['query']>
export type UserResetPasswordParams = NonNullable<operations['user_resetPassword']['parameters']['query']>

export interface UsersServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

const DEFAULT_BASE_PATH = '/users'

export class UsersService {
    private readonly basePath: string

    constructor(private readonly client: PureClientLike, options: UsersServiceOptions = {}) {
        this.basePath = options.basePath ?? DEFAULT_BASE_PATH
    }

    async list(params?: UserListParams, config?: AxiosRequestConfig): Promise<UserListResult> {
        return this.client.get<UserListResult>(this.basePath, params, config)
    }

    async get(uuid: string, config?: AxiosRequestConfig): Promise<User> {
        return this.client.get<User>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async create(payload: User, config?: AxiosRequestConfig): Promise<User> {
        return this.client.put<User>(this.basePath, payload, undefined, config)
    }

    async update(uuid: string, payload: User, config?: AxiosRequestConfig): Promise<User> {
        return this.client.put<User>(`${this.basePath}/${uuid}`, payload, undefined, config)
    }

    async remove(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.delete<void>(`${this.basePath}/${uuid}`, undefined, config)
    }

    async lock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/lock`, undefined, undefined, config)
    }

    async unlock(uuid: string, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/unlock`, undefined, undefined, config)
    }

    async resetPassword(uuid: string, params?: UserResetPasswordParams, config?: AxiosRequestConfig): Promise<void> {
        await this.client.post<void>(`${this.basePath}/${uuid}/actions/reset-password`, undefined, params, config)
    }

    async listRoles(uuid: string, config?: AxiosRequestConfig): Promise<UserRoles> {
        return this.client.get<UserRoles>(`${this.basePath}/${uuid}/roles`, undefined, config)
    }

    async updateRoles(uuid: string, roles: UserRoles, config?: AxiosRequestConfig): Promise<UserRoles> {
        return this.client.put<UserRoles>(`${this.basePath}/${uuid}/roles`, roles, undefined, config)
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return this.client.get<OrderingsList>(`${this.basePath}/orderings`, undefined, config)
    }
}
