# 🚀 Quick Start Guide - Sanity CMS

## ⚡ Get Started in 5 Minutes

### 1️⃣ Initialize Sanity (First Time Only)

```bash
cd sanity
npx sanity init
```

Follow the prompts and **save your Project ID**!

### 2️⃣ Add Your Project ID

Create `.env` file in the root directory:

```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
```

Also update these files with your Project ID:
- `astro.config.mjs` (line 7)
- `sanity/sanity.config.ts` (line 8)

### 3️⃣ Deploy Sanity Studio

```bash
npm run sanity:deploy
```

You'll get a studio URL like: `https://your-project.sanity.studio`

### 4️⃣ Start Creating Content!

**Open Sanity Studio:**
```bash
npm run sanity
```
Visit: `http://localhost:3333`

**Run Your Website:**
```bash
npm run dev
```
Visit: `http://localhost:4321`

## 📝 Creating Content

### Add a Blog Post
1. Open Sanity Studio
2. Click "Blog Post" → "Create"
3. Fill in title, description, and content
4. Click "Generate" for the slug
5. Add images if you want
6. Click "Publish" (not just save!)

### Add Portfolio Images
1. Open Sanity Studio
2. Click "Lookbook Item" → "Create"
3. Upload your images
4. Add title and description
5. Select category (Fashion, Editorial, etc.)
6. Click "Publish"

## 🌐 Deploy to Netlify

1. Push your code to GitHub
2. In Netlify, add environment variables:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET` = `production`
3. Deploy!

## 🔗 Set Up Auto-Rebuild

1. **Netlify**: Create a build hook (Settings → Build hooks)
2. **Sanity Dashboard**: Add webhook with Netlify hook URL
3. Now your site rebuilds when you update content!

## 📚 Example Pages

We've created example pages to show you how to use Sanity:
- `/blog-sanity` - Shows all blog posts from Sanity

You can use these as templates for your own pages!

## 🆘 Need Help?

Check the full guide: `SANITY_SETUP.md`

---

**Remember:** Always click "Publish" in Sanity Studio, not just "Save"!
