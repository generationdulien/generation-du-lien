# Architecture Technique — Génération du Lien

## 🏗️ Vue d'ensemble (3 tiers)

```
┌─────────────────────────────────┐
│  Frontend (React + TypeScript)  │
│  - Vercel (gratuit)             │
│  - Vite, Tailwind, TanStack Q   │
└──────────────┬──────────────────┘
               │ HTTP(S)
               ↓
┌─────────────────────────────────┐
│  Backend (Node.js + Express)    │
│  - Railway/Render (gratuit)     │
│  - Prisma ORM, JWT Auth         │
└──────────────┬──────────────────┘
               │ SQL
               ↓
┌─────────────────────────────────┐
│  Database (PostgreSQL)          │
│  - Neon/Supabase (gratuit)      │
│  - 5GB free tier                │
└─────────────────────────────────┘
```

---

## 🎨 Frontend Architecture

### Stack
- **Framework**: React 18+ avec TypeScript
- **Build**: Vite (ES modules natifs)
- **Styling**: Tailwind CSS + CSS Modules si besoin
- **State**: TanStack Query (React Query) pour serveur state
- **Local State**: Zustand (minimal) ou Context si simple
- **Formulaires**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API + custom hooks
- **Testing**: Playwright (e2e) + Vitest (unit)

### Structure dossiers

```
frontend/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── pages/
│   │   ├── _app.tsx              (Root layout)
│   │   ├── _document.tsx          (HTML template)
│   │   ├── index.tsx              (Accueil)
│   │   ├── about.tsx              (Le mouvement)
│   │   ├── program/
│   │   │   ├── index.tsx          (Liste thématiques)
│   │   │   └── [slug].tsx         (Détail thématique)
│   │   ├── auth/
│   │   │   ├── register.tsx
│   │   │   ├── login.tsx
│   │   │   └── verify-email.tsx
│   │   ├── dashboard/
│   │   │   ├── index.tsx          (Tableau de bord)
│   │   │   ├── profile.tsx
│   │   │   ├── interests.tsx
│   │   │   └── my-comments.tsx
│   │   ├── admin/
│   │   │   ├── moderation.tsx
│   │   │   ├── comments.tsx
│   │   │   └── contributions.tsx
│   │   └── legal/
│   │       ├── privacy.tsx
│   │       ├── terms.tsx
│   │       └── mentions.tsx
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── Forms/
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   └── ContributionForm.tsx
│   │   ├── Cards/
│   │   │   ├── TopicCard.tsx
│   │   │   ├── CommentCard.tsx
│   │   │   └── ContributionCard.tsx
│   │   ├── Moderation/
│   │   │   ├── ModerationQueue.tsx
│   │   │   ├── CommentReview.tsx
│   │   │   └── ContributionReview.tsx
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Spinner.tsx
│   ├── hooks/
│   │   ├── useAuth.ts             (Auth context + hooks)
│   │   ├── useTopics.ts           (React Query hooks)
│   │   ├── useComments.ts
│   │   ├── useUser.ts
│   │   └── useForm.ts
│   ├── api/
│   │   ├── client.ts              (API instance)
│   │   ├── auth.ts                (Auth endpoints)
│   │   ├── topics.ts
│   │   ├── comments.ts
│   │   ├── user.ts
│   │   └── types.ts               (Shared types with Backend)
│   ├── store/
│   │   ├── authStore.ts           (Zustand ou Context)
│   │   └── uiStore.ts
│   ├── utils/
│   │   ├── validation.ts          (Zod schemas)
│   │   ├── formatting.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── types/
│   │   └── index.ts               (Global types)
│   └── App.tsx ou _app.tsx
├── tests/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── topics.spec.ts
│   │   ├── comments.spec.ts
│   │   └── responsive.spec.ts
│   ├── unit/
│   │   ├── hooks.test.ts
│   │   ├── utils.test.ts
│   │   └── components.test.tsx
│   └── fixtures/
│       └── test-data.ts
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── tailwind.config.js
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### Communication API

**Base URL**: `https://api.generation-lien.fr` (prod) ou `http://localhost:3001` (dev)

**Headers standards**:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-Request-ID: <uuid>
```

**Response format**:
```json
{
  "data": { ... },
  "statusCode": 200,
  "timestamp": "2026-03-19T10:30:00Z"
}
```

**Errors**:
```json
{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Email format invalide",
    "details": { ... }
  },
  "statusCode": 422,
  "timestamp": "2026-03-19T10:30:00Z"
}
```

---

## 🔧 Backend Architecture

### Stack
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT + secure cookies
- **Validation**: Zod
- **Logging**: Winston
- **Testing**: Jest + Supertest

### Structure dossiers

```
backend/
├── src/
│   ├── main.ts                    (Entry point)
│   ├── config/
│   │   ├── database.ts            (Prisma init)
│   │   ├── env.ts                 (Validation env vars)
│   │   ├── logger.ts
│   │   └── constants.ts
│   ├── middleware/
│   │   ├── auth.ts                (JWT verification)
│   │   ├── errorHandler.ts        (Global error handler)
│   │   ├── validation.ts          (Zod middleware)
│   │   ├── logging.ts             (Request logging)
│   │   ├── cors.ts
│   │   └── rateLimit.ts           (Brute force protection)
│   ├── routes/
│   │   ├── index.ts               (Route aggregator)
│   │   ├── auth.ts                (POST /auth/register, /login, /verify-email)
│   │   ├── topics.ts              (GET /topics, /topics/:id)
│   │   ├── comments.ts            (GET/POST /comments)
│   │   ├── contributions.ts       (GET/POST /contributions)
│   │   ├── users.ts               (GET/PUT /users/:id)
│   │   └── admin/
│   │       ├── moderation.ts      (PATCH /admin/moderation/:id)
│   │       ├── topics.ts          (CRUD topics)
│   │       ├── users.ts           (Manage users)
│   │       └── stats.ts           (Analytics endpoints)
│   ├── controllers/
│   │   ├── authController.ts      (Business logic auth)
│   │   ├── topicsController.ts
│   │   ├── commentsController.ts
│   │   ├── contributionsController.ts
│   │   ├── usersController.ts
│   │   └── adminController.ts
│   ├── services/
│   │   ├── authService.ts         (Password hashing, JWT)
│   │   ├── emailService.ts        (Resend integration)
│   │   ├── captchaService.ts      (CAPTCHA validation)
│   │   ├── topicsService.ts
│   │   ├── commentsService.ts
│   │   ├── contributionsService.ts
│   │   ├── userService.ts
│   │   └── notificationService.ts
│   ├── models/
│   │   └── types.ts               (TypeScript interfaces)
│   ├── schemas/
│   │   ├── auth.ts                (Zod schemas pour validation)
│   │   ├── topics.ts
│   │   ├── comments.ts
│   │   ├── contributions.ts
│   │   └── users.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   ├── errors.ts              (Custom error classes)
│   │   ├── response.ts            (Response formatters)
│   │   └── validators.ts
│   └── db/
│       ├── prisma.ts              (Prisma client singleton)
│       └── seed.ts                (Database seeding)
├── prisma/
│   ├── schema.prisma              (Data model)
│   ├── migrations/
│   │   ├── 001_init_users.sql
│   │   ├── 002_init_topics.sql
│   │   ├── 003_init_comments.sql
│   │   └── ...
│   └── seed.ts                    (Seed data)
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── authService.test.ts
│   │   │   ├── emailService.test.ts
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── jwt.test.ts
│   │   │   └── validation.test.ts
│   │   └── schemas/
│   │       └── auth.test.ts
│   ├── integration/
│   │   ├── auth.test.ts           (Full auth flow)
│   │   ├── comments.test.ts       (API + DB)
│   │   ├── topics.test.ts
│   │   └── moderation.test.ts
│   └── fixtures/
│       └── test-data.ts
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── tsconfig.json
└── package.json
```

### Database Schema (Prisma)

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============= USERS =============
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  firstName     String
  lastName      String
  verified      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  comments      Comment[]
  contributions Contribution[]
  interests     Interest[]

  @@map("users")
}

// ============= INTERESTS =============
model Interest {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tag       String   // "education", "health", etc.

  @@unique([userId, tag])
  @@map("user_interests")
}

// ============= TOPICS =============
model Topic {
  id            String         @id @default(cuid())
  title         String
  slug          String         @unique
  summary       String
  content       String         // Rich text
  image         String?        // URL
  published     Boolean        @default(false)
  order         Int            @default(0)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  // Relations
  comments      Comment[]
  contributions Contribution[]

  @@map("topics")
}

// ============= COMMENTS =============
model Comment {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicId       String
  topic         Topic     @relation(fields: [topicId], references: [id], onDelete: Cascade)
  content       String
  status        String    @default("submitted") // submitted, in_review, published, refused
  refusalReason String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Audit trail
  moderatedAt   DateTime?
  moderatedBy   String?   // User ID of moderator

  @@map("comments")
}

// ============= CONTRIBUTIONS =============
model Contribution {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  topicId       String
  topic         Topic     @relation(fields: [topicId], references: [id], onDelete: Cascade)
  title         String
  type          String    // "proposal", "amendment", "feedback", etc.
  summary       String
  content       String
  status        String    @default("submitted") // submitted, analyzing, retained, published, refused
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Moderation
  moderatedAt   DateTime?
  moderatedBy   String?
  internalNotes String?

  @@map("contributions")
}

// ============= EDITORIAL CONTENT =============
model EditorContent {
  id        String    @id @default(cuid())
  title     String
  slug      String    @unique
  content   String    // Rich text
  category  String    // "news", "editorial", "faq", etc.
  published Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@map("editor_content")
}
```

### API Endpoints (Phase 1)

**Authentication**:
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/verify-email
POST /api/auth/resend-verification
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

**Topics**:
```
GET /api/topics                    (liste, paginated)
GET /api/topics/:id                (détail)
GET /api/topics/:slug              (by slug)
```

**Users**:
```
GET /api/users/me                  (current user)
GET /api/users/:id                 (if admin)
PUT /api/users/:id                 (update own profile)
POST /api/users/:id/interests      (save interests)
```

**Comments** (Phase 2):
```
POST /api/comments                 (create)
GET /api/topics/:id/comments       (list by topic)
GET /api/users/:id/comments        (user's comments)
```

**Admin** (Phase 3+):
```
GET /api/admin/moderation/comments (queue)
PATCH /api/admin/moderation/comments/:id (action)
```

---

## 💾 Database Deployment

### Gratuit tier: **Neon PostgreSQL**
- 5 GB storage
- 0.5 GB RAM
- Autoscaling reads
- Automatic backups

**Setup**:
```bash
# 1. Sign up https://neon.tech
# 2. Créer projet
# 3. Copier DATABASE_URL
# 4. Add to .env

# 5. Init Prisma migrations
npx prisma migrate dev --name init
```

### Alternative: **Supabase** (PostgreSQL + extras)
- 500 MB database storage
- Auth intégré (optional)
- Real-time features
- Edge functions

**Setup**: Plus simple que Neon, all-in-one

---

## 🚀 Déploiement

### Frontend (Vercel)

```bash
# 1. Push to GitHub
# 2. Import project in Vercel
# 3. Add env vars (VITE_API_URL)
# 4. Auto-deploy on main push
```

### Backend (Railway ou Render)

**Railway**:
```bash
# 1. Connect GitHub repo
# 2. Auto-detect Node.js
# 3. Add DATABASE_URL secret
# 4. Set PORT=3001
# 5. Deploy
```

**Render**:
```bash
# 1. Create Web Service
# 2. Connect GitHub
# 3. Build: npm run build
# 4. Start: npm start
```

---

## 🔐 Sécurité

### Checklist
- ✅ HTTPS everywhere
- ✅ JWT expiration < 24h
- ✅ Refresh tokens in HTTP-only cookies
- ✅ CORS restrictif (origin whitelist)
- ✅ Rate limiting par IP + user
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection (React escapes by default)
- ✅ CSRF tokens if forms
- ✅ Password: bcrypt 10+ rounds
- ✅ Sensitive data never in logs
- ✅ Regular dependency updates
- ✅ Secrets in env vars, never hardcoded

---

## 📊 Monitoring & Logging

### Frontend
```typescript
// Sentry or similar for errors
import * as Sentry from "@sentry/react";

// Performance monitoring
const vitals = web-vitals library
```

### Backend
```typescript
// Winston logger
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## 📈 Performance Targets

| Métrique | Target | Tool |
|----------|--------|------|
| Frontend LCP (mobile) | < 2.5s | Lighthouse |
| Backend API p95 | < 200ms | New Relic / DataDog free tier |
| Database query p95 | < 50ms | Prisma Studio |
| Build time | < 1 min | CI/CD logs |
| Test coverage | ≥ 80% | Jest coverage report |

