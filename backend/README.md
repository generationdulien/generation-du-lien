# Backend — Génération du Lien

Node.js + Express + Prisma + PostgreSQL - REST API

## 🚀 Quick Start

```bash
npm install

# Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# Setup database
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed        # Load sample data

# Start server
npm run dev                # http://localhost:3001
```

## 🗄️ Database Setup

### Option 1: Neon (Recommended - Free)
1. Sign up: https://neon.tech
2. Create project
3. Copy `DATABASE_URL` to `.env`
4. Run migrations: `npx prisma migrate dev`

### Option 2: Local PostgreSQL
```bash
# Create database
createdb generation_lien

# Set environment
export DATABASE_URL="postgresql://user:password@localhost:5432/generation_lien"

# Run migrations
npx prisma migrate dev
```

## 📁 Structure

```
src/
├── main.ts             # Entry point
├── config/             # Configuration (db, env, logger)
├── middleware/         # Express middleware
├── routes/             # API route handlers
├── controllers/        # Business logic
├── services/           # External integrations (email, auth)
├── schemas/            # Zod validation schemas
├── models/             # TypeScript interfaces
└── utils/              # Helpers

prisma/
├── schema.prisma       # Data model
├── seed.ts             # Initial data
└── migrations/         # Database migrations
```

## 🎯 Phase 1 Tasks

**Agent Back** should work on:
- [ ] B-1.1: Setup Node.js + Express + TypeScript
- [ ] B-1.2: Setup PostgreSQL + Prisma
- [ ] B-1.3: Authentication foundation (JWT, bcrypt)
- [ ] B-1.4: Auth API endpoints (POST /api/auth/register)
- [ ] B-1.5: Email verification (POST /api/auth/verify-email)
- [ ] B-1.6: CAPTCHA validation
- [ ] B-1.7: Topics API (GET /api/topics)
- [ ] B-1.8: Login endpoint (POST /api/auth/login)
- [ ] B-1.9: Database seeding
- [ ] B-1.10: API documentation
- [ ] B-1.11: Error handling & logging

👉 See `../PHASE_1_PLAN.md` for full details

## 📚 Key Files

- `.env.example` — Environment variables template
- `prisma/schema.prisma` — Database schema
- `src/main.ts` — Server entry point
- `tsconfig.json` — TypeScript configuration
- `.eslintrc.cjs` — ESLint rules
- `.prettierrc` — Code formatting rules

## 🔗 API Endpoints

### Health Check
```
GET /health
```

### Authentication (Phase 1)
```
POST /api/auth/register
POST /api/auth/verify-email
POST /api/auth/login
```

### Topics (Phase 1)
```
GET /api/topics
GET /api/topics/:id
```

👉 See `../API_CONTRACTS.md` for full specifications

## 🧪 Testing

```bash
npm test                   # Run Jest tests
npm run test:watch         # Watch mode
npm run test:cov           # With coverage
```

## 🔐 Security Checklist

- ✅ Environment variables (.env) never committed
- ✅ Passwords hashed with bcrypt (10+ rounds)
- ✅ JWT for authentication
- ✅ Input validation with Zod
- ✅ CORS configured
- ✅ SQL injection prevention (Prisma)
- ✅ Rate limiting (to implement Phase 1)
- ✅ HTTPS in production

## 📊 Database

### Initial Schema (Phase 1)

```sql
-- Users table
CREATE TABLE users (
  id CUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  passwordHash VARCHAR NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  verified BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Topics table
CREATE TABLE topics (
  id CUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR,
  published BOOLEAN DEFAULT false,
  order INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Migrations

```bash
npx prisma migrate dev                    # Create & apply new migration
npx prisma migrate status                 # Check migration status
npx prisma migrate resolve --rolled-back  # Resolve issues
npx prisma db push                        # Push schema changes (dev only!)
```

## 📝 Logging

Winston logger configured in `src/config/logger.ts`

Logs include:
- Request/response logging
- Error tracking
- Audit trail for sensitive actions
- Performance metrics

## 🚀 Deployment

Backend deployed to **Railway** or **Render**:

```bash
# Automatic deploy on push to main
# Or manually: git push heroku main
```

Environment variables needed in production:
- DATABASE_URL (production database)
- JWT_SECRET (strong random string)
- RESEND_API_KEY (email service)
- NODE_ENV=production

## 📋 Code Quality

```bash
npm run lint       # Run ESLint
npm run type-check # TypeScript check
npm run build      # Production build
```

## 🔧 Troubleshooting

### Prisma schema error
```bash
npx prisma generate
npx prisma db push
```

### Migration issues
```bash
npx prisma migrate resolve --rolled-back <migration_name>
npx prisma migrate reset  # ⚠️ Careful! Resets all data
```

### Database connection timeout
```bash
# Check DATABASE_URL in .env
# Verify network/firewall access
# Test: npx prisma db push --skip-generate
```

## 📞 Questions?

- Check PHASE_1_PLAN.md for task details
- Check CLAUDE.md for collaboration rules
- Check API_CONTRACTS.md for API specs
- Reach out in #back-dev Slack

## 📖 Resources

- [Express.js docs](https://expressjs.com)
- [Prisma docs](https://www.prisma.io/docs)
- [PostgreSQL docs](https://www.postgresql.org/docs)
- [JWT.io](https://jwt.io)
