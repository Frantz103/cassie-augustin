import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: process.env.SITE_URL, // set in Netlify/ENV (keeps canonical tags correct)
	integrations: [react(), sitemap()],
	build: {
		inlineStylesheets: 'never',
	},
});
