#!/bin/bash

# Configuration et Push vers GitHub
# Execute ces commandes dans le terminal

cd "C:\Personnel\Generationdulien\Site"

# 1. Configurer Git (une fois)
git config user.email "dev@generation-lien.fr"
git config user.name "Generation du Lien Team"

# 2. Vérifier le statut
git status

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le commit initial
git commit --no-gpg-sign -m "feat: Initial Phase 1 setup - Complete project structure and documentation

Add team structure, collaboration rules, and technical setup:
- TEAM_STRUCTURE.md: Team roles, syncs, responsibilities
- CLAUDE.md: Git workflow, collaboration rules
- ARCHITECTURE.md: Technical stack and deployment
- PHASE_1_PLAN.md: 34+ detailed tasks with timeline
- QUICKSTART.md: 5-minute setup for each agent
- PROJECT_STRUCTURE.md: Complete file structure
- API_CONTRACTS.md: Shared API specification

Frontend setup:
- React 18 + TypeScript + Vite
- Tailwind CSS + ESLint + Prettier
- Playwright E2E testing

Backend setup:
- Node.js + Express + Prisma
- PostgreSQL database schema
- JWT authentication framework
- Sample data seeding

Ready for Phase 1 development!"

# 5. Configurer le remote GitHub
git remote add origin https://github.com/generationdulien/generation-du-lien.git

# 6. Vérifier le remote
git remote -v

# 7. Renommer la branche (master → main)
git branch -M main

# 8. Faire le push initial
git push -u origin main

# 9. Vérifier le push
git log --oneline

echo "✅ Done! Project pushed to GitHub"
echo "🔗 https://github.com/generationdulien/generation-du-lien"
