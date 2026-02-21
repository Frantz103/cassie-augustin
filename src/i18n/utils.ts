import { DEFAULT_LOCALE, LOCALE_CODES, LOCALES, type Locale } from './config';

/** Extract the current locale from Astro.currentLocale or the URL */
export function getLocale(astro: { currentLocale?: string }): Locale {
	const raw = astro.currentLocale;
	if (raw && LOCALE_CODES.includes(raw as Locale)) return raw as Locale;
	return DEFAULT_LOCALE;
}

/** Build a locale-prefixed path. Default locale gets no prefix. */
export function localePath(path: string, locale: Locale): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (locale === DEFAULT_LOCALE) return clean;
	return `/${locale}${clean}`;
}

/** Strip the locale prefix from a pathname, returning the bare path */
export function stripLocalePrefix(pathname: string): string {
	for (const code of LOCALE_CODES) {
		if (code === DEFAULT_LOCALE) continue;
		if (pathname === `/${code}` || pathname === `/${code}/`) return '/';
		if (pathname.startsWith(`/${code}/`)) return pathname.slice(code.length + 1);
	}
	return pathname;
}

/** Generate alternate links for all locales (for hreflang tags) */
export function getAlternateLinks(pathname: string, siteUrl: string) {
	const barePath = stripLocalePrefix(pathname);
	return LOCALE_CODES.map((code) => ({
		hreflang: LOCALES[code].hreflang,
		href: `${siteUrl}${localePath(barePath, code)}`,
	}));
}

/** Map locale to Intl date locale string */
export function getDateLocale(locale: Locale): string {
	const map: Record<Locale, string> = {
		en: 'en-US',
		fr: 'fr-FR',
		ht: 'ht',
	};
	return map[locale];
}
