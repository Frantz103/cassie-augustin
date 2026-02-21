# Security Remediation Report

Date: 2026-02-21
Status: Completed and verified in local production builds

## Scope
- Frontend app (`src/`, `package.json`, `astro.config.mjs`, root lockfile)
- Sanity Studio (`sanity/package.json`, `sanity/package-lock.json`)

## Remediations Applied

### 1) XSS hardening for CMS-rendered text
- Removed raw HTML sinks (`set:html`) for CMS text fields.
- Added sanitization helper for CMS strings with line-break preservation.
- Files:
  - `src/lib/contentSafety.ts`
  - `src/pages/index.astro`
  - `src/components/Modal.astro`

### 2) URL validation hardening
- Added strict external URL validation utility.
- Locked Instagram URL rendering to `https` and allowed Instagram hosts only.
- Files:
  - `src/lib/contentSafety.ts`
  - `src/components/Modal.astro`

### 3) Dependency risk remediation
- Removed unused root Sanity packages that pulled vulnerable transitive chains.
- Updated root scripts to call the Studio package directly.
- Added Studio override for patched `minimatch`.
- Regenerated both lockfiles.
- Files:
  - `package.json`
  - `package-lock.json`
  - `sanity/package.json`
  - `sanity/package-lock.json`
  - `astro.config.mjs`

### 4) Explicit server/client Sanity boundary split
- Moved token-capable Sanity client logic into a server-only module.
- Kept browser-safe image URL builder in client-safe module (no secret env usage).
- Updated query modules to import server-only client.
- Files:
  - `src/lib/sanity.server.ts`
  - `src/lib/sanity.ts`
  - `src/lib/sanityQueries.ts`
  - `src/lib/lookbookQueries.ts`

### 5) CSP hardening and inline script/style removal
- Removed inline JavaScript from Astro source components/pages and moved logic to external JS assets.
- Removed inline style attributes and source `<style>` blocks from templates/components; moved rules to CSS files.
- Configured Astro to avoid inlining stylesheets.
- Tightened CSP by removing `unsafe-inline` from `style-src` and adding `object-src 'none'` / `frame-src 'none'`.
- Files:
  - `src/components/BaseHead.astro`
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/components/BlogPost.astro`
  - `src/pages/[slug].astro`
  - `src/pages/lookbook.astro`
  - `src/pages/index.astro`
  - `src/components/Modal.astro`
  - `src/styles/base.css`
  - `src/styles/blog.css`
  - `public/assets/js/site-core.js`
  - `public/assets/js/analytics-init.js`
  - `astro.config.mjs`
  - `netlify.toml`

### 6) Sanity schema and studio hardening
- Enforced stricter URL validation for `instagramUrl` (HTTPS + instagram host check).
- Enforced HTTPS-only validation for blog `externalUrl`.
- Gated Vision tool in production by default (enabled in dev or with explicit env override).
- Files:
  - `sanity/schemaTypes/siteSettings.ts`
  - `sanity/schemaTypes/blogPost.ts`
  - `sanity/sanity.config.ts`

### 7) Security CI gates
- Added GitHub Actions workflow with:
  - root app install/build/audit gates,
  - studio install/build/audit gates,
  - secret-boundary check to keep `SANITY_READ_TOKEN` server-only.
- File:
  - `.github/workflows/security-ci.yml`

### 8) GitHub security settings
- Enabled repository-level secret scanning.
- Enabled secret scanning push protection.
- `secret_scanning_validity_checks` remains disabled (platform/plan controlled).

## Verification Results

### Build verification
- `npm run build` (root): PASS
- `npm run build` (`sanity/`): PASS

### Security verification
- `npm audit --json` (root): 0 vulnerabilities
- `npm audit --json` (`sanity/`): 0 vulnerabilities
- `rg -n "set:html" src`: no remaining matches
- Dist scan: no inline `<script>` blocks without `src` and no inline `<style>` blocks in generated HTML

## Notes
- Root Astro config no longer depends on `@sanity/astro`; the app continues to use direct `@sanity/client` data access.
- Existing functional behavior was preserved while removing HTML injection paths and tightening external-link safety.
- Existing functional behavior was preserved while separating secret-capable server data access from client-safe helpers.
