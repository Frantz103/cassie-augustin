import { defineField, defineType } from 'sanity';
import {languageField} from './fields/languageField'

export default defineType({
    name: 'homepage',
    title: 'Homepage Content',
    type: 'document',
    fields: [
        languageField,
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'The main heading (e.g., "Hi, I\'m Cassie")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            description: 'The introductory paragraph',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            description: 'Text for the call to action button (e.g., "Let\'s Connect")',
        }),
        defineField({
            name: 'ctaSubtext',
            title: 'CTA Subtext',
            type: 'text',
            description: 'Text below the call to action button (e.g., "Follow along for nutrition tips...")',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'heroImageAlt',
            title: 'Hero Image Alt Text',
            type: 'string',
        }),
        defineField({
            name: 'credentials',
            title: 'Credentials Line',
            type: 'string',
            description: 'e.g. "Certified Nutritionist | Model | Wellness Advocate"',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Homepage Content',
            };
        },
    },
});
