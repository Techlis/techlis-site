# Environment Configuration

This document explains how to configure the environment variables and API settings for the Techlis website.

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Required Variables

```bash
# RSS2JSON API Configuration (Required for blog functionality)
VITE_RSS2JSON_API_KEY=your_rss2json_api_key_here
```

### Optional Variables

```bash
# Site Configuration
VITE_SITE_URL=https://techlis.com
VITE_SITE_NAME=Techlis
VITE_SITE_DESCRIPTION=AI Software Development Company

# Environment Configuration
VITE_APP_ENV=development

# RSS2JSON API Configuration (with defaults)
VITE_RSS2JSON_BASE_URL=https://api.rss2json.com/v1/api.json
VITE_RSS2JSON_MAX_COUNT=10
VITE_RSS2JSON_TIMEOUT=5000

# Blog Configuration
VITE_BLOG_POSTS_PER_PAGE=6

# Analytics (Optional)
VITE_GA_TRACKING_ID=
VITE_HOTJAR_ID=

# Contact Form (Netlify Forms)
VITE_NETLIFY_FORM_NAME=contact

# Social Media
VITE_TWITTER_HANDLE=@techlis
VITE_LINKEDIN_URL=https://linkedin.com/company/techlis
VITE_GITHUB_URL=https://github.com/Techlis
```

## Getting RSS2JSON API Key

1. Visit [RSS2JSON.com](https://rss2json.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `VITE_RSS2JSON_API_KEY`

## Environment-Specific Configuration

The application automatically adjusts its behavior based on the environment:

### Development Mode

- Detailed logging enabled
- Shorter cache duration (30 minutes)
- Single retry attempt for API calls
- Development utilities available at `window.devUtils`

### Production Mode

- Error-level logging only
- Longer cache duration (1 hour)
- Multiple retry attempts (3) for API calls
- Stricter validation (API key required)

### Test Mode

- Caching disabled
- Minimal logging
- Faster timeouts

## Development Utilities

In development mode, you can access debugging utilities via the browser console:

```javascript
// Log current environment configuration
window.devUtils.logEnvironmentInfo()

// Test API configuration
await window.devUtils.testAPIConfiguration()

// Clear all caches
window.devUtils.clearAllCaches()

// Export configuration for debugging
window.devUtils.exportConfiguration()

// Get configuration status
window.devUtils.getConfigurationStatus()
```

## Validation

The application validates the environment configuration on startup:

- **Development**: Warns about missing configuration but continues
- **Production**: Throws errors for missing required configuration
- **Test**: Disables features that require external APIs

## Troubleshooting

### Blog Posts Not Loading

1. Check if `VITE_RSS2JSON_API_KEY` is set
2. Test API configuration: `await window.devUtils.testAPIConfiguration()`
3. Check browser console for error messages
4. Verify API key is valid at [RSS2JSON.com](https://rss2json.com/)

### Cache Issues

1. Clear cache: `window.devUtils.clearAllCaches()`
2. Check if caching is enabled in your environment
3. Verify localStorage is available in your browser

### Configuration Errors

1. Check environment configuration: `window.devUtils.getConfigurationStatus()`
2. Verify all required environment variables are set
3. Check for typos in variable names (must start with `VITE_`)

## API Rate Limits

RSS2JSON has rate limits:

- Free tier: 10,000 requests/month
- The application implements retry logic and caching to minimize API calls
- In production, cache duration is longer to reduce API usage

## Security Notes

- Never commit your `.env` file to version control
- API keys are exposed in the client bundle (this is normal for Vite)
- Use environment-specific API keys for different deployments
- Consider upgrading to a paid RSS2JSON plan for production use
