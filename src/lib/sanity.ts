import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

let publicClient: ReturnType<typeof createClient> | null = null;
let builder: ReturnType<typeof imageUrlBuilder> | null = null;

export function getPublicSanityClient() {
	if (!projectId) {
		throw new Error('Sanity project ID missing; set PUBLIC_SANITY_PROJECT_ID or disable PUBLIC_USE_SANITY');
	}
	if (!publicClient) {
		publicClient = createClient({
			projectId,
			dataset,
			apiVersion: '2023-01-01',
			useCdn: true,
		});
	}
	return publicClient;
}

export function urlFor(source: any) {
	if (!builder) {
		builder = imageUrlBuilder(getPublicSanityClient());
	}
	return builder.image(source);
}
