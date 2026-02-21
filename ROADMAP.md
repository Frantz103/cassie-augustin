# Cassie Augustin — Feature Roadmap

> Strategic features ranked by ROI for [cassieaugustin.com](https://cassieaugustin.com)

---

## Phase 1: Revenue & Lead Generation

### 1.1 Email Capture + Lead Magnet
**Impact:** High | **Effort:** Low | **Priority:** Now

The single highest-ROI addition. Builds an owned audience independent of social algorithms.

- Free downloadable (e.g., "7-Day Nourished Meal Plan" PDF) gated behind email signup
- Inline signup form on homepage hero area + blog sidebar + dedicated landing page
- Integration: Netlify function → ConvertKit or Mailchimp
- Follow-up: automated welcome sequence (3-4 emails introducing Cassie's story, services, and a consultation CTA)

**Success metric:** Email list growth rate, conversion to consultation bookings

---

### 1.2 Consultation Booking Widget
**Impact:** High | **Effort:** Low | **Priority:** Now

Replaces the generic contact form with a frictionless scheduling experience.

- Embed Cal.com or Calendly on `/contact` (and a floating CTA on other pages)
- Offer tiered options: free 15-min discovery call, paid full consultation
- Sanity-managed: consultation types, pricing, availability description
- Add `Service` structured data for Google rich results

**Success metric:** Booking conversion rate vs. current contact form submissions

---

## Phase 2: Organic Growth & SEO

### 2.1 Blog Category Pages + Internal Linking
**Impact:** High | **Effort:** Medium | **Priority:** Next

Turns the blog from a content dump into an SEO engine.

- Add `category` field to blog schema (nutrition, wellness, modeling, lifestyle)
- Create `/blog/[category]` routes with filtered post listings
- "Related Articles" component at bottom of each blog post (same category, max 3)
- Breadcrumbs with structured data on blog posts
- XML sitemap already exists — categories auto-included

**Success metric:** Organic search traffic, average pages per session

---

### 2.2 Enhanced Testimonials
**Impact:** Medium | **Effort:** Low | **Priority:** Next

Strengthens social proof and unlocks Google review rich snippets.

- Add client photo + role/title fields to testimonial schema in Sanity
- Implement `Review` + `AggregateRating` JSON-LD structured data
- Dedicated `/testimonials` page with full reviews (homepage shows top 3)
- CTA after each testimonial: "Ready to start your journey?"

**Success metric:** Click-through on consultation CTA from testimonials section

---

## Phase 3: Engagement & Retention

### 3.1 Instagram Feed Integration
**Impact:** Medium | **Effort:** Low | **Priority:** After Phase 2

Keeps the site feeling alive without manual content updates.

- Pull latest 6-8 posts via Instagram Basic Display API or a service like Behold
- Display as a grid section on homepage below testimonials
- Link each tile to the original IG post
- Fallback: static grid if API is down

**Success metric:** Cross-platform follower growth, time on site

---

### 3.2 Services / Offerings Page
**Impact:** Medium | **Effort:** Medium | **Priority:** After Phase 2

A dedicated page that clearly communicates what Cassie offers and at what price point.

- Sanity-managed service cards: title, description, price, CTA
- Structured as tiers (e.g., single consultation, meal plan package, ongoing coaching)
- Each card links to the booking widget with the service pre-selected
- `Service` and `Offer` schema markup for search visibility

**Success metric:** Booking rate from services page, average revenue per client

---

## Phase 4: Authority & Brand

### 4.1 Resource Hub / Free Content Library
**Impact:** Medium | **Effort:** Medium | **Priority:** Later

Positions Cassie as a go-to authority in nutrition + wellness.

- Curated collection of guides, checklists, and mini-courses
- Some gated (email required), some open (SEO value)
- Categories: meal prep, women's health, pre-pageant nutrition, wellness basics
- Sanity schema: `resource` type with title, description, category, file/link, gated boolean

**Success metric:** Email signups from gated resources, backlinks to resource pages

---

### 4.2 Press / Media Kit Page
**Impact:** Low | **Effort:** Low | **Priority:** Later

Makes it easy for journalists, event organizers, and brands to feature Cassie.

- Professional headshots (downloadable)
- Bio in multiple lengths (50 words, 150 words, full)
- Key facts: credentials, pageant titles, notable press
- Contact for bookings/press inquiries
- Sanity-managed so Cassie can update without code changes

**Success metric:** Inbound press/brand inquiries

---

## Implementation Notes

| Phase | Timeline | Key Dependency |
|-------|----------|----------------|
| Phase 1 | 1-2 weeks | Email provider account (ConvertKit recommended) |
| Phase 2 | 2-3 weeks | Blog content pipeline (Cassie writing consistently) |
| Phase 3 | 1-2 weeks | Instagram API access / Behold account |
| Phase 4 | 2-3 weeks | Content creation (guides, media assets) |

**Tech stack remains:** Astro + Sanity CMS + Netlify. All features are additive — no architectural changes needed. Every new content type is Sanity-managed so Cassie can update without developer involvement.

**The golden rule:** Every page should have exactly one clear CTA. Don't let visitors leave without either joining the email list or booking a consultation.
