# Techlis - AI Software Development Company Landing Page

## Project Overview

A professional, luxury static landing page for an AI/software development startup built with React, TypeScript, and Tailwind CSS. This is a complete, production-ready website with:

- Beautiful Tailwind CSS styling (24.30 kB CSS bundle)
- Responsive design that works on all devices
- Smooth animations with Framer Motion
- Professional UI components with proper styling
- Complete sections: Hero, Services, About, Technologies, CTA
- Working contact form with validation
- SEO optimized with meta tags and structured data
- Performance optimized build process

### Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v3.4 + Framer Motion
- **UI Components**: Custom components with Radix UI primitives
- **Routing**: React Router DOM v7
- **Testing**: Vitest + Testing Library
- **Deployment**: Netlify with CI/CD

### Performance Metrics

- **Bundle Size**: 125KB gzipped (target: <200KB)
- **CSS Size**: 24.30KB (includes all Tailwind utilities)
- **Build Time**: ~2 seconds
- **Dev Server**: Hot reload in <100ms

## Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Card, Input, Textarea
│   ├── layout/       # Header, Footer, Layout
│   ├── sections/     # Hero, Services, About, Technologies, CTA
│   ├── blog/         # Blog components
│   └── common/       # Reusable components
├── pages/            # Home, About, Services, Blog, Contact
├── lib/              # Utilities, constants, types, services
├── content/          # Static content and data
├── styles/           # Global Tailwind CSS
└── __tests__/        # Test files organized by type
```

## Building and Running

### Package Manager

This project uses `pnpm` for package management. If you previously used npm, simply run `pnpm install` to migrate.

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Quality Assurance Commands

```bash
# Run tests with Vitest
pnpm test

# ESLint code checking
pnpm lint

# Prettier code formatting
pnpm format

# TypeScript validation
pnpm type-check

# Bundle analysis
pnpm build:analyze

# Build optimization
pnpm build:optimize
```

## Development Conventions

### Coding Style

- **TypeScript**: All code is written in TypeScript with strict typing
- **ESLint**: Enforces consistent coding style with key rules:
  - `@typescript-eslint/no-unused-vars`: "error"
  - `prefer-const`: "error"
  - `no-var`: "error"
- **Prettier**: Automatic code formatting
- **File Naming**: Components and pages use PascalCase (e.g., `MyComponent.tsx`)

### Component Structure

The project follows an atomic design methodology:

- **`ui`**: Basic UI elements like buttons, cards, and inputs
- **`layout`**: Layout components like `Header`, `Footer`, and `Layout`
- **`sections`**: Main sections of the website (Hero, Services, About, etc.)
- **`blog`**: Components specific to the blog functionality
- **`common`**: Reusable components that don't fit into other categories

### State Management

For this static site, complex state management libraries are not necessary. Component-level state managed with `useState` and `useReducer` is preferred.

### Testing

The project uses Vitest and React Testing Library:

- **Unit Tests**: For individual components and functions
- **Integration Tests**: For testing interaction between multiple components
- **Component Tests**: Located in `src/__tests__/components/`
- **Page Tests**: Located in `src/__tests__/pages/`
- **Service Tests**: Located in `src/__tests__/services/`

## Design System

### Colors

- **Primary**: Blue (#3b82f6) with gradient variations
- **Luxury**: Gold (#fbbf24) for premium CTAs
- **Accent**: Purple (#8b5cf6) for highlights
- **Grays**: Full spectrum for text and backgrounds

### Typography

- **Font**: Inter (loaded from Google Fonts) for body text
- **Mono**: JetBrains Mono for code snippets
- **Scales**: Responsive text sizing
- **Weights**: 400, 500, 600, 700

### Animations

- **Framer Motion**: For page transitions and complex animations
- **Custom CSS**: Keyframes for micro-interactions (fade-in, slide-up, float)

## Content Management

### Static Content

All website content is centralized for easy updates:

- **Configuration**: `src/lib/constants.ts` contains site configuration, navigation, and company data
- **Services Data**: `src/content/data/services.json` contains detailed service offerings
- **Blog Configuration**: RSS feeds and categories defined in `src/lib/constants.ts`

### Blog System

The blog system integrates content from premium tech blogs:

- **RSS Integration**: 6 premium tech blogs (Machine Learning Mastery, AWS, DEV, etc.)
- **Content Filtering**: Posts categorized by keywords (AI-ML, Software Dev, Web-Mobile, Cloud-DevOps)
- **Caching**: 30-minute cache for performance
- **Error Handling**: Fallback content when feeds fail

## Customization

### Content Updates

- Edit `src/lib/constants.ts` for site configuration and copy
- Update `src/content/data/services.json` for service offerings
- Modify files in `src/content/` for static content

### Styling Customization

- Edit `tailwind.config.ts` to change the color scheme
- Modify `src/styles/globals.css` for global styles and utilities

### Component Customization

- All components are in `src/components/` for easy editing
- UI components use class-variance-authority for consistent variants

## Deployment

### Netlify Configuration

- **Build Command**: `pnpm build`
- **Publish Directory**: `dist`
- **Performance Headers**: Optimized caching for assets
- **Security Headers**: XSS, CSRF protection
- **Redirects**: SPA routing support

### Environment Variables

Key environment variables for production:

- `VITE_RSS2JSON_API_KEY`: Required for blog RSS feed integration
- `VITE_SITE_URL`: Required for proper SEO meta tags
- `VITE_APP_ENV`: Environment detection (development/production)

## Key Files to Reference

- `src/App.tsx`: Main application component with routing
- `src/lib/constants.ts`: Site configuration and static content
- `src/components/sections/CTA.tsx`: Example of a complex animated component
- `src/content/data/services.json`: Service offerings data
- `tailwind.config.ts`: Design system configuration
- `package.json`: Available scripts and dependencies

## Performance Optimization

- **Bundle Splitting**: Vite config splits code into optimized chunks
- **Lazy Loading**: All page components use React.lazy() with loading skeletons
- **Image Optimization**: WebP format with proper sizing
- **Caching**: Netlify configuration with proper HTTP headers
- **Code Splitting**: Route-based splitting for faster initial loads