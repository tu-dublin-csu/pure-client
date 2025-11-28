#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'

import { parse } from 'yaml'

const HTTP_METHODS = new Set(['get', 'post', 'put', 'delete'])

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

type ServiceDefinition = {
    name: string
    basePath: string
    prefixes: string[]
    explicitOperationIds?: string[]
}

type OperationMeta = {
    method: HttpMethod
    path: string
}

type ServiceOperation = {
    method: HttpMethod
    operationId: string
    path?: string
}

const serviceDefinitions: ServiceDefinition[] = [
    { name: 'activities', basePath: '/activities', prefixes: ['activity'] },
    {
        name: 'authorCollaborations',
        basePath: '/author-collaborations',
        prefixes: ['authorCollaboration', 'authorCollaborations']
    },
    { name: 'applications', basePath: '/applications', prefixes: ['application'] },
    { name: 'awards', basePath: '/awards', prefixes: ['award'] },
    { name: 'classificationSchemes', basePath: '/classification-schemes', prefixes: ['classificationScheme'] },
    { name: 'concepts', basePath: '/concepts', prefixes: ['concept'] },
    { name: 'dataSets', basePath: '/data-sets', prefixes: ['dataSet'] },
    { name: 'equipment', basePath: '/equipment', prefixes: ['equipment'] },
    { name: 'events', basePath: '/events', prefixes: ['event', 'events'] },
    {
        name: 'externalOrganizations',
        basePath: '/external-organizations',
        prefixes: ['externalOrganization']
    },
    {
        name: 'externalPersons',
        basePath: '/external-persons',
        prefixes: ['externalPerson'],
        explicitOperationIds: ['getAllowedDisciplines']
    },
    {
        name: 'fundingOpportunities',
        basePath: '/funding-opportunities',
        prefixes: ['fundingOpportunity']
    },
    { name: 'impacts', basePath: '/impacts', prefixes: ['impact'] },
    { name: 'journals', basePath: '/journals', prefixes: ['journal'] },
    { name: 'organizations', basePath: '/organizations', prefixes: ['organization'] },
    { name: 'persons', basePath: '/persons', prefixes: ['person'] },
    { name: 'pressMedia', basePath: '/pressmedia', prefixes: ['pressmedia', 'pressMedia'] },
    { name: 'prizes', basePath: '/prizes', prefixes: ['prize'] },
    { name: 'projects', basePath: '/projects', prefixes: ['project'] },
    { name: 'publishers', basePath: '/publishers', prefixes: ['publisher', 'publishers'] },
    { name: 'researchOutputs', basePath: '/research-outputs', prefixes: ['researchoutput', 'researchOutput'] },
    { name: 'roles', basePath: '/roles', prefixes: ['role'] },
    { name: 'studentTheses', basePath: '/student-theses', prefixes: ['studentthesis', 'studentThesis'] },
    { name: 'thesauri', basePath: '/thesauri', prefixes: ['thesaurus'] },
    { name: 'users', basePath: '/users', prefixes: ['user'] }
]

type ServiceState = {
    basePath: string
    operations: Map<string, ServiceOperation>
}

type ServiceUsage = {
    readonly usedOperationNames: Set<string>
}

const SUFFIX_ALIASES: Record<string, string | Record<string, string>> = {
    delete: 'remove',
    dependents: 'listDependents',
    fileUploads: 'uploadFile',
    putDisciplineAssociation: 'updateDisciplineAssociation',
    getAllowedApplicationStatuses: 'getAllowedStatuses',
    getAllowedAwardHolderRoles: 'getAllowedAwardholderRoles',
    getAllowedLegalConditionsTypes: 'getAllowedLegalConditionTypes',
    getAllowedAcademicQualificationsTypes: 'getAllowedAcademicQualificationTypes',
    supervisee: 'listSupervisees',
    getAllowedDescriptionsTypes: {
        prizes: 'getAllowedDescriptionTypes'
    },
    get_assignable_roles: 'list',
    get_assignable_role: 'get',
    get_roles_for_user: 'listRoles',
    update_roles_for_user: 'updateRoles'
}

const PATH_OVERRIDES: Record<string, string> = {
    person_supervisee: '/{uuid}/supervisees',
    person_getAllowedPersonOrganizationAssociationsEmailTypes: '/allowed-person-organization-associations/email-types',
    person_getAllowedPersonOrganizationAssociationsEmploymentTypes:
        '/allowed-person-organization-associations/employment-types',
    person_getAllowedPersonOrganizationAssociationsJobTitles: '/allowed-person-organization-associations/job-titles',
    person_getAllowedPersonOrganizationAssociationsPhoneNumberTypes:
        '/allowed-person-organization-associations/phone-number-types',
    person_getAllowedPersonOrganizationAssociationsSupervisorRoles:
        '/allowed-person-organization-associations/supervisor-roles',
    person_getAllowedPersonOrganizationAssociationsWebAddressTypes:
        '/allowed-person-organization-associations/web-address-types',
    person_getAllowedStaffOrganizationAssociationsContractTypes:
        '/allowed-staff-organization-associations/contract-types',
    person_getAllowedStaffOrganizationAssociationsStaffTypes:
        '/allowed-staff-organization-associations/staff-types',
    person_getAllowedStudentOrganizationAssociationsAttendanceStatus:
        '/allowed-student-organization-associations/attendance-status',
    person_getAllowedVisitingScholarAssociationsEmploymentTypes:
        '/allowed-visiting-scholar-associations/employment-types'
}

const openApiPath = path.resolve('openapi/pure.yaml')
const serviceConfigPath = path.resolve('src/services/service-config.ts')

const openApiContent = fs.readFileSync(openApiPath, 'utf8')
const openApi = parse(openApiContent) as { paths: Record<string, Record<string, { operationId?: string }>> }

const operationsById = new Map<string, OperationMeta>()

for (const [route, item] of Object.entries(openApi.paths)) {
    for (const [method, operation] of Object.entries(item)) {
        if (!HTTP_METHODS.has(method)) {
            continue
        }

        const operationId = operation?.operationId
        if (!operationId) {
            continue
        }

        operationsById.set(operationId, {
            method: method as HttpMethod,
            path: route
        })
    }
}

const services = new Map<string, ServiceState>()
const serviceUsage = new Map<string, ServiceUsage>()

for (const definition of serviceDefinitions) {
    services.set(definition.name, {
        basePath: definition.basePath,
        operations: new Map<string, ServiceOperation>()
    })

    serviceUsage.set(definition.name, {
        usedOperationNames: collectUsedOperationNames(definition.name)
    })
}

type ServiceLookup = {
    serviceName: string
    matchedPrefix: string | null
}

function findService(operationId: string): ServiceLookup | undefined {
    for (const definition of serviceDefinitions) {
        if (definition.explicitOperationIds?.includes(operationId)) {
            return { serviceName: definition.name, matchedPrefix: null }
        }
    }

    const [prefix] = operationId.split('_')

    for (const definition of serviceDefinitions) {
        if (definition.prefixes.includes(prefix)) {
            return { serviceName: definition.name, matchedPrefix: prefix }
        }
    }

    return undefined
}

const unmappedOperations: string[] = []

for (const [operationId, meta] of operationsById.entries()) {
    const lookup = findService(operationId)

    if (!lookup) {
        unmappedOperations.push(operationId)
        continue
    }

    const service = services.get(lookup.serviceName)

    if (!service) {
        throw new Error(`Unexpected missing service state for ${lookup.serviceName}`)
    }

    const operationName = extractOperationName(lookup.serviceName, operationId, lookup.matchedPrefix)
    const overridePath = PATH_OVERRIDES[operationId]
    const relativePath = overridePath ?? createRelativePath(service.basePath, meta.path)

    if (service.operations.has(operationName)) {
        throw new Error(
            `Duplicate operation name "${operationName}" for service "${lookup.serviceName}" (${service.basePath})`
        )
    }

    service.operations.set(operationName, {
        method: meta.method,
        operationId,
        path: relativePath
    })
}

if (unmappedOperations.length > 0) {
    const sample = unmappedOperations.slice(0, 10).join(', ')
    throw new Error(`Failed to map ${unmappedOperations.length} operations. Sample: ${sample}`)
}

for (const definition of serviceDefinitions) {
    const usage = serviceUsage.get(definition.name)
    const service = services.get(definition.name)

    if (!usage || !service) {
        continue
    }

    const assigned = new Set(service.operations.keys())
    const missing = [...usage.usedOperationNames].filter((name) => !assigned.has(name))

    if (missing.length > 0) {
        throw new Error(
            `Missing operation mappings for service "${definition.name}": ${missing.join(', ')}`
        )
    }
}

const fileContent = generateFileContent(serviceDefinitions.map(({ name }) => name))

fs.writeFileSync(serviceConfigPath, fileContent)

function extractOperationName(serviceName: string, operationId: string, matchedPrefix: string | null): string {
    if (!matchedPrefix) {
        return operationId
    }

    const expectedPrefix = `${matchedPrefix}_`
    if (!operationId.startsWith(expectedPrefix)) {
        throw new Error(`Operation ID "${operationId}" does not start with expected prefix "${expectedPrefix}"`)
    }

    const suffix = operationId.slice(expectedPrefix.length)

    if (!suffix) {
        throw new Error(`Operation ID "${operationId}" is missing suffix after prefix "${matchedPrefix}"`)
    }

    const aliasEntry = SUFFIX_ALIASES[suffix]
    if (typeof aliasEntry === 'string') {
        return aliasEntry
    }

    if (aliasEntry && typeof aliasEntry === 'object') {
        const serviceAlias = aliasEntry[serviceName]
        if (serviceAlias) {
            return serviceAlias
        }
        const defaultAlias = aliasEntry.default
        if (defaultAlias) {
            return defaultAlias
        }
    }

    const name = suffix.charAt(0).toLowerCase() + suffix.slice(1)

    return name
}

function createRelativePath(basePath: string, absolutePath: string): string | undefined {
    if (absolutePath === basePath) {
        return undefined
    }

    if (absolutePath.startsWith(`${basePath}/`)) {
        return absolutePath.slice(basePath.length)
    }

    throw new Error(
        `Path "${absolutePath}" does not start with base path "${basePath}"`
    )
}

function formatPath(pathValue: string): string {
    return pathValue.replace(/'/g, "\\'")
}

function collectUsedOperationNames(serviceName: string): Set<string> {
    const fileName = serviceNameToFileName(serviceName)
    const filePath = path.resolve('src/services', fileName)

    if (!fs.existsSync(filePath)) {
        return new Set()
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const matches = content.matchAll(/this\.operations\.(\w+)/g)
    const names = new Set<string>()

    for (const match of matches) {
        names.add(match[1])
    }

    return names
}

function serviceNameToFileName(serviceName: string): string {
    return `${serviceName.replace(/([A-Z])/g, '-$1').toLowerCase()}.ts`
}

function generateServiceConfig(name: string, service: ServiceState): string {
    const lines: string[] = []
    lines.push(`export const ${name}ServiceConfig: ServiceConfig = {`)
    lines.push(`    basePath: '${service.basePath}',`)
    lines.push('    operations: {')

    const operations = [...service.operations.entries()].sort((a, b) => a[0].localeCompare(b[0]))

    operations.forEach(([operationName, details], index) => {
        const isLast = index === operations.length - 1
        lines.push(`        ${operationName}: {`)
        lines.push(`            method: '${details.method}',`)
        lines.push(`            operationId: '${details.operationId}'${details.path ? ',' : ''}`)
        if (details.path) {
            lines.push(`            path: '${formatPath(details.path)}'`)
        }
        lines.push(`        }${isLast ? '' : ','}`)
    })

    lines.push('    }')
    lines.push('}\n')

    return lines.join('\n')
}

function generateFileContent(serviceNames: string[]): string {
    const lines: string[] = []

    lines.push("import type { AxiosRequestConfig } from 'axios'")
    lines.push('')
    lines.push("import type { operations } from '../generated/pure'")
    lines.push("import type { PureClient } from '../pure-client'")
    lines.push('')
    lines.push('export type OperationId = keyof operations')
    lines.push('')
    lines.push("export type HttpMethod = 'get' | 'post' | 'put' | 'delete'")
    lines.push('')
    lines.push('export interface ServiceOperationConfig {')
    lines.push('    readonly method: HttpMethod')
    lines.push('    readonly operationId: OperationId')
    lines.push('    /**')
    lines.push('     * @description Relative path (from the service base path). Use template parameters e.g. `/items/{id}` when needed.')
    lines.push('     */')
    lines.push('    readonly path?: string')
    lines.push('}')
    lines.push('')
    lines.push('export interface ServiceConfig {')
    lines.push('    readonly basePath: string')
    lines.push('    readonly operations: Record<string, ServiceOperationConfig>')
    lines.push('}')
    lines.push('')

    for (const name of serviceNames) {
        const service = services.get(name)
        if (!service) {
            throw new Error(`Missing generated service state for ${name}`)
        }
        lines.push(generateServiceConfig(name, service))
    }

    lines.push('export const serviceConfigRegistry = {')
    serviceNames.forEach((name, index) => {
        const isLast = index === serviceNames.length - 1
        lines.push(`    ${name}: ${name}ServiceConfig${isLast ? '' : ','}`)
    })
    lines.push('} as const')
    lines.push('')
    lines.push('export type ServiceName = keyof typeof serviceConfigRegistry')
    lines.push('')
    lines.push('export type PathParams = Record<string, string | number | boolean>')
    lines.push('')
    lines.push('export interface InvokeOperationArgs {')
    lines.push('    readonly pathParams?: PathParams')
    lines.push('    readonly query?: Record<string, unknown>')
    lines.push('    readonly body?: unknown')
    lines.push('    readonly config?: AxiosRequestConfig')
    lines.push('}')
    lines.push('')
    lines.push('type PureClientLike = Pick<PureClient, ')
    lines.push("    'get'")
    lines.push("    | 'post'")
    lines.push("    | 'put'")
    lines.push("    | 'delete'")
    lines.push('>')
    lines.push('')
    lines.push('export function resolveOperationPath(basePath: string, operation: ServiceOperationConfig, params: PathParams = {}): string {')
    lines.push('    const relativePath = operation.path ?? \"\"')
    lines.push('    const resolvedPath = relativePath.replace(/\{([^}]+)\}/g, (_, token) => {')
    lines.push('        if (!(token in params)) {')
    lines.push('            throw new Error(`Missing required path parameter \"${token}\"`)')
    lines.push('        }')
    lines.push('')
    lines.push('        const value = params[token]')
    lines.push('        return encodeURIComponent(String(value))')
    lines.push('    })')
    lines.push('')
    lines.push('    if (!relativePath) {')
    lines.push('        return basePath')
    lines.push('    }')
    lines.push('')
    lines.push('    return `${basePath}${resolvedPath}`')
    lines.push('}')
    lines.push('')
    lines.push('export async function invokeOperation<TResponse>(')
    lines.push('    client: PureClientLike,')
    lines.push('    basePath: string,')
    lines.push('    operation: ServiceOperationConfig,')
    lines.push('    args: InvokeOperationArgs = {}')
    lines.push('): Promise<TResponse> {')
    lines.push('    const { pathParams, query, body, config } = args')
    lines.push('    const path = resolveOperationPath(basePath, operation, pathParams)')
    lines.push('')
    lines.push('    switch (operation.method) {')
    lines.push("        case 'get':")
    lines.push('            return client.get(path, query, config) as Promise<TResponse>')
    lines.push("        case 'post':")
    lines.push('            return client.post(path, body, query, config) as Promise<TResponse>')
    lines.push("        case 'put':")
    lines.push('            return client.put(path, body, query, config) as Promise<TResponse>')
    lines.push("        case 'delete':")
    lines.push('            return client.delete(path, query, config) as Promise<TResponse>')
    lines.push('        default:')
    lines.push('            throw new Error(`Unsupported HTTP method ${operation.method}`)')
    lines.push('    }')
    lines.push('}')
    lines.push('')

    return lines.join('\n')
}
