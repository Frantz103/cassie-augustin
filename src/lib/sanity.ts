import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_READ_TOKEN;

let client: ReturnType<typeof createClient> | null = null;
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

export function getSanityClient() {
	if (!projectId) {
		throw new Error('Sanity project ID missing; set PUBLIC_SANITY_PROJECT_ID or disable PUBLIC_USE_SANITY');
	}
	if (!client) {
		client = createClient({
			projectId,
			dataset,
			apiVersion: '2023-01-01',
			useCdn: !token,
			...(token && { token }),
		});
	}
	return client;
}

export function urlFor(source: any) {
	if (!builder) {
		builder = imageUrlBuilder(getSanityClient());
	}
	return builder.image(source);
}
