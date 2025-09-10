# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build for production
pnpm preview      # Preview production build locally
```

### Quality Assurance
```bash
pnpm lint         # Run ESLint
pnpm format       # Run Prettier formatting
pnpm type-check   # Run TypeScript type checking
pnpm test         # Run Vitest tests
```

## Architecture

### Project Structure
- **src/components/**: Reusable UI components organized by purpose (ui/, layout/, sections/, blog/, common/)
- **src/pages/**: Main application pages (Home, Services, About, Blog, Contact)
- **src/lib/**: Utilities, constants, types, and service classes
- **src/content/**: Static data (JSON), copy text, and blog content
- **src/styles/**: Global Tailwind CSS configuration

### Key Patterns
- **Component Architecture**: Custom UI primitives in `components/ui/` with class-variance-authority for variants
- **Page Structure**: Each main page has dedicated components in `components/sections/` or `components/blog/`
- **Content Management**: Centralized static content in `src/content/` with configuration in `src/lib/constants.ts`
- **Routing**: React Router v7 with lazy-loaded page components in `src/pages/`

### Design System
- **Styling**: Tailwind CSS with luxury color palette (blue primary, gold CTAs, purple accents)
- **Typography**: Inter font family with JetBrains Mono for code
- **Animations**: Framer Motion for page transitions, custom CSS keyframes for micro-interactions
- **Responsive**: Mobile-first with consistent breakpoints

### Performance Optimization
- **Bundle Splitting**: Vite config splits vendor, router, UI, content, Radix UI, and utils into separate chunks
- **Lazy Loading**: All page components use React.lazy() with loading skeletons
- **Image Optimization**: WebP format with proper sizing for different breakpoints
- **Caching**: Netlify configuration optimizes asset caching with proper headers

### Blog Integration
- **RSS Feed Processing**: 6 premium tech blogs integrated via `src/lib/services/BlogService.ts`
- **Content Filtering**: Posts categorized by keywords (AI-ML, Software Dev, Web-Mobile, Cloud-DevOps)
- **Error Handling**: Fallback content when feeds fail, 30-minute cache for performance

### Development Workflow
- **Package Manager**: pnpm (migrated from npm)
- **Node Version**: 22 (specified in .nvmrc)
- **TypeScript**: Strict mode enabled with comprehensive type definitions
- **ESLint/Prettier**: Pre-configured with React and TypeScript rules