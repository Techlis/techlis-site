# Development Setup Guide

## Prerequisites

- Node.js 18+
- npm 9+

## Environment Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Start development: `npm run dev`

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Code linting
- `npm run format` - Format code
- `npm run type-check` - TypeScript checking

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
