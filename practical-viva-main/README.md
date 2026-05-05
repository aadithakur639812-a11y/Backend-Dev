# Secure Banking API

Simple Node.js, Express, JavaScript, MongoDB project with a static frontend.

## Folder Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  .env.example
  package.json
  server.js
frontend/
  index.html
  style.css
  script.js
```

## Setup

1. Open MongoDB Compass.
2. Connect to `mongodb://127.0.0.1:27017`.
3. The backend environment is in `backend/.env`.
4. Install backend dependencies if needed:

```bash
npm run install:backend
```

5. Run the full project from the root folder:

```bash
npm run dev
```

6. Open `http://localhost:5001` in your browser.

The API runs at `http://localhost:5001`.

## Frontend Pages

- `http://localhost:5001/index.html` login and register
- `http://localhost:5001/accounts.html` accounts, deposit, withdraw, transfer
- `http://localhost:5001/transactions.html` transaction history
- `http://localhost:5001/admin.html` admin account list

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/accounts/my`
- `GET /api/accounts/all` admin only
- `POST /api/accounts/deposit`
- `POST /api/accounts/withdraw`
- `POST /api/accounts/transfer`
- `GET /api/transactions/my`

## Security Features

- Password hashing with bcrypt.
- JWT access tokens.
- Refresh tokens.
- Protected routes.
- Admin-only route for all accounts.
- Joi validation.
- Rate limiting.
- Overdraft prevention using `checkBalance(userId)`.
