import 'dotenv/config'

import { PureClient, PersonsService, ThesauriService } from '../src'

async function main(): Promise<void> {
    const { PURE_URL, PURE_API_KEY } = process.env

    if (!PURE_URL || !PURE_API_KEY) {
        throw new Error('Set PURE_URL and PURE_API_KEY before running this script.')
    }

    const client = new PureClient(PURE_URL, PURE_API_KEY)

    await demoPersons(client)
    await demoThesauri(client)
}

async function demoPersons(client: PureClient): Promise<void> {
    const service = new PersonsService(client)
    const list = await service.list({ size: 5 })

    if (!list.items?.length) {
        console.log('No persons returned by the API')
        return
    }

    const qualTypes = await service.getAllowedAcademicQualificationTypes

    console.log('Allowed academic qualification types:')
    console.log(JSON.stringify(qualTypes, null, 2))
    console.log('') 
    
    const first = list.items[0]
    console.log('First person (list):')
    console.log(JSON.stringify(first, null, 2))

    if (first?.uuid) {
        const detailed = await service.get(first.uuid)
        console.log('Detailed view:')
        console.log(`${JSON.stringify(detailed, null, 2)}\n`)
    }
}

async function demoThesauri(client: PureClient): Promise<void> {
    const service = new ThesauriService(client)
    const thesauri = await service.list({ size: 3 })

    if (!thesauri.items?.length) {
        console.log('No thesauri returned by the API')
        return
    }

    console.log('Thesauri:')
    for (const entry of thesauri.items) {
        console.log(JSON.stringify(entry, null, 2))
    }
}

main().catch((error) => {
    if (error instanceof Error) {
        console.error(error.message)
    } else {
        console.error(error)
    }
    process.exit(1)
})
