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

## Verification Results

### Build verification
- `npm run build` (root): PASS
- `npm run build` (`sanity/`): PASS

### Security verification
- `npm audit --json` (root): 0 vulnerabilities
- `npm audit --json` (`sanity/`): 0 vulnerabilities
- `rg -n "set:html" src`: no remaining matches

## Notes
- Root Astro config no longer depends on `@sanity/astro`; the app continues to use direct `@sanity/client` data access.
- Existing functional behavior was preserved while removing HTML injection paths and tightening external-link safety.
- Existing functional behavior was preserved while separating secret-capable server data access from client-safe helpers.
