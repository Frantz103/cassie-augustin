import type {SlugValidationContext} from 'sanity'

/**
 * Slug uniqueness scoped to the document's language. Translations share a
 * slug so each locale serves the same path (/fr/blog/post-1), which the
 * default check would reject.
 */
export async function isUniquePerLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document?.language) return true
  const client = getClient({apiVersion: '2023-01-01'})
  const id = document._id.replace(/^drafts\./, '')
  return client.fetch(
    `!defined(*[_type == $type && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`,
    {
      type: document._type,
      draft: `drafts.${id}`,
      published: id,
      slug,
      language: document.language,
    },
  )
}
