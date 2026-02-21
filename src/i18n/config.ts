export const LOCALES = {
	en: { label: 'English', hreflang: 'en' },
	fr: { label: 'Français', hreflang: 'fr' },
	ht: { label: 'Kreyòl', hreflang: 'ht' },
} as const;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];
