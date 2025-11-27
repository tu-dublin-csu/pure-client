import { PureClient, ActivitiesService } from '../src/index.ts'

const { PURE_URL, PURE_API_KEY } = process.env

if (!PURE_URL || !PURE_API_KEY) {
    throw new Error('Set PURE_URL and PURE_API_KEY before running this script')
}

console.log('Initialising Pure client...')
const client = new PureClient(PURE_URL, PURE_API_KEY)
const activities = new ActivitiesService(client)

console.log('Pure client ready; starting activity document demo')

async function addDocumentToFirstActivity() {
    console.log('Fetching most recently modified activity...')
    const list = await activities.list({ order: 'modified', size: 1 })
    const first = list.items?.[0]

    if (!first?.uuid) {
        console.log('No activities returned from the API')
        return
    }

    console.log(`Found activity ${first.uuid}; requesting full details...`)
    const activity = await activities.get(first.uuid)
    const { uuid } = activity

    if (!uuid) {
        throw new Error('Fetched activity does not include a UUID')
    }

    console.log('Retrieving allowed activity document types...')
    const allowedDocumentTypes = await client.get('/activities/allowed-document-types')
    console.log('Allowed document types:', JSON.stringify(allowedDocumentTypes, null, 2))
    const documentType = allowedDocumentTypes?.classifications?.[0]

    if (!documentType?.uri) {
        throw new Error('No document types available for activities')
    }

    console.log('Preparing dummy text file contents...')
    const fileContents = 'Sample activity attachment generated at ' + new Date().toISOString()
    const base64Data = Buffer.from(fileContents, 'utf8').toString('base64')

    const document = {
        fileName: 'activity-sample.txt',
        mimeType: 'text/plain',
        fileData: base64Data,
        type: documentType,
        visibility: { key: 'FREE' }
    }

    console.log(`Appending document to activity ${uuid}...`)
    const updatedActivity = {
        ...activity,
        documents: [...(activity.documents ?? []), document]
    }

    await activities.update(uuid, updatedActivity)
    console.log(`Uploaded document to activity ${uuid}`)
}

addDocumentToFirstActivity().catch(error => {
    if (PureClient.isApiError(error)) {
        console.error('PURE API error:', error.status, error.message)
        if (error.response?.data) {
            console.error(JSON.stringify(error.response.data, null, 2))
        }
    } else {
        console.error('Unexpected error:', error)
    }
    process.exit(1)
})