import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated at',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (rule) => rule.required().error('Alt text improves accessibility'),
        }),
      ],
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'Nutrition', value: 'nutrition'},
          {title: 'Wellness', value: 'wellness'},
          {title: 'Lifestyle', value: 'lifestyle'},
          {title: 'Fashion', value: 'fashion'},
          {title: 'Faith', value: 'faith'},
        ],
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
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
      name: 'externalUrl',
      type: 'url',
      title: 'External URL (optional)',
      validation: (rule) =>
        rule.uri({
          scheme: ['https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'publishedAt',
      media: 'heroImage',
    },
    prepare({title, subtitle, date}) {
      const label = subtitle ? `${subtitle} — ${date?.slice(0, 10) || ''}` : date?.slice(0, 10) || ''
      return {title, subtitle: label}
    },
  },
})
