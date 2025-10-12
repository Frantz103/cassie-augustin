# Ludnie Cassie Augustin - Personal Portfolio Website

A personal portfolio and blog website for Ludnie Cassie Augustin, nutritionist, model, and Miss Choucoune International 2024 contestant. Built with Astro and deployed on Netlify.

## About This Project

This website showcases Cassie's work as a nutritionist passionate about women's health, her modeling portfolio, and her journey with the Miss Choucoune International pageant.

## Features

- **Home Page** - Hero section with introduction and call-to-action
- **Blog** - Content-driven blog using Astro's content collections
- **Lookbook** - Photography portfolio showcasing modeling work
- **Modal Navigation** - About, Miss Choucoune info, and Contact modals using MicroModal
- **Responsive Design** - Mobile-first design with hamburger menu
- **Downloadable Assets** - Comp card PDF available for download

## Tech Stack

- **Framework:** Astro 4.5.3
- **Styling:** Skeleton CSS + Custom CSS
- **Interactions:** MicroModal for modal dialogs
- **Testing:** Cypress for E2E testing
- **Deployment:** Netlify
- **Content:** Markdown-based blog posts with content collections

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

This site is configured for deployment on Netlify. The build settings are defined in `netlify.toml`:
- Build command: `astro build`
- Publish directory: `dist`

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

Add new images to `public/assets/img/lookbook/` and update `src/pages/lookbook.astro` to include them in the gallery grid.

## Testing

This project includes:
- **Renovate** - Automated dependency updates (configured in `renovate.json`)
- **Cypress** - E2E testing framework (currently disabled in `netlify.toml`)

## Dependencies

### Current Versions
- Astro: 4.5.3
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

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Skeleton CSS Documentation](http://getskeleton.com/)
- [MicroModal Documentation](https://micromodal.vercel.app/)

---

Built with care for Ludnie Cassie Augustin.
