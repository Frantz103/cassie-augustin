# Sanity CMS Setup Guide for Cassie Augustin Portfolio

## 🎉 What's Been Set Up

We've integrated Sanity CMS into your Astro portfolio website. Here's what you have:

### Content Types
1. **Blog Posts** - For nutrition articles, wellness tips, etc.
2. **Lookbook Items** - For your modeling portfolio images

## 📋 Initial Setup (One-Time)

### Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Click "Get Started" and sign up (free!)
3. You can sign up with GitHub, Google, or email

### Step 2: Initialize Your Sanity Project

Open your terminal in the project directory and run:

```bash
cd sanity
npx sanity init
```

Follow the prompts:
- **Login**: Use the account you just created
- **Create new project**: Yes
- **Project name**: "Cassie Augustin Portfolio" (or whatever you prefer)
- **Use default dataset configuration**: Yes
- **Project output path**: Press Enter (current directory is fine)
- **Select project template**: Choose "Clean project"

**Important:** After this completes, you'll get a **Project ID**. Copy this!

### Step 3: Configure Your Project

1. Create a `.env` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Project ID:
   ```
   PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   PUBLIC_SANITY_DATASET=production
   ```

3. Also update `astro.config.mjs` with your Project ID:
   - Replace `YOUR_PROJECT_ID` with your actual project ID

4. Update `sanity/sanity.config.ts`:
   - Replace `YOUR_PROJECT_ID` with your actual project ID

### Step 4: Deploy Sanity Studio

Deploy your Sanity Studio so you can access it from anywhere:

```bash
npm run sanity:deploy
```

You'll get a URL like: `https://your-project.sanity.studio`

## 🚀 Daily Usage

### Starting the Sanity Studio (Content Management)

To edit your content, run:

```bash
npm run sanity
```

This will start the Sanity Studio at `http://localhost:3333`

You can:
- ✍️ Create and edit blog posts
- 📸 Upload and organize lookbook images
- 🎨 Add image captions and descriptions
- 📅 Schedule content publication dates

### Starting Your Website (Development)

In a separate terminal, run your Astro site:

```bash
npm run dev
```

Your website will be at `http://localhost:4321`

## 📝 How to Use Sanity Studio

### Adding a Blog Post

1. Open Sanity Studio (`npm run sanity`)
2. Click "Blog Post" in the sidebar
3. Click "Create new Blog Post"
4. Fill in:
   - **Title**: Your blog post title
   - **Slug**: Click "Generate" - this creates the URL
   - **Description**: A short summary
   - **Hero Image**: Upload a featured image
   - **Publication Date**: When to publish
   - **Body**: Write your content (supports headings, bold, links, images)
   - **External URL** (optional): Link to external content

5. Click "Publish" when ready

### Adding Lookbook Items

1. Open Sanity Studio
2. Click "Lookbook Item" in the sidebar
3. Click "Create new Lookbook Item"
4. Fill in:
   - **Title**: Name of the shoot/collection
   - **Slug**: Click "Generate"
   - **Description**: Brief description
   - **Category**: Choose (Fashion, Editorial, Commercial, etc.)
   - **Images**: Upload multiple photos
   - **Featured Image**: Main image for grid view
   - **Date**: Date of the shoot
   - **Featured**: Toggle to highlight this item
   - **Display Order**: Number for sorting (lower = first)

5. Click "Publish"

## 🔧 Technical Details

### Content Structure

**Blog Post Fields:**
- Title (required)
- Slug (required, auto-generated from title)
- Description (required)
- Hero Image (optional)
- Publication Date (required)
- Updated Date (optional)
- Body (rich text with images)
- External URL (optional)

**Lookbook Item Fields:**
- Title (required)
- Slug (required)
- Description (optional)
- Category (optional)
- Images (required, multiple)
- Featured Image (optional)
- Date (date of shoot)
- Featured (boolean)
- Display Order (number)

### Fetching Data in Your Astro Pages

Blog posts are automatically available in your Astro pages. Here's an example:

```astro
---
import { getBlogPosts } from '../lib/sanityQueries'

const posts = await getBlogPosts()
---

<ul>
  {posts.map(post => (
    <li>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </li>
  ))}
</ul>
```

For lookbook items:

```astro
---
import { getLookbookItems } from '../lib/lookbookQueries'
import { urlFor } from '../lib/sanity'

const items = await getLookbookItems()
---

<div class="grid">
  {items.map(item => (
    <div>
      <img 
        src={urlFor(item.featuredImage).width(600).url()} 
        alt={item.featuredImage?.alt || item.title}
      />
      <h3>{item.title}</h3>
    </div>
  ))}
</div>
```

## 🌐 Deployment

### Netlify Environment Variables

When deploying to Netlify, add these environment variables:

1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add:
   - `PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `PUBLIC_SANITY_DATASET`: `production`

### Webhooks (Auto-rebuild on content changes)

To make your site rebuild automatically when you update content:

1. In Netlify: Site Settings → Build & deploy → Build hooks
2. Create a build hook, copy the URL
3. In Sanity Dashboard (sanity.io/manage):
   - Go to your project
   - Click "API" tab
   - Add a webhook with the Netlify hook URL
   - Select "Create", "Update", "Delete" for triggers

Now when you publish content in Sanity, your site will automatically rebuild!

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Sanity Studio won't start
Make sure you're in the right directory:
```bash
cd sanity
npx sanity start
```

### Images not showing
- Check that `PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env`
- Make sure images are published in Sanity Studio (not just drafts)

### Content not updating
- Check if you published the content (not just saved as draft)
- Verify environment variables in Netlify match your `.env` file
- Try rebuilding the site

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro + Sanity Guide](https://docs.sanity.io/docs/astro)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq) - for advanced queries

## 💡 Tips for Non-Technical Users

1. **Always click "Publish"** - Saving is not the same as publishing!
2. **Use the "Generate" button** for slugs - don't create them manually
3. **Add alt text to images** - Good for SEO and accessibility
4. **Preview your changes** - Use the deployed Sanity Studio URL
5. **Don't delete old content** - You can unpublish instead
6. **Use categories consistently** - Stick to the predefined options

## 🎯 Next Steps

1. Complete the initial setup above
2. Add your first blog post
3. Upload some lookbook images
4. Update your Astro pages to display the Sanity content
5. Deploy to Netlify with environment variables
6. Set up webhook for automatic rebuilds

Need help? Check the Sanity documentation or reach out to your developer!
