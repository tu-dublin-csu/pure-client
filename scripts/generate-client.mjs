#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const steps = [
    {
        label: 'Generate OpenAPI types',
        command: 'npx',
        args: [
            'openapi-typescript',
            'openapi/pure.yaml',
            '--output',
            'src/generated/pure.ts'
        ]
    },
    {
        label: 'Post-process OpenAPI types',
        command: process.execPath,
        args: [resolve('scripts/postprocess-openapi-types.js')]
    },
    {
        label: 'Build operation metadata',
        command: process.execPath,
        args: [resolve('scripts/build-operation-map.mjs')]
    },
    {
        label: 'Regenerate service config',
        command: 'npx',
        args: ['tsx', 'scripts/build-service-config.ts']
    }
]

for (const step of steps) {
    console.info(`→ ${step.label}`)
    const result = spawnSync(step.command, step.args, {
        stdio: 'inherit',
        cwd: resolve('.'),
        env: process.env
    })

    if (result.status !== 0) {
        console.error(`✖ ${step.label} failed`)
        process.exit(result.status ?? 1)
    }

    console.info(`✓ ${step.label}\n`)
}

console.info('Client generation pipeline completed successfully.')
