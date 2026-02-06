#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

function readFile(relativePath) {
    const filePath = path.resolve(relativePath)
    return fs.readFileSync(filePath, 'utf8')
}

function serviceNameToFileName(serviceName) {
    return serviceName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function extractOpenApiOperationIds(openApiContent) {
    const operationIdRegex = /operationId:\s+([^\s]+)/g
    const ids = new Set()
    let match
    while ((match = operationIdRegex.exec(openApiContent)) !== null) {
        ids.add(match[1])
    }
    return ids
}

function extractServiceConfigOperationIds(serviceConfigContent) {
    const operationIdRegex = /operationId:\s*'([^']+)'/g
    const ids = new Set()
    let match
    while ((match = operationIdRegex.exec(serviceConfigContent)) !== null) {
        ids.add(match[1])
    }
    return ids
}

function extractServiceMetadata(serviceConfigContent) {
    const basePathRegex = /export const (\w+)ServiceConfig: ServiceConfig = {\s*\n\s*basePath: '([^']+)'/g
    const services = []
    let match

    while ((match = basePathRegex.exec(serviceConfigContent)) !== null) {
        const [, serviceName, basePath] = match
        const blockStart = match.index
        const nextExportIndex = serviceConfigContent.indexOf('export const ', basePathRegex.lastIndex)
        const block = serviceConfigContent.slice(
            blockStart,
            nextExportIndex === -1 ? undefined : nextExportIndex
        )

        const operations = extractOperations(block)

        services.push({ name: serviceName, basePath, operations })
    }

    return services
}

function extractOperations(serviceBlock) {
    const operations = []
    const operationsIndex = serviceBlock.indexOf('operations:')

    if (operationsIndex === -1) {
        return operations
    }

    const braceStart = serviceBlock.indexOf('{', operationsIndex)
    if (braceStart === -1) {
        return operations
    }

    let depth = 0
    let endIndex = -1

    for (let i = braceStart; i < serviceBlock.length; i += 1) {
        const char = serviceBlock[i]
        if (char === '{') {
            depth += 1
        } else if (char === '}') {
            depth -= 1
            if (depth === 0) {
                endIndex = i
                break
            }
        }
    }

    if (endIndex === -1) {
        return operations
    }

    const operationsBlock = serviceBlock.slice(braceStart + 1, endIndex)
    const operationRegex = /(\w+):\s*{[^}]*?method:\s*'([^']+)'/g
    let match

    while ((match = operationRegex.exec(operationsBlock)) !== null) {
        operations.push({ key: match[1], method: match[2] })
    }

    return operations
}

const openApiContent = readFile('openapi/pure.yaml')
const serviceConfigContent = readFile('src/services/service-config.ts')

const openApiOperationIds = extractOpenApiOperationIds(openApiContent)
const serviceConfigOperationIds = extractServiceConfigOperationIds(serviceConfigContent)
const serviceConfigs = extractServiceMetadata(serviceConfigContent)

const missingOperationIds = [...openApiOperationIds].filter((id) => !serviceConfigOperationIds.has(id)).sort()
const unusedOperationIds = [...serviceConfigOperationIds].filter((id) => !openApiOperationIds.has(id)).sort()

const missingByPrefix = missingOperationIds.reduce((acc, id) => {
    const prefix = id.split('_')[0]
    acc.set(prefix, (acc.get(prefix) ?? 0) + 1)
    return acc
}, new Map())

const formattedMissingByPrefix = [...missingByPrefix.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([prefix, count]) => `${prefix}: ${count}`)

console.log(`Services configured: ${serviceConfigs.length}`)
console.log(serviceConfigs.map(({ name, basePath }) => `${name} (${basePath})`).join('\n'))
console.log('\nOpenAPI operation IDs:', openApiOperationIds.size)
console.log('Service-config operation IDs:', serviceConfigOperationIds.size)
console.log(`\nMissing operation IDs in service-config (${missingOperationIds.length}):`)
if (missingOperationIds.length) {
    console.log(formattedMissingByPrefix.join('\n'))
}

if (missingOperationIds.length) {
    console.log('\nSample missing operation IDs:')
    console.log(missingOperationIds.slice(0, 50).join('\n'))
    if (missingOperationIds.length > 50) {
        console.log(`... and ${missingOperationIds.length - 50} more`)
    }
} else {
    console.log('None')
}
console.log(`\nExtra operation IDs in service-config not in OpenAPI (${unusedOperationIds.length}):`)
if (unusedOperationIds.length) {
    console.log(unusedOperationIds.join('\n'))
} else {
    console.log('None')
}

const missingServiceOperations = []

for (const service of serviceConfigs) {
    const serviceFileName = `${serviceNameToFileName(service.name)}.ts`
    const serviceFilePath = path.resolve('src/services', serviceFileName)

    if (!fs.existsSync(serviceFilePath)) {
        missingServiceOperations.push({
            service: service.name,
            reason: `service file missing (${serviceFileName})`,
            operations: []
        })
        continue
    }

    const serviceContent = fs.readFileSync(serviceFilePath, 'utf8')
    const missingOperations = service.operations
        .filter(({ method }) => method.toLowerCase() === 'get')
        .filter(({ key }) => !serviceContent.includes(`this.operations.${key}`))
        .map(({ key }) => key)

    if (missingOperations.length) {
        missingServiceOperations.push({ service: service.name, operations: missingOperations })
    }
}

console.log('\nMissing GET operations in service implementations:')
if (missingServiceOperations.length === 0) {
    console.log('None')
} else {
    for (const { service, operations, reason } of missingServiceOperations) {
        if (reason) {
            console.log(`${service}: ${reason}`)
        } else {
            console.log(`${service}: ${operations.join(', ')}`)
        }
    }
}
