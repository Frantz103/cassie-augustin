import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import type {StructureBuilder} from 'sanity/structure'

const singletonTypes = new Set(['homepage', 'about', 'siteSettings'])
const isDev = process.env.NODE_ENV !== 'production'
const enableVision = isDev || process.env.SANITY_STUDIO_ENABLE_VISION === 'true'

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Homepage')
                .child(
                  S.document().schemaType('homepage').documentId('singleton-homepage')
                ),
              S.listItem()
                .title('About')
                .child(
                  S.document().schemaType('about').documentId('singleton-about')
                ),
              S.divider(),
              S.listItem()
                .title('Other Pages')
                .schemaType('page')
                .child(S.documentTypeList('page').title('Pages')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),
      S.listItem()
        .title('Lookbook')
        .schemaType('lookbookItem')
        .child(S.documentTypeList('lookbookItem').title('Lookbook Items')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('singleton-siteSettings')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Cassie Augustin',

  projectId: 'gcavgznf',
  dataset: 'production',

  plugins: [
    structureTool({structure: deskStructure}),
    ...(enableVision ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
      }
      return prev
    },
  },
})
