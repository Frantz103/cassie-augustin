# 🎯 Your Next Steps - Sanity CMS Setup

Hey! Your Sanity CMS integration is complete and ready to go. Here's exactly what you need to do to start using it.

## ⚡ Action Items (Do These Now)

### 1. Initialize Your Sanity Project (5 minutes)

Open your terminal in the project directory:

```bash
cd sanity
npx sanity init
```

**Follow the prompts:**
- Login with GitHub, Google, or Email
- Create new project: **Yes**
- Project name: **"Cassie Augustin Portfolio"** (or whatever you like)
- Use default dataset: **Yes**
- Template: **Clean project**

**IMPORTANT:** Save the **Project ID** you get at the end!

### 2. Configure Your Environment Variables (2 minutes)

**Create `.env` file in the root directory:**

```bash
# Copy the example file
cp .env.example .env
```

**Edit `.env` and add your Project ID:**
```
PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Your actual project ID here
PUBLIC_SANITY_DATASET=production
```

**Also update these files with your Project ID:**

1. **`astro.config.mjs`** (line 7) - Replace `YOUR_PROJECT_ID`
2. **`sanity/sanity.config.ts`** (line 8) - Replace `YOUR_PROJECT_ID`

### 3. Deploy Sanity Studio (3 minutes)

```bash
npm run sanity:deploy
```

Choose a hostname (e.g., `cassie-portfolio`) and you'll get a URL like:
`https://cassie-portfolio.sanity.studio`

Save this URL - it's your content management dashboard!

### 4. Start Creating Content! (Now)

**Start Sanity Studio locally:**
```bash
npm run sanity
```
Opens at: `http://localhost:3333`

**In another terminal, start your website:**
```bash
npm run dev
```
Opens at: `http://localhost:4321`

## 📝 Creating Your First Content

### Add a Blog Post

1. Open Sanity Studio (`http://localhost:3333`)
2. Click **"Blog Post"** in the left sidebar
3. Click **"+ Create"** button
4. Fill in:
   - **Title:** "Welcome to My Blog"
   - Click **"Generate"** button next to Slug
   - **Description:** "This is my first post"
   - Upload a **Hero Image** (optional)
   - Write some content in **Body**
5. Click **"Publish"** (blue button in bottom right)

### Add Lookbook Images

1. In Sanity Studio, click **"Lookbook Item"**
2. Click **"+ Create"**
3. Fill in:
   - **Title:** Name of your shoot
   - Click **"Generate"** for slug
   - **Category:** Choose one (Fashion, Editorial, etc.)
   - **Images:** Upload your photos
   - **Featured Image:** Choose a main image
4. Click **"Publish"**

## 🌐 Deploy to Production

### Update Netlify Environment Variables

1. Go to: Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Click **"Add a variable"**
3. Add these two variables:
   - Key: `PUBLIC_SANITY_PROJECT_ID`, Value: Your project ID
   - Key: `PUBLIC_SANITY_DATASET`, Value: `production`
4. Trigger a new deploy

### Set Up Auto-Rebuild (Optional but Recommended)

**In Netlify:**
1. Go to: Site Settings → Build & deploy → Build hooks
2. Click **"Add build hook"**
3. Name it "Sanity Content Update"
4. Copy the webhook URL

**In Sanity Dashboard:**
1. Go to: https://www.sanity.io/manage
2. Select your project
3. Click **"API"** tab
4. Click **"Create webhook"**
5. Paste the Netlify hook URL
6. Select triggers: **Create**, **Update**, **Delete**
7. Save

Now your site rebuilds automatically when you update content!

## 📚 Documentation Guide

We've created several guides for you:

### For Getting Started
- **QUICKSTART.md** ⭐ Start here! 5-minute setup
- **IMPLEMENTATION_SUMMARY.md** - What's been done

### For Using Sanity
- **SANITY_SETUP.md** - Complete setup guide with troubleshooting
- **SANITY_QUERIES.md** - Query examples for developers

### For Reference
- **README.md** - Updated with Sanity info

## 🎨 Using Sanity Content in Your Pages

We've created example files showing how to use Sanity:

### Example Blog Page
`src/pages/blog-sanity.astro` - Shows how to list blog posts

### Helper Functions Already Set Up
```typescript
// Get all blog posts
import { getBlogPosts } from '../lib/sanityQueries'
const posts = await getBlogPosts()

// Get single blog post
import { getBlogPost } from '../lib/sanityQueries'
const post = await getBlogPost('slug-here')

// Get lookbook items
import { getLookbookItems } from '../lib/lookbookQueries'
const items = await getLookbookItems()

// Generate image URLs
import { urlFor } from '../lib/sanity'
const imageUrl = urlFor(image).width(800).url()
```

## 💡 Important Tips

### Always "Publish" Content
- Clicking "Save" only saves a draft
- You must click "Publish" for content to appear on your site

### Quick Rollback (Disable Sanity)
- Set `PUBLIC_USE_SANITY=false` in your `.env` (and Netlify env vars) to temporarily use the original Markdown blog and static lookbook without removing any CMS setup.

### Generate Slugs Automatically
- Always use the "Generate" button for slugs
- Don't type slugs manually

### Add Alt Text to Images
- Good for SEO and accessibility
- Makes your site more professional

### Preview Your Changes
- Content appears immediately in Sanity Studio
- Your website needs to rebuild to show changes
- With webhooks, this happens automatically!

## ❓ Common Questions

**Q: How much does Sanity cost?**
A: The free tier includes 3 users, unlimited API requests, and 10GB bandwidth. Perfect for personal sites!

**Q: Can I edit content from my phone?**
A: Yes! After deploying Sanity Studio, you can access it from any device.

**Q: What if I make a mistake?**
A: Sanity has version history. You can restore previous versions of content.

**Q: Can multiple people edit content?**
A: Yes! The free tier supports up to 3 users.

**Q: Do I need to know coding?**
A: No! Sanity Studio is designed for non-technical users. It's like using a modern app.

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Sanity Studio won't start
```bash
cd sanity
npx sanity start
```

### Images not showing
- Check `.env` has correct Project ID
- Make sure content is Published (not just saved)
- Restart dev server: Stop and run `npm run dev` again

### Content not updating on live site
- Check Netlify environment variables
- Make sure content is Published
- Trigger a manual deploy in Netlify

## 🎉 You're All Set!

Everything is configured and ready. Just follow the action items above and you'll be creating content in no time!

**Need Help?**
- Check SANITY_SETUP.md for detailed guides
- Visit https://www.sanity.io/docs
- Join Sanity community: https://slack.sanity.io

---

**Pro Tip:** Start by creating 2-3 blog posts and uploading some lookbook images to get comfortable with Sanity Studio. It's easier than you think!

Ready to get started? Run these commands:

```bash
cd sanity
npx sanity init
```

Let's go! 🚀
