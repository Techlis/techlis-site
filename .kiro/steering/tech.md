# Technology Stack

## Build System & Framework

- **Build Tool**: Vite 7.1.2 (fast development and optimized production builds)
- **Framework**: React 19 + TypeScript
- **Package Manager**: pnpm (preferred over npm/yarn)
- **Node Version**: Compatible with ES2015+ target

## Core Dependencies

- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3.4 + tailwindcss-animate
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Development Tools

- **TypeScript**: ~5.8.3 with strict configuration
- **ESLint**: v9 with React/TypeScript rules
- **Prettier**: Code formatting
- **Testing**: Vitest + Testing Library + jsdom
- **Bundling**: Rollup with manual chunks for optimization

## Common Commands

```bash
# Development
pnpm install          # Install dependencies
pnpm dev             # Start dev server (localhost:3000)

# Building & Testing
pnpm build           # Production build (includes TypeScript compilation)
pnpm preview         # Preview production build
pnpm test            # Run tests with Vitest
pnpm test:ui         # Run tests with UI

# Code Quality
pnpm lint            # ESLint checking
pnpm lint:fix        # Auto-fix ESLint issues
pnpm format          # Prettier formatting
pnpm type-check      # TypeScript validation without emit

# Analysis
pnpm build:analyze   # Bundle analysis
```

## Path Aliases

- `@/` → `./src/` (configured in vite.config.ts and tsconfig)
- `@/components` → `./src/components`
- `@/lib` → `./src/lib`
- `@/hooks` → `./src/hooks`

## Performance Targets

- Bundle size: <200KB gzipped
- CSS size: ~24KB (Tailwind optimized)
- Build time: ~2 seconds
- Dev server hot reload: <100ms

## Deployment

- **Platform**: Netlify with CI/CD
- **Configuration**: netlify.toml with redirects and headers
- **Build Command**: `pnpm build`
- **Publish Directory**: `dist`
