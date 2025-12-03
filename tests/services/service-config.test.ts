import type { AxiosRequestConfig } from 'axios'

import type { PureClient } from '../../src/pure-client'
import {
    activitiesServiceConfig,
    authorCollaborationsServiceConfig,
    applicationsServiceConfig,
    awardsServiceConfig,
    classificationSchemesServiceConfig,
    conceptsServiceConfig,
    dataSetsServiceConfig,
    equipmentServiceConfig,
    eventsServiceConfig,
    externalOrganizationsServiceConfig,
    externalPersonsServiceConfig,
    fundingOpportunitiesServiceConfig,
    impactsServiceConfig,
    invokeOperation,
    journalsServiceConfig,
    personsServiceConfig,
    publishersServiceConfig,
    pressMediaServiceConfig,
    prizesServiceConfig,
    projectsServiceConfig,
    resolveOperationPath,
    researchOutputsServiceConfig,
    studentThesesServiceConfig,
    rolesServiceConfig,
    usersServiceConfig,
    serviceConfigRegistry,
    thesauriServiceConfig,
    type ServiceOperationConfig
} from '../../src/services/service-config'

type PureClientLike = Pick<PureClient, 'get' | 'post' | 'put' | 'delete'>

describe('service-config helpers', () => {
    it('resolves relative paths with parameters', () => {
        const operation: ServiceOperationConfig = {
            operationId: 'role_get_assignable_role',
            path: '/{assignableRoleName}'
        }

        const path = resolveOperationPath('/roles', operation.path, { assignableRoleName: 'Admin User' })

        expect(path).toBe('/roles/Admin%20User')
    })

    it('replaces hyphenated path tokens', () => {
        const operation: ServiceOperationConfig = {
            operationId: 'organization_getDisciplineAssociation',
            path: '/{uuid}/disciplines/{discipline-scheme}'
        }

        const path = resolveOperationPath('/organizations', operation.path, {
            uuid: 'org-1',
            'discipline-scheme': 'scheme'
        })

        expect(path).toBe('/organizations/org-1/disciplines/scheme')
    })

    it('throws when required path params are missing', () => {
        expect(() =>
            resolveOperationPath(rolesServiceConfig.basePath, rolesServiceConfig.operations.get.path)
        ).toThrow('Missing required path parameter "assignableRoleName"')
    })

    it('invokes GET operations with query and config', async () => {
        const client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        const query = { size: 5 }
        const config: AxiosRequestConfig = { timeout: 500 }
        const response = [{ assignableRoleName: 'PureUser' }]

        client.get.mockResolvedValueOnce(response)

        await expect(
            invokeOperation(client, rolesServiceConfig.basePath, rolesServiceConfig.operations.list, {
                query,
                config
            })
        ).resolves.toBe(response)

        expect(client.get).toHaveBeenCalledWith(rolesServiceConfig.basePath, query, config)
    })

    it('invokes POST operations with body', async () => {
        const client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        const body = { searchString: 'biology' }
        const config: AxiosRequestConfig = { timeout: 250 }
        const response = { count: 1 }

        client.post.mockResolvedValueOnce(response)

        await expect(
            invokeOperation(client, thesauriServiceConfig.basePath, thesauriServiceConfig.operations.query, {
                body,
                config
            })
        ).resolves.toBe(response)

        expect(client.post).toHaveBeenCalledWith(`${thesauriServiceConfig.basePath}/search`, body, undefined, config)
    })

    it('invokes PUT operations with body and query parameters', async () => {
        const client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        const operation: ServiceOperationConfig = {
            operationId: 'organization_update',
            path: '/{uuid}'
        }

        const body = { name: { text: 'Updated Organization' } }
        const query = { validate: true }
        const config: AxiosRequestConfig = { timeout: 150 }
        const response = { uuid: 'org-123' }

        client.put.mockResolvedValueOnce(response)

        await expect(
            invokeOperation(client, '/organizations', operation, {
                body,
                query,
                pathParams: { uuid: 'org-123' },
                config
            })
        ).resolves.toBe(response)

        expect(client.put).toHaveBeenCalledWith('/organizations/org-123', body, query, config)
    })

    it('invokes DELETE operations with query parameters', async () => {
        const client = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<PureClientLike>

        const operation: ServiceOperationConfig = {
            operationId: 'organization_delete',
            path: '/{uuid}'
        }

        const query = { hardDelete: true }
        const config: AxiosRequestConfig = { timeout: 200 }
        const response = { status: 'ok' }

        client.delete.mockResolvedValueOnce(response)

        await expect(
            invokeOperation(client, '/organizations', operation, {
                query,
                pathParams: { uuid: 'org-456' },
                config
            })
        ).resolves.toBe(response)

        expect(client.delete).toHaveBeenCalledWith('/organizations/org-456', query, config)
    })

    it('registers service configs by name', () => {
        expect(serviceConfigRegistry.activities).toBe(activitiesServiceConfig)
        expect(serviceConfigRegistry.authorCollaborations).toBe(authorCollaborationsServiceConfig)
        expect(serviceConfigRegistry.applications).toBe(applicationsServiceConfig)
        expect(serviceConfigRegistry.awards).toBe(awardsServiceConfig)
        expect(serviceConfigRegistry.classificationSchemes).toBe(classificationSchemesServiceConfig)
        expect(serviceConfigRegistry.concepts).toBe(conceptsServiceConfig)
        expect(serviceConfigRegistry.dataSets).toBe(dataSetsServiceConfig)
        expect(serviceConfigRegistry.equipment).toBe(equipmentServiceConfig)
        expect(serviceConfigRegistry.events).toBe(eventsServiceConfig)
        expect(serviceConfigRegistry.externalPersons).toBe(externalPersonsServiceConfig)
        expect(serviceConfigRegistry.fundingOpportunities).toBe(fundingOpportunitiesServiceConfig)
        expect(serviceConfigRegistry.journals).toBe(journalsServiceConfig)
        expect(serviceConfigRegistry.impacts).toBe(impactsServiceConfig)
        expect(serviceConfigRegistry.prizes).toBe(prizesServiceConfig)
        expect(serviceConfigRegistry.projects).toBe(projectsServiceConfig)
        expect(serviceConfigRegistry.externalOrganizations).toBe(externalOrganizationsServiceConfig)
        expect(serviceConfigRegistry.persons).toBe(personsServiceConfig)
        expect(serviceConfigRegistry.publishers).toBe(publishersServiceConfig)
        expect(serviceConfigRegistry.pressMedia).toBe(pressMediaServiceConfig)
        expect(serviceConfigRegistry.users).toBe(usersServiceConfig)
        expect(serviceConfigRegistry.roles).toBe(rolesServiceConfig)
        expect(serviceConfigRegistry.thesauri).toBe(thesauriServiceConfig)
        expect(serviceConfigRegistry.organizations.basePath).toBe('/organizations')
        expect(serviceConfigRegistry.researchOutputs).toBe(researchOutputsServiceConfig)
        expect(serviceConfigRegistry.studentTheses).toBe(studentThesesServiceConfig)
    })
})
