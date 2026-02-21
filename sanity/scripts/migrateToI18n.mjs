#!/usr/bin/env node
/**
 * Migration script: Sets language='en' on all existing documents that lack it.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=xxx node sanity/scripts/migrateToI18n.mjs
 */
import {createClient} from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Error: SANITY_WRITE_TOKEN environment variable is required')
  process.exit(1)
}

const client = createClient({
  projectId: 'gcavgznf',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token,
  useCdn: false,
})

const i18nTypes = [
  'homepage',
  'about',
  'contact',
  'siteSettings',
  'blogPost',
  'lookbookItem',
  'page',
  'testimonial',
  'uiStrings',
]

async function migrate() {
  const filter = i18nTypes.map((t) => `_type == "${t}"`).join(' || ')
  const query = `*[(${filter}) && !defined(language)]{ _id, _type }`

  const docs = await client.fetch(query)
  console.log(`Found ${docs.length} documents without language field`)

  if (docs.length === 0) {
    console.log('Nothing to migrate.')
    return
  }

  // Patch only the documents that were actually found (query already returns both published and drafts)
  const transaction = client.transaction()
  for (const doc of docs) {
    transaction.patch(doc._id, (p) => p.set({language: 'en'}))
  }

  const result = await transaction.commit({autoGenerateArrayKeys: true})
  console.log(`Migration complete. Transaction ID: ${result.transactionId}`)
  console.log(`Patched ${docs.length} documents with language: 'en'`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
