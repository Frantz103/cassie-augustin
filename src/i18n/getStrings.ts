import type { Locale } from './config';
import { DEFAULT_LOCALE } from './config';
import type { UIStrings } from './types';
import { FALLBACK_EN } from './fallbacks';
import { useSanity } from '../lib/useSanity';
import { getUIStrings as fetchUIStrings } from '../lib/sanityQueries';

/**
 * Fetch UI strings for a locale with fallback chain:
 * 1. Requested locale from Sanity
 * 2. English from Sanity
 * 3. Hardcoded English fallback
 */
export async function getStrings(locale: Locale): Promise<UIStrings> {
	if (!useSanity()) return FALLBACK_EN;

	try {
		// Try requested locale
		const strings = await fetchUIStrings(locale);
		if (strings) return mergeWithFallback(strings);

		// Fall back to English from Sanity
		if (locale !== DEFAULT_LOCALE) {
			const enStrings = await fetchUIStrings(DEFAULT_LOCALE);
			if (enStrings) return mergeWithFallback(enStrings);
		}
	} catch {
		// Sanity unreachable
	}

	return FALLBACK_EN;
}

/** Deep merge partial Sanity response with hardcoded fallback */
function mergeWithFallback(partial: Partial<UIStrings>): UIStrings {
	const result = { ...FALLBACK_EN };
	for (const key of Object.keys(FALLBACK_EN) as (keyof UIStrings)[]) {
		if (partial[key] && typeof partial[key] === 'object') {
			result[key] = { ...FALLBACK_EN[key], ...partial[key] } as any;
		}
	}
	return result;
}
