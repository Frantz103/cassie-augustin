import { defineField, defineType } from 'sanity';
import {languageField} from './fields/languageField'

export default defineType({
    name: 'contact',
    title: 'Contact Page',
    type: 'document',
    fields: [
        languageField,
        defineField({
            name: 'title',
            title: 'Page Heading',
            type: 'string',
            description: 'The contact page heading (e.g., "Let\'s Connect")',
        }),
        defineField({
            name: 'introText',
            title: 'Intro Text',
            type: 'text',
            description: 'Paragraph shown at the top of the contact page',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule) => Rule.email(),
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Handle',
            type: 'string',
            description: 'e.g. "@cassie.augustin" or "cassie.augustin"',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram Profile URL',
            type: 'url',
            validation: (Rule) =>
                Rule.uri({
                    scheme: ['https'],
                }).custom((value) => {
                    if (!value) return true;
                    try {
                        const url = new URL(value);
                        const allowedHosts = new Set(['instagram.com', 'www.instagram.com']);
                        return allowedHosts.has(url.hostname)
                            ? true
                            : 'Use a valid Instagram profile URL on instagram.com';
                    } catch {
                        return 'Use a valid Instagram profile URL';
                    }
                }),
        }),
        defineField({
            name: 'outroText',
            title: 'Outro Text',
            type: 'text',
            description: 'Paragraph shown at the bottom of the contact page',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contact Page',
            };
        },
    },
});
