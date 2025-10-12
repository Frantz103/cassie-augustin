# 🔍 Sanity Query Cheat Sheet

Quick reference for common Sanity queries you might need.

## Basic Blog Queries

### Get all published blog posts
```typescript
const posts = await client.fetch(`
  *[_type == "blogPost"] | order(pubDate desc)
`)
```

### Get single blog post by slug
```typescript
const post = await client.fetch(`
  *[_type == "blogPost" && slug.current == $slug][0]
`, { slug: 'your-slug' })
```

### Get latest 3 blog posts
```typescript
const posts = await client.fetch(`
  *[_type == "blogPost"] | order(pubDate desc) [0...3]
`)
```

### Get blog posts from specific date range
```typescript
const posts = await client.fetch(`
  *[_type == "blogPost" && pubDate >= $startDate && pubDate <= $endDate] | order(pubDate desc)
`, { 
  startDate: '2024-01-01',
  endDate: '2024-12-31'
})
```

## Lookbook Queries

### Get all lookbook items
```typescript
const items = await client.fetch(`
  *[_type == "lookbookItem"] | order(order asc, date desc)
`)
```

### Get featured lookbook items only
```typescript
const featured = await client.fetch(`
  *[_type == "lookbookItem" && featured == true] | order(order asc)
`)
```

### Get lookbook items by category
```typescript
const items = await client.fetch(`
  *[_type == "lookbookItem" && category == $category]
`, { category: 'fashion' })
```

### Get lookbook item with all images
```typescript
const item = await client.fetch(`
  *[_type == "lookbookItem" && slug.current == $slug][0] {
    ...,
    images[] {
      asset->,
      alt,
      caption
    }
  }
`, { slug: 'your-slug' })
```

## Image URL Helpers

### Basic image URL
```typescript
import { urlFor } from './lib/sanity'

const imageUrl = urlFor(image).url()
```

### Resized image
```typescript
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .url()
```

### Image with quality
```typescript
const imageUrl = urlFor(image)
  .width(800)
  .quality(80)
  .url()
```

### Auto format (WebP when supported)
```typescript
const imageUrl = urlFor(image)
  .width(800)
  .auto('format')
  .url()
```

### Responsive image URLs
```typescript
const srcSet = [
  urlFor(image).width(400).url() + ' 400w',
  urlFor(image).width(800).url() + ' 800w',
  urlFor(image).width(1200).url() + ' 1200w',
].join(', ')
```

## Advanced Queries

### Count total posts
```typescript
const count = await client.fetch(`
  count(*[_type == "blogPost"])
`)
```

### Search blog posts by title or description
```typescript
const results = await client.fetch(`
  *[_type == "blogPost" && (
    title match $searchTerm ||
    description match $searchTerm
  )]
`, { searchTerm: '*nutrition*' })
```

### Get related posts (same category)
```typescript
const related = await client.fetch(`
  *[_type == "lookbookItem" && category == $category && _id != $currentId] [0...3]
`, { 
  category: 'fashion',
  currentId: 'current-item-id'
})
```

### Pagination
```typescript
const pageSize = 10
const page = 1
const start = (page - 1) * pageSize
const end = start + pageSize

const posts = await client.fetch(`
  *[_type == "blogPost"] | order(pubDate desc) [$start...$end]
`, { start, end })
```

## Projection (Select Specific Fields)

### Only get specific fields
```typescript
const posts = await client.fetch(`
  *[_type == "blogPost"] {
    title,
    slug,
    description,
    "imageUrl": heroImage.asset->url
  }
`)
```

### Rename fields in results
```typescript
const posts = await client.fetch(`
  *[_type == "blogPost"] {
    "heading": title,
    "summary": description,
    "link": slug.current
  }
`)
```

## References and Joins

### Get referenced data
```typescript
const post = await client.fetch(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ...,
    "author": author->{
      name,
      image
    }
  }
`, { slug: 'your-slug' })
```

## Useful Tips

### Check if field exists
```typescript
*[_type == "blogPost" && defined(heroImage)]
```

### Case-insensitive search
```typescript
*[_type == "blogPost" && lower(title) match lower($term)]
```

### Get unique categories
```typescript
*[_type == "lookbookItem"].category | unique()
```

### Sort by multiple fields
```typescript
*[_type == "lookbookItem"] | order(featured desc, order asc, date desc)
```

## Testing Queries

Use the Vision plugin in Sanity Studio to test queries:
1. Open Sanity Studio
2. Click "Vision" in the sidebar
3. Paste your query
4. See results instantly

## GROQ Query Language

GROQ is Sanity's query language. Learn more:
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [GROQ Reference](https://www.sanity.io/docs/groq)

## Common Patterns in This Project

### Blog Listing Page
```typescript
import { getBlogPosts } from '../lib/sanityQueries'
const posts = await getBlogPosts()
```

### Blog Detail Page
```typescript
import { getBlogPost } from '../lib/sanityQueries'
const post = await getBlogPost(Astro.params.slug)
```

### Lookbook Gallery
```typescript
import { getLookbookItems } from '../lib/lookbookQueries'
const items = await getLookbookItems()
```

### Featured Items Only
```typescript
import { getFeaturedLookbookItems } from '../lib/lookbookQueries'
const featured = await getFeaturedLookbookItems()
```

---

**Pro Tip:** Always test your queries in Vision plugin before adding them to your code!
