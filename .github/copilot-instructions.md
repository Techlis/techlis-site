# Copilot Instructions for Techlis Site

## Project Overview

- **Techlis Site** is a luxury, high-performance landing page for an AI/software development company, built with React 19, TypeScript, Vite, and Tailwind CSS.
- The codebase is modular, with clear separation of UI, layout, sections, pages, and content. All styling uses Tailwind and Framer Motion for smooth animations.

## Architecture & Key Patterns

- **Component Structure:**
  - `src/components/` contains UI primitives (`ui/`), layout (`layout/`), sections (`sections/`), and common/shared components (`common/`).
  - Pages are in `src/pages/` (e.g., `Home.tsx`, `Blog.tsx`, `Contact.tsx`).
  - Static content and data live in `src/content/`.
  - Utilities, constants, and types are in `src/lib/`.
- **Styling:**
  - Tailwind CSS is configured in `tailwind.config.ts` and global styles in `src/styles/globals.css`.
  - Design system uses blue, gold, purple, and gray color palette. Font is Inter.
- **Routing:**
  - Uses React Router DOM v7 for page navigation.
- **Animations:**
  - Framer Motion is used for page and component transitions.
- **SEO & Performance:**
  - SEO meta tags and structured data are handled in `src/components/common/SEOHead.tsx`.
  - Performance optimizations include code splitting and lazy loading (`src/components/lazy/`).

## Developer Workflows

- **Install dependencies:** `pnpm install`
- **Start dev server:** `pnpm dev` (http://localhost:3000)
- **Build for production:** `pnpm build`
- **Preview build:** `pnpm preview`
- **Run tests:** `pnpm test` (Vitest + Testing Library)
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Type-check:** `pnpm type-check`
- **Deploy:** Push to main branch (Netlify auto-deploy)

## Testing & Conventions

- **Tests:**
  - All tests are in `src/__tests__/` (unit, integration, performance, SEO, accessibility).
  - Use Vitest and Testing Library for React components.
- **Error Boundaries:**
  - Custom error boundaries in `src/components/common/` (e.g., `ErrorBoundary.tsx`, `DefaultErrorFallback.tsx`).
- **Content Management:**
  - Static content is managed in `src/content/` and site config in `src/lib/constants.ts`.
- **Performance:**
  - Performance dashboard and hooks in `src/components/dev/`.

## Integration Points

- **Netlify:**
  - Deployment and redirects configured in `netlify.toml`.
  - Contact form uses Netlify Forms (see `Contact.tsx`).
- **CI/CD:**
  - Automated builds, tests, and linting via GitHub Actions.

## Project-Specific Patterns

- **Luxury design:**
  - Use gradients, gold accents, and smooth transitions for premium feel.
- **Accessibility:**
  - All components and pages must meet accessibility standards (see `src/__tests__/integration/accessibility-integration.test.tsx`).
- **SEO:**
  - Always update meta tags and structured data for new pages/components.

## Key Files & Directories

- `src/components/` — UI, layout, sections, error boundaries
- `src/pages/` — Main pages
- `src/content/` — Static content/data
- `src/lib/constants.ts` — Site config
- `tailwind.config.ts` — Design system
- `netlify.toml` — Deployment config
- `src/__tests__/` — All tests

---

**For AI agents:**

- Follow the modular structure and use existing patterns/components.
- Reference the README and this file for conventions and workflows.
- Prioritize performance, accessibility, and luxury design in all changes.
- Ask for clarification if any workflow or pattern is unclear.
