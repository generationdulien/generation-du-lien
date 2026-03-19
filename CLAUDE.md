# CLAUDE.md — Règles de collaboration équipe Génération du Lien

## 🎯 Contexte
Développement d'une plateforme politique participative en 3 tiers avec 4 agents spécialisés.

---

## 👥 Agents et rôles

| Rôle | Spécialité | Git branches | Focus |
|------|-----------|--------------|-------|
| **Team Leader** | Orchestration globale | `main`, `develop` | Architecture, décisions, sync |
| **Agent Front** | React + TypeScript + Tailwind | `feature/front/*` | UI/UX, responsive, composants |
| **Agent Back** | Node.js + Express + Prisma + PgSQL | `feature/back/*` | API, DB, auth, workflows |
| **Agent Tests** | Playwright + Jest | `feature/test/*` | QA, e2e, unit tests, perf |

---

## 📋 Règles de travail par agent

### **Team Leader**
- ✅ Crée et arbitre les phases
- ✅ Valide architecture globale
- ✅ Approuve merges vers `main`
- ✅ Synchronise quotidiennement
- ✅ Escalade blocages inter-agents
- ✅ Communique avec stakeholder
- ✅ Publie checklist d'acceptance de phase

### **Agent Front**
- ✅ Code sur branches `feature/front/*`
- ✅ Crée PR quand fonctionnalité complète
- ✅ Communique API changes à Back AVANT merge
- ✅ Attend e2e tests verts avant merge
- ✅ Responsable responsive et accessibilité
- ✅ Suit API_CONTRACTS.md comme contrat
- ⚠️ Ne modifie PAS DB schema directement

### **Agent Back**
- ✅ Code sur branches `feature/back/*`
- ✅ Crée PR après tests unitaires verts
- ✅ Met à jour API_CONTRACTS.md AVANT merge
- ✅ Ajoute migrations Prisma
- ✅ Crée seeds données test
- ✅ Documente endpoints Swagger/Postman
- ✅ Responsable sécurité, RGPD
- ⚠️ Attend validation Tests avant merge

### **Agent Tests**
- ✅ Crée tests EN MÊME TEMPS que features (TDD)
- ✅ Code sur branches `feature/test/*`
- ✅ Valide 80%+ coverage backend
- ✅ Crée e2e pour tous parcours critiques
- ✅ Signale bugs dans #blocages
- ✅ Vérifie critères acceptance avant sign-off phase
- ✅ Monitoring perf et accessible metrics

---

## 🔗 Contrats d'interface (CRITIQUES)

### API_CONTRACTS.md
**Format**:
```json
{
  "endpoint": "POST /api/auth/register",
  "body": {
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "captchaToken": "string"
  },
  "response": {
    "statusCode": 201,
    "body": {
      "id": "uuid",
      "email": "string",
      "verificationSent": true
    }
  },
  "errors": {
    "400": "Email already exists",
    "422": "Invalid email format"
  },
  "owner": "Agent Back",
  "lastUpdate": "2026-03-19",
  "status": "STABLE"
}
```

**Règles**:
- ✅ Toute API change = PR sur API_CONTRACTS.md AVANT implémentation
- ✅ Back propose, Front approuve, Tests ajoute tests
- ✅ Jamais de breaking change sans discussion équipe
- ✅ Versioning si nécessaire (`/api/v1/...`)

---

## 📊 Git workflow

### Branches par phase

```
main (production)
 ↓
develop (intégration Phase N)
 ├─ feature/front/phase-1-homepage
 ├─ feature/front/phase-1-topics
 ├─ feature/back/phase-1-auth
 ├─ feature/back/phase-1-db-schema
 ├─ feature/test/phase-1-e2e
 └─ ...
```

### Pull Request process

1. **Ouverture PR**:
   ```
   Title: [PHASE N] Feature Name
   Description: Quoi, Pourquoi, Dépendances, Screenshots/Tests
   Assignees: Agent concerné + Agent dépendant (si existe)
   ```

2. **Review requis**:
   - Agent Front → Approuvé par Agent Back + Tests
   - Agent Back → Approuvé par Agent Front + Tests
   - Agent Tests → Approuvé par Back

3. **Avant merge**:
   - ✅ Tests GitHub Actions passent
   - ✅ Pas de conflit
   - ✅ Code review approuvée
   - ✅ Coverage reste ≥ 80%

4. **Merge** (par Team Leader):
   - Squash ou rebase clean
   - Cleanup feature branch

---

## 🚦 Statuts de phase

- 🟡 **IN_PROGRESS**: Agents travaillent activement
- 🟢 **IN_TESTING**: Tests validant acceptance
- 🔵 **READY_FOR_DEMO**: Déployé, await stakeholder validation
- ✅ **VALIDATED**: Stakeholder approuve, archive phase
- 🔴 **BLOCKED**: Attend résolution urgente

---

## 🚨 Blocages et escalade

### Si bloquez > 30 min:
1. Post dans `#blocages` Slack
2. Mention Team Leader + agent dépendant
3. Détaillez: cause + impact

### Team Leader répond en < 1h:
- ✅ Aide diagnostic
- ✅ Ajuste priorité si needed
- ✅ Escalade si bloque phase

---

## 📝 Documentation

### Chaque agent maintient

**Agent Front**:
- `docs/FRONTEND_SETUP.md` — Installer, lancer, debug
- `docs/COMPONENTS.md` — Composants créés + API
- `docs/DESIGN_SYSTEM.md` — Couleurs, spacing, types

**Agent Back**:
- `docs/BACKEND_SETUP.md` — Setup DB, lancer serveur
- `docs/API_CONTRACTS.md` — Tous endpoints
- `docs/DATABASE.md` — Schema, migrations, seeds
- `docs/SECURITY.md` — Auth, RGPD, validation

**Agent Tests**:
- `docs/TEST_STRATEGY.md` — Approche testing
- `docs/TEST_COVERAGE.md` — Coverage par module
- `docs/DEPLOYMENT_CHECKLIST.md` — Pre-prod checks

---

## 🎯 Sync points obligatoires

### **Daily Async (23h-09h UTC)**:
- Chacun posts dans memory/daily-standup.md:
  - Fait aujourd'hui
  - Bloqué sur quoi
  - Priorité demain

### **3x/semaine - Front ↔ Back (30 min)**:
- Lundi 14h30, Mercredi 14h30, Vendredi 14h30
- Validation contrats API
- Intégration features

### **2x/semaine - Tests debrief (20 min)**:
- Mardi 16h, Jeudi 16h
- Bug review
- Coverage check

### **Weekly Demo (Vendredi 17h)**:
- Team Leader + Stakeholder
- Démo Phase N
- Feedback et scope Phase N+1

---

## 💻 Environnement de dev

### Variables d'environnement

**`.env.example`** (versionné):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://user:pwd@localhost:5432/generation_lien
JWT_SECRET=dev-secret-change-in-prod
RESEND_API_KEY=xxx
CAPTCHA_SECRET=xxx
```

**`.env.local`** (⚠️ JAMAIS commité):
- Chaque dev remplit avec ses credentials
- Template dans `.env.example`

---

## 🔒 Sécurité & RGPD

- ✅ Aucune donnée sensible dans logs
- ✅ Passwords always bcrypt (10+ rounds)
- ✅ JWT expiré < 24h
- ✅ Emails via Resend (GDPR compliant)
- ✅ PII loggé minimal (id only)
- ✅ Migrations DB versionnées
- ✅ Audit trail (qui a modifié quoi/quand)

---

## 🐛 Bug reporting

### Format standardisé:
```
## Title
[PHASE N] Short bug title

## Severity
🔴 Critical / 🟠 High / 🟡 Medium / 🟢 Low

## Reproducer
Steps to reproduce...

## Expected
What should happen

## Actual
What happens

## Environment
- Frontend: Chrome / Safari / Mobile
- Backend: Node.js version
- Database: PostgreSQL version

## Assignee
@Agent concerned
```

---

## ✨ Code quality standards

### Frontend
- ✅ TypeScript strict mode
- ✅ Prettier + ESLint config
- ✅ Component exports documented
- ✅ Accessibility checklist (axe)

### Backend
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Unit tests for business logic
- ✅ Request validation (zod/joi)
- ✅ Error handling standardized
- ✅ Logging structured (winston)

### Tests
- ✅ Clear test names (given-when-then)
- ✅ No hardcoded wait times (use waitFor)
- ✅ Isolated tests (no shared state)
- ✅ Coverage reports committed

---

## 🚀 Deploy checklist par phase

Avant chaque déploiement Phase N:

**Backend**:
- [ ] Migrations préparées
- [ ] Env vars updated en prod
- [ ] Rollback plan documenté
- [ ] Monitoring alerts configurés
- [ ] Logs clean (no sensitive data)

**Frontend**:
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors/warnings
- [ ] Lighthouse score > 80
- [ ] Mobile tested on real device

**Tests**:
- [ ] E2E suite verte
- [ ] Coverage ≥ 80%
- [ ] Performance tests OK
- [ ] Security scan passed

**Team Leader**:
- [ ] Approuve deploy
- [ ] Communique timeline
- [ ] Prepare demo pour stakeholder

---

## 📞 Communication channels

| Canal | Usage | Fréquence |
|-------|-------|-----------|
| Slack #daily-standup | Status async | Daily 23h UTC |
| Slack #blocages | Urgent issues | As needed |
| Slack #front-dev | Front questions | Real-time |
| Slack #back-dev | Back questions | Real-time |
| Slack #testing | QA/bugs | Real-time |
| Weekly Demo Call | Validation Phase | Fridays 17h |
| GitHub PR comments | Code review | Real-time |

---

## 🎓 Onboarding nouveau agent

1. Clone repo + install deps
2. Read TEAM_STRUCTURE.md + CLAUDE.md
3. Run backend locally + Prisma seed
4. Read API_CONTRACTS.md
5. Run frontend locally
6. Run test suite
7. Pair program avec agent concerné (1h)
8. First task = petit bug ou typo (merge à day 1)

---

## ⚡ Performance targets

| Métrique | Target | Owner |
|----------|--------|-------|
| Frontend LCP (mobile) | < 2.5s | Agent Front |
| API response time (p95) | < 200ms | Agent Back |
| Test suite duration | < 5 min | Agent Tests |
| Phase delivery | ±1 semaine | Team Leader |
| Bug fix time (Critical) | < 2h | Tous |

---

## 🎯 Success criteria équipe

- ✅ Phases livrées à temps (±1 semaine max)
- ✅ Zero critical bugs in production
- ✅ 80%+ test coverage maintained
- ✅ Stakeholder validation 100%
- ✅ Communication sans friction
- ✅ Deployment smooth (< 15 min)
- ✅ On-call rotation setup pour Phase 5+

