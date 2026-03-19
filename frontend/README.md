# Frontend — Génération du Lien

React + TypeScript + Tailwind CSS - SPA responsive

## 🚀 Quick Start

```bash
npm install
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run test:e2e   # Playwright tests
```

## 📁 Structure

```
src/
├── pages/          # Page components
├── components/     # Reusable components
├── hooks/          # Custom hooks (auth, API calls)
├── api/            # API client functions
├── store/          # Global state (Zustand, Context)
├── types/          # TypeScript types
├── utils/          # Helpers, validation
└── styles/         # Global styles
```

## 🎯 Phase 1 Tasks

**Agent Front** should work on:
- [ ] F-1.1: Setup Vite + React + TypeScript + Tailwind
- [ ] F-1.2: Design system (colors, spacing, components)
- [ ] F-1.3: Homepage (hero, sections, CTAs)
- [ ] F-1.4: Topics listing & detail pages
- [ ] F-1.5: Registration form
- [ ] F-1.6: Email verification flow
- [ ] F-1.7: Legal pages (privacy, terms, mentions)
- [ ] F-1.8: Login page
- [ ] F-1.9: Responsive testing
- [ ] F-1.10: Playwright E2E setup

👉 See `../PHASE_1_PLAN.md` for full details

## 📚 Key Files

- `.env.example` — Environment variables template
- `vite.config.ts` — Vite configuration
- `tailwind.config.ts` — Tailwind theme setup
- `tsconfig.json` — TypeScript configuration
- `.eslintrc.cjs` — ESLint rules
- `.prettierrc` — Code formatting rules

## 🔗 API Integration

Backend API runs on `http://localhost:3001`

All API calls should use the `api/` functions. Example:

```typescript
// src/api/auth.ts
export async function register(data: RegisterInput) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

## 🧪 Testing

```bash
npm run test:e2e           # Run Playwright tests
npm run test:e2e:headed    # Run with browser visible
npm run test:e2e:ui        # Run with UI
```

## 📋 Code Quality

```bash
npm run lint       # Run ESLint
npm run type-check # TypeScript check
```

## 🎨 Styling

- **Colors**: Primary blue, secondary purple, success green, error red
- **Spacing**: 4px, 8px, 12px, 16px, 24px, 32px...
- **Fonts**: System sans-serif
- See `tailwind.config.ts` for full theme

## 📖 API Contracts

All API endpoints are documented in `../API_CONTRACTS.md`

Before merging, update this file if API changes!

## 🔐 Authentication

JWT token stored in localStorage (Phase 1)
Will upgrade to httpOnly cookies in Phase 2

## 🚀 Deployment

Frontend deployed to **Vercel**:
```bash
# Automatic deploy on push to main
# Or manually: vercel deploy --prod
```

## 📞 Questions?

- Check PHASE_1_PLAN.md for tasks details
- Check CLAUDE.md for collaboration rules
- Reach out in #front-dev Slack
