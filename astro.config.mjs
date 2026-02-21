import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: process.env.SITE_URL || 'https://cassieaugustin.com',
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: { en: 'en', fr: 'fr', ht: 'ht' },
			},
		}),
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'fr', 'ht'],
		routing: { prefixDefaultLocale: false },
	},
	build: {
		inlineStylesheets: 'never',
	},
});
