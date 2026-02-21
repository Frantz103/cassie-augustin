import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import type {StructureBuilder} from 'sanity/structure'

const singletonTypes = new Set(['homepage', 'about', 'contact', 'siteSettings', 'uiStrings'])
const isDev = process.env.NODE_ENV !== 'production'
const enableVision = isDev || process.env.SANITY_STUDIO_ENABLE_VISION === 'true'

const supportedLanguages = [
  {id: 'en', title: 'English'},
  {id: 'fr', title: 'French'},
  {id: 'ht', title: 'Haitian Creole'},
]

const i18nSchemaTypes = [
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
              S.listItem()
                .title('Contact')
                .child(
                  S.document().schemaType('contact').documentId('singleton-contact')
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
        .title('UI Strings')
        .child(S.documentTypeList('uiStrings').title('UI Strings')),
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
    documentInternationalization({
      supportedLanguages,
      schemaTypes: i18nSchemaTypes,
    }),
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
