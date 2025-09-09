# Development Setup Guide

## Prerequisites

- Node.js 18+
- pnpm 8+

## Environment Setup

1. Clone repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Start development: `pnpm dev`

## Available Scripts

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm test` - Run tests
- `pnpm lint` - Code linting
- `pnpm format` - Format code
- `pnpm type-check` - TypeScript checking

## Migrating from npm

If you previously used npm, run:

```bash
pnpm install
```

This will migrate your project to pnpm and generate a `pnpm-lock.yaml`.

## Development Workflow

1. Create feature branch from `develop`
2. Make changes and test locally
3. Run linting and tests
4. Submit pull request to `develop`
5. After review, merge to `main` for deployment

## Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new components
- Use Prettier for code formatting
- Follow conventional commit messages
