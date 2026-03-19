# Phase 1: MVP Public + Inscription

**Durée estimée**: 2-3 semaines
**Lead**: Team Leader
**Validation**: Site public accessible, inscriptions fonctionnelles, déployé

---

## 🎯 Objectif Phase 1

Déployer un site public fonctionnel avec :
- Accueil attractif
- Consultation thématiques du programme
- Formulaire d'inscription sécurisé (CAPTCHA + email verification)
- Pages légales (privacy, terms, mentions)
- Design 100% responsive

**Pas de commentaires, contributions, ou back-office modération dans cette phase.**

---

## 📊 Répartition des tâches

### 🎨 Agent Front (React + TypeScript)

#### Semaine 1

- [ ] **Task F-1.1**: Setup Vite + React + TypeScript + Tailwind
  - Init project structure
  - Configure TypeScript strict mode
  - Setup Prettier + ESLint
  - Commit initial + push

- [ ] **Task F-1.2**: Design system basic
  - Créer tailwind.config.ts (colors, spacing, typography)
  - Composants réutilisables (Button, Input, Card, Modal)
  - Layout wrapper (Header, Footer, Main)
  - Document dans docs/COMPONENTS.md

- [ ] **Task F-1.3**: Page d'accueil (Homepage)
  - Hero section attractif
  - Section "À propos du mouvement" (simple)
  - CTA "Découvrir le programme"
  - CTA "S'inscrire" visible
  - Responsive mobile-first
  - Screenshot dans PR

#### Semaine 2

- [ ] **Task F-1.4**: Pages thématiques
  - Listing page (liste cartes thématiques)
  - Filtre par domaine (optionnel Phase 1, peut être en dur)
  - Détail page (affichage contenu thématique complet)
  - Navigation entre thématiques
  - Recherche par mot-clé (optionnel, peut être Phase 2)

- [ ] **Task F-1.5**: Formulaire inscription
  - Page `/auth/register`
  - Formulaire: email, password, confirm password, firstName, lastName
  - CAPTCHA widget
  - Validation côté client (React Hook Form + Zod)
  - Messages d'erreur clairs
  - Submit → Backend API call
  - Success state + redirect to email verification page

- [ ] **Task F-1.6**: Email verification flow
  - Page `/auth/verify-email` (message waiting)
  - Page `/auth/verify-email?token=XXX` (vérification automatique)
  - Success message + redirect to login
  - Error handling

#### Semaine 3

- [ ] **Task F-1.7**: Pages légales
  - Page `/privacy` (politique de confidentialité)
  - Page `/terms` (CGU)
  - Page `/mentions` (mentions légales)
  - Contenu placeholder (peut être mis à jour après)
  - Linked from footer

- [ ] **Task F-1.8**: Login page
  - Page `/auth/login` (simple, Phase 1)
  - Email + password form
  - Submit → Backend login API
  - Error handling (invalid credentials)
  - Success → Redirect to dashboard (Phase 2)
  - "Forgot password" link (sans fonctionnalité Phase 1)

- [ ] **Task F-1.9**: Responsive testing + fixes
  - Test sur mobile (iPhone 12, Pixel 5)
  - Test sur tablet (iPad)
  - Test sur desktop (1920x1080)
  - Fix breakpoints si needed
  - Accessibility basics (headings, contrast, labels)

- [ ] **Task F-1.10**: Setup Playwright + E2E tests
  - Config playwright.config.ts
  - Test: Homepage loads
  - Test: Navigation works
  - Test: Registration form submits
  - Test: Email verification link works
  - Test: Responsive (mobile, tablet, desktop)

**Dependencies**: Task F-1.2 → F-1.3, F-1.4, F-1.5 | Task F-1.5 → F-1.6 | Task F-1.8 need Backend B-1.3

---

### 🔧 Agent Back (Node.js + Express + Prisma)

#### Semaine 1

- [ ] **Task B-1.1**: Setup Node.js + Express + TypeScript
  - Init Node.js project
  - Setup Express server
  - Configure TypeScript strict mode
  - Setup ESLint + Prettier
  - Configure PORT 3001
  - Commit initial + push

- [ ] **Task B-1.2**: Setup PostgreSQL + Prisma
  - Create Neon project (or Supabase)
  - Get DATABASE_URL
  - Init Prisma (`prisma init`)
  - Create Prisma schema (Phase 1 models):
    ```prisma
    - User (id, email, passwordHash, firstName, lastName, verified, createdAt)
    - Topic (id, title, slug, summary, content, image, published, order)
    ```
  - Run first migration: `prisma migrate dev --name init_users_topics`
  - Setup Prisma client singleton

- [ ] **Task B-1.3**: Authentication foundation
  - Setup JWT (sign, verify)
  - Password hashing (bcrypt)
  - Middleware auth
  - Environment variables (.env.example filled)
  - User registration logic (service layer)
  - Document in API_CONTRACTS.md

#### Semaine 2

- [ ] **Task B-1.4**: Auth API endpoints
  - `POST /api/auth/register`
    - Validation: email format, password strength
    - Check email uniqueness
    - Hash password
    - Create User (unverified)
    - Return 201 + user ID
  - Error handling: 400, 422, 409 (conflict)
  - Log registration attempt (no password!)

- [ ] **Task B-1.5**: Email verification
  - Integration with Resend (or SendGrid)
  - Generate verification token (JWT or random)
  - Send verification email
  - `POST /api/auth/verify-email`
    - Token validation
    - Mark user as verified
    - Return 200 OK
  - `POST /api/auth/resend-verification`
    - Rate limit (1 per 5 min)
    - Resend email

- [ ] **Task B-1.6**: CAPTCHA validation
  - Setup hCaptcha or reCAPTCHA v3
  - Backend: Validate captcha token from Frontend
  - In registration endpoint
  - Log failed captcha attempts

- [ ] **Task B-1.7**: Topics API endpoints (Read-only Phase 1)
  - `GET /api/topics`
    - Return all published topics
    - Sort by order
    - Pagination (limit=20, offset=0)
    - Return: {id, title, slug, summary, image, order}
  - `GET /api/topics/:id`
    - Return full topic (with content)
    - 404 if not published or not found

#### Semaine 3

- [ ] **Task B-1.8**: Login API
  - `POST /api/auth/login`
    - Email + password
    - Check user exists + verified
    - Validate password
    - Return JWT token (24h expiration)
    - Return user data {id, email, firstName, lastName}
    - Error: 401 if invalid credentials

- [ ] **Task B-1.9**: Seed database
  - Create seed script with:
    - 2-3 sample users (for testing)
    - 10-15 sample topics (from specification)
  - Run: `npx prisma db seed`

- [ ] **Task B-1.10**: API documentation
  - Create API_CONTRACTS.md (shared with Front)
  - Document all Phase 1 endpoints
  - Response formats, error codes
  - Example requests/responses
  - Authentication requirements

- [ ] **Task B-1.11**: Setup error handling & logging
  - Custom error classes
  - Global error handler middleware
  - Winston logger
  - Request logging (no sensitive data)
  - Error responses standardized

**Dependencies**: Task B-1.2 → B-1.3 → B-1.4 | B-1.5 depend on email service | B-1.8 depend on B-1.3

---

### ✅ Agent Tests (Playwright + Jest)

#### Semaine 1-2

- [ ] **Task T-1.1**: Setup Jest + Vitest
  - Init Jest config
  - TypeScript support
  - Example tests

- [ ] **Task T-1.2**: Setup Playwright
  - playwright.config.ts
  - Base URL config (localhost:5173)
  - Headless mode
  - Screenshots on failure

#### Semaine 2-3

**Backend Unit Tests** (Jest):
- [ ] **Task T-1.3**: Auth service tests
  - registerUser happy path
  - registerUser: invalid email
  - registerUser: weak password
  - registerUser: duplicate email
  - verifyEmail success
  - verifyEmail: invalid token

- [ ] **Task T-1.4**: Password hashing tests
  - Hash password
  - Compare password (match)
  - Compare password (no match)

- [ ] **Task T-1.5**: JWT tests
  - Generate token
  - Verify token (valid)
  - Verify token (expired)
  - Verify token (invalid)

- [ ] **Task T-1.6**: Topics service tests
  - getTopics (all published)
  - getTopicById (exists, published)
  - getTopicById (not found)

**Frontend E2E Tests** (Playwright):
- [ ] **Task T-1.7**: Homepage e2e
  - Homepage loads
  - No console errors
  - CTA buttons visible
  - Navigation works

- [ ] **Task T-1.8**: Registration e2e
  - Go to `/auth/register`
  - Fill form (valid data)
  - CAPTCHA resolves or skip in test
  - Submit
  - Redirect to verify email page
  - Success message visible

- [ ] **Task T-1.9**: Email verification e2e (with test token)
  - Visit `/auth/verify-email?token=TEST_TOKEN`
  - Success message
  - Redirect to login or dashboard

- [ ] **Task T-1.10**: Responsive tests
  - Test mobile viewport (375x667)
  - Test tablet viewport (768x1024)
  - Test desktop (1920x1080)
  - No layout shifts
  - No horizontal scroll
  - Touch targets ≥ 44px

- [ ] **Task T-1.11**: Login e2e
  - Go to `/auth/login`
  - Enter valid credentials
  - Redirect to dashboard or home (Phase 2 logic)

- [ ] **Task T-1.12**: Topics listing e2e
  - Go to `/program` (or topics page)
  - See topics list
  - Click topic
  - See detail page
  - Responsive

- [ ] **Task T-1.13**: Test coverage report
  - Run Jest with coverage
  - Document coverage % by module
  - Target: 70%+ Phase 1 backend

**Dependencies**: Tests run AFTER code merge

---

## 🔗 API Contracts (Phase 1)

### Authentication

```typescript
// POST /api/auth/register
Request: {
  email: string;              // email@example.com
  password: string;           // min 8 chars, 1 upper, 1 lower, 1 number, 1 special
  firstName: string;          // non-empty
  lastName: string;           // non-empty
  captchaToken: string;       // from hCaptcha
}

Response 201: {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: false;
  createdAt: ISO8601;
}

Errors:
  400: { code: "INVALID_EMAIL", message: "Email format invalid" }
  409: { code: "EMAIL_EXISTS", message: "Email already registered" }
  422: { code: "WEAK_PASSWORD", message: "Password too weak" }
  429: { code: "RATE_LIMITED", message: "Too many attempts" }
```

```typescript
// POST /api/auth/verify-email
Request: {
  token: string;              // from email link
}

Response 200: {
  verified: true;
  redirectUrl: "/auth/login";
}

Errors:
  400: { code: "INVALID_TOKEN", message: "Token invalid or expired" }
```

```typescript
// POST /api/auth/login
Request: {
  email: string;
  password: string;
}

Response 200: {
  token: string;              // JWT, 24h expiration
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: true;
  }
}

Errors:
  401: { code: "INVALID_CREDENTIALS", message: "Email or password incorrect" }
  429: { code: "RATE_LIMITED", message: "Too many login attempts" }
```

### Topics

```typescript
// GET /api/topics?limit=20&offset=0
Response 200: {
  data: [
    {
      id: string;
      title: string;
      slug: string;
      summary: string;
      image: string | null;
      order: number;
    }
  ];
  pagination: {
    limit: 20;
    offset: 0;
    total: 15;
    hasMore: false;
  }
}
```

```typescript
// GET /api/topics/:id
Response 200: {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;           // Full HTML/Markdown
  image: string | null;
  published: boolean;
  createdAt: ISO8601;
}

Errors:
  404: { code: "NOT_FOUND", message: "Topic not found" }
```

---

## ✅ Critères d'acceptance Phase 1

### Technique
- [ ] Frontend builds sans erreurs (`npm run build`)
- [ ] Backend starts sans erreurs (`npm start`)
- [ ] Database connected et migrations appliquées
- [ ] All API endpoints respond correctly
- [ ] Tests: 70%+ coverage backend, all e2e green
- [ ] No console errors in browser
- [ ] No SQL injection vulnerabilities
- [ ] Passwords hashed (never logged)

### Fonctionnel
- [ ] Homepage accessible à https://generation-lien.dev
- [ ] All topics listed and accessible
- [ ] Topic detail page affiche contenu complet
- [ ] Registration form complete and validates
- [ ] Email verification working
- [ ] CAPTCHA functional
- [ ] Login form working
- [ ] Pages légales present et lisible

### UX/Performance
- [ ] Responsive (mobile/tablet/desktop)
- [ ] No horizontal scroll on mobile
- [ ] Touch targets ≥ 44px
- [ ] Links underlined or obviously interactive
- [ ] Form labels present and associated
- [ ] Error messages clear and actionable
- [ ] Loading states visible (if applicable)
- [ ] Page load < 3s on 3G (Lighthouse mobile)

### Sécurité
- [ ] HTTPS enabled
- [ ] CAPTCHA prevents bot signups
- [ ] Email verification required before login
- [ ] Rate limiting on auth endpoints
- [ ] CORS properly configured
- [ ] SQL injection prevented (Prisma)
- [ ] XSS prevented (React escape)
- [ ] No sensitive data in logs

### Déploiement
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Database on Neon/Supabase
- [ ] Environment variables configured (no secrets in code)
- [ ] CI/CD pipeline green
- [ ] Monitoring/logging setup (at least console)

---

## 📅 Timeline Phase 1

| Week | Front | Back | Tests | Deliverable |
|------|-------|------|-------|-------------|
| 1 | Setup, design system, homepage | Setup DB, auth foundation | Jest setup, unit tests | Styled components |
| 2 | Topics pages, registration form | Auth endpoints, email, CAPTCHA | E2E tests, responsive | Functional registration |
| 3 | Login page, legal pages, Playwright | Login endpoint, seed, docs | Coverage 70%+, all green | Live deployment |

---

## 🚀 Deployment Checklist Phase 1

**Before Production Deploy**:
- [ ] All tests green locally
- [ ] Frontend builds without errors
- [ ] No console warnings
- [ ] Env vars configured (.env file)
- [ ] Database migrations applied
- [ ] Seed data loaded
- [ ] API endpoints tested with real request
- [ ] Email service working
- [ ] CAPTCHA configured
- [ ] HTTPS enabled
- [ ] Performance acceptable (< 3s LCP)

**Production Setup**:
- [ ] Vercel frontend deployment
- [ ] Railway/Render backend deployment
- [ ] Neon database provisioned
- [ ] DNS configured
- [ ] Monitoring/logging enabled
- [ ] Backup strategy documented

**Post-Deploy**:
- [ ] Smoke tests: homepage loads
- [ ] Registration works end-to-end
- [ ] Logs checked for errors
- [ ] Performance metrics captured
- [ ] Error tracking setup (Sentry optional)

---

## 🎯 Success Metrics Phase 1

- ✅ Site deployed and publicly accessible
- ✅ 0 critical bugs in production
- ✅ Registration completion rate: measure baseline
- ✅ Email verification rate: > 80%
- ✅ Page load < 3s on mobile 3G
- ✅ 0 downtime during Phase 1
- ✅ Team sync 3x/week without blockers

---

## 📞 Team Syncs Phase 1

- **Daily async**: Standup in #daily-standup
- **Tue/Thu**: Front ↔ Back (API alignment)
- **Wed**: All hands + demo
- **Fri**: Stakeholder validation call

---

## 🎓 Links & Resources

- [React docs](https://react.dev)
- [Prisma docs](https://www.prisma.io/docs)
- [Express guide](https://expressjs.com)
- [Tailwind docs](https://tailwindcss.com/docs)
- [Playwright docs](https://playwright.dev)
- [neon.tech signup](https://neon.tech)
- [Vercel deployment](https://vercel.com)

