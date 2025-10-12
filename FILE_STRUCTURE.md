# 📁 Project File Structure - Sanity Integration

## New Files Added for Sanity CMS

```
cassie-augustin/
│
├── 📄 .env.example                    # Environment variables template
├── 📄 .env                            # Your config (create this - don't commit!)
│
├── 🗂️ sanity/                         # Sanity Studio folder
│   ├── 📄 sanity.config.ts           # Studio configuration
│   └── 📂 schemas/                   # Content type definitions
│       ├── 📄 index.ts               # Schema exports
│       ├── 📄 blogPost.ts            # Blog post schema
│       └── 📄 lookbookItem.ts        # Portfolio item schema
│
├── 📂 src/
│   ├── 📂 lib/                       # Helper functions
│   │   ├── 📄 sanity.ts              # Sanity client setup
│   │   ├── 📄 sanityQueries.ts       # Blog post queries
│   │   └── 📄 lookbookQueries.ts     # Lookbook queries
│   │
│   ├── 📂 components/
│   │   └── 📄 PortableText.tsx       # Rich text renderer
│   │
│   └── 📂 pages/
│       └── 📄 blog-sanity.astro      # Example blog page
│
├── 📄 astro.config.mjs                # Updated with Sanity integration
├── 📄 package.json                    # Updated with Sanity scripts
│
└── 📚 Documentation Files
    ├── 📖 START_HERE.md               # ⭐ Begin here!
    ├── 📖 QUICKSTART.md               # 5-minute setup
    ├── 📖 SANITY_SETUP.md             # Complete guide
    ├── 📖 SANITY_QUERIES.md           # Query examples
    ├── 📖 IMPLEMENTATION_SUMMARY.md   # What's been done
    └── 📖 README.md                   # Updated project README
```

## File Purposes

### Configuration Files

| File | Purpose | Action Required |
|------|---------|-----------------|
| `.env.example` | Template for environment variables | Copy to `.env` and add Project ID |
| `.env` | Your actual config | Create this, add Project ID |
| `astro.config.mjs` | Astro + Sanity integration | Add Project ID (line 7) |
| `sanity/sanity.config.ts` | Sanity Studio config | Add Project ID (line 8) |

### Schema Files (Content Types)

| File | What It Defines |
|------|----------------|
| `sanity/schemas/blogPost.ts` | Blog post structure (title, content, images, etc.) |
| `sanity/schemas/lookbookItem.ts` | Portfolio item structure (images, categories, etc.) |
| `sanity/schemas/index.ts` | Exports all schemas |

### Helper Files (For Developers)

| File | Purpose |
|------|---------|
| `src/lib/sanity.ts` | Connects to Sanity, provides image URL helper |
| `src/lib/sanityQueries.ts` | Functions to fetch blog posts |
| `src/lib/lookbookQueries.ts` | Functions to fetch lookbook items |
| `src/components/PortableText.tsx` | Renders rich text content from Sanity |

### Example Files

| File | Purpose |
|------|---------|
| `src/pages/blog-sanity.astro` | Example page showing how to list blog posts |

### Documentation Files

| File | Best For |
|------|----------|
| `START_HERE.md` | First-time setup |
| `QUICKSTART.md` | Quick reference |
| `SANITY_SETUP.md` | Detailed guide + troubleshooting |
| `SANITY_QUERIES.md` | Developers working with data |
| `IMPLEMENTATION_SUMMARY.md` | Understanding what's been integrated |

## Typical Workflow

### 1. First-Time Setup
```
📖 Read START_HERE.md
↓
🔧 Run: cd sanity && npx sanity init
↓
📝 Create .env with Project ID
↓
⚙️ Update astro.config.mjs
↓
⚙️ Update sanity/sanity.config.ts
↓
🚀 Run: npm run sanity:deploy
```

### 2. Daily Content Editing
```
💻 Terminal 1: npm run sanity
↓
🌐 Open: http://localhost:3333
↓
✍️ Create/edit content
↓
✅ Click "Publish"
```

### 3. Development
```
💻 Terminal 2: npm run dev
↓
🌐 Open: http://localhost:4321
↓
👀 See your content on the site
```

## Where to Find Things

### Want to...

**Start using Sanity?**
→ `START_HERE.md`

**Create content?**
→ Run `npm run sanity`

**See example code?**
→ `src/pages/blog-sanity.astro`
→ `src/lib/sanityQueries.ts`

**Understand schemas?**
→ `sanity/schemas/blogPost.ts`
→ `sanity/schemas/lookbookItem.ts`

**Troubleshoot issues?**
→ `SANITY_SETUP.md` (has troubleshooting section)

**Learn queries?**
→ `SANITY_QUERIES.md`

**Deploy to production?**
→ `SANITY_SETUP.md` (Deployment section)

## Important Notes

### Don't Commit These:
- `.env` (already in .gitignore)
- `node_modules/` (already in .gitignore)

### Do Commit These:
- `.env.example` (template for others)
- All `sanity/` files
- All `src/lib/` files
- Documentation files

### Access URLs:
- **Local Studio:** http://localhost:3333 (after `npm run sanity`)
- **Local Website:** http://localhost:4321 (after `npm run dev`)
- **Deployed Studio:** https://your-project.sanity.studio (after `npm run sanity:deploy`)
- **Production Site:** Your Netlify URL

## Quick Commands Reference

```bash
# First time setup
cd sanity && npx sanity init

# Daily content editing
npm run sanity                # Start Sanity Studio

# Development
npm run dev                   # Start website

# Deployment
npm run sanity:deploy         # Deploy Studio
npm run build                 # Build website
```

## Need Help?

1. Check `START_HERE.md` for setup
2. Check `SANITY_SETUP.md` for detailed help
3. Visit https://www.sanity.io/docs
4. Join Sanity Slack: https://slack.sanity.io

---

**Remember:** Sanity Studio is where you edit content. Your Astro website is where you view it!
