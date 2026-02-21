import {defineField, defineType} from 'sanity'
import {languageField} from './fields/languageField'

export default defineType({
  name: 'uiStrings',
  title: 'UI Strings',
  type: 'document',
  fields: [
    languageField,

    // ── Navigation ──
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      fields: [
        defineField({name: 'home', title: 'Home', type: 'string'}),
        defineField({name: 'about', title: 'About', type: 'string'}),
        defineField({name: 'lookbook', title: 'Lookbook', type: 'string'}),
        defineField({name: 'blog', title: 'Blog', type: 'string'}),
        defineField({name: 'contact', title: 'Contact', type: 'string'}),
        defineField({name: 'close', title: 'Close', type: 'string'}),
        defineField({name: 'skipToContent', title: 'Skip to content', type: 'string'}),
        defineField({name: 'toggleMenu', title: 'Toggle menu (aria)', type: 'string'}),
      ],
    }),

    // ── Homepage ──
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'object',
      fields: [
        defineField({name: 'kindWords', title: 'Kind Words heading', type: 'string'}),
      ],
    }),

    // ── Blog ──
    defineField({
      name: 'blog',
      title: 'Blog',
      type: 'object',
      fields: [
        defineField({name: 'bannerTitle', title: 'Banner title', type: 'string'}),
        defineField({name: 'bannerSubtitle', title: 'Banner subtitle', type: 'string'}),
        defineField({name: 'continueReading', title: 'Continue reading', type: 'string'}),
        defineField({name: 'noPosts', title: 'No posts message', type: 'string'}),
        defineField({name: 'lastUpdatedOn', title: 'Last updated on', type: 'string'}),
        defineField({name: 'pageTitle', title: 'Blog page title', type: 'string'}),
      ],
    }),

    // ── Contact ──
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'formHeading', title: 'Form heading', type: 'string'}),
        defineField({name: 'nameLabel', title: 'Name label', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email label', type: 'string'}),
        defineField({name: 'messageLabel', title: 'Message label', type: 'string'}),
        defineField({name: 'sendButton', title: 'Send button', type: 'string'}),
        defineField({name: 'followInstagram', title: 'Follow on Instagram label', type: 'string'}),
        defineField({name: 'emailMe', title: 'Email me label', type: 'string'}),
      ],
    }),

    // ── Lookbook ──
    defineField({
      name: 'lookbook',
      title: 'Lookbook',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Lookbook title', type: 'string'}),
        defineField({name: 'year', title: 'Year range', type: 'string'}),
        defineField({name: 'viewCompCard', title: 'View Comp Card', type: 'string'}),
      ],
    }),

    // ── 404 ──
    defineField({
      name: 'notFound',
      title: '404 Page',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'message', title: 'Message', type: 'string'}),
        defineField({name: 'backHome', title: 'Back to Home', type: 'string'}),
      ],
    }),

    // ── Breadcrumbs ──
    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'object',
      fields: [
        defineField({name: 'home', title: 'Home', type: 'string'}),
        defineField({name: 'blog', title: 'Blog', type: 'string'}),
      ],
    }),

    // ── Footer ──
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({name: 'copyright', title: 'Copyright prefix', type: 'string'}),
      ],
    }),

    // ── SEO ──
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'siteTitle', title: 'Site title', type: 'string'}),
        defineField({name: 'defaultDescription', title: 'Default meta description', type: 'text'}),
      ],
    }),

    // ── Language Switcher ──
    defineField({
      name: 'languageSwitcher',
      title: 'Language Switcher',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Switcher aria label', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      const labels: Record<string, string> = {en: 'English', fr: 'French', ht: 'Haitian Creole'}
      return {title: `UI Strings — ${labels[language] || language || 'Unknown'}`}
    },
  },
})
