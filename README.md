# 🇫🇷 Génération du Lien — Plateforme politique participative

Plateforme web moderne pour le mouvement politique **Génération du Lien** — campagne élections législatives 2027.

**Statut**: Phase 1 (MVP public + inscription)

---

## 🎯 Objectif

Construire une plateforme permettant:
- 📖 Consultation publique du programme politique par thématiques
- 👥 Inscription sécurisée pour les adhérents
- 💬 Commentaires sur les thématiques (Phase 2)
- 💡 Contributions pour enrichir le programme (Phase 4)
- 🛡️ Modération et administration robuste (Phase 3+)

---

## 🏗️ Architecture 3 tiers

```
┌─────────────────────────────┐
│ Frontend: React + TypeScript │ → Vercel
│ Vite, Tailwind, React Query  │
└─────────────────┬───────────┘
                  │ REST API
┌─────────────────▼───────────┐
│ Backend: Node.js + Express  │ → Railway/Render
│ Prisma, PostgreSQL, JWT     │
└─────────────────┬───────────┘
                  │ SQL
┌─────────────────▼───────────┐
│ Database: PostgreSQL        │ → Neon
│ 5GB free tier              │
└─────────────────────────────┘
```

---

## 📋 Organisation

```
generation-du-lien/
├── frontend/                 # React SPA
│   ├── src/
│   ├── tests/
│   └── package.json
├── backend/                  # Express API
│   ├── src/
│   ├── prisma/
│   ├── tests/
│   └── package.json
├── tests/                    # Integration & E2E tests
│   ├── e2e/
│   └── integration/
├── docs/
│   ├── TEAM_STRUCTURE.md
│   ├── CLAUDE.md
│   ├── ARCHITECTURE.md
│   └── PHASE_1_PLAN.md
├── README.md
└── .gitignore
```

---

## 🚀 Démarrage rapide

### Prerequisites
- Node.js 20+
- PostgreSQL (local) ou Neon compte
- Git

### Setup Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build
npm run test:e2e   # Playwright tests
```

### Setup Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init

# Create .env from .env.example
# Fill: DATABASE_URL, JWT_SECRET, etc.

npm run dev        # http://localhost:3001
npm run build
npm test           # Jest unit tests
```

### Setup Database

```bash
# Neon (recommended - free tier)
# 1. Sign up: https://neon.tech
# 2. Create project
# 3. Copy DATABASE_URL to backend/.env

# Local PostgreSQL (alternative)
# createdb generation_lien
# export DATABASE_URL="postgresql://user:password@localhost:5432/generation_lien"
```

---

## 👥 Équipe

| Rôle | Responsabilité | Branches |
|------|---|---|
| **Team Leader** | Orchestration, sync, déploiement | `main`, `develop` |
| **Agent Front** | React, TypeScript, Responsive | `feature/front/*` |
| **Agent Back** | API, Database, Auth | `feature/back/*` |
| **Agent Tests** | Playwright E2E, Jest Unit | `feature/test/*` |

---

## 📅 Phases de développement

### Phase 1: MVP Public + Inscription ✅ EN COURS
- [ ] Site public (accueil, thématiques)
- [ ] Inscription avec CAPTCHA + email verification
- [ ] Login simple
- [ ] Pages légales
- **Durée**: 2-3 semaines
- **Demo**: Déploiement public

### Phase 2: Espace adhérent + Commentaires
- Tableau de bord
- Profil utilisateur
- Questionnaire intérêts
- Commentaires sur thématiques (avec modération)

### Phase 3: Back-office modération
- File modération commentaires
- Validation/refus/archivage
- Gestion rôles et permissions

### Phase 4: Contributions
- Formulaire contribution structuré
- Workflows approuvé/refusé/publié
- Notifications utilisateur

### Phase 5: Optimisations & Lot 2
- CMS enrichi
- Recherche avancée
- Notifications avancées
- Analytics

---

## 🔗 Contrats d'interface

Tous les contrats API entre Frontend ↔ Backend sont documentés dans:
👉 **`docs/API_CONTRACTS.md`** (créé automatiquement)

---

## 📝 Règles de collaboration

1. **Git workflow**:
   - Branch: `feature/front/xxx`, `feature/back/xxx`, `feature/test/xxx`
   - PR required + 1 review minimum
   - Tests verts = merge OK

2. **Syncs obligatoires**:
   - Daily async: Status dans `#daily-standup`
   - 3x/semaine: Front ↔ Back alignment (Tue/Wed/Thu)
   - 2x/semaine: Tests validation (Tue/Thu)
   - Weekly: Full team demo (Friday)

3. **Tests**:
   - Backend: 80%+ coverage (Jest)
   - Frontend: All critical paths (Playwright E2E)
   - No merge without tests green

4. **Security**:
   - Never commit `.env` files
   - Use `.env.example` as template
   - Passwords always bcrypt
   - Validate all inputs (Zod)

👉 **Détails complets**: `docs/CLAUDE.md`

---

## 📚 Documentation

| Document | Audience | Contenu |
|----------|----------|---------|
| **TEAM_STRUCTURE.md** | Tous | Rôles, responsibilities, syncs |
| **CLAUDE.md** | Tous | Git workflow, collaboration rules |
| **ARCHITECTURE.md** | Tech leads | Stack, structure, déploiement |
| **PHASE_1_PLAN.md** | Tous | Tasks détaillées, checklists |

---

## 🎯 Critères de succès Phase 1

**Technique**:
- ✅ Build succeeds (front + back)
- ✅ Tests: 70%+ backend, all e2e green
- ✅ No console errors
- ✅ No SQL injection/XSS vulnerabilities

**Fonctionnel**:
- ✅ Site public accessible (https)
- ✅ Inscription end-to-end working
- ✅ Email verification functional
- ✅ Topics listing & detail working

**UX/Perf**:
- ✅ Responsive (mobile/tablet/desktop)
- ✅ LCP < 3s mobile 3G
- ✅ Form labels + error messages clear

**Déploiement**:
- ✅ Frontend on Vercel
- ✅ Backend on Railway/Render
- ✅ Database on Neon
- ✅ CI/CD passing

---

## 🚀 Déploiement

### Staging (après Phase 1 dev)
```bash
# Frontend → Vercel
# Backend → Railway
# Database → Neon free tier

# All automatic via GitHub Actions on push to develop
```

### Production (après validation)
```bash
# Tag release on main
# Auto-deploy via CI/CD
# Verify: health checks, logs
```

---

## 🔒 Sécurité

- ✅ HTTPS everywhere
- ✅ JWT auth (24h expiration)
- ✅ CAPTCHA on registration
- ✅ Email verification required
- ✅ Rate limiting on auth endpoints
- ✅ Input validation (Zod)
- ✅ SQL injection prevention (Prisma)
- ✅ CORS restrictive
- ✅ Secrets in env vars only
- ✅ RGPD compliant (Resend emails)

---

## 📊 Tech Stack

| Layer | Tech | Why |
|-------|------|-----|
| **Frontend** | React 18 + TypeScript | Industry standard, massive ecosystem |
| **Styling** | Tailwind CSS | Utility-first, responsive, maintainable |
| **Build** | Vite | Fast, modern ES modules |
| **State** | TanStack Query | Server state management |
| **Backend** | Node.js + Express | Fast, lightweight, JavaScript full-stack |
| **ORM** | Prisma | Type-safe, migrations, excellent DX |
| **Database** | PostgreSQL | Robust, ACID, free tier available |
| **Tests** | Playwright + Jest | E2E + unit, industry standard |
| **Deploy** | Vercel + Railway | Zero-config, free tier, fast |

---

## 🔧 Development

### Local development

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Tests (watch mode)
cd frontend
npm run test:e2e -- --headed
```

### Create feature

```bash
# Create feature branch
git checkout -b feature/front/homepage

# Make changes
git add .
git commit -m "feat: Create homepage hero section"

# Push and create PR
git push -u origin feature/front/homepage
```

### Run tests

```bash
# Backend unit tests
cd backend && npm test

# Frontend E2E tests
cd frontend && npm run test:e2e

# Coverage report
cd backend && npm test -- --coverage
```

---

## 🐛 Troubleshooting

### Database connection failed
```bash
# Check .env has DATABASE_URL
# Test connection:
cd backend && npx prisma db push
```

### Port 3001 already in use
```bash
# Find & kill process
lsof -i :3001
kill -9 <PID>
```

### Vite HMR issues
```bash
# Clear cache
rm -rf frontend/.vite
npm run dev
```

### Prisma type errors
```bash
# Regenerate types
npx prisma generate
```

---

## 📞 Support

- **Questions tech?** Check `docs/ARCHITECTURE.md`
- **Git workflow?** Check `docs/CLAUDE.md`
- **Task details?** Check `docs/PHASE_1_PLAN.md`
- **Team sync?** Post in `#blocages` Slack

---

## 📄 License

MIT

---

**Last updated**: 2026-03-19
**Version**: 0.1.0-phase1
**Status**: 🟡 IN_PROGRESS

