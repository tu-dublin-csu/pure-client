import type { AxiosRequestConfig } from 'axios'

import type { components, operations } from '../generated/pure'
import type { PureClient } from '../pure-client'

import { invokeOperation, usersServiceConfig } from './service-config'

export type User = components['schemas']['User']
export type UserListResult = components['schemas']['UserListResult']
export type UserRoles = components['schemas']['UserRoles']
export type OrderingsList = components['schemas']['OrderingsList']

export type UserListParams = NonNullable<operations['user_list']['parameters']['query']>
export type UserResetPasswordParams = NonNullable<operations['user_resetPassword']['parameters']['query']>

type UserPathParams = operations['user_get']['parameters']['path']
type UserRolesPathParams = operations['user_get_roles_for_user']['parameters']['path']
type UserResetPasswordPathParams = operations['user_resetPassword']['parameters']['path']

export interface UsersServiceOptions {
    basePath?: string
}

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

export class UsersService {
    private readonly basePath: string
    private readonly operations = usersServiceConfig.operations

    constructor(private readonly client: PureClientLike, options: UsersServiceOptions = {}) {
        this.basePath = options.basePath ?? usersServiceConfig.basePath
    }

    async list(params?: UserListParams, config?: AxiosRequestConfig): Promise<UserListResult> {
        return invokeOperation<UserListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    async get(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    async create(payload: User, config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    async update(uuid: UserPathParams['uuid'], payload: User, config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    async remove(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    async lock(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    async unlock(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    async resetPassword(
        uuid: UserResetPasswordPathParams['uuid'],
        params?: UserResetPasswordParams,
        config?: AxiosRequestConfig
    ): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.resetPassword, {
            pathParams: { uuid },
            query: params,
            config
        })
    }

    async listRoles(uuid: UserRolesPathParams['uuid'], config?: AxiosRequestConfig): Promise<UserRoles> {
        return invokeOperation<UserRoles>(this.client, this.basePath, this.operations.listRoles, {
            pathParams: { uuid },
            config
        })
    }

    async updateRoles(
        uuid: UserRolesPathParams['uuid'],
        roles: UserRoles,
        config?: AxiosRequestConfig
    ): Promise<UserRoles> {
        return invokeOperation<UserRoles>(this.client, this.basePath, this.operations.updateRoles, {
            pathParams: { uuid },
            body: roles,
            config
        })
    }

    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
