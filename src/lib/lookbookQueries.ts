import groq from "groq";
import { getSanityClient } from "./sanity.server";
import { DEFAULT_LOCALE, type Locale } from "../i18n/config";

export type SanityLookbookImage = {
  asset: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
  metadata?: { dimensions?: { width?: number; height?: number } };
};

export type SanityLookbookItem = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  date?: string;
  featured?: boolean;
  layout?: "featured" | "half" | "third" | "two-thirds" | "one-third";
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
    "url": asset->url,
    "metadata": asset->metadata
  }
}`;

export async function getLookbookItems(
  locale: Locale = DEFAULT_LOCALE,
  limit = 100,
): Promise<SanityLookbookItem[]> {
  const client = getSanityClient();
  return client.fetch(
    groq`*[_type == "lookbookItem" && defined(slug.current) && language == $locale]
      | order(order asc, date desc, _createdAt desc) [0...$limit] ${lookbookFields}`,
    { limit, locale },
  );
}
