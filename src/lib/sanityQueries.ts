import groq from 'groq';
import { getSanityClient } from './sanity.server';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';
import type { UIStrings } from '../i18n/types';

export type SanityImage = {
	asset: { _ref?: string; url?: string };
	alt?: string;
};

export type SanityBlogPost = {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	publishedAt?: string;
	updatedAt?: string;
	category?: string;
	heroImage?: SanityImage;
	body?: any[];
	externalUrl?: string;
};

const blogPostFields = groq`{
  _id,
  title,
  "slug": slug.current,
  description,
  publishedAt,
  updatedAt,
  category,
  externalUrl,
  heroImage{
    ...,
    "url": asset->url
  },
  body
}`;

export async function getBlogPosts(locale: Locale = DEFAULT_LOCALE): Promise<SanityBlogPost[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && defined(slug.current) && language == $locale] | order(publishedAt desc) ${blogPostFields}`,
		{ locale }
	);
}

export async function getBlogPost(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<SanityBlogPost | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && slug.current == $slug && language == $locale][0] ${blogPostFields}`,
		{ slug, locale }
	);
}

export type SanityHomepage = {
	heroTitle?: string;
	heroSubtitle?: string;
	ctaText?: string;
	ctaSubtext?: string;
	heroImage?: SanityImage;
	heroImageAlt?: string;
	credentials?: string;
};

export type SanityTestimonial = {
	_id: string;
	name: string;
	content: string;
	service?: string;
	order?: number;
};

export type SanityAbout = {
	title?: string;
	body?: any[];
	closing?: string;
	image?: SanityImage;
	imageAlt?: string;
};

export type SanityContact = {
	title?: string;
	introText?: string;
	email?: string;
	instagram?: string;
	instagramUrl?: string;
	outroText?: string;
};

export type SanitySiteSettings = {
};

export async function getHomepage(locale: Locale = DEFAULT_LOCALE): Promise<SanityHomepage | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "homepage" && language == $locale][0]`,
		{ locale }
	);
}

export async function getAbout(locale: Locale = DEFAULT_LOCALE): Promise<SanityAbout | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "about" && language == $locale][0]`,
		{ locale }
	);
}

export async function getContact(locale: Locale = DEFAULT_LOCALE): Promise<SanityContact | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "contact" && language == $locale][0]`,
		{ locale }
	);
}

export async function getSiteSettings(locale: Locale = DEFAULT_LOCALE): Promise<SanitySiteSettings | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "siteSettings" && language == $locale][0]`,
		{ locale }
	);
}

export type SanityPage = {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	body?: any[];
	showInNav?: boolean;
};

const pageFields = groq`{
  _id,
  title,
  "slug": slug.current,
  description,
  body,
  showInNav
}`;

export async function getPages(locale: Locale = DEFAULT_LOCALE): Promise<SanityPage[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && defined(slug.current) && language == $locale] | order(title asc) ${pageFields}`,
		{ locale }
	);
}

export async function getPageBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<SanityPage | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && slug.current == $slug && language == $locale][0] ${pageFields}`,
		{ slug, locale }
	);
}

export async function getTestimonials(locale: Locale = DEFAULT_LOCALE): Promise<SanityTestimonial[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "testimonial" && language == $locale] | order(order asc, _createdAt desc) {
			_id, name, content, service, order
		}`,
		{ locale }
	);
}

export async function getRecentBlogPosts(limit = 3, locale: Locale = DEFAULT_LOCALE): Promise<SanityBlogPost[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && defined(slug.current) && language == $locale] | order(publishedAt desc) [0...$limit] ${blogPostFields}`,
		{ limit, locale }
	);
}

export async function getNavPages(locale: Locale = DEFAULT_LOCALE): Promise<Pick<SanityPage, 'title' | 'slug'>[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && showInNav == true && defined(slug.current) && language == $locale] | order(title asc) {
			title,
			"slug": slug.current
		}`,
		{ locale }
	);
}

export async function getUIStrings(locale: Locale = DEFAULT_LOCALE): Promise<UIStrings | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "uiStrings" && language == $locale][0]{
			nav, homepage, blog, contact, lookbook, notFound, breadcrumbs, footer, seo, languageSwitcher
		}`,
		{ locale }
	);
}

/** Fetch with locale fallback: tries requested locale, then English */
export async function getWithFallback<T>(
	fetcher: (locale: Locale) => Promise<T | null>,
	locale: Locale
): Promise<T | null> {
	const result = await fetcher(locale);
	if (result) return result;
	if (locale !== DEFAULT_LOCALE) return fetcher(DEFAULT_LOCALE);
	return null;
}
