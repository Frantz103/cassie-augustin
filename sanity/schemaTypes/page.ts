import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'The title displayed at the top of the page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'The URL path for this page (e.g., "privacy-policy" becomes /privacy-policy)',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((slug) => {
          const reserved = ['blog', 'lookbook', 'index']
          if (slug?.current && reserved.includes(slug.current)) {
            return `"${slug.current}" is reserved. Choose a different slug.`
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      description: 'Short description for search engines (SEO)',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'showInNav',
      type: 'boolean',
      title: 'Show in Navigation',
      description: 'If enabled, this page appears in the site footer/legal links',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : 'No slug',
      }
    },
  },
})
