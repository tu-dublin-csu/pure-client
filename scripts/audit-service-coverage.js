#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

function readFile(relativePath) {
    const filePath = path.resolve(relativePath)
    return fs.readFileSync(filePath, 'utf8')
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

function extractServiceNames(serviceConfigContent) {
    const basePathRegex = /export const (\w+)ServiceConfig: ServiceConfig = {\s*\n\s*basePath: '([^']+)'/g
    const services = []
    let match
    while ((match = basePathRegex.exec(serviceConfigContent)) !== null) {
        services.push({ name: match[1], basePath: match[2] })
    }
    return services
}

const openApiContent = readFile('openapi/pure.yaml')
const serviceConfigContent = readFile('src/services/service-config.ts')

const openApiOperationIds = extractOpenApiOperationIds(openApiContent)
const serviceConfigOperationIds = extractServiceConfigOperationIds(serviceConfigContent)
const serviceConfigs = extractServiceNames(serviceConfigContent)

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
