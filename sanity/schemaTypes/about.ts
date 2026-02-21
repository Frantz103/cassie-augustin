import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'about',
    title: 'About Content',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The modal title (e.g., "About")',
        }),
        defineField({
            name: 'body',
            title: 'Body Text',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The main content of the about section',
        }),
        defineField({
            name: 'closing',
            title: 'Closing Note',
            type: 'text',
            description: 'E.g., "Xoxo, Cassie" - uses text area to support newlines',
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'imageAlt',
            title: 'Image Alt Text',
            type: 'string',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'About Content',
            };
        },
    },
});
