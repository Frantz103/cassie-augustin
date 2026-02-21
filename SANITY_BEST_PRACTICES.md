# Sanity.io Best Practices

Lessons learned from building the Cassie Augustin portfolio with Sanity CMS + Astro + Netlify.

---

## 1. Content Model Design

### Use singletons for one-of-a-kind pages

Pages like Homepage, About, and Site Settings should only ever have one instance. Sanity doesn't enforce this by default — you have to set it up yourself.

**What to do:**
- Assign fixed document IDs (e.g., `singleton-homepage`)
- Use a custom desk structure that opens a specific document instead of a list
- Filter out the "duplicate" and "delete" actions so editors can't break things

```typescript
// sanity.config.ts
const singletonTypes = new Set(['homepage', 'about', 'siteSettings'])

document: {
  actions: (prev, {schemaType}) => {
    if (singletonTypes.has(schemaType)) {
      return prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
    }
    return prev
  },
}
```

**Why:** Without this, a non-technical editor can create 5 homepages or delete the only one. The site query (`*[_type == "homepage"][0]`) would grab a random one or return nothing.

### Use a generic `page` type for editor-created pages

For pages like Privacy Policy, Terms of Service, or anything an editor might need in the future, create a generic `page` document type with:
- `title` (string)
- `slug` (auto-generated from title)
- `body` (portable text)
- `showInNav` (boolean — controls whether it appears in navigation)

**Why:** This lets non-technical users create new pages without developer involvement. A dynamic catch-all route (`[slug].astro`) renders them automatically.

### Validate slugs against reserved routes

If your frontend has static routes (`/blog`, `/lookbook`), add slug validation to prevent collisions:

```typescript
validation: (rule) => rule.required().custom((slug) => {
  const reserved = ['blog', 'lookbook', 'index']
  if (slug?.current && reserved.includes(slug.current)) {
    return `"${slug.current}" is reserved.`
  }
  return true
}),
```

### Keep the content model flat

Don't create a single unified "Page" type with polymorphic sections for a simple site. Flat, purpose-specific types (homepage, about, blogPost) are:
- Clearer for non-technical editors ("Edit Homepage" vs "Edit Page > Find Homepage > Edit Section")
- Simpler to query (one GROQ call per type)
- Easier to validate (each type has its own required fields)

A generic `page` type is only for truly generic content (legal pages, etc.).

---

## 2. Studio Organization

### Always add a custom desk structure

The default flat list of all document types is confusing for editors. Group them logically:

```
Content
├── Pages
│   ├── Homepage (singleton)
│   ├── About (singleton)
│   └── Other Pages (list)
├── Blog (list)
├── Lookbook (list)
└── Settings (singleton)
```

This is done via `structureTool({structure: deskStructure})` in `sanity.config.ts`.

### Set `studioHost` in `sanity.cli.ts`

Avoid being prompted for a hostname on every deploy:

```typescript
export default defineCliConfig({
  api: { projectId: 'your-id', dataset: 'production' },
  studioHost: 'your-studio-name',
  deployment: { appId: 'your-app-id', autoUpdates: true },
})
```

---

## 3. Authentication & Tokens

### Create separate tokens for separate purposes

| Token | Permission | Used For |
|-------|-----------|----------|
| Read token | Viewer | Frontend data fetching (Astro build) |
| Write token | Editor | Migration scripts, seeding content |
| Deploy token | Deploy Studio | CI/CD studio deployments |

**Never commit tokens.** Use `.env` locally and environment variables in Netlify/CI.

### The Sanity client must be configured for the token

Simply setting the env var isn't enough — you have to pass it to `createClient()`:

```typescript
const token = import.meta.env.SANITY_READ_TOKEN;
client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-01-01',
  useCdn: !token,        // CDN must be disabled for authenticated requests
  ...(token && { token }),
});
```

**Key:** `useCdn: !token` — when using a token (for drafts/preview), you must bypass the CDN. Without a token, CDN is fine for published content.

### Studio deploy requires user session, not API tokens

`sanity deploy` uses your local user session, not API tokens. Running with `SANITY_AUTH_TOKEN` uploads files but doesn't fully register the studio.

**Do this:**
1. `npx sanity login` (interactive — opens browser)
2. `npx sanity deploy`

For CI/CD, create a dedicated deploy token in the Sanity dashboard (Project > API > Tokens).

---

## 4. Frontend Integration (Astro)

### Always add `@astrojs/react` to `astro.config.mjs`

If you use `@portabletext/react` (which you will for rich text), Astro needs the React integration to render `.tsx` components. Without it, the build fails with `NoMatchingRenderer`.

```javascript
import react from '@astrojs/react';
export default defineConfig({
  integrations: [react(), sanity({...})],
});
```

### Build fallback logic correctly

When checking whether to use CMS or static content, check for **actual content**, not just whether the CMS is enabled:

```typescript
// WRONG — returns empty array, skips markdown fallback
if (useSanity()) {
  return (await getBlogPosts()).map(...)
}

// RIGHT — falls back to markdown when CMS has no content
const cmsPosts = useSanity() ? await getBlogPosts() : [];
if (cmsPosts.length) {
  return cmsPosts.map(...)
}
return (await getCollection('blog')).map(...)
```

### Project slug fields correctly in GROQ

Slug fields in Sanity store `{_type: 'slug', current: 'the-slug'}`. Always project them:

```groq
"slug": slug.current
```

Not:
```groq
slug  // Returns the full object, not the string
```

### Resolve image asset URLs in GROQ

For image fields, spread the image and resolve the asset URL:

```groq
heroImage {
  ...,
  "url": asset->url
}
```

This gives you both the `_ref` (for `urlFor()`) and the direct `url` as a fallback.

---

## 5. Deployment

### Netlify + Astro static builds

Since Astro builds static HTML at deploy time, content changes in Sanity require a rebuild. Set up a Sanity webhook to trigger Netlify builds:

1. Go to `manage.sanity.io` > Project > API > Webhooks
2. Add a new webhook pointing to your Netlify build hook URL
3. Filter to `create`, `update`, `delete` events

### CORS origins

If the Studio is hosted on `*.sanity.studio`, CORS is handled automatically. For self-hosted studios or custom domains, add the CORS origin:

```bash
npx sanity cors add https://your-domain.com --credentials
```

### Content Security Policy

If you have CSP headers (like in `netlify.toml`), allow Sanity's CDN for images:

```
img-src 'self' https://cdn.sanity.io data:;
connect-src 'self' https://cdn.sanity.io;
```

---

## 6. Content Migration

### Use `createOrReplace` with fixed IDs for singletons

```javascript
await client.createOrReplace({
  _id: 'singleton-homepage',
  _type: 'homepage',
  heroTitle: "Hi, I'm Cassie",
  // ...
});
```

This is idempotent — running it twice doesn't create duplicates.

### Portable Text blocks need `_key` and `_type`

Every block and span in Portable Text requires unique `_key` values:

```javascript
{
  _type: 'block',
  _key: 'block1',
  children: [{ _type: 'span', _key: 'span1', text: 'Hello', marks: [] }],
  markDefs: [],
}
```

Missing keys cause validation errors.

### Upload images before referencing them

Images must be uploaded to Sanity's asset pipeline first, then referenced:

```javascript
const asset = await client.assets.upload('image', fs.createReadStream(path), { filename });
const imageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
```

### Array items in images need `_key` too

When adding images to an array field (like lookbook images), each item needs a `_key`:

```javascript
images: [{ ...imageRef, _key: 'img1', alt: 'Description' }]
```

---

## 7. Common Gotchas

| Gotcha | Solution |
|--------|----------|
| Studio shows "Register this studio" after deploy | Deploy with `sanity login` user session, not API token |
| `sanity.studio` domains error "must be internal" | Don't add `.sanity.studio` URLs as custom studio hosts — they're registered automatically via `sanity deploy` |
| Astro `NoMatchingRenderer` for PortableText | Add `@astrojs/react` integration to `astro.config.mjs` |
| Blog posts missing after enabling Sanity | Check fallback logic — `if (useSanity())` skips markdown even when CMS is empty |
| Images not loading on deployed site | Check CSP headers allow `https://cdn.sanity.io` |
| `netlify-plugin-cypress` crashes build | Remove it if disabled — Netlify still tries to install dependencies even when `enable: false` |
| Token set in `.env` but client doesn't use it | Must pass `token` to `createClient()` explicitly |
| Singletons can be duplicated by editors | Add custom desk structure with fixed IDs and filtered document actions |

---

## Project-Specific Reference

| Resource | URL |
|----------|-----|
| Live site | https://cassieaugustin.com |
| Sanity Studio | https://cassie-augustin.sanity.studio |
| Sanity project | https://www.sanity.io/manage/project/gcavgznf |
| Netlify dashboard | https://app.netlify.com/projects/ludnie-cassie |
| GitHub repo | https://github.com/Frantz103/cassie-augustin |
