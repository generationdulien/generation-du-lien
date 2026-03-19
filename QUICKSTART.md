# ⚡ QuickStart — Premiers pas Phase 1

**Durée setup total**: ~15 minutes
**Durée par agent**: ~5-10 minutes chacun

---

## 🎯 Objectif aujourd'hui

Chaque agent dispose d'une copie locale du code fonctionnelle.

---

## ✅ Avant de commencer

### Tous les agents

1. **Installer Node.js 20+**
   ```bash
   # Vérifier la version
   node --version  # Should be 20.0.0+
   npm --version   # Should be 10.0.0+
   ```

2. **Installer Git**
   ```bash
   git --version   # Should be 2.30+
   ```

3. **Clone le repository**
   ```bash
   cd /path/to/projects
   git clone https://github.com/your-org/generation-du-lien.git
   cd generation-du-lien
   ```

4. **Lire les documents**
   - [ ] Lire `README.md` (vue d'ensemble)
   - [ ] Lire `CLAUDE.md` (collaboration rules)
   - [ ] Lire `PHASE_1_PLAN.md` (votre scope)

---

## 🎨 Agent Front Setup

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Create environment file
```bash
cp .env.example .env.local
# No changes needed for local dev
```

### 3. Start dev server
```bash
npm run dev
```

**Output attendu**:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### 4. Verify frontend works
```bash
# Visit http://localhost:5173 in browser
# You should see a blank page (normal - no code yet)
```

### 5. Setup type checking
```bash
npm run type-check
# Should complete without errors
```

✅ **Frontend ready!** You can now:
- [ ] Start Task F-1.1: Setup design system
- [ ] Start Task F-1.2: Create homepage

---

## 🔧 Agent Back Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create environment file
```bash
cp .env.example .env
```

### 3. Setup Database (Choose ONE)

#### Option A: Neon (Recommended - Free cloud)
1. Sign up: https://neon.tech
2. Create project (default settings OK)
3. Copy the `DATABASE_URL`
4. Paste into `backend/.env`
5. Run: `npx prisma generate && npx prisma migrate dev --name init`

#### Option B: Local PostgreSQL
```bash
# macOS (Homebrew)
brew install postgresql
brew services start postgresql

# Linux (Ubuntu)
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows: Download installer from postgresql.org

# Create database
createdb generation_lien

# Set DATABASE_URL in .env
export DATABASE_URL="postgresql://username:password@localhost:5432/generation_lien"
```

### 4. Initialize Database
```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

**Expected output**:
```
✓ Seed completed

✅ Created 5 topics
✅ Created 2 test users
🎉 Database seeding completed!
```

### 5. Start backend server
```bash
npm run dev
```

**Expected output**:
```
╔══════════════════════════════════════╗
║  🚀 Génération du Lien - Backend     ║
║     Server running on port 3001      ║
║  http://localhost:3001               ║
╚══════════════════════════════════════╝
```

### 6. Test health endpoint
```bash
# In another terminal
curl http://localhost:3001/health

# Expected response
{"status":"ok","timestamp":"2026-03-19T15:30:00Z"}
```

✅ **Backend ready!** You can now:
- [ ] Start Task B-1.3: Auth foundation
- [ ] Start Task B-1.4: Auth endpoints

---

## ✅ Agent Tests Setup

### 1. Install dependencies
```bash
# No separate folder - tests run from frontend/backend
cd frontend && npm install
cd backend && npm install
```

### 2. Backend: Setup Jest
```bash
cd backend

# Jest config already in place
# Run sample tests (if any exist)
npm test
```

### 3. Frontend: Setup Playwright
```bash
cd frontend

# Playwright already configured
# Install browsers (one-time)
npx playwright install

# Try running tests (will fail - no tests yet, that's OK)
npm run test:e2e
```

### 4. Create test template
```bash
# Create a simple test file to verify setup
# src/example.test.ts in backend or frontend
```

✅ **Tests ready!** You can now:
- [ ] Start Task T-1.1: Jest unit test examples
- [ ] Start Task T-1.2: Playwright E2E examples

---

## 🔗 Verify everything works together

### Frontend ↔ Backend Communication

1. **Start backend** (terminal 1)
   ```bash
   cd backend && npm run dev
   ```

2. **Start frontend** (terminal 2)
   ```bash
   cd frontend && npm run dev
   ```

3. **Check health endpoint**
   ```bash
   # Frontend should be able to reach backend
   curl http://localhost:3001/health
   ```

4. **Frontend calls backend** (to implement)
   - Frontend will call `GET /api/topics`
   - Backend will return topics list
   - Frontend displays it

---

## 📝 First Code Commits

### Setup complete! Now:

1. **Create feature branch**
   ```bash
   # Agent Front
   git checkout -b feature/front/phase1-setup

   # Agent Back
   git checkout -b feature/back/phase1-setup

   # Agent Tests
   git checkout -b feature/test/phase1-setup
   ```

2. **Make initial changes** (minimal)
   ```bash
   # Example: Add a comment to main.ts
   # Or create a basic component stub

   git add .
   git commit -m "feat: Initial Phase 1 setup"
   git push -u origin feature/front/phase1-setup
   ```

3. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch to `develop`
   - Description: "Phase 1 setup - [Agent name]"
   - Request reviews from other agents

---

## ⚠️ Common Issues

### Port already in use
```bash
# Backend (3001)
lsof -i :3001
kill -9 <PID>

# Frontend (5173)
lsof -i :5173
kill -9 <PID>
```

### Database connection failed
```bash
# Check .env has DATABASE_URL
cat backend/.env | grep DATABASE_URL

# Test connection
npx prisma db push

# If Neon: Check IP whitelist in dashboard
```

### TypeScript errors
```bash
cd frontend && npm run type-check
cd backend && npm run type-check
```

### Prisma client missing
```bash
cd backend
npx prisma generate
```

### Node modules corrupted
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Need Help?

1. **Check README.md** in frontend/ or backend/
2. **Check PHASE_1_PLAN.md** for task details
3. **Check CLAUDE.md** for collaboration rules
4. **Post in #blocages** Slack with:
   - What you tried
   - Error message
   - Which system (Mac/Windows/Linux)

---

## ✅ Checklist Setup Complet

### Agent Front
- [ ] Node.js 20+ installed
- [ ] Git cloned locally
- [ ] `npm install` in frontend/
- [ ] Frontend runs on http://localhost:5173
- [ ] Read PHASE_1_PLAN.md (Frontend section)
- [ ] Ready to start Task F-1.1

### Agent Back
- [ ] Node.js 20+ installed
- [ ] Git cloned locally
- [ ] `npm install` in backend/
- [ ] Database (Neon or local) configured
- [ ] Migrations applied (`prisma migrate dev`)
- [ ] Seed data loaded (`prisma db seed`)
- [ ] Backend runs on http://localhost:3001
- [ ] `/health` endpoint responds
- [ ] Read PHASE_1_PLAN.md (Backend section)
- [ ] Ready to start Task B-1.3

### Agent Tests
- [ ] Node.js 20+ installed
- [ ] Git cloned locally
- [ ] `npm install` in both frontend/ & backend/
- [ ] Jest configured (backend)
- [ ] Playwright installed (frontend)
- [ ] Read PHASE_1_PLAN.md (Tests section)
- [ ] Ready to start Task T-1.1

---

## 🚀 Next Steps

**Jour 1 (maintenant)**:
- [ ] Chaque agent complète le QuickStart
- [ ] Post message ✅ dans #daily-standup quand ready

**Jour 2**:
- [ ] Team sync 30 min pour questions
- [ ] Agent Front démarre F-1.1
- [ ] Agent Back démarre B-1.3
- [ ] Agent Tests démarre T-1.1

**Semaine 1**:
- [ ] Kanban board rempli avec tasks
- [ ] 3x/week syncs démarrées
- [ ] Premier code mergé dans develop

---

**Bon développement! 🚀**

Questions? → `#blocages` Slack

