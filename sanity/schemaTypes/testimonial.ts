import {defineField, defineType} from 'sanity'
import {languageField} from './fields/languageField'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Testimonial',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          {title: 'Nutrition', value: 'nutrition'},
          {title: 'Modeling', value: 'modeling'},
          {title: 'General', value: 'general'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
    },
  },
})
