import groq from 'groq';
import { getSanityClient } from './sanity.server';

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

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) ${blogPostFields}`
	);
}

export async function getBlogPost(slug: string): Promise<SanityBlogPost | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && slug.current == $slug][0] ${blogPostFields}`,
		{ slug }
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

export type SanitySiteSettings = {
	email?: string;
	instagram?: string;
	instagramUrl?: string;
	contactIntro?: string;
	contactOutro?: string;
};

export async function getHomepage(): Promise<SanityHomepage | null> {
	const client = getSanityClient();
	return client.fetch(groq`*[_type == "homepage"][0]`);
}

export async function getAbout(): Promise<SanityAbout | null> {
	const client = getSanityClient();
	return client.fetch(groq`*[_type == "about"][0]`);
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
	const client = getSanityClient();
	return client.fetch(groq`*[_type == "siteSettings"][0]`);
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

export async function getPages(): Promise<SanityPage[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && defined(slug.current)] | order(title asc) ${pageFields}`
	);
}

export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && slug.current == $slug][0] ${pageFields}`,
		{ slug }
	);
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "testimonial"] | order(order asc, _createdAt desc) {
			_id, name, content, service, order
		}`
	);
}

export async function getRecentBlogPosts(limit = 3): Promise<SanityBlogPost[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) [0...$limit] ${blogPostFields}`,
		{ limit }
	);
}

export async function getNavPages(): Promise<Pick<SanityPage, 'title' | 'slug'>[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "page" && showInNav == true && defined(slug.current)] | order(title asc) {
			title,
			"slug": slug.current
		}`
	);
}
