# 📁 Project Structure — Génération du Lien

```
generation-du-lien/
│
├── 📄 README.md                           ← Start here! Project overview
├── 📄 QUICKSTART.md                       ← Setup instructions (5 min per agent)
│
├── 📋 Documentation (Team)
│   ├── TEAM_STRUCTURE.md                  ← Team roles & responsibilities
│   ├── CLAUDE.md                          ← Collaboration rules & Git workflow
│   ├── ARCHITECTURE.md                    ← Technical stack & deployment
│   └── PHASE_1_PLAN.md                    ← Detailed Phase 1 tasks & timeline
│
├── 📋 Documentation (Specification)
│   ├── specification_fonctionnelle_generation_du_lien.md
│   └── PROJECT_STRUCTURE.md               ← This file
│
├── 🎨 Frontend (Agent Front)
│   ├── package.json                       ← Dependencies & scripts
│   ├── .env.example                       ← Environment template
│   ├── tsconfig.json                      ← TypeScript config
│   ├── tsconfig.node.json
│   ├── vite.config.ts                     ← Vite build config
│   ├── tailwind.config.ts                 ← Tailwind CSS theme
│   ├── .eslintrc.cjs                      ← Linting rules
│   ├── .prettierrc                        ← Code formatting
│   ├── README.md                          ← Frontend-specific docs
│   ├── index.html                         ← HTML entry point (to create)
│   └── src/                               ← Source code (to create)
│       ├── main.tsx
│       ├── App.tsx
│       ├── pages/
│       │   ├── index.tsx                  (Homepage - F-1.3)
│       │   ├── auth/
│       │   │   ├── register.tsx           (Registration - F-1.5)
│       │   │   ├── verify-email.tsx       (Email verify - F-1.6)
│       │   │   └── login.tsx              (Login - F-1.8)
│       │   ├── program/
│       │   │   ├── index.tsx              (Topics list - F-1.4)
│       │   │   └── [slug].tsx             (Topic detail - F-1.4)
│       │   └── legal/
│       │       ├── privacy.tsx            (Privacy - F-1.7)
│       │       ├── terms.tsx              (Terms - F-1.7)
│       │       └── mentions.tsx           (Mentions - F-1.7)
│       ├── components/
│       │   ├── Layout/
│       │   ├── Forms/
│       │   ├── Cards/
│       │   └── Common/
│       ├── hooks/
│       ├── api/
│       ├── store/
│       ├── types/
│       ├── utils/
│       └── styles/
│   └── tests/
│       └── e2e/                           (Playwright tests - T-1.8+)
│
├── 🔧 Backend (Agent Back)
│   ├── package.json                       ← Dependencies & scripts
│   ├── .env.example                       ← Environment template
│   ├── tsconfig.json                      ← TypeScript config
│   ├── .eslintrc.cjs                      ← Linting rules
│   ├── .prettierrc                        ← Code formatting
│   ├── README.md                          ← Backend-specific docs
│   ├── src/
│   │   ├── main.ts                        ← Express server entry point
│   │   ├── config/
│   │   │   ├── database.ts                (Prisma setup - B-1.2)
│   │   │   ├── env.ts                     (Environment validation)
│   │   │   ├── logger.ts                  (Winston logging - B-1.11)
│   │   │   └── constants.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts                    (JWT verification - B-1.3)
│   │   │   ├── errorHandler.ts            (Error handling - B-1.11)
│   │   │   ├── validation.ts              (Input validation)
│   │   │   ├── logging.ts
│   │   │   ├── cors.ts
│   │   │   └── rateLimit.ts
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── auth.ts                    (Auth routes - B-1.4/1.5/1.8)
│   │   │   └── topics.ts                  (Topics routes - B-1.7)
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── topicsController.ts
│   │   ├── services/
│   │   │   ├── authService.ts             (Auth logic - B-1.3)
│   │   │   ├── emailService.ts            (Email sending - B-1.5)
│   │   │   ├── captchaService.ts          (CAPTCHA - B-1.6)
│   │   │   ├── topicsService.ts
│   │   │   └── notificationService.ts
│   │   ├── schemas/
│   │   │   ├── auth.ts                    (Zod validation schemas)
│   │   │   └── topics.ts
│   │   ├── models/
│   │   │   └── types.ts                   (TypeScript interfaces)
│   │   └── utils/
│   │       ├── jwt.ts
│   │       ├── bcrypt.ts
│   │       ├── errors.ts
│   │       └── response.ts
│   ├── prisma/
│   │   ├── schema.prisma                  ← Database model (B-1.2)
│   │   ├── seed.ts                        ← Sample data (B-1.9)
│   │   └── migrations/
│   │       └── 20260319_init.sql          (Auto-generated)
│   └── tests/
│       ├── unit/
│       │   ├── services/
│       │   │   ├── authService.test.ts    (T-1.3)
│       │   │   ├── emailService.test.ts   (T-1.3)
│       │   │   └── ...
│       │   └── utils/
│       │       ├── jwt.test.ts            (T-1.4)
│       │       └── ...
│       └── integration/
│           ├── auth.test.ts               (T-1.8)
│           └── topics.test.ts             (T-1.6)
│
├── ✅ Tests (Agent Tests)
│   ├── e2e/                               (Playwright - stored in frontend/)
│   │   ├── auth.spec.ts                   (T-1.8)
│   │   ├── topics.spec.ts                 (T-1.12)
│   │   └── responsive.spec.ts             (T-1.10)
│   └── integration/
│       └── full-flow.spec.ts              (T-1.7-13)
│
├── 📚 Documentation (API)
│   └── docs/
│       ├── API_CONTRACTS.md               ← Shared API specification!
│       ├── FRONTEND_SETUP.md              ← (To create)
│       ├── BACKEND_SETUP.md               ← (To create)
│       └── DATABASE.md                    ← (To create)
│
├── 🔐 Config & Ignore
│   ├── .gitignore                         ← Git ignore patterns
│   ├── .github/
│   │   └── workflows/
│   │       ├── test.yml                   (CI/CD tests - to create)
│   │       └── deploy.yml                 (CI/CD deploy - to create)
│
└── 📦 Root Level Files
    ├── package.json                       ← (Monorepo root - optional)
    └── .env.example                       ← (Global vars - optional)
```

---

## 📋 Key Files Explanation

### Documentation (Read First!)
1. **README.md** — Start here! Overview + stack
2. **QUICKSTART.md** — Setup in 5 minutes per agent
3. **TEAM_STRUCTURE.md** — Who does what
4. **CLAUDE.md** — Collaboration rules (Git workflow, syncs, etc.)
5. **PHASE_1_PLAN.md** — Detailed tasks with dependencies
6. **API_CONTRACTS.md** — Single source of truth for API (Front ↔ Back)

### Frontend Files
- **vite.config.ts** — Build configuration
- **tailwind.config.ts** — Design tokens (colors, spacing)
- **tsconfig.json** — TypeScript strict mode

### Backend Files
- **prisma/schema.prisma** — Database model (updated as features added)
- **src/main.ts** — Express server entry point
- **.env.example** → Copy to **.env** and fill with real values

### Important Notes
- **`.env` files are NOT committed** — Use `.env.example` as template
- **`API_CONTRACTS.md` is the source of truth** — Both Front & Back must follow it
- **Migrations auto-generated** — Run `prisma migrate dev` after schema changes

---

## 🚀 Development Workflow

### Frontend Agent
```
1. Create branch: feature/front/task-name
2. Implement component
3. Create tests (Playwright)
4. Push & create PR
5. Wait for Backend & Tests approval
6. Merge to develop
```

### Backend Agent
```
1. Create branch: feature/back/task-name
2. Update prisma/schema.prisma if needed
3. Create migration: npx prisma migrate dev
4. Implement endpoint
5. Update API_CONTRACTS.md
6. Create tests (Jest)
7. Push & create PR
8. Wait for Frontend & Tests approval
9. Merge to develop
```

### Tests Agent
```
1. Create branch: feature/test/task-name
2. Write unit tests (Jest) for Backend
3. Write E2E tests (Playwright) for Frontend
4. Verify coverage (80%+)
5. Push & create PR
6. Approve PR from Backend/Frontend
7. Merge to develop
```

---

## 📦 Installation Order

### First time setup (all agents)
```bash
1. Clone repo
2. cd generation-du-lien

3. Agent Back:
   cd backend && npm install && cp .env.example .env
   # Edit .env with DATABASE_URL

4. Agent Front:
   cd ../frontend && npm install && cp .env.example .env.local

5. Agent Back (cont.):
   cd ../backend
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed

6. All:
   cd .. && npm install (if root package.json exists)
```

---

## 🔄 File Dependencies

```
API_CONTRACTS.md (Source of Truth)
    ↓
    ├─→ Frontend implements based on contracts
    │   └─→ Uses fetch/axios to call Backend endpoints
    │
    └─→ Backend implements endpoints
        └─→ Both maintain sync in API_CONTRACTS.md
```

---

## 🎯 Task to File Mapping

| Task | Primary Files | Created By |
|------|---|---|
| F-1.2 Design System | `tailwind.config.ts`, `src/components/` | Agent Front |
| F-1.3 Homepage | `src/pages/index.tsx`, `src/styles/` | Agent Front |
| B-1.2 DB Setup | `prisma/schema.prisma` | Agent Back |
| B-1.3 Auth | `src/services/authService.ts` | Agent Back |
| B-1.4 API | `src/routes/auth.ts` | Agent Back |
| T-1.3 Tests | `tests/unit/services/*.test.ts` | Agent Tests |
| (All) API Contracts | `docs/API_CONTRACTS.md` | Agent Back → Others review |

---

## 📊 Git Branches

```
main (production)
  ↑ (merge from)
develop (integration)
  ↑ (PR from)
├── feature/front/phase-1-homepage
├── feature/back/phase-1-auth
├── feature/test/phase-1-setup
└── bugfix/issue-name
```

---

## 🗂️ Adding New Features

When adding a new feature (e.g., contributions in Phase 4):

1. **Backend first**:
   - Add model to `prisma/schema.prisma`
   - Create migration: `npx prisma migrate dev --name add_contributions`
   - Implement API endpoint
   - Update `docs/API_CONTRACTS.md`

2. **Frontend reacts**:
   - Once API contract approved, implement UI
   - Create API calls in `src/api/`
   - Create components

3. **Tests verify**:
   - Write backend tests (Jest)
   - Write frontend tests (Playwright)
   - Verify integration

---

## ⚠️ Common Mistakes

❌ **Don't**:
- Commit `.env` files
- Change API contracts without discussion
- Write code without tests
- Merge without PR approval
- Modify prisma schema without migration

✅ **Do**:
- Use `.env.example` as template
- Update `API_CONTRACTS.md` before implementing
- Write tests alongside code
- Request reviews on PRs
- Create migrations: `prisma migrate dev`

---

## 📞 Questions About Structure?

Check:
1. README.md — Overview
2. QUICKSTART.md — Setup issues
3. PHASE_1_PLAN.md — Task details
4. Respective README in frontend/ or backend/
5. Post in #blocages Slack

---

**Last Updated**: 2026-03-19
**Version**: 0.1.0 (Phase 1)

