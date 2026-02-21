import groq from 'groq';
import { getSanityClient } from './sanity.server';

export type SanityLookbookImage = {
	asset: { _ref?: string; url?: string };
	alt?: string;
	caption?: string;
};

export type SanityLookbookItem = {
	_id: string;
	title: string;
	slug: string;
	category?: string;
	date?: string;
	featured?: boolean;
	layout?: 'featured' | 'half' | 'third' | 'two-thirds' | 'one-third';
	order?: number;
	images?: SanityLookbookImage[];
};

const lookbookFields = groq`{
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  featured,
  layout,
  order,
  images[]{
    ...,
    "url": asset->url
  }
}`;

export async function getLookbookItems(): Promise<SanityLookbookItem[]> {
	const client = getSanityClient();
	return client.fetch(
		groq`*[_type == "lookbookItem" && defined(slug.current)] 
      | order(order asc, date desc, _createdAt desc) ${lookbookFields}`
	);
}
