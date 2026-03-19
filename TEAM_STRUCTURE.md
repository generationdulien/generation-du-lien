# Structure d'équipe — Génération du Lien

## 🎯 Objectif
Développer une plateforme politique participative en 5 phases, avec une équipe spécialisée par tier et coordination centralisée.

---

## 👥 Composition de l'équipe

### 🏆 **Team Leader** (Orchestration)
**Responsabilités**:
- Coordination entre les 3 agents
- Validation des phases et intégration
- Gestion du backlog et priorités
- Communication avec le stakeholder (utilisateur)
- Architecture générale et décisions transversales
- Synchronisation quotidienne/hebdomadaire
- Résolution des blocages inter-équipes

**Outils**: Kanban (tasks), mémoire projet, plans d'architecture

---

### 🎨 **Agent Front** (UI/UX)
**Domaine**: React + TypeScript + Tailwind + Vite

**Responsabilités par phase**:

**Phase 1**:
- Page d'accueil (design + responsive)
- Listing thématiques + détail
- Formulaire inscription (email, password, CAPTCHA)
- Pages légales
- Responsive mobile-first

**Phase 2**:
- Tableau de bord adhérent
- Profil utilisateur
- Questionnaire centres d'intérêt
- Formulaire commentaire (brouillon)
- Interface soumission

**Phase 3**:
- Back-office modération (simple UI)
- Gestion rôles/permissions front

**Phase 4**:
- Formulaire contribution complexe
- Workflows visuels

**Phase 5**:
- Optimisations UX/perf
- Animations, accessibilité avancée

**Dépendances**: API Backend (contrats)
**Points de sync**: 3x/semaine avec Back

---

### 🔧 **Agent Back & DB** (API + Données)
**Domaine**: Node.js/Express + Prisma + PostgreSQL

**Responsabilités par phase**:

**Phase 1**:
- Setup PostgreSQL (Neon/Supabase)
- Modèles users, topics
- Auth (JWT/session)
- API endpoints (topics READ)
- Inscription + email verification
- CAPTCHA validation

**Phase 2**:
- Modèle comments + user_interests
- API endpoints (profile, comments POST)
- Questionnaire d'intérêt (POST/GET)
- Statut commentaires

**Phase 3**:
- Modèles moderation_queue, moderation_history
- API endpoints modération (GET/PUT)
- Permissions par rôle (middleware)

**Phase 4**:
- Modèle contributions
- Workflows contribution (statuts)
- Notifications (emails)

**Phase 5**:
- CMS, recherche, statistiques

**Dépendances**: Spécification API (contrats Frontend)
**Points de sync**: 3x/semaine avec Front

---

### ✅ **Agent Tests** (Qualité & QA)
**Domaine**: Playwright + Jest + Test Plans

**Responsabilités par phase**:

**Phase 1**:
- Tests unitaires backend (auth, topics)
- Tests e2e inscription
- Tests responsivité (mobile/tablet/desktop)
- Checklist validation

**Phase 2**:
- Tests e2e commentaires
- Tests profil adhérent
- Tests questionnaire
- Couverture +80% backend

**Phase 3**:
- Tests modération workflows
- Tests permissions/rôles
- Validation de sécurité basique

**Phase 4**:
- Tests contributions workflows
- Intégration tests (front + back)

**Phase 5**:
- Perf tests
- Accessibilité tests (axe)
- Load tests

**Dépendances**: Frontend code + Backend code
**Points de sync**: 2x/semaine avec Front et Back

---

## 📋 Points de synchronisation

### **Daily Standup** (15 min - Async dans memory/)
- Statut Phase actuelle
- Blocages
- Dépendances urgentes

### **3x/semaine - Sync Front/Back** (30 min)
- Validation contrats API
- Changements de spécification
- Intégration en cours

### **2x/semaine - Sync Tests** (20 min)
- Couverture de test
- Bugs identifiés
- Critères d'acceptance par phase

### **Weekly Team Sync** (1h - Avec stakeholder)
- Démo fonctionnalités Phase N
- Feedback utilisateur
- Ajustements Phase N+1

---

## 🔗 Contrats d'interface

### **Contrat Front ↔ Back**

Chaque endpoint API doit être documenté:
```
[API_CONTRACTS.md]
- GET /api/topics → retourne list {id, title, slug, summary, published}
- POST /api/auth/register → body {email, password, firstName, lastName}
- POST /api/auth/verify-email → body {token}
- GET /api/user/profile → retourne {id, email, firstName, ...}
- etc.
```

**Version**: Mise à jour avant chaque merge


### **Contrat Back ↔ Tests**

Tests écrits pour chaque endpoint (Jest):
- Happy path
- Erreurs validation
- Authentification
- Permissions

**Coverage**: Minimum 80% backend


### **Contrat Front ↔ Tests**

Playwright specs pour parcours critiques:
- Inscription complète
- Connexion + dashboard
- Soumission commentaire
- Modération (si accès)

---

## 📊 Kanban par Phase

### **Phase 1: MVP Public + Inscription**

```
TO DO                    | IN PROGRESS       | TESTING           | DONE
─────────────────────────┼──────────────────┼───────────────────┼─────
Setup initial            | Design homepage  | E2E inscription   | [✅]
Create DB schema (Phase1)| Listing topics   | Responsive tests  |
Auth backend setup       | Detail topic     | Perf mobile        |
Email service setup      | Form inscription | Unit tests auth    |
CAPTCHA integration      |                  |                    |
```

---

## 🎯 Critères d'acceptance par phase

### **Phase 1 validée si**:
- ✅ Site public accessible
- ✅ Inscription fonctionne end-to-end
- ✅ Email de vérification reçu et fonctionnel
- ✅ 100% responsive (mobile/tablet/desktop)
- ✅ Pages légales conformes RGPD
- ✅ Tests e2e critiques passent
- ✅ Déploiement public sans erreurs

### **Phase 2 validée si**:
- ✅ Dashboard adhérent opérationnel
- ✅ Commentaires soumis → file de modération
- ✅ Questionnaire sauvegardé
- ✅ Historique commentaires visible
- ✅ Tests +80% coverage backend

### **Phase 3 validée si**:
- ✅ Modérateur peut valider/refuser
- ✅ Statuts commentaires visibles
- ✅ Historique modération tracé
- ✅ Permissions rôles testées

### **Phase 4 validée si**:
- ✅ Contributions soumises et modérées
- ✅ Workflows complets testés
- ✅ Notifications envoyées

### **Phase 5 validée si**:
- ✅ Performance < 3s LCP mobile
- ✅ Accessibilité WCAG AA
- ✅ Aucun bug critique

---

## 🛠️ Stack & déploiement

| Composant | Tech | Gratuit? | Hébergement |
|-----------|------|----------|-------------|
| Frontend | React + TS + Tailwind | ✅ | Vercel (gratuit) |
| Backend | Node.js + Express + Prisma | ✅ | Railway/Render (gratuit) |
| Database | PostgreSQL | ✅ | Neon/Supabase (gratuit) |
| Emails | Resend | ✅ | ~100-300/jour gratuit |
| Fichiers | Cloudinary | ✅ | 25GB gratuit |
| Tests | Playwright + Jest | ✅ | Gratuit |

---

## 📁 Organisation dépôt

```
generation-du-lien/
├── frontend/                       (Agent Front)
│   ├── src/pages/
│   ├── src/components/
│   ├── tests/e2e/                 (Playwright)
│   └── package.json
│
├── backend/                        (Agent Back)
│   ├── src/routes/
│   ├── src/middleware/
│   ├── prisma/schema.prisma       (Agent Back)
│   ├── tests/unit/                (Jest - Back)
│   └── package.json
│
├── tests/                          (Agent Tests)
│   ├── e2e/                       (Playwright specs)
│   ├── integration/               (Front + Back)
│   └── reports/
│
├── docs/
│   ├── API_CONTRACTS.md           (Front ↔ Back)
│   ├── ARCHITECTURE.md
│   ├── PHASE_1_CHECKLIST.md
│   └── ...
│
├── TEAM_STRUCTURE.md              (ce fichier)
├── CLAUDE.md                       (Team rules)
└── MEMORY.md                       (Team memory index)
```

---

## 🚀 Premier sprint (Semaine 1)

### **Team Leader**:
- [ ] Créer repos Git (public avec .env.example)
- [ ] Setup initial Neon PostgreSQL
- [ ] Créer API_CONTRACTS.md
- [ ] Planifier tasks Kanban (Phase 1)

### **Agent Front**:
- [ ] Setup Vite + React + TypeScript + Tailwind
- [ ] Créer layout de base (navbar, footer)
- [ ] Wireframes pages critiques
- [ ] Setup Playwright

### **Agent Back**:
- [ ] Setup Express + Prisma
- [ ] Schéma Prisma (users, topics Phase 1)
- [ ] Setup env variables
- [ ] Config email (Resend ou SendGrid)

### **Agent Tests**:
- [ ] Setup Jest + Playwright
- [ ] Créer test templates
- [ ] Checklist d'acceptance Phase 1
- [ ] Setup CI/CD (GitHub Actions)

---

## 📞 Communication

**Slack/Discord channels**:
- `#team-leads` — Décisions stratégiques
- `#front-dev` — Questions Front
- `#back-dev` — Questions Back
- `#testing` — Bugs, couverture
- `#blocages` — Urgent issues
- `#daily-standup` — Status async

**Merges**:
- Feature branch → Pull Request
- 1 review minimum (autre agent)
- Tests verts = merge OK

---

## ✅ Template de phase

Chaque phase suit ce modèle:

```markdown
# Phase N: [Titre]

## 🎯 Objectif
[Courte description]

## 📋 Tasks Front
- [ ] Feature 1
- [ ] Feature 2

## 📋 Tasks Back
- [ ] Endpoint 1
- [ ] Endpoint 2

## 📋 Tasks Tests
- [ ] E2E test 1
- [ ] Unit test 1

## 🔗 Contrats API
[Si changement d'API_CONTRACTS.md]

## ✅ Critères acceptance
- [ ] Check 1
- [ ] Check 2

## 📅 Timeline
Début: YYYY-MM-DD | Fin: YYYY-MM-DD | Lead: [Agent]
```

---

## 🎯 Indicateurs de succès équipe

- **Deadline**: Phases respectées (±1 semaine)
- **Qualité**: +80% test coverage
- **Communication**: 0 blogage > 24h
- **Intégration**: Merges sans conflict
- **User feedback**: Démo Phase validée par stakeholder

