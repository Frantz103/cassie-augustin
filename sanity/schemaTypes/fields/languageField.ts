import {defineField} from 'sanity'

export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  options: {
    list: [
      {title: 'English', value: 'en'},
      {title: 'French', value: 'fr'},
      {title: 'Haitian Creole', value: 'ht'},
    ],
  },
  initialValue: 'en',
  readOnly: true,
  validation: (rule) => rule.required(),
})
