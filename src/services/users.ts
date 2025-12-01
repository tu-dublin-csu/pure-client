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

    /**
     * Lists all users
     *
     * Lists all users in the Pure instance.
     *
     * @param params Optional query parameters: size - integer (int32), max 1000, default 10. Number of returned users per request.; offset - integer (int32), default 0. The offset for the returned list. 0 or null value is from the start; order - string. The order of the list, must be a value from /users/orderings
     * @param config Axios request configuration overrides.
     */
    async list(params?: UserListParams, config?: AxiosRequestConfig): Promise<UserListResult> {
        return invokeOperation<UserListResult>(this.client, this.basePath, this.operations.list, {
            query: params,
            config
        })
    }

    /**
     * Get user
     *
     * Get user with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user
     * @param config Axios request configuration overrides.
     */
    async get(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.get, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Create user
     *
     * Create user
     *
     * @param payload Required request body. The user to create
     * @param config Axios request configuration overrides.
     */
    async create(payload: User, config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.create, {
            body: payload,
            config
        })
    }

    /**
     * Update user
     *
     * Update user with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user to update
     * @param payload Required request body. The content to update
     * @param config Axios request configuration overrides.
     */
    async update(uuid: UserPathParams['uuid'], payload: User, config?: AxiosRequestConfig): Promise<User> {
        return invokeOperation<User>(this.client, this.basePath, this.operations.update, {
            pathParams: { uuid },
            body: payload,
            config
        })
    }

    /**
     * Delete user
     *
     * Delete user with specific UUID.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user to delete
     * @param config Axios request configuration overrides.
     */
    async remove(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.remove, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Lock the content
     *
     * Mark the content as external (used when content contains synchronised data). This has no effect on interactions with the content through the API.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the content to lock
     * @param config Axios request configuration overrides.
     */
    async lock(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.lock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Unlock the content
     *
     * Remove the external mark on the content (used when content contains synchronised data). This has no effect on interactions with the content through the API.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the content to unlock
     * @param config Axios request configuration overrides.
     */
    async unlock(uuid: UserPathParams['uuid'], config?: AxiosRequestConfig): Promise<void> {
        await invokeOperation<void>(this.client, this.basePath, this.operations.unlock, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Reset user password
     *
     * Resets the user's password. Reset password email will be sent to the user's email. The token expiry hour defaults to 24 hours.
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user to reset the password for
     * @param params Optional query parameters: tokenExpiryHours - number, default 24. Token expiration in hours. Must be between 1 and 168 hours (1 week).
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Lists all roles of a user
     *
     * Lists all roles of a user
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user to list the roles of
     * @param config Axios request configuration overrides.
     */
    async listRoles(uuid: UserRolesPathParams['uuid'], config?: AxiosRequestConfig): Promise<UserRoles> {
        return invokeOperation<UserRoles>(this.client, this.basePath, this.operations.listRoles, {
            pathParams: { uuid },
            config
        })
    }

    /**
     * Updates roles
     *
     * Applies the supplied roles to a user. Roles not in the request will be removed from user
     *
     * @param uuid Path parameter "uuid" (string (uuid), pattern .+). UUID of the user to update roles of
     * @param roles Required request body. Complete picture of a users roles
     * @param config Axios request configuration overrides.
     */
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

    /**
     * Lists available orderings
     *
     * Lists all orderings available to the user endpoint. These values can be used by the order parameter.
     *
     * @param config Axios request configuration overrides.
     */
    async getOrderings(config?: AxiosRequestConfig): Promise<OrderingsList> {
        return invokeOperation<OrderingsList>(this.client, this.basePath, this.operations.getOrderings, { config })
    }
}
