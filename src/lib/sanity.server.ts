import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_READ_TOKEN;

let serverClient: ReturnType<typeof createClient> | null = null;

export function getSanityClient() {
	if (!projectId) {
		throw new Error('Sanity project ID missing; set PUBLIC_SANITY_PROJECT_ID or disable PUBLIC_USE_SANITY');
	}
	if (!serverClient) {
		serverClient = createClient({
			projectId,
			dataset,
			apiVersion: '2023-01-01',
			useCdn: !token,
			...(token && { token }),
		});
	}
	return serverClient;
}
