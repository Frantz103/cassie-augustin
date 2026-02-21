import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
	site: process.env.SITE_URL, // set in Netlify/ENV (keeps canonical tags correct)
	integrations: [react()],
});
