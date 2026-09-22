# Deployment Guide

## Netlify Deployment

### Automatic Deployment

1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
3. Environment variables (if needed)
4. Custom domain setup

### Manual Deployment

```bash
pnpm build
netlify deploy --prod --dir=dist
```

## Performance Optimization

- Enable asset optimization in Netlify
- Configure caching headers (already in netlify.toml)
- Set up form handling for contact forms
- Enable branch deploys for testing

## Environment Variables

Create environment variables in Netlify dashboard:

- `VITE_SITE_URL` - Production site URL
- `VITE_GA_TRACKING_ID` - Google Analytics ID (optional)
- `VITE_HOTJAR_ID` - Hotjar tracking ID (optional)

## Custom Domain

1. Add custom domain in Netlify dashboard
2. Configure DNS records:
   - A record: `185.199.108.153`
   - CNAME record: `www` → `your-site.netlify.app`
3. Enable HTTPS (automatic with Let's Encrypt)

## Monitoring

- Set up uptime monitoring
- Configure performance alerts
- Monitor Core Web Vitals
- Track form submissions
