# 🗄️ Database Setup — Génération du Lien

**Status**: ✅ CONFIGURED & READY

---

## Database Provider

**Neon PostgreSQL** (Free tier)
- Project: `falling-poetry-86348702`
- Database: `generation_lien`
- Region: Azure (Belgique)
- Connection pooling: Enabled

---

## Configuration

### Backend `.env`
```
DATABASE_URL=postgresql://neondb_owner:npg_TAmtMcu0qE2N@ep-dark-rain-a9jhbvae-pooler.gwc.azure.neon.tech/generation_lien?sslmode=require&channel_binding=require
```

✅ DATABASE_URL configured
✅ Prisma client generated (`npx prisma generate`)
✅ Schema synced to database (`npx prisma db push`)
✅ Seed data loaded (`npx ts-node --esm prisma/seed.ts`)

---

## Schema (Phase 1)

### Users Table
```sql
CREATE TABLE users (
  id STRING PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  passwordHash VARCHAR NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  verified BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

**Sample users**:
- ✅ test@example.com / TestPassword123!
- ✅ unverified@example.com / TestPassword123!

### Topics Table
```sql
CREATE TABLE topics (
  id STRING PRIMARY KEY,
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

**Sample topics**:
- ✅ Éducation
- ✅ Santé
- ✅ Écologie
- ✅ Démocratie
- ✅ Culture

---

## Neon Dashboard

**URL**: https://console.neon.tech/app/projects/falling-poetry-86348702

### To access database directly:
1. Go to Neon dashboard
2. Click "SQL Editor"
3. Run queries against `generation_lien` database

---

## Prisma Management

### View data
```bash
cd backend
npx prisma studio  # Opens GUI at http://localhost:5555
```

### Update schema
```bash
# 1. Edit prisma/schema.prisma
# 2. Sync to database
npx prisma db push

# Or if using migrations:
npx prisma migrate dev --name describe_change
```

### Reset database (dev only!)
```bash
# ⚠️ WARNING: Deletes all data
npx prisma db push --skip-generate --force-reset
npx ts-node --esm prisma/seed.ts  # Reseed
```

---

## Backend Connection Test

```bash
cd backend

# Start server
npm run dev

# Test health endpoint
curl http://localhost:3001/health
# Expected response: {"status":"ok","timestamp":"..."}

# Test topics endpoint (once implemented)
curl http://localhost:3001/api/topics
```

---

## Phase 1 Database Roadmap

### ✅ Already implemented
- User model (id, email, password, name, verified)
- Topic model (content, slug, published status)
- Seed script with sample data

### 🔄 Phase 2 (Commented in schema)
- Interest model (user interests)
- Comment model (with moderation status)
- audit trail for moderation

### 🔄 Phase 3+ (Future)
- Contribution model
- EditorContent model
- File attachments
- Advanced indexing

---

## Common Tasks

### Add new field to User
```prisma
model User {
  // ... existing fields
  phoneNumber String?  // Add this
  // ... rest
}
```

Then sync:
```bash
npx prisma db push
```

### Query data (from backend code)
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users
const users = await prisma.user.findMany();

// Get topic by slug
const topic = await prisma.topic.findUnique({
  where: { slug: 'education' }
});
```

---

## Backup & Restore

### Neon automatic backups
- Free tier: 7 days retention
- Available from Neon dashboard → Settings → Backups

### Manual export
```bash
# From Neon SQL Editor or locally:
pg_dump -h ep-dark-rain-a9jhbvae-pooler.gwc.azure.neon.tech \
  -U neondb_owner -d generation_lien > backup.sql
```

---

## Performance & Monitoring

### Neon free tier limits
- 5 GB database storage
- 0.5 GB RAM
- Compute auto-scales based on load

### Monitor in Neon dashboard
- Storage usage
- Connection count
- Query performance

### Optimize queries
- Create indexes for frequently filtered fields
- Use pagination (limit/offset) for large datasets
- Avoid N+1 queries (use Prisma `include` or `select`)

---

## Troubleshooting

### Connection error
```
Error: ERROR: database "X" does not exist
```
→ Check DATABASE_URL is correct
→ Verify Neon project has `generation_lien` database

### Prisma generate fails
```
npx prisma generate
```

### Can't connect from code
```bash
# Test connection
npx prisma db push --skip-generate
```

### Reset development database
```bash
# ⚠️ Only in development!
npx prisma db push --skip-generate --force-reset
npx ts-node --esm prisma/seed.ts
```

---

## Security Notes

⚠️ **DATABASE_URL contains credentials**
- ✅ Already in `.env` (not committed)
- ✅ Use `.env.example` for template
- ✅ Never expose DATABASE_URL in logs
- ✅ In production: Use environment variables or Neon database role

---

## Links

- 🔗 [Neon Console](https://console.neon.tech/app/projects/falling-poetry-86348702)
- 📚 [Prisma Docs](https://www.prisma.io/docs)
- 📚 [PostgreSQL Docs](https://www.postgresql.org/docs)
- 📚 [Neon Docs](https://neon.tech/docs)

---

**Last Updated**: 2026-03-19
**Phase**: 1 (MVP)
**Status**: ✅ Ready for development

