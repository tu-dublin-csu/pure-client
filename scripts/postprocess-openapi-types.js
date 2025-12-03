#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const GENERATED_FILE = path.resolve('src/generated/pure.ts')

if (!fs.existsSync(GENERATED_FILE)) {
    console.error(`Generated OpenAPI file not found at ${GENERATED_FILE}. Skipping post-processing.`)
    process.exit(0)
}

const original = fs.readFileSync(GENERATED_FILE, 'utf8')

const target = 'type WithRequired<T, K extends keyof T> = T & {\n    [P in K]-?: T[P];\n};\n'
const replacement = 'type WithRequired<T, K extends keyof NonNullable<T>> = NonNullable<T> & {\n    [P in K]-?: NonNullable<T>[P];\n};\n'

if (!original.includes(target)) {
    if (original.includes(replacement)) {
        process.exit(0)
    }

    console.warn('Expected WithRequired helper not found in generated types. No changes applied.')
    process.exit(0)
}

const updated = original.replace(target, replacement)
fs.writeFileSync(GENERATED_FILE, updated)

console.log('Patched WithRequired helper in generated OpenAPI types.')
