import {defineField, defineType} from 'sanity'
import {languageField} from './fields/languageField'

export default defineType({
  name: 'lookbookItem',
  title: 'Lookbook Item',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: ['Fashion', 'Editorial', 'Commercial', 'Beauty', 'Fitness'],
      },
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Shoot Date',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
    }),
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          {title: 'Featured (full width)', value: 'featured'},
          {title: 'Half', value: 'half'},
          {title: 'Third', value: 'third'},
          {title: 'Two Thirds', value: 'two-thirds'},
          {title: 'One Third', value: 'one-third'},
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt text'}),
            defineField({name: 'caption', type: 'string', title: 'Caption'}),
          ],
          options: {hotspot: true},
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
