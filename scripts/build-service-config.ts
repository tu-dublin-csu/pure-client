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
    summary?: string
    description?: string
    parameters: ParameterMeta[]
    requestBody?: RequestBodyMeta
}

type ServiceOperation = {
    method: HttpMethod
    operationId: string
    path?: string
    summary?: string
    description?: string
    parameters: ParameterMeta[]
    requestBody?: RequestBodyMeta
}

type ParameterLocation = 'path' | 'query' | 'header' | 'cookie'

type ParameterMeta = {
    name: string
    location: ParameterLocation
    description?: string
    required: boolean
    schema?: ParameterSchemaMeta
}

type RequestBodyMeta = {
    description?: string
    required: boolean
}

type ParameterSchemaMeta = {
    type?: string
    format?: string
    enumValues?: Array<string | number | boolean>
    defaultValue?: string | number | boolean
    minimum?: number
    maximum?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    nullable?: boolean
    arrayItemType?: string
    refName?: string
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

type OpenApiSchemaReference = {
    $ref: string
}

type OpenApiSchema = {
    type?: string
    format?: string
    enum?: Array<string | number | boolean>
    default?: string | number | boolean
    minimum?: number
    maximum?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    nullable?: boolean
    items?: OpenApiSchema | OpenApiSchemaReference
    description?: string
} & Partial<OpenApiSchemaReference>

type OpenApiParameter = {
    name: string
    in: ParameterLocation
    description?: string
    required?: boolean
    schema?: OpenApiSchema | OpenApiSchemaReference
}

type OpenApiOperation = {
    operationId?: string
    summary?: string
    description?: string
    parameters?: OpenApiParameter[]
    requestBody?: {
        description?: string
        required?: boolean
    }
}

function isSchemaReference(schema: OpenApiSchema | OpenApiSchemaReference): schema is OpenApiSchemaReference {
    return Boolean((schema as OpenApiSchemaReference).$ref)
}

type OpenApiPathItem = {
    parameters?: OpenApiParameter[]
} & Record<string, OpenApiOperation | OpenApiParameter[] | undefined>

const openApi = parse(openApiContent) as { paths: Record<string, OpenApiPathItem> }

const operationsById = new Map<string, OperationMeta>()

for (const [route, item] of Object.entries(openApi.paths)) {
    const pathParameters = Array.isArray(item.parameters) ? item.parameters : []

    for (const [method, operationValue] of Object.entries(item)) {
        if (method === 'parameters') {
            continue
        }

        if (!HTTP_METHODS.has(method)) {
            continue
        }

        const operation = operationValue as OpenApiOperation

        const operationId = operation?.operationId
        if (!operationId) {
            continue
        }

        const combinedParameters = [...pathParameters, ...(operation.parameters ?? [])]
        const parameterMetas = combinedParameters
            .filter((parameter): parameter is OpenApiParameter => Boolean(parameter?.name && parameter?.in))
            .map((parameter) => {
                const schemaMeta = extractParameterSchemaMeta(parameter.schema)

                return {
                    name: parameter.name,
                    location: parameter.in,
                    description: normalizeDocValue(parameter.description),
                    required: Boolean(parameter.required),
                    schema: schemaMeta
                }
            })
            .filter((parameter) => parameter.location === 'path' || parameter.location === 'query')

        const requestBodyMeta = operation.requestBody
            ? {
                  description: normalizeDocValue(operation.requestBody.description),
                  required: Boolean(operation.requestBody.required)
              }
            : undefined

        operationsById.set(operationId, {
            method: method as HttpMethod,
            path: route,
            summary: normalizeDocValue(operation.summary),
            description: normalizeDocValue(operation.description),
            parameters: parameterMetas,
            requestBody: requestBodyMeta
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
        path: relativePath,
        summary: meta.summary,
        description: meta.description,
        parameters: meta.parameters,
        requestBody: meta.requestBody
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

applyServiceDocComments()

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

function formatStringLiteral(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')
}

function normalizeDocValue(value: unknown): string | undefined {
    if (typeof value !== 'string') {
        return undefined
    }

    const normalized = value.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()

    return normalized.length > 0 ? normalized : undefined
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
        const properties: string[] = []

        properties.push(`operationId: '${details.operationId}'`)

        if (details.summary) {
            properties.push(`summary: '${formatStringLiteral(details.summary)}'`)
        }

        if (details.description) {
            properties.push(`description: '${formatStringLiteral(details.description)}'`)
        }

        if (details.path) {
            properties.push(`path: '${formatPath(details.path)}'`)
        }

        lines.push(`        ${operationName}: {`)
        properties.forEach((property, propertyIndex) => {
            const suffix = propertyIndex === properties.length - 1 ? '' : ','
            lines.push(`            ${property}${suffix}`)
        })
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
    lines.push("import { getOperationMetadata } from '../generated/operation-map'")
    lines.push("import type { PureClient } from '../pure-client'")
    lines.push('')
    lines.push('export type OperationId = keyof operations')
    lines.push('')
    lines.push('export interface ServiceOperationConfig {')
    lines.push('    readonly operationId: OperationId')
    lines.push('    /**')
    lines.push('     * @description Short summary sourced from the OpenAPI document.')
    lines.push('     */')
    lines.push('    readonly summary?: string')
    lines.push('    /**')
    lines.push('     * @description Detailed description sourced from the OpenAPI document.')
    lines.push('     */')
    lines.push('    readonly description?: string')
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
    lines.push('export function resolveOperationPath(basePath: string, relativePath: string | undefined, params: PathParams = {}): string {')
    lines.push('    const template = relativePath ?? ""')
    lines.push('    const resolvedPath = template.replace(/{([^}]+)}/g, (_, token) => {')
    lines.push('        if (!(token in params)) {')
    lines.push('            throw new Error(`Missing required path parameter "${token}"`)')
    lines.push('        }')
    lines.push('')
    lines.push('        const value = params[token]')
    lines.push('        return encodeURIComponent(String(value))')
    lines.push('    })')
    lines.push('')
    lines.push('    if (!template) {')
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
    lines.push('    const metadata = getOperationMetadata(operation.operationId)')
    lines.push('    const resolvedBasePath = basePath || metadata.basePath')
    lines.push('    const relativePath = operation.path ?? metadata.path')
    lines.push('    const path = resolveOperationPath(resolvedBasePath, relativePath, pathParams)')
    lines.push('')
    lines.push('    switch (metadata.method) {')
    lines.push("        case 'get':")
    lines.push('            return client.get(path, query, config) as Promise<TResponse>')
    lines.push("        case 'post':")
    lines.push('            return client.post(path, body, query, config) as Promise<TResponse>')
    lines.push("        case 'put':")
    lines.push('            return client.put(path, body, query, config) as Promise<TResponse>')
    lines.push("        case 'delete':")
    lines.push('            return client.delete(path, query, config) as Promise<TResponse>')
    lines.push('        default:')
    lines.push('            throw new Error(`Unsupported HTTP method ${metadata.method}`)')
    lines.push('    }')
    lines.push('}')
    lines.push('')

    return lines.join('\n')
}

function applyServiceDocComments(): void {
    for (const { name } of serviceDefinitions) {
        const service = services.get(name)
        if (!service) {
            continue
        }

        applyDocsToServiceFile(name, service)
    }
}

function applyDocsToServiceFile(serviceName: string, service: ServiceState): void {
    const fileName = serviceNameToFileName(serviceName)
    const filePath = path.resolve('src/services', fileName)

    if (!fs.existsSync(filePath)) {
        return
    }

    const docEntries = [...service.operations.entries()]
        .filter(([, details]) => shouldGenerateDocumentation(details))
        .sort((a, b) => a[0].localeCompare(b[0]))

    if (docEntries.length === 0) {
        return
    }

    const lines = fs.readFileSync(filePath, 'utf8').split('\n')
    let changed = false

    for (const [operationName, details] of docEntries) {
        const methodPattern = new RegExp(`^(\\s*)async ${escapeRegExp(operationName)}\\b`)
        const methodIndex = lines.findIndex((line) => methodPattern.test(line))

        if (methodIndex === -1) {
            continue
        }

        const methodParameters = extractMethodParameters(lines, methodIndex)
        const docLines = buildDocComment(details, methodParameters)

        if (!docLines) {
            continue
        }

        const indentMatch = methodPattern.exec(lines[methodIndex])
        const indent = indentMatch?.[1] ?? ''
        const indentedDocLines = docLines.map((line) => `${indent}${line}`)

        let adjustedMethodIndex = methodIndex
        let commentStart: number | undefined
        let commentEnd: number | undefined

        for (let idx = methodIndex - 1; idx >= 0; idx--) {
            const trimmed = lines[idx].trim()

            if (trimmed.length === 0) {
                continue
            }

            if (trimmed.startsWith('*') || trimmed.startsWith('*/')) {
                continue
            }

            if (trimmed.startsWith('/**')) {
                commentStart = idx
                for (let endIdx = idx; endIdx < methodIndex; endIdx++) {
                    if (lines[endIdx].includes('*/')) {
                        commentEnd = endIdx
                        break
                    }
                }
            }

            break
        }

        if (commentStart !== undefined && commentEnd !== undefined) {
            const existing = lines.slice(commentStart, commentEnd + 1)
            if (arraysEqual(existing, indentedDocLines)) {
                continue
            }

            const removeCount = commentEnd - commentStart + 1
            lines.splice(commentStart, removeCount)
            adjustedMethodIndex -= removeCount
        }

        lines.splice(adjustedMethodIndex, 0, ...indentedDocLines)
        changed = true
    }

    if (changed) {
        fs.writeFileSync(filePath, lines.join('\n'))
    }
}

function buildDocComment(details: ServiceOperation, methodParameters: MethodParameter[]): string[] | undefined {
    const sanitizedSummary = sanitizeDocText(details.summary)
    const sanitizedDescription = sanitizeDocText(details.description)
    const paramLines = createParameterDocLines(details, methodParameters)

    if (!sanitizedSummary && !sanitizedDescription && paramLines.length === 0) {
        return undefined
    }

    const lines: string[] = []
    lines.push('/**')

    if (sanitizedSummary) {
        lines.push(...formatDocSection(sanitizedSummary))
    }

    if (sanitizedDescription) {
        if (sanitizedSummary) {
            lines.push(' *')
        }
        lines.push(...formatDocSection(sanitizedDescription))
    }

    if (paramLines.length > 0) {
        if (sanitizedSummary || sanitizedDescription) {
            lines.push(' *')
        }

        for (const line of paramLines) {
            lines.push(` * ${line}`)
        }
    }

    lines.push(' */')

    return lines
}

type MethodParameter = {
    readonly name: string
    readonly type?: string
    readonly optional: boolean
}

function shouldGenerateDocumentation(details: ServiceOperation): boolean {
    return Boolean(
        details.summary ||
            details.description ||
            (details.parameters && details.parameters.length > 0) ||
            details.requestBody
    )
}

function extractMethodParameters(lines: string[], methodIndex: number): MethodParameter[] {
    const signature = collectMethodSignature(lines, methodIndex)
    if (!signature) {
        return []
    }

    const parametersSection = extractParametersSection(signature)
    if (!parametersSection) {
        return []
    }

    const rawParameters = splitParameters(parametersSection)

    return rawParameters
        .map((parameter) => parameter.trim())
        .filter((parameter) => parameter.length > 0)
        .map(parseMethodParameter)
        .filter((parameter): parameter is MethodParameter => Boolean(parameter))
}

function collectMethodSignature(lines: string[], methodIndex: number): string | undefined {
    let index = methodIndex
    let signature = ''
    let openParens = 0
    let seenOpening = false

    while (index < lines.length) {
        const line = lines[index]
        const segment: string = seenOpening
            ? line.trim()
            : line.slice(line.indexOf('(') !== -1 ? line.indexOf('(') : 0)

        if (segment.length > 0) {
            signature += segment
            openParens += countCharOccurrences(segment, '(')
            openParens -= countCharOccurrences(segment, ')')
            seenOpening = seenOpening || segment.includes('(')
        }

        if (seenOpening && openParens <= 0) {
            return signature
        }

        index += 1
    }

    return signature || undefined
}

function countCharOccurrences(text: string, target: string): number {
    return (text.match(new RegExp(escapeRegExp(target), 'g')) ?? []).length
}

function extractParametersSection(signature: string): string | undefined {
    const openingIndex = signature.indexOf('(')
    if (openingIndex === -1) {
        return undefined
    }

    const closingIndex = signature.lastIndexOf(')')
    if (closingIndex === -1 || closingIndex <= openingIndex) {
        return undefined
    }

    return signature.slice(openingIndex + 1, closingIndex)
}

function splitParameters(parametersSection: string): string[] {
    const parameters: string[] = []
    let current = ''

    let depthParen = 0
    let depthBrace = 0
    let depthBracket = 0
    let depthAngle = 0

    for (let index = 0; index < parametersSection.length; index += 1) {
        const char = parametersSection[index]

        switch (char) {
            case '(': {
                depthParen += 1
                break
            }
            case ')': {
                if (depthParen > 0) {
                    depthParen -= 1
                }
                break
            }
            case '{': {
                depthBrace += 1
                break
            }
            case '}': {
                if (depthBrace > 0) {
                    depthBrace -= 1
                }
                break
            }
            case '[': {
                depthBracket += 1
                break
            }
            case ']': {
                if (depthBracket > 0) {
                    depthBracket -= 1
                }
                break
            }
            case '<': {
                depthAngle += 1
                break
            }
            case '>': {
                if (depthAngle > 0) {
                    depthAngle -= 1
                }
                break
            }
            case ',': {
                if (depthParen === 0 && depthBrace === 0 && depthBracket === 0 && depthAngle === 0) {
                    parameters.push(current)
                    current = ''
                    continue
                }
                break
            }
            default:
                break
        }

        current += char
    }

    if (current.trim().length > 0) {
        parameters.push(current)
    }

    return parameters
}

function parseMethodParameter(parameter: string): MethodParameter | undefined {
    const separatorIndex = parameter.indexOf(':')
    if (separatorIndex === -1) {
        return undefined
    }

    const rawName = parameter.slice(0, separatorIndex).trim()
    const type = parameter.slice(separatorIndex + 1).trim()

    if (!rawName) {
        return undefined
    }

    const optional = rawName.endsWith('?')
    const name = optional ? rawName.slice(0, -1).trim() : rawName

    return {
        name,
        type,
        optional
    }
}

function createParameterDocLines(details: ServiceOperation, methodParameters: MethodParameter[]): string[] {
    if (!methodParameters.length) {
        return []
    }

    const docs: string[] = []
    const used = new Set<string>()

    const pathParameters = (details.parameters ?? []).filter((parameter) => parameter.location === 'path')

    for (const parameter of pathParameters) {
        const methodParameter = findMethodParameter(methodParameters, parameter.name, used)
        if (!methodParameter) {
            continue
        }

        used.add(methodParameter.name)

        const description = buildPathParameterDescription(parameter)
        docs.push(`@param ${methodParameter.name} ${description}`)
    }

    const queryParameters = (details.parameters ?? []).filter((parameter) => parameter.location === 'query')

    if (queryParameters.length > 0) {
        const queryParameter = findQueryParameter(methodParameters, used)
        if (queryParameter) {
            used.add(queryParameter.name)
            docs.push(`@param ${queryParameter.name} ${buildQueryParameterDescription(queryParameters)}`)
        }
    }

    if (details.requestBody) {
        const bodyParameter = findBodyParameter(methodParameters, used)
        if (bodyParameter) {
            used.add(bodyParameter.name)
            docs.push(`@param ${bodyParameter.name} ${buildRequestBodyDescription(details.requestBody)}`)
        }
    }

    const configParameter = methodParameters.find((parameter) => parameter.name === 'config' && !used.has(parameter.name))
    if (configParameter) {
        docs.push(`@param ${configParameter.name} Axios request configuration overrides.`)
    }

    return docs
}

function findMethodParameter(
    methodParameters: MethodParameter[],
    parameterName: string,
    used: Set<string>
): MethodParameter | undefined {
    const candidates = createParameterNameCandidates(parameterName)
    return methodParameters.find((parameter) => !used.has(parameter.name) && candidates.has(parameter.name))
}

function createParameterNameCandidates(parameterName: string): Set<string> {
    const candidates = new Set<string>()
    candidates.add(parameterName)

    const camel = toCamelCase(parameterName)
    candidates.add(camel)
    candidates.add(camel && camel.length > 0 ? camel[0].toLowerCase() + camel.slice(1) : camel)

    const withoutDelimiters = parameterName.replace(/[-_]/g, '')
    if (withoutDelimiters) {
        candidates.add(withoutDelimiters)
    }

    return candidates
}

function toCamelCase(value: string): string {
    return value.replace(/[-_](\w)/g, (_, char: string) => char.toUpperCase())
}

function findQueryParameter(methodParameters: MethodParameter[], used: Set<string>): MethodParameter | undefined {
    return methodParameters.find((parameter) => {
        if (used.has(parameter.name)) {
            return false
        }

        if (parameter.name === 'params') {
            return true
        }

        if (!parameter.type) {
            return false
        }

        return /Params|Query|Filters|Options/i.test(parameter.type)
    })
}

function findBodyParameter(methodParameters: MethodParameter[], used: Set<string>): MethodParameter | undefined {
    const preferredNames = new Set(['body', 'payload', 'data', 'input'])

    for (const parameter of methodParameters) {
        if (used.has(parameter.name) || parameter.name === 'config') {
            continue
        }

        if (preferredNames.has(parameter.name)) {
            return parameter
        }
    }

    return methodParameters.find((parameter) => !used.has(parameter.name) && parameter.name !== 'config')
}

function extractParameterSchemaMeta(
    schema: OpenApiSchema | OpenApiSchemaReference | undefined
): ParameterSchemaMeta | undefined {
    if (!schema) {
        return undefined
    }

    if (isSchemaReference(schema)) {
        return { refName: extractRefName(schema.$ref) }
    }

    const schemaObject: OpenApiSchema = schema
    const meta: ParameterSchemaMeta = {}

    if (schemaObject.type) {
        meta.type = schemaObject.type
    }

    if (schemaObject.format) {
        meta.format = schemaObject.format
    }

    if (Array.isArray(schemaObject.enum) && schemaObject.enum.length > 0) {
        meta.enumValues = schemaObject.enum
    }

    if (schemaObject.default !== undefined && isSchemaPrimitive(schemaObject.default)) {
        meta.defaultValue = schemaObject.default
    }

    if (typeof schemaObject.minimum === 'number') {
        meta.minimum = schemaObject.minimum
    }

    if (typeof schemaObject.maximum === 'number') {
        meta.maximum = schemaObject.maximum
    }

    if (typeof schemaObject.minLength === 'number') {
        meta.minLength = schemaObject.minLength
    }

    if (typeof schemaObject.maxLength === 'number') {
        meta.maxLength = schemaObject.maxLength
    }

    if (schemaObject.pattern) {
        meta.pattern = schemaObject.pattern
    }

    if (schemaObject.nullable === true) {
        meta.nullable = true
    }

    if (schemaObject.items) {
        const itemMeta = extractParameterSchemaMeta(schemaObject.items)
        const itemSummary = itemMeta ? summarizeSchemaType(itemMeta) : undefined
        if (itemSummary) {
            meta.arrayItemType = itemSummary
        }
    }

    if (schemaObject.$ref) {
        meta.refName = extractRefName(schemaObject.$ref)
    }

    return hasSchemaMeta(meta) ? meta : undefined
}

function hasSchemaMeta(meta: ParameterSchemaMeta): boolean {
    return Boolean(
        meta.type ||
            meta.format ||
            (meta.enumValues && meta.enumValues.length > 0) ||
            meta.defaultValue !== undefined ||
            meta.minimum !== undefined ||
            meta.maximum !== undefined ||
            meta.minLength !== undefined ||
            meta.maxLength !== undefined ||
            meta.pattern ||
            meta.nullable ||
            meta.arrayItemType ||
            meta.refName
    )
}

function extractRefName(ref: string): string | undefined {
    if (!ref) {
        return undefined
    }

    const segments = ref.split('/')
    const candidate = segments[segments.length - 1]
    return candidate && candidate.length > 0 ? candidate : undefined
}

function summarizeSchemaType(schema: ParameterSchemaMeta): string | undefined {
    if (schema.type === 'array') {
        const item = schema.arrayItemType ?? schema.refName ?? 'value'
        return schema.format ? `array<${item}> (${schema.format})` : `array<${item}>`
    }

    if (schema.type) {
        return schema.format ? `${schema.type} (${schema.format})` : schema.type
    }

    return schema.refName
}

function formatParameterSchemaHint(schema?: ParameterSchemaMeta): string | undefined {
    if (!schema) {
        return undefined
    }

    const descriptors: string[] = []

    const typeSummary = summarizeSchemaType(schema)
    if (typeSummary) {
        const sanitized = sanitizeDocText(typeSummary)
        if (sanitized) {
            descriptors.push(sanitized)
        }
    }

    if (schema.nullable) {
        descriptors.push('nullable')
    }

    const numericRange = formatNumericRange(schema.minimum, schema.maximum)
    if (numericRange) {
        descriptors.push(numericRange)
    }

    const lengthRange = formatLengthRange(schema.minLength, schema.maxLength)
    if (lengthRange) {
        descriptors.push(lengthRange)
    }

    if (schema.pattern) {
        const pattern = sanitizeDocText(schema.pattern)
        if (pattern) {
            descriptors.push(`pattern ${pattern}`)
        }
    }

    if (schema.enumValues && schema.enumValues.length > 0) {
        const formattedValues = schema.enumValues
            .slice(0, 6)
            .map((value) => formatSchemaValue(value))
            .join(', ')
        const truncated = schema.enumValues.length > 6 ? `${formattedValues}, ...` : formattedValues
        descriptors.push(`allowed: ${truncated}`)
    }

    if (schema.defaultValue !== undefined) {
        descriptors.push(`default ${formatSchemaValue(schema.defaultValue)}`)
    }

    return descriptors.length > 0 ? descriptors.join(', ') : undefined
}

function formatNumericRange(min?: number, max?: number): string | undefined {
    if (min !== undefined && max !== undefined) {
        return `range ${min} to ${max}`
    }

    if (min !== undefined) {
        return `min ${min}`
    }

    if (max !== undefined) {
        return `max ${max}`
    }

    return undefined
}

function formatLengthRange(min?: number, max?: number): string | undefined {
    if (min !== undefined && max !== undefined) {
        return `length ${min} to ${max}`
    }

    if (min !== undefined) {
        return `min length ${min}`
    }

    if (max !== undefined) {
        return `max length ${max}`
    }

    return undefined
}

function isSchemaPrimitive(value: unknown): value is string | number | boolean {
    return ['string', 'number', 'boolean'].includes(typeof value)
}

function formatSchemaValue(value: string | number | boolean): string {
    if (typeof value === 'string') {
        return sanitizeDocText(value) ?? value
    }

    if (typeof value === 'number') {
        return value.toString()
    }

    return value ? 'true' : 'false'
}

function formatParameterAdvice(parameter: ParameterMeta): string | undefined {
    const pieces: string[] = []
    const schemaHint = formatParameterSchemaHint(parameter.schema)
    if (schemaHint) {
        pieces.push(schemaHint)
    }

    const description = formatInlineDescription(parameter.description)
    if (description) {
        pieces.push(description)
    }

    const combined = pieces.join('. ')
    return combined.length > 0 ? combined : undefined
}

function formatParameterList(parameters: ParameterMeta[]): string {
    return parameters
        .map((parameter) => {
            const advice = formatParameterAdvice(parameter)
            return advice ? `${parameter.name} - ${advice}` : parameter.name
        })
        .join('; ')
}

function buildPathParameterDescription(parameter: ParameterMeta): string {
    const schemaHint = formatParameterSchemaHint(parameter.schema)
    const header = schemaHint
        ? `Path parameter "${parameter.name}" (${schemaHint})`
        : `Path parameter "${parameter.name}"`

    const pieces = [header]
    const description = formatInlineDescription(parameter.description)

    if (description) {
        pieces.push(description)
    }

    return pieces.join('. ')
}

function buildQueryParameterDescription(parameters: ParameterMeta[]): string {
    const required = parameters.filter((parameter) => parameter.required)
    const optional = parameters.filter((parameter) => !parameter.required)

    const sections: string[] = []

    if (required.length > 0) {
        sections.push(`Required query parameters: ${formatParameterList(required)}`)
    }

    if (optional.length > 0) {
        sections.push(`Optional query parameters: ${formatParameterList(optional)}`)
    }

    return sections.join('. ')
}

function buildRequestBodyDescription(requestBody: RequestBodyMeta): string {
    const pieces = [requestBody.required ? 'Required request body' : 'Optional request body']
    const description = formatInlineDescription(requestBody.description)

    if (description) {
        pieces.push(description)
    }

    return pieces.join('. ')
}

function formatInlineDescription(value?: string): string | undefined {
    const sanitized = sanitizeDocText(value)
    if (!sanitized) {
        return undefined
    }

    return sanitized.replace(/\s+/g, ' ').trim()
}

function formatDocSection(text: string): string[] {
    return text.split('\n').map((line) => {
        const sanitizedLine = line.replace(/\s+$/g, '')

        if (sanitizedLine.length === 0) {
            return ' *'
        }

        return ` * ${sanitizedLine}`
    })
}

function sanitizeDocText(value?: string): string | undefined {
    if (!value) {
        return undefined
    }

    return value.replace(/\*\//g, '*\\/')
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function arraysEqual<T>(left: readonly T[], right: readonly T[]): boolean {
    if (left.length !== right.length) {
        return false
    }

    return left.every((value, index) => value === right[index])
}
