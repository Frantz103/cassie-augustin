import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

// Enable Sanity integration only when configured, so local/rollback works without CMS.
const integrations = projectId
	? [
			react(),
			sanity({
				projectId,
				dataset,
				useCdn: true,
				apiVersion: '2023-01-01',
			}),
	  ]
	: [react()];

export default defineConfig({
	site: process.env.SITE_URL, // set in Netlify/ENV (keeps canonical tags correct)
	integrations,
});
