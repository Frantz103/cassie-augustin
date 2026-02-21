import { defineType } from 'sanity';
import {languageField} from './fields/languageField'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        languageField,
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings',
            };
        },
    },
});
