#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const GENERATED_FILE = path.resolve('src/generated/pure.ts')

if (!fs.existsSync(GENERATED_FILE)) {
    console.error('Generated OpenAPI types not found. Run `npm run types:generate` first.')
    process.exit(1)
}

const content = fs.readFileSync(GENERATED_FILE, 'utf8')

const expectedHelper = 'type WithRequired<T, K extends keyof NonNullable<T>> = NonNullable<T> & {\n    [P in K]-?: NonNullable<T>[P];\n};\n'
const legacyHelper = 'type WithRequired<T, K extends keyof T> = T & {\n    [P in K]-?: T[P];\n};\n'

if (!content.includes(expectedHelper)) {
    console.error('Patched WithRequired helper not found in generated types. Run `npm run types:generate` to rebuild.')
    process.exit(1)
}

if (content.includes(legacyHelper)) {
    console.error('Outdated WithRequired helper detected in generated types. Run `npm run types:generate` to patch the file.')
    process.exit(1)
}

console.log('OpenAPI types check passed.')
