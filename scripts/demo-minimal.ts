import { PureClient, AwardsService, PersonsService } from '../src'

async function main() {
    const { PURE_URL, PURE_API_KEY } = process.env

    if (!PURE_URL || !PURE_API_KEY) {
        throw new Error('Set PURE_URL and PURE_API_KEY before running this demo')
    }

    const client = new PureClient(PURE_URL, PURE_API_KEY)
    const persons = new PersonsService(client)
    const awardsService = new AwardsService(client)

    const person = await persons

    console.log('Person details:')
    console.log(JSON.stringify(person, null, 2))

    const personUuid = person.uuid
    if (!personUuid) {
        throw new Error('Person record missing uuid; cannot create a note')
    }

    const timestamp = new Date().toISOString()
    const createdNote = await persons.createNote(personUuid, {
        text: `Pure client demo note created at ${timestamp}`,
        date: timestamp,
        username: 'pure-client-demo'
    })

    console.log('Created note:')
    console.log(JSON.stringify(createdNote, null, 2))

    const awards = await awardsService.list({ size: 5 })
    console.log('Awards:')
    for (const award of awards.items ?? []) {
        const label = award.title?.text ?? award.uuid ?? 'Unknown award'
        console.log(label)
    }
    const people = await persons.list({ size: 5 })

    for (const person of people.items ?? []) {
        const givenName = person.name?.firstName ?? ''
        const familyName = person.name?.lastName ?? ''
        const label = (givenName || familyName ? `${givenName} ${familyName}`.trim() : undefined) ?? person.uuid ??
            'Unknown person'
        console.log(label)
    }
}

main().catch(error => {
    if (PureClient.isApiError(error)) {
        console.error(`PURE API error ${error.status ?? ''}`.trim(), error.message)
    } else {
        console.error('Unexpected error', error)
    }
    process.exit(1)
})
