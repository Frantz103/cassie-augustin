# Ludnie Cassie Augustin - Personal Portfolio Website

A personal portfolio and blog website for Ludnie Cassie Augustin, nutritionist and model passionate about empowering women through wellness. Built with Astro and deployed on Netlify.

## About This Project

This website showcases Cassie's work as a nutritionist passionate about women's health, her modeling portfolio, and her platform for wellness education and inspiration.

## Features

- **Home Page** - Hero section with "Let's Connect" CTA to engage with visitors
- **Blog** - Content-driven blog with wellness and nutrition insights
- **Lookbook** - High-end editorial portfolio with fashion magazine aesthetic
  - Dynamic asymmetric grid layout
  - Full-width hero images, two-column, three-column variations
  - Elegant typography with wide letter spacing
  - Professional hover effects and smooth transitions
  - Comp card download CTA
- **Modal Navigation** - About and Contact modals using MicroModal
- **Responsive Design** - Mobile-first design with optimized typography
- **Contact Integration** - Direct links to Instagram (@cassie.augustin) and email
- **Downloadable Assets** - Professional comp card PDF available

## Tech Stack

- **Framework:** Astro 5.14.4
- **Styling:** Skeleton CSS + Custom CSS with optimized typography
- **Interactions:** MicroModal for modal dialogs
- **Testing:** Cypress for E2E testing
- **Deployment:** Netlify with continuous deployment
- **Content:** Markdown-based blog posts with content collections
- **Analytics:** Google Analytics integration

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to view the site locally.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This site is deployed on Netlify with continuous deployment from the `main` branch.

### Netlify Configuration

Build settings are defined in `netlify.toml`:
- **Base directory:** Leave blank (uses root)
- **Build command:** `astro build`
- **Publish directory:** `dist`

### Manual Deployment

If you need to deploy manually:

```bash
npm run build
netlify deploy --prod
```

Or set up a new site:

```bash
netlify init
```

---

## Project Structure

```
/
├── public/
│   ├── assets/
│   │   ├── Docs/              # PDF files (comp card)
│   │   ├── icons/             # UI icons
│   │   ├── img/               # Images
│   │   │   └── lookbook/      # Modeling portfolio photos
│   │   └── js/                # Client-side JavaScript
│   ├── favicon.ico
│   ├── skeleton.css
│   ├── normalize.css
│   └── modal.css
├── src/
│   ├── components/
│   │   ├── BaseHead.astro     # HTML head meta tags
│   │   ├── BlogPost.astro     # Blog post component
│   │   ├── Footer.astro       # Site footer with navigation
│   │   ├── FormattedDate.astro
│   │   ├── Header.astro       # Site header with menu
│   │   ├── Layout.astro       # Main layout wrapper
│   │   └── Modal.astro        # MicroModal dialogs
│   ├── content/
│   │   ├── blog/              # Blog post markdown files
│   │   │   └── post-1.md
│   │   └── config.ts          # Content collection schema
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing page
│   │   │   └── [...slug].astro # Dynamic blog post pages
│   │   ├── index.astro        # Home page
│   │   └── lookbook.astro     # Photo gallery page
│   └── styles/
│       ├── base.css           # Main styles
│       ├── blog.css           # Blog-specific styles
│       └── modal.css          # Modal styles
├── astro.config.mjs
├── netlify.toml
└── package.json
```

### Key Directories

- **`src/pages/`** - File-based routing. Each `.astro` file becomes a route
- **`src/content/`** - Content collections for blog posts with type-safe frontmatter
- **`src/components/`** - Reusable Astro components
- **`public/`** - Static assets served as-is

## Styling

The site uses a combination of:
- **Skeleton CSS** - Lightweight responsive grid framework
- **Normalize.css** - Cross-browser consistency
- **Custom CSS** - Located in `src/styles/` for component-specific styling

The color scheme features warm tones with `#FFF0E1` (off-white/peach) as the primary background color.

## Available Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run start`   | Alias for `npm run dev`                      |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Content Management

### Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with required fields:

```yaml
---
title: "Your Post Title"
pubDate: 'Month Day, Year'
description: "Post description"
author: "Ludnie Cassie Augustin"
heroImage: '/path/to/image.jpg' # Optional
url: 'post-slug' # Optional
---
```

3. The blog post will automatically appear in the blog listing

### Updating Lookbook Photos

1. Add new images to `public/assets/img/lookbook/`
2. Update `src/pages/lookbook.astro` to include them in the editorial grid
3. Use the grid-item classes for layout control:
   - `.featured` - Full-width hero shots (16:9)
   - `.half` - Two-column layout (4:5)
   - `.third` - Three-column layout (3:4)
   - `.two-thirds` + `.one-third` - Asymmetric split
4. Maintain visual rhythm by mixing layout variations

## Testing

This project includes:
- **Renovate** - Automated dependency updates (configured in `renovate.json`)
- **Cypress** - E2E testing framework (currently disabled in `netlify.toml`)

## Recent Updates (2025)

- ✅ Updated Astro from 4.5.3 to 5.14.4
- ✅ **Redesigned Lookbook** - Complete high-end editorial makeover with:
  - Minimalist, fashion-forward layout inspired by Vogue/Harper's Bazaar
  - Dynamic asymmetric grid (featured, half, third, 2/3-1/3 layouts)
  - Elegant hero section with vintage typography
  - Subtle hover interactions and smooth transitions
  - Removed lookbook modal in favor of dedicated page
- ✅ Improved typography and readability across the site
- ✅ Enhanced SEO with meta tags and Open Graph integration
- ✅ Updated homepage CTA from pageant voting to "Let's Connect"
- ✅ Refreshed contact modal with Instagram and email links
- ✅ Streamlined navigation (removed outdated pageant references)
- ✅ Added focus states for better accessibility
- ✅ Optimized line heights and font sizes for comfortable reading

## Dependencies

### Current Versions
- Astro: 5.14.4
- @astrojs/react: 3.0.10
- MicroModal: 0.4.10
- Cypress: 13.6.6

### Updating Dependencies

To check for outdated packages:
```bash
npm outdated
```

To update packages:
```bash
npm update
```

## Connect with Cassie

- **Instagram:** [@cassie.augustin](https://www.instagram.com/cassie.augustin)
- **Email:** augustincassie@gmail.com

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Skeleton CSS Documentation](http://getskeleton.com/)
- [MicroModal Documentation](https://micromodal.vercel.app/)
- [Netlify Documentation](https://docs.netlify.com)

---

Built with care for Ludnie Cassie Augustin | Last updated: January 2025
