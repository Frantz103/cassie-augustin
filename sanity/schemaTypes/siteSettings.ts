import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings & Contact Info',
    type: 'document',
    fields: [
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
        }),
        defineField({
            name: 'contactIntro',
            title: 'Contact Intro Text',
            type: 'text',
            description: 'Text shown at the top of the Contact modal',
        }),
        defineField({
            name: 'contactOutro',
            title: 'Contact Outro Text',
            type: 'text',
            description: 'Text shown at the bottom of the Contact modal',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings & Contact Info',
            };
        },
    },
});
