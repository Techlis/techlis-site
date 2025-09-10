# Project Structure & Organization

## Root Directory

```
├── src/                 # Source code
├── public/              # Static assets
├── docs/                # Documentation
├── .kiro/               # Kiro configuration and steering
├── dist/                # Build output (generated)
└── node_modules/        # Dependencies (generated)
```

## Source Structure (`src/`)

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn-style)
│   ├── layout/         # Layout components (Header, Footer, Layout)
│   ├── sections/       # Page sections (Hero, Services, About, etc.)
│   ├── common/         # Shared/common components
│   └── blog/           # Blog-specific components
├── pages/              # Route components (Home, About, Services, etc.)
├── lib/                # Utilities and configuration
│   ├── utils.ts        # Utility functions (cn, formatDate, etc.)
│   └── constants.ts    # Site configuration and constants
├── content/            # Static content and data
│   ├── data/           # JSON data files (services.json)
│   ├── copy/           # Copy/text content (hero.json)
│   └── blog/           # Blog posts (markdown)
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── styles/             # Global styles
│   └── globals.css     # Tailwind imports and custom CSS
└── assets/             # Local assets (images, icons)
```

## Component Organization

### UI Components (`src/components/ui/`)

- Follow shadcn/ui patterns with Radix UI primitives
- Use class-variance-authority for variant management
- Export both component and variants
- Include proper TypeScript interfaces

### Layout Components (`src/components/layout/`)

- Header: Navigation with mobile menu
- Footer: Company info and links
- Layout: Main wrapper component

### Section Components (`src/components/sections/`)

- Hero: Landing page hero section
- Services: Service showcase
- About: Company information
- Technologies: Tech stack display
- CTA: Call-to-action sections

## Content Management

### Static Data (`src/content/data/`)

- JSON files for structured data
- Services, technologies, team members
- Imported in constants.ts for type safety

### Copy Content (`src/content/copy/`)

- JSON files for text content
- Headlines, descriptions, CTAs
- Easily editable without code changes

### Blog Content (`src/content/blog/`)

- Markdown files with frontmatter
- Processed with gray-matter and marked
- Organized by date or category

## Naming Conventions

### Files & Directories

- **Components**: PascalCase (Button.tsx, Hero.tsx)
- **Pages**: PascalCase (Home.tsx, About.tsx)
- **Utilities**: camelCase (utils.ts, constants.ts)
- **Types**: camelCase (index.ts)
- **Directories**: lowercase or kebab-case

### Component Patterns

- Use named exports for components
- Include proper TypeScript interfaces
- Follow React 19 patterns (JSX.Element return type)
- Use forwardRef for UI components that need refs

## Import Patterns

- Use path aliases (`@/components`, `@/lib`, etc.)
- Group imports: React → third-party → local
- Use type imports when appropriate (`import type`)

## Configuration Files

- **components.json**: shadcn/ui configuration
- **tailwind.config.ts**: Tailwind customization
- **vite.config.ts**: Build configuration with aliases
- **tsconfig.json**: TypeScript configuration
