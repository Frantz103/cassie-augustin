/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID?: string;
	readonly PUBLIC_SANITY_DATASET?: string;
	readonly PUBLIC_USE_SANITY?: string;
	readonly SITE_URL?: string;
	readonly SANITY_READ_TOKEN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
