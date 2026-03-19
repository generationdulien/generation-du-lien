# API Contracts — Génération du Lien

**Source of truth for Frontend ↔ Backend communication**

**Status**: 🟡 PHASE 1 (In development)
**Last Updated**: 2026-03-19
**Owner**: Agent Back (Backend Team)

---

## Overview

Base URL:
- Development: `http://localhost:3001`
- Production: `https://api.generation-lien.fr`

All endpoints require:
```
Content-Type: application/json
```

## Response Format

### Success (2xx)
```json
{
  "data": { /* response payload */ },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

### Error (4xx, 5xx)
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { /* optional */ }
  },
  "statusCode": 400,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

---

## Authentication

### JWT Token

- Issued on login
- Expiration: 24 hours
- Stored: localStorage (Phase 1), httpOnly cookies (Phase 2+)
- Header: `Authorization: Bearer <token>`

### Protected Endpoints

Add header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Phase 1 Endpoints

### Health Check

```http
GET /health
```

**Response 200**:
```json
{
  "status": "ok",
  "timestamp": "2026-03-19T15:30:00Z"
}
```

---

### Authentication

#### POST /api/auth/register

Create new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "captchaToken": "hcaptcha_token_here"
}
```

**Validation**:
- email: valid email format, unique
- password: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- firstName: non-empty, max 50 chars
- lastName: non-empty, max 50 chars
- captchaToken: valid hCaptcha response

**Response 201**:
```json
{
  "data": {
    "id": "cuid123abc",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "verified": false,
    "createdAt": "2026-03-19T15:30:00Z"
  },
  "statusCode": 201,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| INVALID_EMAIL | 422 | Email format invalid |
| EMAIL_EXISTS | 409 | Email already registered |
| WEAK_PASSWORD | 422 | Password does not meet requirements |
| INVALID_CAPTCHA | 422 | CAPTCHA validation failed |
| RATE_LIMITED | 429 | Too many registration attempts from this IP |
| INTERNAL_ERROR | 500 | Database error |

**Side Effects**:
- Sends email verification link to user
- Link expires in 24 hours

---

#### POST /api/auth/verify-email

Verify user email address.

**Request**:
```json
{
  "token": "email_verification_token_from_link"
}
```

**Response 200**:
```json
{
  "data": {
    "verified": true,
    "message": "Email verified successfully"
  },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| INVALID_TOKEN | 400 | Token invalid or expired |
| ALREADY_VERIFIED | 409 | Email already verified |

**Side Effects**:
- Updates user.verified = true
- User can now login

---

#### POST /api/auth/resend-verification

Resend email verification link.

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Response 200**:
```json
{
  "data": {
    "message": "Verification email sent",
    "expiresIn": 3600
  },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| EMAIL_NOT_FOUND | 404 | Email not registered |
| ALREADY_VERIFIED | 409 | Email already verified |
| RATE_LIMITED | 429 | Wait 5 minutes before requesting again |

---

#### POST /api/auth/login

Authenticate user and return JWT token.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response 200**:
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "cuid123abc",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "verified": true
    },
    "expiresIn": 86400
  },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| INVALID_CREDENTIALS | 401 | Email or password incorrect |
| EMAIL_NOT_VERIFIED | 403 | Email not verified. Check your inbox |
| USER_NOT_FOUND | 404 | User not found |
| RATE_LIMITED | 429 | Too many login attempts. Try again later |

---

### Topics

#### GET /api/topics

Get list of published topics.

**Query Parameters**:
```
?limit=20        # Max results (default: 20, max: 100)
?offset=0        # Pagination offset (default: 0)
?published=true  # Filter by publication status (default: true)
?sort=order      # Sort field: "order", "created", "title" (default: "order")
```

**Response 200**:
```json
{
  "data": [
    {
      "id": "topic_123",
      "title": "Éducation",
      "slug": "education",
      "summary": "Notre vision pour une éducation inclusive...",
      "image": "https://example.com/education.jpg",
      "order": 1,
      "published": true,
      "createdAt": "2026-03-19T15:30:00Z"
    },
    {
      "id": "topic_456",
      "title": "Santé",
      "slug": "sante",
      "summary": "Accès à une santé de qualité...",
      "image": null,
      "order": 2,
      "published": true,
      "createdAt": "2026-03-19T15:30:00Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 15,
    "hasMore": false
  },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| INVALID_QUERY | 422 | Invalid query parameters |

---

#### GET /api/topics/:id

Get detailed topic by ID or slug.

**Parameters**:
```
:id    # Topic ID (CUID) or slug (e.g., "education")
```

**Response 200**:
```json
{
  "data": {
    "id": "topic_123",
    "title": "Éducation",
    "slug": "education",
    "summary": "Notre vision pour une éducation inclusive...",
    "content": "# Éducation\n\n## Constats\n...",
    "image": "https://example.com/education.jpg",
    "order": 1,
    "published": true,
    "createdAt": "2026-03-19T15:30:00Z",
    "updatedAt": "2026-03-19T16:00:00Z"
  },
  "statusCode": 200,
  "timestamp": "2026-03-19T15:30:00Z"
}
```

**Errors**:

| Code | Status | Message |
|------|--------|---------|
| NOT_FOUND | 404 | Topic not found |
| UNPUBLISHED | 404 | Topic not published (if not admin) |

---

## Phase 2+ Endpoints (Planned)

These will be implemented in future phases:

- `GET /api/user/me` — Get current user profile
- `PUT /api/user/me` — Update user profile
- `POST /api/user/interests` — Save user interests
- `POST /api/comments` — Create comment
- `GET /api/topics/:id/comments` — Get topic comments
- `GET /api/admin/moderation/comments` — Moderation queue
- `PATCH /api/admin/moderation/comments/:id` — Moderate comment
- And more...

---

## HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (invalid token) |
| 403 | Forbidden (no permission) |
| 404 | Not found |
| 409 | Conflict (e.g., duplicate email) |
| 422 | Unprocessable entity (validation) |
| 429 | Rate limited |
| 500 | Internal server error |

---

## Rate Limiting

Applied to sensitive endpoints:

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /api/auth/register | 5 | per IP, per hour |
| POST /api/auth/login | 5 | per IP, per 30 min |
| POST /api/auth/resend-verification | 3 | per IP, per 5 min |

Response header on limit:
```
Retry-After: 300
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1234567890
```

---

## CORS

**Allowed Origins** (development):
- http://localhost:5173
- http://localhost:3000

**Allowed Origins** (production):
- https://generation-lien.fr
- https://www.generation-lien.fr

---

## Changelog

### v0.1.0 (Phase 1 - In Development)
- ✅ POST /api/auth/register
- ✅ POST /api/auth/verify-email
- ✅ POST /api/auth/resend-verification
- ✅ POST /api/auth/login
- ✅ GET /api/topics
- ✅ GET /api/topics/:id
- ✅ GET /health

### v0.2.0 (Phase 2 - Planned)
- Comments endpoints
- User profile endpoints
- Notifications

### v0.3.0 (Phase 3+ - Planned)
- Moderation endpoints
- Contribution endpoints
- Admin endpoints

---

## How to Update This Document

1. Create feature branch: `feature/back/new-endpoint`
2. Implement endpoint in backend
3. Update this document (API_CONTRACTS.md)
4. Submit PR with both changes
5. Frontend can start implementation once API contract is approved

**Important**: Do NOT merge backend PR without updating API_CONTRACTS.md!

