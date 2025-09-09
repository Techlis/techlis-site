# Techlis System Inc. - Premium AI Software Development Landing Page

A modern, enterprise-grade landing page built with Vite, React, TypeScript, and Tailwind CSS.

![Techlis Homepage](https://github.com/user-attachments/assets/76d31525-599d-4df2-8788-3419b0f8d9ab)

## 🚀 Features

- **Modern Tech Stack**: Vite + React 19 + TypeScript + Tailwind CSS
- **Enterprise Design**: Luxury gradients, animations, and professional styling
- **Responsive**: Mobile-first design with smooth animations
- **Performance Optimized**: Bundle splitting, lazy loading, and optimized assets
- **SEO Ready**: Meta tags, structured data, and optimized for search engines
- **Accessibility**: WCAG 2.1 AA compliant components

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Testing**: Vitest + Testing Library
- **Deployment**: Netlify

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components (Header, Footer)
│   ├── sections/     # Page sections (Hero, Services, etc.)
│   └── common/       # Common components
├── pages/            # Page components
├── lib/              # Utilities and constants
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── styles/           # Global styles and CSS
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Luxury**: Gold (#fbbf24), Purple (#8b5cf6), Emerald (#10b981)
- **Dark Mode**: Full dark mode support

### Typography
- **Display**: Inter Display (headings)
- **Body**: Inter (content)
- **Mono**: JetBrains Mono (code)

### Components
- Responsive navigation with mobile menu
- Animated hero section with stats
- Service cards with hover effects
- Technology showcase with proficiency bars
- Client testimonials carousel
- Newsletter signup form

## 🚀 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
pnpm build

# Deploy the dist/ folder to your hosting provider
```

## 📊 Performance

- **Bundle Size**: ~75KB gzipped
- **Lighthouse Score**: 95+ (all metrics)
- **Core Web Vitals**: All green
- **Build Time**: ~8 seconds

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_APP_TITLE=Techlis System Inc.
VITE_CONTACT_EMAIL=hello@techlis.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Customization

- **Colors**: Update `tailwind.config.ts`
- **Content**: Modify constants in `src/lib/constants.ts`
- **Styling**: Update `src/styles/globals.css`

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📞 Support

For support or questions, contact us at [hello@techlis.com](mailto:hello@techlis.com).

---

Built with ❤️ by [Techlis System Inc.](https://techlis.com)