# Backend (ToroGo)

This README contains quick instructions to run the backend locally and a Postman collection to test auth endpoints.

Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL database configured

Setup
1. Copy `.env.example` to `.env` and edit values (DATABASE_URL, JWT_SECRET).
2. Install dependencies:

```powershell
cd backend
npm install
```

Run
```powershell
npm run dev
```

Auth endpoints (base: `http://localhost:3000/api/auth`)
- POST `/login` — body: `{ "email": "...", "password": "..." }`
- POST `/register` — body: `{ full_name, dni, age, email, phone, password, role }
- POST `/select-role` — protected; header `Authorization: Bearer <token>`; body: `{ role: 'driver' }`

Postman collection
The file `tests/postman_auth.postman_collection.json` contains three requests: Register, Login, Select-role.

Notes
- JWT secret is read from `process.env.JWT_SECRET`. If missing, a default dev secret is used but you should set a strong secret in production.
- If you encounter issues with `bcrypt` on Windows, consider installing build tools or using `bcryptjs` temporarily.

Database connection testing
1. You can provide a single `DATABASE_URL` in `.env` (format: `postgresql://user:password@host:5432/dbname`) or individual vars (`DB_USER`, `DB_PASS`, `DB_HOST`, `DB_NAME`, `PORT_DB`).
2. To quickly test the DB connection run:

```powershell
cd backend
node scripts/dbTest.js
```

This will print the error from `pg` if authentication or network fails and exit with code 1.
