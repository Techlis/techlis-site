# Techlis Systems Inc. Website

Techlis Systems Inc. website is a Gatsby React static site generator application showcasing software development & consulting services, mobile apps, and company portfolio. The site is built with Gatsby v4.9.2, React, and SCSS styling.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Environment Setup
- **CRITICAL**: Use Node.js v14.15.0 (specified in .nvmrc). The README mentions v12.22.6 but this is outdated.
- Install and use nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
- Load nvm: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
- Install correct Node version: `nvm install v14.15.0 && nvm use`
- Install dependencies: `npm install` -- takes ~1 minute 15 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
  - **Expected**: npm lockfile version warning (npm v6.14.8 with lockfileVersion@2)
  - **Expected**: 282 vulnerabilities reported (26 low, 66 moderate, 154 high, 36 critical) - these are in dependencies and not blocking

### Build and Development
- **Build production**: `npm run build` -- takes ~2 minutes 45 seconds. NEVER CANCEL. Set timeout to 10+ minutes.
  - **Expected**: "Browserslist: caniuse-lite is outdated" warning - not blocking
  - **Expected**: Image processing jobs take significant time during build
- **Development server**: `npm run develop` -- takes ~45 seconds to start + image processing time. NEVER CANCEL. Set timeout to 5+ minutes.
  - Runs on http://localhost:8000/ (will prompt for alternative port if occupied)
  - GraphiQL available at http://localhost:8000/___graphql
  - **Expected**: Warning about unused 'ProjectSection' import in src/pages/projects.js
- **Serve production build**: `npm run serve` -- serves from public/ directory on port 9000 (will prompt for alternative)
- **Format code**: `npm run format` -- takes ~9 seconds. Formats all JS files with Prettier
- **Clean build artifacts**: `npm run clean` -- takes ~1 minute. NEVER CANCEL. Set timeout to 3+ minutes.

### Test Infrastructure
- **No test suite**: `npm run test` exits with error "no test specified" - this is expected
- Manual validation is required for all changes (see Validation section below)

## Validation

### Manual Testing Requirements
After making any changes, ALWAYS run through these validation scenarios:

1. **Homepage Functionality**:
   - Navigate to http://localhost:8000/ (or alternative port)
   - Verify "Techlis Systems Inc." title displays
   - Check "Our recent work" section shows 8 project tiles
   - Verify "Our Services" section with "We Design", "We Develop", "We Deliver"
   - Test "Exploring" section with App Store links (Apple, Google Play, Other Store)
   - Check "Our Blogs" section displays 3 blog posts with dates and excerpts

2. **Navigation and Portfolio**:
   - Click "Full Portfolio" link to navigate to /projects
   - Verify projects page shows detailed project cards with images
   - Test individual project links (NFB Film App, Novie, Driving Test, etc.)
   - Navigate back to homepage using "Techlis Systems Inc." logo

3. **Contact Form**:
   - Scroll to "Have a project in mind?" section
   - Fill out Name, Email, and Message fields
   - Verify form accepts input (submission handling not implemented)
   - Test "Clear" button functionality

4. **External Links**:
   - Test App Store links open correctly
   - Verify social media links (GitHub, LinkedIn) in footer
   - Check email link (contact@techlis.com) works

### Code Quality
- **Always run**: `npm run format` before making changes to ensure consistent code style
- Format follows Prettier config: trailing commas, no semicolons, single quotes
- **No linting**: No ESLint configuration exists - rely on development server warnings

### Performance Notes
- Image processing during build/develop can take 10+ minutes for 50+ images
- Build creates optimized static files in public/ directory
- Development build is not optimized (as noted by Gatsby)

## Common Tasks

### Repository Structure
```
├── .github/              # GitHub configuration
├── .nvmrc               # Node version (v14.15.0)
├── gatsby-*.js          # Gatsby configuration files
├── package.json         # Dependencies and scripts
├── public/              # Built static files (generated)
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # React components
│   ├── constants/       # Application constants
│   ├── pages/           # Gatsby pages (routing)
│   ├── posts/           # Markdown blog posts
│   └── templates/       # Page templates
└── static/              # Static assets copied to public/
```

### Key Files
- `gatsby-config.js`: Site metadata, plugins, Google Analytics (G-KK4Q7Q9T95)
- `gatsby-node.js`: Creates blog post pages from markdown files
- `src/pages/index.js`: Homepage component
- `src/pages/projects.js`: Portfolio page
- `src/components/Layout.js`: Main layout wrapper
- `package.json`: npm scripts and dependencies

### Dependencies
- **Gatsby**: v4.9.2 (static site generator)
- **React**: v17.0.1
- **Plugins**: Google Analytics, Image processing, MDX, SASS, Sitemap
- **Styling**: SASS/SCSS for styling
- **Image Processing**: gatsby-plugin-sharp for optimized images

### Known Issues and Workarounds
1. **Node Version**: .nvmrc (v14.15.0) differs from README (v12.22.6) - use .nvmrc version
2. **Build Warnings**: "Browserslist: caniuse-lite is outdated" - can be ignored or fix with `npx browserslist@latest --update-db`
3. **npm Warnings**: Lockfile version warnings due to npm v6.14.8 - functional but not optimal
4. **Security Vulnerabilities**: 282 vulnerabilities in dependencies - consider `npm audit fix` but test thoroughly after
5. **Development Warning**: Unused import in src/pages/projects.js - can be removed if not needed
6. **Port Conflicts**: Development/serve will prompt for alternative ports - always accept

### Deployment Notes
- Site builds to static files in public/ directory
- No server-side rendering or API endpoints
- Suitable for static hosting (Netlify, Vercel, GitHub Pages)
- Google Analytics configured for production tracking
- Manifest file configured for PWA support

### Content Management
- Blog posts stored as Markdown files in src/posts/
- Projects are hardcoded in React components
- Images stored in src/assets/images/ and processed by gatsby-plugin-sharp
- Site metadata configured in gatsby-config.js

## Troubleshooting

### Build Failures
- Ensure Node v14.15.0 is active: `node --version`
- Clear cache: `npm run clean` then rebuild
- Check for syntax errors in React components
- Verify all image files exist in src/assets/images/

### Development Server Issues
- Port conflicts: Accept alternative port when prompted
- Hot reload not working: Restart development server
- Image processing hanging: Wait for completion (can take 10+ minutes)
- Memory issues: Increase Node heap size: `NODE_OPTIONS="--max_old_space_size=4096" npm run develop`

### Performance Optimization
- Build time dominated by image processing - this is normal
- Development server includes hot module replacement
- Production build includes code splitting and optimization
- Consider image compression before adding new assets